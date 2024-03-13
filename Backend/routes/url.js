const express = require("express");
const {
  handleGenerateNewShortUrl,
  handleGetAllData,
  handeldelete,
} = require("../Controller/url");
const { restrictoLoginUserOnly, cheakauth } = require("../middleware/aurth");
const router = express.Router();

router.post("/url", restrictoLoginUserOnly, handleGenerateNewShortUrl);
router.post("/delete/:id", handeldelete);
router.get("/all", cheakauth, handleGetAllData);

module.exports = router;
