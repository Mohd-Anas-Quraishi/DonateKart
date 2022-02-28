'use strict'
import express from 'express';
import cors from 'cors';
const app = express();

import routes from './routes.js';

app.use(cors({
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS,PUT,GET,DELETE"
}));

app.use(routes);

const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`Server is listening on PORT ${PORT}`);
})