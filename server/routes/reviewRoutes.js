import express from "express";
import * as reviewController from "../controllers/reviewController.js";

const router = express.Router({ mergeParams: true });

router.get("/", reviewController.getReviews);
router.post("/", reviewController.addReview);

export default router;
