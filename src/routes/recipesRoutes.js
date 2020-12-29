const recipesRouter = require("express").Router();

const recipesCtrl = require("../controllers/recipesCtrl");

const multiUpload = require("../helpers/middlewares/multiUpload");

recipesRouter.get("/", recipesCtrl.getAllRecipes);
recipesRouter.post("/", multiUpload, recipesCtrl.postNewRecipeCtrl);
recipesRouter.get("/:id", recipesCtrl.getAllRecipesById);

module.exports = recipesRouter;
