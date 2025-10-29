import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import adminRoutes from "./routes/adminRoutes";
import { connectDB } from "./config/db";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Admin API running on port ${PORT}`);
});
