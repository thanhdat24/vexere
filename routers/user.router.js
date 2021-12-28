const express = require("express");
const { register, login } = require("../controllers/user.controllers");
const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);

// upload file
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/avatars"); // setup chỗ cần lưu file
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname); // đặt lại tên cho file, tạo thời gian hiện tại Date.now() để gửi file giống nhau kh bị trùng
  },
});
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const extensionImageList = [".png", ".jpg"];
    const extension = file.originalname.slice(-4);
    const check = extensionImageList.includes(extension); // hàm includes kiểm tra xem value lấy ra từ extension có phải dạng .png, .jpg giống trong extensionImageList kh
    if (check) {
      cb(null, true);
    } else {
      cb(new Error("Extention không hợp lệ !"));
    }
  },
});
userRouter.post("/upload-avatar", upload.single("avatar"), (req, res) => {
  res.send("Tính Năng Upload File Run");
});

module.exports = { userRouter };
