 import express from 'express'
 const app = express()
 const Router = express.Router()
 const {
     index,
     register
 } = require('../app/registerController');
 const {
     loginIndex,
     login,
     homeIndex
 } = require('../app/loginController');
 Router.route("/register")
     .get(index)
     .post(register);
 Router.route("/login")
     .get(loginIndex)
     .post(login);
 Router.route("/home")
     .get(homeIndex)
 module.exports = Router;