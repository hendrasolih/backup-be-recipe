const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("../configs/mySQL");

exports.postNewUser = (body) => {
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
        const newBody = {
          ...body,
          password_user: hashedPassword,
        };
        const qs = "INSERT INTO users SET ?";
        db.query(qs, newBody, (err, data) => {
          if (err) {
            if (err.code == "ER_DUP_ENTRY") {
              return reject({
                msg: "email sudah terdaftar",
                status: 409,
              });
            }
          }
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

exports.postLogin = (body) => {
  // query ke DB => SELECT password WHERE username == username body
  // compare body password dengan password DB
  // jwt => sign, verify
  // sign => mendapatkan token dari payload
  // token dikirim ke client
  return new Promise((resolve, reject) => {
    if (body.email == 0 || body.user_password == 0) {
      return reject({
        msg: "input user",
      });
    }
    const { email_user, password_user } = body;
    const qs =
      "SELECT users.password_user, users.id_user FROM users WHERE email_user=?";
    db.query(qs, email_user, (err, data) => {
      console.log(qs);
      if (err) {
        reject({
          msg: "Error SQL",
          status: 500,
          err,
        });
      }
      console.log(data);
      if (data == undefined) {
        return reject({
          msg: "error",
        });
      }
      if (!data[0]) {
        reject({
          msg: "User Not Found",
          status: 404,
        });
      } else {
        bcrypt.compare(password_user, data[0].password_user, (err, result) => {
          if (err) {
            reject({
              msg: "Hash Error",
              status: 500,
              err,
            });
          }
          // result => true : false
          if (!result) {
            reject({
              msg: "Wrong Password",
              status: 401,
            });
          } else {
            const payload = {
              email_user,
            };
            const secret = process.env.SECRET_KEY;
            const token = jwt.sign(payload, secret);
            const idUser = data[0].id_user;
            const objUserLogin = {
              token: token,
              userId: idUser,
            };
            resolve(objUserLogin);
          }
        });
      }
    });
  });
};

exports.deleteLogout = (whitelisttoken) => {
  return new Promise((resolve, reject) => {
    const qs = "DELETE FROM token_whitelist WHERE token=?";
    db.query(qs, whitelisttoken, (err, data) => {
      if (!err) {
        resolve({
          msg: `Logout berhasil`,
        });
      } else {
        reject({
          msg: `Logout tidak berhasil`,
        });
      }
    });
  });
};

exports.userReset = (body) => {
  return new Promise((resolve, reject) => {
    const qs = "SELECT email_user FROM users WHERE id_user = ? ";
    db.query(qs, [body.id], (err, data) => {
      if (data.length !== 0) {
        bcrypt.genSalt(10, (err, salt) => {
          if (err) {
            reject(err);
          }
          const { password_user, id_user } = body;
          bcrypt.hash(password_user, salt, (err, hashedPassword) => {
            if (err) {
              reject(err);
            }
            const queryStr =
              "UPDATE users SET password_user = ?  WHERE id_user = ?";
            db.query(queryStr, [hashedPassword, id_user], (err, data) => {
              if (!err) {
                resolve({
                  msg: "change password success",
                  data,
                });
              } else {
                reject(err);
              }
            });
          });
        });
      } else {
        reject({
          msg: "user not found",
        });
      }
    });
  });
};

async function saveOtp(otp) {
  await db.query("INSERT INTO tb_otp SET otp=?", otp);
}

exports.sendEmailUser = (body) => {
  return new Promise((resolve, reject) => {
    const queryStr =
      "SELECT id_user , email_user FROM users WHERE email_user = ?";
    db.query(queryStr, [body.email_user], (err, data) => {
      if (err) {
        reject(err);
      }
      console.log(data.email_user);
      if (data.length !== 0) {
        console.log(data[0]);
        function generateOTP() {
          var string =
            "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
          let OTP = "";
          var len = string.length;
          for (let i = 0; i < 6; i++) {
            OTP += string[Math.floor(Math.random() * len)];
          }
          return OTP;
        }
        let otp = generateOTP();
        console.log(otp);
        //localStorage.setItem("userId", data[0].id_user);
        saveOtp(otp);

        // let link = `${process.env.REACT_APP_URL}/Confirmation-password?id_user=${data[0].id_user}`
        resolve({
          email: data[0].email_user,
          link: otp,
          userId: data[0].id_user,
        });
      } else {
        reject({
          msg: "data not found",
        });
      }
    });
  });
};

exports.postOtp = (body) => {
  // query ke DB => SELECT password WHERE username == username body
  // compare body password dengan password DB
  // jwt => sign, verify
  // sign => mendapatkan token dari payload
  // token dikirim ke client
  return new Promise((resolve, reject) => {
    if (body.otp == 0) {
      return reject({
        msg: "input otp",
      });
    }
    const { otp } = body;
    const qs = "SELECT otp FROM tb_otp WHERE otp = ?";
    db.query(qs, otp, (err, data) => {
      console.log(qs);
      if (err) {
        reject({
          msg: "Error SQL",
          status: 500,
          err,
        });
      }
      console.log(data);
      if (data == undefined) {
        return reject({
          msg: "error",
        });
      }
      if (!data[0]) {
        reject({
          msg: "OTP Not Found",
          status: 404,
        });
      } else {
        resolve(data);
      }
    });
  });
};
