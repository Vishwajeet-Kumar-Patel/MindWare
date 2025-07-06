import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import { addMood, getMoodHistory, editMoodEntry, deleteMoodEntry } from "../controllers/moodController.js";

const router = express.Router();

router.post("/add", authenticate, addMood);
router.get("/history", authenticate, getMoodHistory);
router.put("/edit/:id", authenticate, editMoodEntry);
router.delete("/delete/:id", authenticate, deleteMoodEntry);


export default router;
