const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  _authId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: [
      true,
      "a Company can't be created without an authentication handler",
    ],
    ref: "auth",
  },
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  one_line_pitch: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Company = mongoose.model("company", companySchema);

module.exports = Company;
