import express from "express";
import * as bookingController from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", bookingController.createBooking);
router.get("/me", bookingController.getMyBookings);
router.get("/", bookingController.getAllBookings);
router.put("/:id/status", bookingController.updateBookingStatus);

export default router;
