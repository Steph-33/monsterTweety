const Tweet = require("../models/tweet");

exports.add = (request, response) => {
    const newTweet = new Tweet(request.body, request.user.userName, request.user.userPseudo);
    Tweet.create(newTweet, (error, data) => {
      if (error) {
        response.status(500).send(error.message);
      }
  
      response.redirect("/tweetactu");
      
      // response.render("tweetactu", {
      //   // style:"/css/tweetactu.css",
      //   userName:"marsipulami",
      //   userPseudo:"mathilda",
      //   tweetDate:"31/05/2020"
      // });
    });
};

exports.findAll = (request, response) => {
  // response.render("tweetactu")
  Tweet.getAll((error, tweet) => {
        if (error) {
        response.status(500).send(error.message);
        }

        // response.render("/tweetactu", { tweet });
        
        response.render("tweetactu",{
          // style:"/css/tweetactu.css",
          userName: request.user.userName,
          userPseudo:request.user.userPseudo,
          // tweetDate:"31/05/2020",
          tweet : tweet
        });
        // console.log(response.render)
  });
};