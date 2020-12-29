const authRouter = require("express").Router();

const authController = require("../controllers/authCtrl");

authRouter.post("/signup", authController.signup);
authRouter.post("/login", authController.login);
authRouter.post("/sendemailuser", authController.sendEmailUser);
authRouter.post("/resetpassuser", authController.userReset);
authRouter.post("/otp", authController.otpLogin);
authRouter.delete("/logout", authController.logout);

module.exports = authRouter;
