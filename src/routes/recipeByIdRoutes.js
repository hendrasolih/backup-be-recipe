const recipeByIdRouter = require("express").Router();

const recipeByIdCtrl = require("../controllers/recipeByIdCtrl");

const multiUpload = require("../helpers/middlewares/multiUpload");

recipeByIdRouter.get("/:id", recipeByIdCtrl.getRecipeById);
recipeByIdRouter.delete("/:id", recipeByIdCtrl.deleteRecipeByIdCtrl);
recipeByIdRouter.patch(
  "/:id",
  multiUpload,
  recipeByIdCtrl.updateRecipeByIdCtrl
);

module.exports = recipeByIdRouter;
