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
// This is for show page, showing particular questionaire
router.get("/question/:username", QuestionCtrl.getQuestionByUsername);

// =======================================
//              POST ROUTES
// =======================================
// This is for new questionaire
router.post("/question", QuestionCtrl.createQuestion);

// =======================================
//              PUT ROUTES
// =======================================
// This is for updating questionaire
router.put("/question/:username", QuestionCtrl.updateQuestion);

module.exports = router;