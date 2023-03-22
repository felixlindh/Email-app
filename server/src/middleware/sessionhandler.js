import * as dotenv from "dotenv"
dotenv.config()
import session from 'express-session';
import express from 'express';
import crypto from 'crypto';
import MongoStore from 'connect-mongo';


const sessionHandler = express.Router();

/* session configuration */
const details = {
  secure: false, /* http utan SSL (https) */
  saveUninitialized: false,
  resave: false,
  secret: crypto.randomUUID(),
  store: MongoStore.create({
    mongoUrl: `mongodb+srv://${process.env.appUsername}:${process.env.appPassword}@cluster0.hx5gfla.mongodb.net/${process.env.appDatabaseName}?retryWrites=true&w=majority`
  })
}

console.log(details.secret);

sessionHandler.use(session(details));

export default sessionHandler;