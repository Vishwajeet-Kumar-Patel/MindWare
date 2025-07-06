import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js';
import quizRoutes from './routes/quizRoutes.js';
import moodRoutes from './routes/moodRoutes.js';
import chatbotRoute from './routes/chatbotRoute.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/quiz', quizRoutes);
// ✅ Route mounting
app.use('/api/results', quizRoutes);  // <--- This is critical!
app.use('/api/mood', moodRoutes);
app.use('/api/chat', chatbotRoute);


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`✅ Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.log(err));
