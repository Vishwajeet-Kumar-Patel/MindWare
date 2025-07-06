import { MoodEntry } from "../models/MoodEntry.js";

export const addMood = async (req, res) => {
  try {
    const { mood, note } = req.body;
    const entry = new MoodEntry({ user: req.user._id, mood, note });
    await entry.save();
    res.status(201).json({ message: "Mood saved", entry });
  } catch (err) {
    res.status(500).json({ error: "Failed to save mood" });
  }
};

export const getMoodHistory = async (req, res) => {
  try {
    const moods = await MoodEntry.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(moods);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch mood history" });
  }
};

//Edit MoodEntry
export const editMoodEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const { mood, note } = req.body;

    const entry = await MoodEntry.findByIdAndUpdate(id, { mood, note }, { new: true });
    if (!entry) return res.status(404).json({ error: "Mood entry not found" });

    res.status(200).json({ message: "Mood updated", entry });
  } catch (err) {
    res.status(500).json({ error: "Failed to update mood" });
  }
};

//Delete MoodEntry
export const deleteMoodEntry = async (req, res) => {
  try {
    const { id } = req.params;

    const entry = await MoodEntry.findByIdAndDelete(id);
    if (!entry) return res.status(404).json({ error: "Mood entry not found" });

    res.status(200).json({ message: "Mood deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete mood" });
  }
};