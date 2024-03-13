const mongoose = require("mongoose");

//schema
const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      require: true,
      unique: true,
    },
    redirectUrl: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      require: true,
    },
    NumOfvisit: [{ timestamp: { type: Number } }],
    createdby: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

//model
const URL = mongoose.model("url", urlSchema);

module.exports = URL;
