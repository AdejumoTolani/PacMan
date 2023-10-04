const mongoose = require("mongoose");

const leaderboardSchema = new mongoose.Schema({
  name: String,
  score: String,
}, {timestamps:true});

module.exports = mongoose.model("Leaderboard", leaderboardSchema);
