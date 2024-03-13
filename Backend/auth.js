const jwt = require("jsonwebtoken");
require("dotenv").config();

function setUserid(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    process.env.SECRET_KEY,
    { expiresIn: 3600 }
  );
}

function getUserid(token) {
  if (!token) return null;
  const tokenUser = jwt.verify(token, process.env.SECRET_KEY, (err, res) => {
    if (err) {
      return "token exp";
    } else {
      return res;
    }
  });
  return tokenUser;
}

module.exports = {
  setUserid,
  getUserid,
};
