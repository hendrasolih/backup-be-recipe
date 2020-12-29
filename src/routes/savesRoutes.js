const savedRouter = require("express").Router();

const savedCtrl = require("../controllers/savesCtrl");

savedRouter.post("/", savedCtrl.postNewSavesCtrl);
savedRouter.get("/:id", savedCtrl.getRecipeSave);
savedRouter.delete("/:id", savedCtrl.unSaveCtrl); //params recipe id

module.exports = savedRouter;
