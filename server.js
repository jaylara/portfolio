///Jay Lara
///Portfolio
///server.js - main starting point for web application

//dependencies - requirements
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const routes = require("./routes/index.js");

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

app.use('/', routes);

//start server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});
