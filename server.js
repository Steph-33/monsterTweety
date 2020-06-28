// import mysqlClient from './database/mysql.js'

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require('body-parser');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const logger = require('morgan');
const isAuth = require('./middleware/isAuth');

var orm = require("./database/database.js");

const initializePassport = require('./passport');
initializePassport(passport);

const router = require("./routes");

const server = express();

server.engine('handlebars',handlebars());
server.set('view engine','handlebars');

server.use(logger('dev'));

server.use(express.static('assets'));
server.use(express.static('img'));

server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())

server.use(flash())

server.use(session({
    secret: 'licorne',
    cookie: { maxAge: null },
    resave:true,
    saveUninitialized : true
}))

server.use(passport.initialize());
server.use(passport.session());

server.use(router);

orm.connectToDB();

let port = 5000;
server.listen(port, () => {
    console.log(`Vous êtes bien connecté sur le port ${port}`);
});