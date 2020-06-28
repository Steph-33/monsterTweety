var orm = require("./../database/database.js");

let db = orm.connectToDB();

class Tweet {
  constructor(props, userName, userPseudo) {
    const { tweetDate, tweetContent, url, countLikes, countRetweet } = props;
    console.log(props)
    this.userName = userName;
    this.userPseudo = userPseudo;
    this.tweetDate = tweetDate;
    this.content = tweetContent;
    this.url = url ;
    this.countLikes = countLikes || 0;
    this.countRetweet = countRetweet || 0;
  }

  static create(newTweet, callback) {
      db.query("INSERT INTO Tweet SET ?", newTweet, (error, result) => {
        if (error) {
          console.log("error: ", error);
          callback(error, null);
          return;
        }
  
        console.log("Donne ton avis, toujours ton avis");
        callback(null, {
          tweetId: result.insertId,
          ...newTweet,
        });
      });
    }

  static getAll(callback) {
    db.query("SELECT * FROM Tweet", (error, result) => {
      if (error) {
        console.log("error: ", error);
        callback(error, null);
        return;
      }
  
      console.log("Vos tweets : ", result[0].content);
      callback(null,result);
    });
  }
};
    
module.exports = Tweet;