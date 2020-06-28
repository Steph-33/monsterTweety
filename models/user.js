var orm = require("./../database/database.js");

let db = orm.connectToDB();

class User {
    constructor(props) {
      const { userName, userPseudo, userPassword, userEmailAdress, userPicture } = props;
  
      this.userName = userName;
      this.userPseudo = userPseudo;
      this.userPassword = userPassword;
      this.userEmailAdress = userEmailAdress;
      this.userPicture = userPicture;
    }

    static create(newUser, callback) {
        db.query("INSERT INTO userTable SET ?", newUser, (error, result) => {
          if (error) {
            console.log("error: ", error);
            callback(error, null);
            return;
          }
    
          console.log("Qui es tu ?");
          // const hashedPassword = bcrypt.hash(newUser.userName)
      
          // console.log(hashedPassword)
          callback(null, {
            userId: result.insertId,
            // userPassword: hashedPassword,
            // id: result.insertId,
            ...newUser,
          });
        });
      }

      static findOne(userEmailAdress, callback) {
        console.log(userEmailAdress);
        db.query("SELECT * FROM userTable WHERE userEmailAdress = ?", [userEmailAdress], (error, result) => {
          if (error) throw error;
          callback(error,result[0]);
        });
      }

      static findById(userId, callback) {
        console.log(userId);
        db.query("SELECT * FROM userTable WHERE userId = ?", [userId], (error, result) => {
          if (error) throw error;
          callback(error,result[0]);
        });
      }

      static getInfo(userId,callback) {
        db.query("SELECT * FROM userTable WHERE userId = ? " , [userId], (error, result) => {
          if (error) throw error;
          // console.log('log username de models',userName,userPseudo);
          // console.log(result[0])
          callback(error,result[0]);
        });
      }
};
    
module.exports = User;