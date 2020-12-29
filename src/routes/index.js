const express = require("express");

const mainRouter = express.Router();

const recipesRouter = require("./recipesRoutes");
const recipeByIdRouter = require("./recipeByIdRoutes");
const authRouter = require("./authRoutes");
const searchRouter = require("./searchRoutes");
const commentsRouter = require("./commentsRoutes");
const savesRouter = require("./savesRoutes");
const likesRouter = require("./likesRoutes");
const userRouter = require("./userRoutes");
const newpassRouter = require("./newpassRoutes");

mainRouter.use("/recipes", recipesRouter); // localhost:5000/recipes
mainRouter.use("/recipe", recipeByIdRouter); // localhost:5000/recipes
mainRouter.use("/auth", authRouter); // localhost:5000/auth
mainRouter.use("/search", searchRouter); // localhost:5000/search
mainRouter.use("/comments", commentsRouter); // localhost:5000/comments
mainRouter.use("/saves", savesRouter); // localhost:5000/saves
mainRouter.use("/likes", likesRouter); // localhost:5000/likes
mainRouter.use("/user", userRouter); // localhost:5000/user
mainRouter.use("/newpass", newpassRouter); // localhost:5000/newpass

module.exports = mainRouter;
