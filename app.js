/* eslint-disable linebreak-style */
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

const app = express();

if (process.env.ENV === 'Test') {
  console.log('This a Test');
  const db = mongoose.connect('mongodb://localhost/bookAPI_Test');
} else {
  console.log('This a Real');
  const db = mongoose.connect("mongodb://localhost/bookAPI_prod");
}



const port = process.env.PORT || 3000;
const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRouter')(Book);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use("/api", bookRouter);

app.get("/", (req, res) => {
  res.send("Welcome to my API!");
});

app.server = app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

module.exports = app;