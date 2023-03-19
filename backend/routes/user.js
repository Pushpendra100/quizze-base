const router = require("express").Router();
const {registerUser,logoutUser, loginUser, getUserDetails, getUsers, deleteHalfQuizes, userQuizSubmit } = require("../controllers");
const {isAuthenticatedUser} = require("../middlewares/auth")

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/me").get(isAuthenticatedUser, getUserDetails)
router.route("/users/username").get(getUsers);
router.route("/:id/half-quizes/").delete(deleteHalfQuizes);
router.route("/quiz-submit/:quizId").post(userQuizSubmit);

module.exports = router;