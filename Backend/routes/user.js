const express = require("express");
const {
  handeluserSignUp,
  handelloggin,
  handelUserLogout,
} = require("../Controller/user");
const router = express.Router();

router.post("/signup", handeluserSignUp);
router.post("/login", handelloggin);
router.post("/logout", handelUserLogout);

module.exports = router;
