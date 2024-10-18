import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  review_id: {
    type: Number,
    required: true,
  },
  rating: {
    type: mongoose.Types.Decimal128,
  },
  comment: {
    type: String,
  },
  review_date: {
    type: Date,
    default: Date.now,
  },
});

const Review = new mongoose.model("Review", "reviewSchema");
export default Review;
