import User from "../models/User.js";
import Tour from "../models/Tour.js";
import Booking from "../models/Booking.js";

export async function getAllUsers(req, res) {
  try {
    const users = await User.find().sort({ id: 1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getStats(req, res) {
  try {
    const totalUsers = await User.countDocuments();
    const totalTours = await Tour.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const pendingBookings = await Booking.countDocuments({ status: "pending" });

    const confirmedBookings = await Booking.find({ status: "confirmed" });
    const revenue = confirmedBookings.reduce((sum, b) => sum + b.totalPrice, 0);

    res.json({
      totalTours,
      totalUsers,
      totalBookings,
      pendingBookings,
      revenue,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
