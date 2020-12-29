const commentsRouter = require("express").Router();

const commentsCtrl = require("../controllers/commentsCtrl");

commentsRouter.get("/:id", commentsCtrl.getCommentByRecipeCtrl);
commentsRouter.post("/", commentsCtrl.postNewCommentCtrl);
commentsRouter.delete("/:id", commentsCtrl.deleteCommentById);

module.exports = commentsRouter;
