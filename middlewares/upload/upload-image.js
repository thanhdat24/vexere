const mkdirp = require("mkdirp");
const multer = require("multer");
const uploadImage = (type) => {
  // tạo đường dẫn trước khi upload ảnh lên tránh bị null
  const made = mkdirp.sync(`./public/images/${type}`);
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `./public/images/${type}`); // setup chỗ cần lưu file
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
  return upload.single(`${type}`);
};

module.exports = {
  uploadImage,
};
