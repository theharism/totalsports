const express = require("express");
const router = express.Router();
const teamController = require("../controllers/team.controller");
const loggingMiddleware = require("../middlewares/loggingMiddleware");
const upload = require("../config/multer");

router.get("/", teamController.getAllTeams);
router.get("/:id", teamController.getTeamById);
router.post(
  "/",
  upload.single("logo"),
  loggingMiddleware,
  teamController.createTeam
);
router.put(
  "/:id",
  upload.single("logo"),
  loggingMiddleware,
  teamController.updateTeam
);
router.delete("/:id", teamController.deleteTeam);

module.exports = router;
