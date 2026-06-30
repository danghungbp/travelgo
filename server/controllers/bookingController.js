import Booking from "../models/Booking.js";
import Tour from "../models/Tour.js";

async function getNextId() {
  const lastBooking = await Booking.findOne().sort({ id: -1 });
  return lastBooking ? lastBooking.id + 1 : 1;
}

export async function createBooking(req, res) {
  try {
    const { userId, tourId, departureDate, people, note } = req.body;
    const tour = await Tour.findOne({ id: Number(tourId) });
    if (!tour) return res.status(404).json({ message: "Không tìm thấy tour." });

    const id = await getNextId();
    const bookingCode = `TG${String(id).padStart(5, "0")}`;
    const booking = await Booking.create({
      id,
      userId: Number(userId),
      tourId: tour.id,
      tourTitle: tour.title,
      departureDate,
      people: Number(people),
      note: note || "",
      totalPrice: tour.price * Number(people),
      status: "pending",
      bookingCode,
    });
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getMyBookings(req, res) {
  try {
    const userId = Number(req.query.userId || req.headers["x-user-id"]);
    const bookings = await Booking.find({ userId }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getAllBookings(req, res) {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function updateBookingStatus(req, res) {
  try {
    const id = Number(req.params.id);
    const { status } = req.body;
    const booking = await Booking.findOneAndUpdate({ id }, { status }, { new: true });
    if (!booking) return res.status(404).json({ message: "Không tìm thấy đơn đặt tour." });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
