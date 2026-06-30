import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true, required: true },
    tourId: { type: Number, required: true },
    userId: { type: Number, required: true },
    userName: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
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

export default mongoose.model("Review", reviewSchema);
