const multer = require("multer");
const path = require("path");
const form = require("../form");

const multerStorage = multer.diskStorage({
  destination: function (_, file, cb) {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/gif" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, "./public/images");
    } else if (
      file.mimetype === "video/mp4" ||
      file.mimetype === "video/3gp" ||
      file.mimetype === "video/mkv" ||
      file.mimetype === "video/mpeg"
    ) {
      cb(null, "./public/videos");
    }
  },
  filename: function (_, file, cb) {
    const nameImage = `image-${Date.now()}-${file.originalname}${path.extname(
      file.originalname
    )}`;
    const nameVideo = `video-${Date.now()}-${file.originalname}`;
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/gif" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, nameImage);
    } else if (file.mimetype === "video/mp4") {
      cb(null, nameVideo);
    }
  },
});
const upload = multer({
  storage: multerStorage,
  limits: { fileSize: 200 * 1000 * 1000 }, // 200 MB
});
const multiUpload = (req, res, next) => {
  //fields
  var cpUpload = upload.fields([
    { name: "img", maxCount: 1 },
    { name: "videos", maxCount: 5 },
  ]);
  //const uploadMulti = upload.array("videos", 5);
  cpUpload(req, res, (err) => {
    if (err) {
      form.error(res, {
        msg: "Multer Error",
        err,
      });
    } else {
      console.log("next Step");
      next();
    }
  });
};

module.exports = multiUpload;
