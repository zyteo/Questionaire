const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema(
  {
    username: { type: String, required: true },
    color: { type: String },
    code: { type: String, required: true },
    language: { type: String, required: true },
    resume: { type: String, required: true },
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;