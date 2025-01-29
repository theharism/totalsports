const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Team name is required"],
      trim: true,
    },
    logo: {
      type: String,
      required: [true, "Team logo is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Team slug is required"],
      trim: true,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Team", teamSchema);
