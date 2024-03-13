const { getUserid } = require("../auth");
const user = require("../model/user");
async function restrictoLoginUserOnly(req, res, next) {
  const userUid = req.cookies?.uuid;
  const user = getUserid(userUid);
  req.user = user;
  next();
}

async function cheakauth(req, res, next) {
  const userUid = req.cookies?.uuid;
  const user = getUserid(userUid);
  if (user === "token exp") {
    return res.status(401).json({ msg: "token exp" });
  }
  req.user = user;
  next();
}

module.exports = { restrictoLoginUserOnly, cheakauth };
