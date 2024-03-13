const http = require("http");
const express = require("express");
const { connectToMongoDB } = require("./connect");
const Urlrout = require("./routes/url");
const URL = require("./model/url");
const UserRouter = require("./routes/user");
require("dotenv").config();

const cors = require("cors");
const cookieparser = require("cookie-parser");
const app = express();

//port for seerver
const port = process.env.PORT;
connectToMongoDB(process.env.DATABASE)
  .then(() => {
    console.log("✅ DataBase Connected");
  })
  .catch((e) => {
    console.log(e);
  });
app.use(express.json());
app.use(cookieparser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    sameSite: "none",
  })
);

app.use("/", Urlrout);
app.use("/", UserRouter);

app.use("/:shortid", async (req, res) => {
  const shortId = req.params.shortid;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    { $push: { NumOfvisit: { timestamp: Date.now() } } }
  );
  if (entry) {
    res.redirect(entry.redirectUrl);
  } else {
    res.status(404).send("<h1>Not found</h1>");
  }
});

//qr.toFile("qr.png", "hello", function (err) {});

app.listen(port, () => {
  console.log(`✅ server run on: ${port}`);
});
const Myserever = http.createServer(app);
