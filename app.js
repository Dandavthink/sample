const express = require("express");
const bodyParser = require("body-parser");

// create express app
const app = express();

const mysql = require('./config/db.config');

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

connectMysql();

require('./routes/index')(app);

// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});


module.exports = app;