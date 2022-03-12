import express from "express";
const routes = require("./start/index");
const path=require('path')
require('./config/db.config')
require('dotenv').config();
var bodyParser = require('body-parser');
const app = express();
var port = process.env.PORT||8019;
app.set('port',port);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'resources/views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'resources/public')));
app.use('/v1',routes.routes);
app.listen(app.get('port'), () => {
    console.log(`server is started:${app.get('port')} `);
  });
  