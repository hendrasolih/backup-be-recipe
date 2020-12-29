const likesRouter = require("express").Router();

const likesCtrl = require("../controllers/likesCtrl");

likesRouter.post("/", likesCtrl.postNewLikeCtrl);
likesRouter.get("/:id", likesCtrl.getRecipeLike);
likesRouter.delete("/:id", likesCtrl.unLikeCtrl); //params recipe id

module.exports = likesRouter;
