import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import logger from 'morgan';
import path, {dirname} from 'path';
import { fileURLToPath } from 'url';

import {Model} from 'objection';
import Knex from 'knex';
import Passport from './configs/passport.mjs';

import indexRouter from './routes/index.mjs';
import apiRouter from './routes/api.mjs';
import adminRouter from './routes/admin.mjs';
import storeRouter from './routes/store.mjs';
import marketRouter from './routes/market.mjs';

import ValidationConfig from './configs/validation.mjs';

import CompleteQueue from './runners/OrderComplete.mjs';

import Next from 'next';

import cors from 'cors';

// nextjs
const dev = process.env.APP_ENV !== 'production'

const next = Next({ dev })
const handle = next.getRequestHandler()

// Repeated Runners
CompleteQueue.add({}, { repeat:{ cron:"0 0 * * *" } })

// dependencies configuration
dotenv.config();

const knex = Knex({
    client:process.env.DB_CONNECTION,
    useNullAsDefault:true,
    //debug:dev,
    connection:{
        host : process.env.DB_HOST,
        port : process.env.DB_PORT,
        user : process.env.DB_USERNAME,
        password : process.env.DB_PASSWORD,
        database : process.env.DB_DATABASE,
        filename: process.env.DB_DATABASE+".db"
    }
})

Model.knex(knex)

Passport.bearer(); // config jwt bearer

ValidationConfig(); // config validation rules

// express routes config
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.set('views', `${__dirname}/views`);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

var upload = multer();
app.use(upload.any()); 

app.use(cors())

app.use(`/api/admin`, adminRouter);
app.use(`/api/store`, storeRouter);
app.use(`/api/market`, marketRouter);
app.use(`/api`, apiRouter);
app.use(`/`, indexRouter);

if(dev){
    app.use(`/docs`,express.static(path.join(__dirname, 'docs')));
}

app.use("/storage",express.static(path.join(__dirname, 'storage'))); // for local file storage

next.prepare().then(()=>{
    app.get(`/*`, (req, res)=>{
        handle(req,res);
    });
});

export default app;
