const searchRouter = require("express").Router();

const searchCtrl = require("../controllers/searchRecipes");

searchRouter.get("/", searchCtrl.searchRecipes);

module.exports = searchRouter;
