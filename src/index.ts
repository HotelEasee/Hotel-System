import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from "./config/database";
import authRoutes from './routes/authRoutes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Auth API running on port ${PORT}`);
});
