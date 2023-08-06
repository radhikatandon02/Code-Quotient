const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  id: String,
  userInput: String,
  completeTask: Boolean,
  profilePic: String,
  profilePath:String,   
});

const List = mongoose.model("List", dataSchema);

module.exports = List;