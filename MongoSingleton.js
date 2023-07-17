import mongoose from "mongoose";
import config from './src/config.js';

export default class MongoSingleton {
  static #instance;
  constructor() {
    mongoose.connect(config.mongo.URL)
  }

  static getInstance() {
    if(this.#instance){
      console.log("Ya hay una instancia referenciada");
      return this.#instance;
    }
    //Si llegué aquí, es porque no tenía ninguna instancia previa.
    this.#instance = new MongoSingleton();
    console.log("Conectado a primera instancia");
    return this.#instance;
  }
}