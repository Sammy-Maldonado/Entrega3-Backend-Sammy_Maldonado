//En caso de que quiera utilizar ".env" en mi proyecto, activo dotenv.
import dotenv from 'dotenv';
import { Command } from 'commander';

const program = new Command();
program.option('-m, --mode <mode>','Modo de ejecución');
program.parse();

//dotenv.config() SÓLO LEE .env
dotenv.config({
  path: program.opts().mode === "prod" ? './.env.prod' : './.env.dev'
});

export default {
  PERSISTENCE: process.env.PERSISTENCE,
  app: {
    PORT: process.env.PORT || 8080
  },
  mongo: {
    URL: process.env.MONGO_URL || 'localhost:27017'
  },
  admin: {
    EMAIL: process.env.ADMIN_EMAIL,
    PWD: process.env.ADMIN_PWD
  },
  jwt: {
    SECRET: process.env.JWT_SECRET
  },
  github: {
    clientID: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRET,
    callbackURL: process.env.CALLBACKURL
  }
}