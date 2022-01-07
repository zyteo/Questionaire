const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Question = require("./questions.js");

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    password: {
      type: String,
      required: true,
      min: [6, "Password cannot be too short. Minimum 6 characters."],
    },
    email: { type: String },
    question: [Question.schema],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;