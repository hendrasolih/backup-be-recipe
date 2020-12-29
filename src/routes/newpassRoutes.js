const newpassRouter = require("express").Router();

const newpassCtrl = require("../controllers/newpassCtrl");

newpassRouter.patch("/:id", newpassCtrl.newPassCtrl);

module.exports = newpassRouter;
