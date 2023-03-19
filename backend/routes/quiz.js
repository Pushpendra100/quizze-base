const router = require("express").Router();
const {createQuiz1, addQuestions, addAns, getQuizDetails, getQuiz, getQuizzesInfo} = require("../controllers");
const {isAuthenticatedUser} = require("../middlewares/auth")


router.route("/create-quiz1").post(isAuthenticatedUser, createQuiz1);
router.route("/create-quiz2/:id").post(addQuestions);
router.route("/create-quiz3/:id").post(addAns);
router.route("/quiz-details/:id").get(getQuizDetails);
router.route("/:id").get(getQuiz);
router.route("/:id/quizzes-info/").get(getQuizzesInfo);



module.exports = router;