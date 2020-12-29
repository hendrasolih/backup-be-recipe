const userByIdRouter = require("express").Router();

const userByIdCtrl = require("../controllers/userCtrl");

const multiUpload = require("../helpers/middlewares/multiUpload");

const checkToken = require("../helpers/middlewares/checkToken");

userByIdRouter.get("/:id", checkToken.login, userByIdCtrl.getUserById);
userByIdRouter.patch("/:id", multiUpload, userByIdCtrl.updateUserByIdCtrl);

module.exports = userByIdRouter;
