// =======================================
//              DEPENDENCIES
// =======================================
const express = require("express");
const router = express.Router();
// get the CRUD operations
const QuestionCtrl = require("./question-ctrl");

// =======================================
//              GET ROUTES
// =======================================
// This is for show page, showing particular cat
// :id is the cat's id
router.get("/question/:username", QuestionCtrl.getQuestionByUsername);

// =======================================
//              POST ROUTES
// =======================================
// This is for new cat
router.post("/question", QuestionCtrl.createQuestion);

// =======================================
//              PUT ROUTES
// =======================================
// This is for updating cat
// :id is the cat's id
router.put("/question/:id", QuestionCtrl.updateQuestion);

module.exports = router;