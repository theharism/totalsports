const mongoose = require("mongoose");

const streamSchema = new mongoose.Schema(
  {
    game: { type: String, required: [true, "Game is required"] },
    link: {
      type: String,
      required: [true, "Link is required"],
      validate: {
        validator: function (v) {
          return /^https?:\/\/.+/.test(v); // Simple URL validation
        },
        message: (props) => `${props.value} is not a valid URL!`,
      },
    },
    channel: { type: String, required: [true, "Channel is required"] },
    ads: {
      type: Number,
      required: [true, "Ads count is required"],
      min: [0, "Ads cannot be negative"],
    },
    language: { type: String, required: [true, "Language is required"] },
    quality: {
      type: String,
      enum: ["HD", "SD"],
      required: [true, "Quality is required"],
    },
    mobile: {
      type: String,
      enum: ["Yes", "No"],
      required: [true, "Mobile is required"],
    },
    nsfw: {
      type: String,
      enum: ["Yes", "No"],
      required: [true, "NSFW status is required"],
    },
    ad_block: {
      type: String,
      enum: ["Yes", "No"],
      required: [true, "Ad block status is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Stream", streamSchema);
