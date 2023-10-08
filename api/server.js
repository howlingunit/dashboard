import express from 'express';
import * as db from './db.js'


const app = express();

app.get('/testing', db.new_section);

app.get('/getUserData', db.getUserdata);

app.listen(8080);