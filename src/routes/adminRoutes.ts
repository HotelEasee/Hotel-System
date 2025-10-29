import express from "express";
import { getAllHotels, getAllBookings, deleteHotel } from "../controllers/adminController";
import { verifyAdmin } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/hotels", verifyAdmin, getAllHotels);
router.get("/bookings", verifyAdmin, getAllBookings);
router.delete("/hotels/:id", verifyAdmin, deleteHotel);

export default router;
