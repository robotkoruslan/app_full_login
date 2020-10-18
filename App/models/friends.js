const mongoose = require("mongoose");

const FriendsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String
});

const Friends = (module.exports = mongoose.model("Friends", FriendsSchema));
