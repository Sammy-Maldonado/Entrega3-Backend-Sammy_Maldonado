import passport from 'passport';
import local from 'passport-local';
import GithubStrategy from 'passport-github2';
import { usersService } from '../services/index.js';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { createHash, validatePassword } from '../services/auth.js';
import { cookieExtractor } from '../utils.js';
import config from '../config.js';
import UsersDTO from '../dtos/user/UsersDTO.js';

const LocalStrategy = local.Strategy;
const JWTStrategy = Strategy;

let hashedPassword;
const initializePassportStrategies = () => {
  passport.use('register', new LocalStrategy({ passReqToCallback: true, usernameField: 'email' }, async (req, email, password, done) => {
    try {
      const { first_name, last_name, role, age } = req.body;

      //Verificando que el usuario no exista en la base de datos
      const exist = await usersService.getUserBy({ email });
      if (exist)
        return done(null, false, { message: 'El usuario ya existe' })
      const hashedPassword = await createHash(password);
      const userDTO = new UsersDTO.RegisterUserDTO(req.body, hashedPassword);
      const newUser = {...userDTO};
      const result = await usersService.createUser(newUser);
      done(null, result)
    } catch (error) {
      done(error)
    }
  }));

  //Todas las demas estrategias van acá, por ejemplo, la estrategia de login
  passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    let resultUser;
    try {
      if (email === config.admin.EMAIL && password === config.admin.PWD) {
        //Acá entro como SUPER ADMIN
        const superAdminDTO = new UsersDTO.SuperAdminDTO()
        resultUser = { ...superAdminDTO }
        return done(null, resultUser)
      }

      //Buscando al usuario
      const user = await usersService.getUserBy({ email });
      if (!user) return done(null, false, { message: "Usuario no encontrado" });

      //Verificando su password encriptado
      const isValidPassword = await validatePassword(password, user.password);
      if (!isValidPassword) return done(null, false, { message: "Contraseña incorrecta" });

      //Creando al usuario (req.user)
      const userDTO = new UsersDTO.PassportUserDTO(user)
      resultUser = { ...userDTO }
      return done(null, resultUser);
    } catch (error) {
      return done(error)
    }
  }));

  /* Github */
  passport.use(
    'github',
    new GithubStrategy(
      {
        clientID: config.github.clientID,
        clientSecret: config.github.clientSecret,
        callbackURL: config.github.callbackURL
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const { name, email } = profile._json;
          const user = await usersService.getUserBy({ email });
          //Creando el usuario si no existe.
          if (!user) {
            const userDTO = new UsersDTO.GithubUserDTO({ name, email })
            const newUser = { ...userDTO }
            const result = await usersService.createUser(newUser);
            done(null, result);
          }
          //En caso de que si exista.
          done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  //Passport se encargará de la verificación de mi token
  /* Estrategia de JWT para extraer el token de la Cookie. Extractor en -> utils.js*/
  passport.use('jwt', new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: config.jwt.SECRET
  }, async (payload, done) => {
    try {
      return done(null, payload);
    } catch (error) {
      return done(error);
    }
  }))
};

export { initializePassportStrategies as default, hashedPassword };