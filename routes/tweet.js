const express = require("express");
// const db = require ("../database/database")

const tweetController = require("../controllers/tweet");

const tweetRouter = express.Router();

tweetRouter.get("/", tweetController.findAll);

// db.connect();

// tweetRouter.post("/", tweetController.add);

// db.end();

module.exports = tweetRouter;