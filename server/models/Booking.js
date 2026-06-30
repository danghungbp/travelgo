import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true, required: true },
    userId: { type: Number, required: true },
    tourId: { type: Number, required: true },
    tourTitle: { type: String, required: true },
    departureDate: { type: String, required: true },
    people: { type: Number, required: true },
    note: { type: String, default: "" },
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    bookingCode: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

export default mongoose.model("Booking", bookingSchema);
