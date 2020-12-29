const db = require("../configs/mySQL");

exports.postNewComment = (body) => {
  return new Promise((resolve, reject) => {
    const qs = "INSERT INTO comments SET ?";
    db.query(qs, body, (err, data) => {
      if (!err) {
        resolve(data);
      } else {
        reject(errr);
      }
    });
  });
};

exports.deleteComment = (id) => {
  return new Promise((resolve, reject) => {
    const qs = "DELETE FROM comments WHERE id = ?";
    db.query(qs, id, (err, data) => {
      if (!err) {
        resolve(data);
      } else {
        reject(err);
      }
    });
  });
};

exports.getComment = (id) => {
  return new Promise((resolve, reject) => {
    const qs =
      "SELECT c.recipe_id, c.comment, u.name_user, u.photo_user, u.id_user, c.id FROM comments AS c JOIN users AS u ON c.user_id = u.id_user WHERE c.recipe_id = ? ORDER BY c.id ASC";

    db.query(qs, id, (err, data) => {
      if (!err) {
        resolve(data);
      } else {
        reject(err);
      }
    });
  });
};
