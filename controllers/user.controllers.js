const { User } = require("../models");
const bcrypt = require("bcryptjs");
const register = async (req, res) => {
  const { name, email, password, numberPhone } = req.body;
  try {
    // tạo ra một chuõi ngẫu nhiên
    const salt = bcrypt.genSaltSync(10);
    // mã hoá salt + password
    const hashPassword = bcrypt.hashSync(password, salt);
    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
      numberPhone,
    });
    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  // b1: tìm ra user đang đăng nhập dựa trên email
  const user = await User.findOne({ where: { email } });
  if (user) {
    const isAuth = bcrypt.compareSync(password, user.password);
    if (isAuth) {
      res.status(200).send("Đăng nhập thành công !");
    } else {
      res.status(500).send("Tài khoản hoặc mật khẩu không đúng !");
    }
  } else {
    res.status(404).send("Không tìm thấy email phù hợp !");
  }
  // b2: kiểm ra password có đúng kh?
};

module.exports = { register, login };
