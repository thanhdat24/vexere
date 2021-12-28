const express = require("express");
const { register, login } = require("../controllers/user.controllers");
const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);

// upload file
const multer = require("multer");
const upload = multer({ dest: "uploads/avatars" });

userRouter.post("/upload-avatar", upload.single("avatar"), (req, res) => {
  res.send("Tính Năng Upload File Run");
});

module.exports = { userRouter };
