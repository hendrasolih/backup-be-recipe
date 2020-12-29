const jwt = require("jsonwebtoken");
const db = require("../../configs/mySQL");
const { error } = require("../form");

const form = require("../form");

module.exports = {
  login: (req, res, next) => {
    const bearerToken = req.header("x-access-token");
    console.log(bearerToken);
    if (!bearerToken) {
      form.error(res, {
        msg: "Please Login First",
        status: 401,
      });
    } else {
      const token = bearerToken.split(" ")[1];
      return new Promise((resolve, reject) => {
        const qs = "Select token FROM token_whitelist WHERE token = ?";
        db.query(qs, token, (err, data) => {
          //console.log(data);
          if (!err) {
            if (!data[0]) {
              reject({
                msg: `Invalid Token`,
              });
            } else {
              resolve(token);
            }
          }
        });
      })
        .then((token) => {
          try {
            const decodeToken = jwt.verify(token, process.env.SECRET_KEY);
            req.decodeToken = decodeToken;
            next();
          } catch (error) {
            form.error(res, {
              msg: "Invalid Token verify",
              error,
            });
          }
        })
        .catch((error) => {
          form.error(res, {
            error,
          });
        });
    }
  },
};
