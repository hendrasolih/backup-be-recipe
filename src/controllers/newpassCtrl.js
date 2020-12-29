const newpassModel = require("../models/newpassModel");

module.exports = {
  newPassCtrl: (req, res) => {
    const { body } = req;
    const { id } = req.params;
    console.log(body);
    console.log(id);
    newpassModel
      .postNewPass(id, body)
      .then((data) => {
        res.status(200).json({
          msg: "Password berhasil diperbaharui",
          data: data,
        });
      })
      .catch((err) => {
        res.json(err);
      });
  },
};
