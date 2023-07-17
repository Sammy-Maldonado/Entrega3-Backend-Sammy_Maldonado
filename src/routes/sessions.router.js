import BaseRouter from "./router.js";
import { passportCall } from "../services/auth.js";
import sessionsController from "../controllers/sessions.controller.js";

export default class SessionsRouter extends BaseRouter {

  init() {
    this.get('/current', ['PUBLIC'], passportCall('jwt', { strategyType: 'jwt', session: false }), sessionsController.getCurrent);
    this.post('/register', ['NO_AUTH'], passportCall('register', { strategyType: "locals", session: false }), sessionsController.register);
    this.post('/login', ['NO_AUTH'], passportCall('login', { strategyType: "locals", session: false }), sessionsController.loginWithToken);
    this.get('/github', ['NO_AUTH'], passportCall('github', { strategyType: 'github', session: false }), sessionsController.githubInit);
    this.get('/githubcallback', ['NO_AUTH'], passportCall('github', { strategyType: 'github', session: false }), sessionsController.githubLoginWithToken);
    this.post('/logout', ['PUBLIC'], sessionsController.logout);
  };
}