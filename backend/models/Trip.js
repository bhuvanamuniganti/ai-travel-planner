const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    destination: String,
    days: Number,
    budget: String,
    interests: String,
    itinerary: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Trip", tripSchema);