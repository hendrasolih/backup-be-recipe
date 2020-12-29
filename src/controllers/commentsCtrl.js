const commentsModel = require("../models/commentsModel");
const form = require("../helpers/form");

module.exports = {
  postNewCommentCtrl: (req, res) => {
    const { body } = req;
    commentsModel
      .postNewComment(body)
      .then((data) => {
        const resObject = {
          msg: "Comment berhasil dimasukkan",
          comment: body.comment,
        };
        res.status(200).json(resObject);
      })
      .catch((err) => {
        res.json(err);
      });
  },

  getCommentByRecipeCtrl: (req, res) => {
    const { id } = req.params;
    commentsModel
      .getComment(id)
      .then((data) => {
        res.status(200).json({
          comment: data,
        });
      })
      .catch((err) => {
        res.json(err);
      });
  },

  deleteCommentById: (req, res) => {
    const { id } = req.params;
    commentsModel
      .deleteComment(id)
      .then((data) => {
        res.status(200).json({
          msg: "delete comment berhasil",
          data,
        });
      })
      .catch((err) => {
        res.json({
          msg: "gagal delete",
          err,
        });
      });
  },
};
