const { User, sequelize } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatarUrl = require("gravatar");
const register = async (req, res) => {
  const { name, email, password, numberPhone } = req.body;
  try {
    // tạo avatar default
    const avatarUrl = gravatarUrl.url(email, {
      protocol: "http",
      s: "100",
    });
    // tạo ra một chuõi ngẫu nhiên
    const salt = bcrypt.genSaltSync(10);
    // mã hoá salt + password
    const hashPassword = bcrypt.hashSync(password, salt);
    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
      numberPhone,
      avatar: avatarUrl,
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

const uploadAvatar = async (req, res) => {
  const { file } = req;
  const urlImage = `http://localhost:3000/${file.path}`;
  const { user } = req;
  const userFound = await User.findOne({ email: user.email });
  userFound.avatar = urlImage;
  await userFound.save();
  res.send(userFound);
};

const getAllTripUser = async (req, res) => {
  try {
    const [results] = await sequelize.query(`
    select users.name userName, ft.name fromStation, tt.name toStation from users
    inner join tickets 
    on users.id = tickets.user_id
    inner join trips 
    on trips.id = tickets.trip_id
    inner join stations ft
    on ft.id = trips.fromStation
    inner join stations tt
    on tt.id = trips.toStation`);
    res.status(200).send(results);
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = { register, login, uploadAvatar, getAllTripUser };
