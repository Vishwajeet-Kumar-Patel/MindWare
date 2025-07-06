import mongoose from "mongoose";

const moodEntrySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    mood: { type: String, required: true }, // e.g. 😊, 😔
    note: { type: String }, // optional journal note
  },
  { timestamps: true }
);

export const MoodEntry = mongoose.model("MoodEntry", moodEntrySchema);
