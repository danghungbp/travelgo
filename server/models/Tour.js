import mongoose from "mongoose";

const tourSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true, required: true },
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    destination: { type: String, required: true },
    region: { type: String, enum: ["domestic", "international"], required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: String, required: true },
    departure: [{ type: String }],
    maxPeople: { type: Number, default: 20 },
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    description: { type: String, default: "" },
    highlights: [{ type: String }],
    imageUrl: { type: String, default: "" },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

export default mongoose.model("Tour", tourSchema);
