import express from 'express';
import * as db from './db.js'


const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Origin" ,"*");
  res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  res.header('Access-Control-Allow-Origin', '*');
  next();
})

app.get('/testing', db.new_section);

app.post('/add-section', express.json(), db.addSection);

app.post('/add-card', express.json(), db.addCard);

app.post('/remove-section', express.json(), db.remSections);

app.post('/remove-card', express.json(), db.remCard)

app.get('/getUserData', db.getUserdata);

app.listen(8080);