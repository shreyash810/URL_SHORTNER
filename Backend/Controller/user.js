const User = require("../model/user");
const { v4: uuidv4 } = require("uuid");
const { setUserid, getUserid } = require("../auth");
async function handeluserSignUp(req, res) {
  try {
    const data = req.body;
    const checkUser = await User.findOne({ email: data.email });
    if (checkUser) {
      return res.status(400).json({ error: "Email already exist" });
    }
    const result = await User.create({
      name: data.name,
      email: data.email,
      password: data.password,
    });
    res.status(201).json({ msg: "Scuccess" });
  } catch (e) {
    console.log(e);
  }
}

async function handelloggin(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user || user.password !== password) {
      return res.status(404).json({ error: "Invalid credentials" });
    }
    const token = setUserid(user);
    res.cookie("uuid", token);
    return res.status(200).json({ message: "Login successful", token });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function handelUserLogout(req, res) {
  try {
    res.clearCookie("uuid");
    return res.status(200).json({ msg: "logout" });
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  handeluserSignUp,
  handelloggin,
  handelUserLogout,
};
