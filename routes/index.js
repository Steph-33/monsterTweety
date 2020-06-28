const express = require("express");
const bodyParser = require("body-parser")
let urlencodedParser = bodyParser.urlencoded({ extended: false })
// const bcrypt = require("bcrypt");
const passport = require('passport');
const flash = require('express-flash');
const isAuth = require('../middleware/isAuth')

// midleware express
const router = express.Router();

const tweetRouter = require("./tweet");
const tweetController = require('../controllers/tweet');
const Tweet = require("../models/tweet");


// ------> routes GET & POST pour page "tweetactu" qui utilise les fonctions du controller
router.get("/tweetactu",isAuth, tweetController.findAll);

router.post("/tweetactu", tweetController.add)


// routes en GET et POST pour l'inscription

const userController = require("../controllers/user");

router.get("/inscription", (request,response) => {
  response.render('inscription.handlebars');
});

router.post("/inscription", userController.add);

//route GET profil
router.get("/profil",isAuth,userController.findInfo);

// -----> routes générales pour home etc
router.get("/", (request, response) => {
  response.render("home", {error : request.flash('error')})
});

router.post("/", passport.authenticate('local', {
  failureRedirect: '/',
  failureFlash: 'La connexion a échoué ! ',
}),
  function(request,response){
    response.redirect('/tweetactu');
  }
);

router.get('/logout', (request,response) => {
  request.logout();
  request.session.destroy();
  response.redirect('/');
})

router.get("*", (request, response) => {
  response.status(404).render("404.handlebars");
});

module.exports = router;