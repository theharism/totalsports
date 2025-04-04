const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
  {
    team_one: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: [true, "Team one is required"],
    },
    team_two: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: [true, "Team two is required"],
    },
    name: { type: String, required: [true, "Game name is required"] },
    slug: { type: String, required: [true, "Slug is required"],unique: true  },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
    important: { type: Boolean, default: false },
    link_highlight: { type: String, default: "" },
    date_range: { type: Boolean, default: false },
    starting_date: {
      type: Date,
      required: [true, "Starting date is required"],
    },
    starting_time: {
      type: String,
      required: [true, "Starting time is required"],
    },
    ending_date: {
      type: Date,
      required: function () {
        return this.date_range;
      },
      default: undefined,
    },
    ending_time: {
      type: String,
      required: function () {
        return this.date_range;
      },
      default: undefined,
    },
    status: {
      type: String,
      enum: ["Upcoming", "Live", "Finished"],
      default: "Upcoming",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Game", gameSchema);

