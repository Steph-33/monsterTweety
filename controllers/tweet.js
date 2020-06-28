const Tweet = require("../models/tweet");

exports.add = (request, response) => {
    const newTweet = new Tweet(request.body, request.user.userName, request.user.userPseudo);
    Tweet.create(newTweet, (error, data) => {
      if (error) {
        response.status(500).send(error.message);
      }
      response.redirect("/tweetactu");
    });
};

exports.findAll = (request, response) => {
  Tweet.getAll((error, tweet) => {
        if (error) {
        response.status(500).send(error.message);
        }
        
        response.render("tweetactu",{
          userName: request.user.userName,
          userPseudo:request.user.userPseudo,
          tweet : tweet
        });
  });
};