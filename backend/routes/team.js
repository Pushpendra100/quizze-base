const router = require("express").Router();
const {createTeam, getTeam, getUserTeams, getAllTeams, getAllTeamsInfo } = require("../controllers");

router.route("/create-team/:userId").post(createTeam);
router.route("/all").get(getAllTeamsInfo);
router.route("/:teamId").get(getTeam);
router.route("/all-teams/teamNames").get(getAllTeams);
router.route("/teams/:userId").get(getUserTeams);
    
module.exports = router;