const express = require("express");
var cors = require('cors');
const bodyParser = require("body-parser");

// create express app
const app = express();

const mysql = require('./config/db.config');

app.use(cors());

// Setup server port
const port = process.env.PORT || 5000;

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));



// parse requests of content-type - application/json
app.use(bodyParser.json());

async function connectMysql() {
  try{
    await mysql.initialize();
  }catch(err){
    return err;
  }
}

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

connectMysql();

require('./routes/index')(app);

// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});


module.exports = app;