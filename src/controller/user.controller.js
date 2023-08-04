const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");

const register = async (req, res) => {
  const { body } = req;
  try {
    const emailCheck = await userModel.checkEmail(body.email);
    if (emailCheck.rows.length > 0) {
      return res.status(403).json({
        msg: "Email Already Exist",
      });
    }
    body.pass = await bcrypt.hash(body.pass, 10);
    await userModel.storeUser(body);
    res.status(200).json({
      msg: "Registration Successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  const { body } = req;
  try {
    const checkLogin = await userModel.checkForLogin(body.email);
    if (checkLogin.rows.length === 0) {
      return res.status(403).json({
        msg: "email/password is wrong",
      });
    }
    const { password, ...userData } = checkLogin.rows[0];
    const compare = await bcrypt.compare(body.pass, password);
    if (!compare) {
      return res.status(403).json({
        msg: "email/password is wrong",
      });
    }
    const token = jwt.sign(userData, "FW14");
    return res.status(200).json({
      msg: "Login Sucess",
      userData,
      token,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { register, login };
