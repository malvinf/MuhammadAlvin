const mongoose = require("mongoose");

var validateEmail = function (emailAddress) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(emailAddress);
};

const UserDataSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  accountNumber: {
    type: Number,
    required: true,
    validate(value) {
      if (value < 0) throw new Error("Negative Value.");
    },
  },
  emailAddress: {
    type: String,
    unique: true,
    required: true,
  },
  identityNumber: {
    type: Number,
    required: true,
    validate(value) {
      if (value < 0) throw new Error("Negative Value.");
    },
  },
});

const UserData = mongoose.model("UserData", UserDataSchema);

module.exports = UserData;
