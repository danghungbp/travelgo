import mongoose from "mongoose";
import dotenv from "dotenv";
import Tour from "./models/Tour.js";
import Review from "./models/Review.js";

dotenv.config();

async function syncReviews() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Đã kết nối DB!");

    const tours = await Tour.find();
    for (let tour of tours) {
      const reviews = await Review.find({ tourId: tour.id });
      const count = reviews.length;
      
      let newRating = 5;
      if (count > 0) {
        newRating = reviews.reduce((sum, r) => sum + r.rating, 0) / count;
      }

      await Tour.updateOne(
        { _id: tour._id },
        { 
          $set: { 
            reviewCount: count,
            rating: Math.round(newRating * 10) / 10
          } 
        }
      );
      console.log(`Đã đồng bộ Tour ${tour.id}: ${count} đánh giá.`);
    }

    console.log("✅ Hoàn tất đồng bộ!");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

syncReviews();
