const mongoose = require("mongoose");

const FriendsSchema = mongoose.Schema({
  _id: {
    type: ObjectId,
  },
  name: {
    type: String,
  },
});

const Friends = (module.exports = mongoose.model("Friends", FriendsSchema));
