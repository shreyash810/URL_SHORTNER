const ShortUniqueId = require("short-unique-id");
const URL = require("../model/url");
const qr = require("qrcode");

async function handleGenerateNewShortUrl(req, res) {
  try {
    const body = req.body;
    const Createby = req.user?._id;

    if (!body.url) return res.status(400).json({ error: "url is require" });
    const uid = new ShortUniqueId({ length: 4 });
    const shortId = uid.rnd();
    await URL.create({
      shortId: shortId,
      redirectUrl: body.url,
      status: "Active",
      NumOfvisit: [],
      createdby: Createby,
    });
    return res.json({ id: shortId });
  } catch (e) {
    console.log(e);
  }
}

async function handleGetAllData(req, res) {
  try {
    if (!req.user) return res.json({ msg: "login first" });

    const result = await URL.find({ createdby: req.user._id });
    const data = result.map((item, index) => {
      return new Promise((resolve, reject) => {
        qr.toDataURL(item.redirectUrl, function (err, url) {
          if (err) {
            reject(err);
          } else {
            resolve({ ...item, qrcode: url });
          }
        });
      });
    });
    const Data = await Promise.all(data);
    return res.json({ Data });
  } catch (e) {
    console.log(e);
  }
}

async function handeldelete(req, res) {
  try {
    const id = req.params.id;
    const result = await URL.findOneAndDelete({ _id: id });
    res.status("201").json({ msg: "delete Successful" });
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  handleGenerateNewShortUrl,
  handleGetAllData,
  handeldelete,
};
