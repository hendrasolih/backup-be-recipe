const recipeByIdModel = require("../models/recipeByIdModel");
const form = require("../helpers/form");

module.exports = {
  getRecipeById: (req, res) => {
    console.log(req.headers);
    recipeByIdModel
      .getRecipeById(req)
      .then((data) => {
        if (data.length) {
          res.json({
            data,
          });
        } else {
          res.status(200).json({
            msg: "Data not Found",
          });
        }
      })
      .catch((err) => {
        res.json(err);
      });
  },

  updateRecipeByIdCtrl: (req, res) => {
    // if (req.files.length == null) {
    //   console.log("kosong bro");
    // }
    let image = null;
    let videos = null;
    if (req.files.img) {
      image = JSON.stringify(
        req.files.img.map((e) => process.env.SERVER + "/images/" + e.filename)
      );
    }
    if (req.files.videos) {
      videos = JSON.stringify(
        req.files.videos.map(
          (e) => process.env.SERVER + "/videos/" + e.filename
        )
      );
    }
    console.log(image);
    const { body } = req;
    const { id } = req.params;

    // set for update
    const entries = Object.entries(body);
    const todayDate = new Date().toISOString().slice(0, 10);

    let rawSetUpdate = `updated_at = '${todayDate}', `;
    if (req.files.img && req.files.img.length !== 0) {
      console.log("true");
      rawSetUpdate += `img_rcp = '${image}', `;
    }
    if (req.files.videos && req.files.videos.length !== 0) {
      console.log("true");
      rawSetUpdate += `video_rcp = '${videos}', `;
    }
    entries.forEach((entry) => {
      let key = entry[0];
      let value = entry[1];
      rawSetUpdate += `${key} = '${value}', `;
    });
    const setUpdate = rawSetUpdate.slice(0, -2) + " ";
    console.log(setUpdate);
    recipeByIdModel
      .updateRecipeByid(id, setUpdate)
      .then((data) => {
        res.status(200).json({
          msg: "data berhasil diperbaharui",
          data: body,
          image,
          videos,
        });
      })
      .catch((err) => {
        res.json(err);
      });
  },

  deleteRecipeByIdCtrl: (req, res) => {
    recipeByIdModel
      .deleteRecipeById(req)
      .then(() => {
        form.success(res, {
          status: "success",
          msg: "Data berhasil dihapus",
        });
      })
      .catch((err) => {
        form.error(res, err);
      });
  },
};
