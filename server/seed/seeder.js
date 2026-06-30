import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectDB } from "../config/db.js";

import User from "../models/User.js";
import Tour from "../models/Tour.js";
import Booking from "../models/Booking.js";
import Review from "../models/Review.js";

import { tours as seedTours, reviews as seedReviews } from "../../src/data/mockData.js";

dotenv.config();

const seedUsers = [
  {
    id: 1,
    name: "Quản trị viên",
    email: "admin@travelgo.vn",
    password: "admin123",
    role: "admin",
    phone: "0900000000",
  },
  {
    id: 2,
    name: "Hồng Ngọc",
    email: "ngoc@gmail.com",
    password: "user123",
    role: "user",
    phone: "0912345678",
  },
  {
    id: 3,
    name: "Minh Tuấn",
    email: "tuan@gmail.com",
    password: "user123",
    role: "user",
    phone: "0987654321",
  },
  {
    id: 4,
    name: "Thu Trà",
    email: "tra@gmail.com",
    password: "user123",
    role: "user",
    phone: "0901112222",
  },
  {
    id: 5,
    name: "Hoàng Bách",
    email: "bach@gmail.com",
    password: "user123",
    role: "user",
    phone: "0903334444",
  },
];

const seedBookings = [
  {
    id: 1,
    userId: 2,
    tourId: 4,
    tourTitle: "Tokyo — Osaka 5 ngày 4 đêm",
    departureDate: "15/07/2026",
    people: 2,
    note: "Gia đình có trẻ nhỏ",
    totalPrice: 37980000,
    status: "confirmed",
    bookingCode: "TG00001",
    createdAt: new Date("2026-06-20T10:00:00Z"),
  },
  {
    id: 2,
    userId: 2,
    tourId: 1,
    tourTitle: "Phú Quốc — Đảo Ngọc 4 ngày 3 đêm",
    departureDate: "12/07/2026",
    people: 2,
    note: "",
    totalPrice: 9980000,
    status: "confirmed",
    bookingCode: "TG00002",
    createdAt: new Date("2026-06-25T14:00:00Z"),
  },
  {
    id: 3,
    userId: 2,
    tourId: 3,
    tourTitle: "Hội An — Phố cổ & Đèn lồng 2 ngày 1 đêm",
    departureDate: "08/07/2026",
    people: 1,
    note: "Khách ăn chay",
    totalPrice: 2190000,
    status: "confirmed",
    bookingCode: "TG00003",
    createdAt: new Date("2026-06-28T09:00:00Z"),
  },
];

async function seedData() {
  await connectDB();

  try {
    console.log("🧹 Đang làm sạch MongoDB...");
    await User.deleteMany({});
    await Tour.deleteMany({});
    await Booking.deleteMany({});
    await Review.deleteMany({});

    console.log("🌱 Đang nạp dữ liệu Users...");
    await User.insertMany(seedUsers);

    console.log("🌱 Đang nạp dữ liệu Tours...");
    await Tour.insertMany(seedTours);

    console.log("🌱 Đang nạp dữ liệu Bookings...");
    await Booking.insertMany(seedBookings);

    console.log("🌱 Đang nạp dữ liệu Reviews...");
    await Review.insertMany(seedReviews);

    console.log("✅ Nạp dữ liệu thành công 100%!");
    process.exit(0);
  } catch (error) {
    console.error(`❌ Lỗi nạp dữ liệu: ${error.message}`);
    process.exit(1);
  }
}

seedData();
