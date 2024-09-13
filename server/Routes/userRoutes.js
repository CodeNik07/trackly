const express = require("express");
const router = express.Router();
const userController = require('../Controller/userController');


router.get("/profile/:userToken", userController.userProfile);
router.post("/register", userController.userRegister);
router.post("/login", userController.userLogin);

module.exports = router;