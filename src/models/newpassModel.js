const bcrypt = require("bcrypt");
const db = require("../configs/mySQL");

exports.postNewPass = (id, body) => {
  //gensalt
  //hash
  //store DB
  return new Promise((resolve, reject) => {
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(body.password_user, salt, (err, hashedPassword) => {
        if (err) {
          reject(err);
        }
        const setUpdate = `password_user = '${hashedPassword}'`;
        const qs = "UPDATE users SET " + setUpdate + " WHERE id_user = ?";
        db.query(qs, id, (err, data) => {
          console.log(qs);
          if (!err) {
            resolve(data);
          } else {
            reject(err);
          }
        });
      });
    });
  });
};
