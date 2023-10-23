const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  _authId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: [
      true,
      "a User can't be created without an authentication handler",
    ],
    ref: "auth",
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Sign JWT
userSchema.methods.getSignedJwtToken = function () {
  return jwt.sign(
    {
      user_id: this._id,
    },
    process.env.JWT_SECRET
  );
};

const User = mongoose.model("user", userSchema);

module.exports = User;
