const express = require("express");
const router = express.Router();
const teamController = require("../controllers/team.controller");
const multer = require("multer");
const loggingMiddleware = require("../middlewares/loggingMiddleware");

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory where files will be saved
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName); // Use a unique name to avoid conflicts
    },
});

// Multer middleware
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error('Only jpeg, png, and webp files are allowed'), false);
        }
        cb(null, true);
    },
})

// const storage = multer.diskStorage({
//   filename: (req, file, cb) => {
//     console.log(req.body);
//     // Set the filename to a unique name (e.g., user ID + original filename)
//     cb(null, `${req.body.name}`);
//   },
// });

// const upload = multer({ storage });

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
