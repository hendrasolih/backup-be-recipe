const recipesModel = require("../models/recipesModel");
const form = require("../helpers/form");

module.exports = {
  getAllRecipes: (req, res) => {
    recipesModel
      .getAllRecipesModel(req)
      .then((data) => {
        form.success(res, data);
      })
      .catch((err) => {
        form.error(res, err);
      });
  },

  getAllRecipesById: (req, res) => {
    recipesModel
      .getAllRecipesByUserId(req)
      .then((data) => {
        res.json({
          data,
        });
      })
      .catch((err) => {
        form.error(res, err);
      });
  },

  postNewRecipeCtrl: (req, res) => {
    // console.log(req.files)
    const image = JSON.stringify(
      req.files.img.map((e) => process.env.SERVER + "/images/" + e.filename + " ")
    );
    // return res.send(req.files)
    const videos = JSON.stringify(
      req.files.videos.map((e) => process.env.SERVER + "/videos/" + e.filename + " ")
    );
    const { body } = req;
    // console.log(body);
    // console.log(req.files);
    const insertBody = {
      ...body,
      created_at: new Date(Date.now()),
      updated_at: new Date(Date.now()),
      //prd_image: img,
      img_rcp: image,
      video_rcp: videos,
    };
    recipesModel
      .postNewRecipe(req)
      .then((data) => {
        const resObject = {
          msg: "Data berhasil dimasukkan",
          data: { id: data.insertId, ...insertBody },
        };
        res.json(resObject);
      })
      .catch((err) => {
        res.json(err);
      });
  },
};
