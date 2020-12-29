const userByIdModel = require("../models/userModel");
const form = require("../helpers/form");

module.exports = {
  getUserById: (req, res) => {
    userByIdModel
      .getUserById(req)
      .then((data) => {
        if (data.length) {
          res.json({
            data,
          });
        } else {
          res.status(404).json({
            msg: "Data not Found",
          });
        }
      })
      .catch((err) => {
        res.json(err);
      });
  },

  updateUserByIdCtrl: (req, res) => {
    // if (req.files.length == null) {
    //   console.log("kosong bro");
    // }
    let image = null;
    if (req.files.img) {
      image = JSON.stringify(
        req.files.img.map((e) => process.env.SERVER + "/images/" + e.filename)
      );
    }
    console.log(image);
    const { body } = req;
    const { id } = req.params;

    // set for update
    const entries = Object.entries(body);

    let rawSetUpdate = "";

    if (req.files.img && req.files.img.length !== 0) {
      console.log("true");
      rawSetUpdate += `photo_user = '${image}', `;
    }
    entries.forEach((entry) => {
      let key = entry[0];
      let value = entry[1];
      rawSetUpdate += `${key} = '${value}', `;
    });
    const setUpdate = rawSetUpdate.slice(0, -2) + " ";
    console.log(setUpdate);
    userByIdModel
      .updateUserByid(id, setUpdate)
      .then((data) => {
        res.status(200).json({
          msg: "data berhasil diperbaharui",
          data: body,
          image,
        });
      })
      .catch((err) => {
        res.json(err);
      });
  },
};
