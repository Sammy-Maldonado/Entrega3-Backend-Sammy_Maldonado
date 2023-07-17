import { generateToken } from "../services/auth.js";
import UsersDTO from "../dtos/user/UsersDTO.js";

const getCurrent = (req,res) => {
  const currentUser = req.user;
  res.sendSuccessWithPayload(currentUser);
}

const register = (req, res) => {
  res.sendSuccess();
}

const loginWithToken = (req, res) => {
  const token = generateToken(req.user);

  //Aqui envío el token generado para el usuario, al frontend, por una cookie.
  //El siguiente paso es extraer el token de la cookie con la estrategia 'jwt' -> passport.config.js :72
  res.cookie('authToken', token, {
    maxAge: 1000 * 3600 * 24,   //1seg*1hr*24hrs = 24hrs
    httpOnly: true
  }).sendSuccess("Logged In")   //Logeado con exito
}

const githubInit = (req, res) => { }

const githubLoginWithToken = (req, res) => {
  const userDTO = new UsersDTO.GithubTokenDTO(req);
  const user = {...userDTO}
  const accessToken = generateToken(user);

  res.cookie('authToken', accessToken, {
    maxAge: 1000*3600*24,
    httpOnly:true
  }).sendSuccess("Github login success")
}

const logout = async (req, res) => {
  // Borra la cookie en la respuesta
  res.clearCookie('authToken');
  // Envía una respuesta JSON que indica el logout exitoso
  res.sendSuccess("Logged Out");
}

export default {
  getCurrent,
  register,
  loginWithToken,
  githubInit,
  githubLoginWithToken,
  logout
}