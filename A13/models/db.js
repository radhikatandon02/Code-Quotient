const mongoose = require("mongoose");

module.exports.init = async function () {
  await mongoose.connect(
    "mongodb+srv://Radhika:<password>@cluster0.djneqog.mongodb.net/To-Do-List?retryWrites=true&w=majority"
    );
};