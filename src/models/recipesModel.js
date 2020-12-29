const db = require("../configs/mySQL");
const form = require("../Helpers/form");

exports.getAllRecipesModel = (req) => {
  return new Promise((resolve, reject) => {
    const qs =
      "SELECT r.id_rcp, r.title_rcp, r.id_user, r.img_rcp, r.desc_rcp FROM recipes as r ORDER BY created_at DESC";
    db.query(qs, (err, data) => {
      if (data.length < 1) {
        reject({
          msg: "data tidak tersedia",
        });
      }
      if (!err) {
        resolve(data);
      } else {
        reject(err);
      }
    });
  });
};

exports.getAllRecipesByUserId = (req) => {
  const { id } = req.params;
  return new Promise((resolve, reject) => {
    const qs =
      "SELECT r.title_rcp, r.img_rcp, r.id_rcp FROM recipes as r WHERE id_user = ? ORDER BY created_at DESC";
    db.query(qs, id, (err, data) => {
      if (data.length == 0) {
        reject({
          msg: "data tidak tersedia",
        });
      }
      if (!err) {
        resolve(data);
      } else {
        reject(err);
      }
    });
  });
};

exports.postNewRecipe = (req) => {
  // mendapat objek request dari client
  // melakukan query ke db
  // mengirim response
  //const img = process.env.SERVER + "/images/" + req.file.filename; for single
  const image = JSON.stringify(
    req.files.img.map((e) => process.env.SERVER + "/images/" + e.filename)
  );
  const videos = JSON.stringify(
    req.files.videos.map((e) => process.env.SERVER + "/videos/" + e.filename)
  );
  const { body } = req;
  // console.log(req.files);
  const insertBody = {
    ...body,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now()),
    //prd_image: img,
    img_rcp: image,
    video_rcp: videos,
  };
  return new Promise((resolve, reject) => {
    const qs = "INSERT INTO recipes SET ?";
    db.query(qs, insertBody, (err, data) => {
      if (!err) {
        resolve(data);
      } else {
        reject(err);
      }
    });
  });
};
