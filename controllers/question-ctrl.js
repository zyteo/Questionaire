// =======================================
//              DATABASE
// =======================================
const Question = require("../models/questions");
const Comment = require("../models/comments");

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
    // if question image url is empty, fill in with default question image
    if (question.image === "") {
      question.image =
        "https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=49ed3252c0b2ffb49cf8b508892e452d";
    }
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
    // req.body exists, so find the question by id and then update
    const question = await Question.findById(req.params.id);
    // update the question details
    question.name = req.body.name;
    question.description = req.body.description;
    question.image = req.body.image;
    question.gender = req.body.gender;
    question.adoptable = req.body.adoptable;
    question.cage = req.body.cage;
    // if question image url is empty, fill in with default question image
    if (question.image === "") {
      question.image =
        "https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=49ed3252c0b2ffb49cf8b508892e452d";
    }
    // save the updated question
    await question.save();
    if (!question) {
      return res.status(404).json({
        err,
        message: "Question not found!",
      });
    }

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
document.getElementsByClassName("example");
// For deleting question
// When deleting question, all the corrresponding comments are deleted too
const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    // remove comments associated with the question
    Comment.remove({ question_id: { $in: req.params.id } }, (err, data) => {
      console.log(data);
    });
    // remove the question
    await question.remove();
    // if the question doesnt exist, throw error
    if (!question) {
      return res.status(404).json({ success: false, error: `Question not found` });
    }
    res.status(200).json({ success: true, data: question });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};

// For showing a particular question
const getQuestionById = async (req, res) => {
  try {
    // find the question by id
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ success: false, error: `Question not found` });
    }
    // return json response if successful
    res.status(200).json({ success: true, data: question });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};

// For showing all questions - this is the question index page
const getQuestions = async (req, res) => {
  try {
    // find all questions
    const questions = await Question.find();
    if (!questions) {
      return res.status(404).json({ success: false, error: `Questions not found` });
    }
    // return json response if successful
    res.status(200).json({ success: true, data: questions });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};

// export the modules - CRUD
// Read has 2 (for the index page--> showing all questions, and for the show page--> show particular question)
module.exports = {
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getQuestions,
  getQuestionById,
};
