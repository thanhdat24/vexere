const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
      const token = jwt.sign({ email: user.email, type: user.type }, "van-24", {
        expiresIn: 60 * 60,
      });
      res.status(200).send({ message: "Đăng nhập thành công !", token });
    } else {
      res.status(500).send({ message: "Tài khoản hoặc mật khẩu không đúng !" });
    }
  } else {
    res.status(404).send({ message: "Không tìm thấy email phù hợp !" });
  }
  // b2: kiểm ra password có đúng kh?
};

module.exports = { register, login };
