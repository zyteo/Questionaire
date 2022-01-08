// =======================================
//              DATABASE
// =======================================
const Question = require("../models/questions");
const User = require("../models/users");

// Create all Questions CRUD operations
// status errors refer: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

// For creating question
const createQuestion = async (req, res) => {
  // if there is no req.body, return error
  if (!req.body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a question",
    });
  }

  try {
    // req.body exists, so make a new question
    const question = new Question(req.body);
    await question.save();

    // somehow, if the new question doesn't exist, return error
    if (!question) {
      return res.status(400).json({ success: false, error: err });
    }

    // success!
    res.status(201).json({
      success: true,
      id: question._id,
      message: "Question created!",
    });
  } catch (err) {
    res.status(400).json({
      err,
      message: "Question not created!",
    });
  }
};

// For updating question
const updateQuestion = async (req, res) => {
  // if there is no req.body, return error
  if (!req.body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  try {
    // req.body exists, so find the question by username and then update
    const question = await Question.findOne({
      username: req.params.username,
    });
    // update the question details
    question.fullname = req.body.fullname;
    question.color = req.body.color;
    question.language = req.body.language;
   
    // save the updated question
    await question.save();
    if (!question) {
      return res.status(404).json({
        err,
        message: "Question not found!",
      });
    }

    // now update question for the user too
    const user = await User.findOne({
      username: question.username,
    });
    // replace with the updated responses
    user.question.id(question._id).fullname = question.fullname;
    user.question.id(question._id).color = question.color;
    user.question.id(question._id).language = question.language;
    // save the user
    await user.save();


    res.status(200).json({
      success: true,
      id: question._id,
      message: "Question updated!",
    });
  } catch (err) {
    res.status(404).json({
      error,
      message: "Question not updated!",
    });
  }
};


// For showing a particular question
const getQuestionByUsername = async (req, res) => {
  try {
    // find the question by username
    const question = await Question.findOne({
      username: req.body.username,
    });
    if (!question) {
      return res.status(404).json({ success: false, error: `Question not found` });
    }
    // return json response if successful
    res.status(200).json({ success: true, data: question });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};


// export the modules - CRUD
// Read has 2 (for the index page--> showing all questions, and for the show page--> show particular question)
module.exports = {
  createQuestion,
  updateQuestion,
  getQuestionByUsername,
};