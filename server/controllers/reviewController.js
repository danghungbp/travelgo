import Review from "../models/Review.js";
import Tour from "../models/Tour.js";

async function getNextId() {
  const lastReview = await Review.findOne().sort({ id: -1 });
  return lastReview ? lastReview.id + 1 : 1;
}

export async function getReviews(req, res) {
  try {
    const tourId = Number(req.params.tourId);
    const reviews = await Review.find({ tourId }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function addReview(req, res) {
  try {
    const tourId = Number(req.params.tourId);
    const { userId, userName, rating, comment } = req.body;

    const id = await getNextId();
    const review = await Review.create({
      id,
      tourId,
      userId: Number(userId),
      userName,
      rating: Number(rating),
      comment,
    });

    // Cập nhật rating trung bình cho tour
    const reviews = await Review.find({ tourId });
    const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    await Tour.findOneAndUpdate(
      { id: tourId },
      {
        rating: Math.round(avg * 10) / 10,
        reviewCount: reviews.length,
      }
    );

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
