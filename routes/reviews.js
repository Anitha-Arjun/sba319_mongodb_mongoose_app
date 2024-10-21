import mongoose from "mongoose";
import { Router } from "express";
import Review from "../model/review.js";

const router = new Router();

/**
 * GET api/reviews/
 */
router.get("/", async (req, res) => {
  const reviews = await Review.find();
  res.json(reviews);
});

/**
 * POST api/reviews/
 */

router.post("/", async (req, res, next) => {
  try {
    const newReview = await Review.create(req.body);
    if (newReview) {
      res.json(newReview);
    } else {
      res.json("Cannot create a new review");
    }
  } catch (error) {
    next(error);
    // console.error("error in creating new review");
  }
});

/**
 * GET /api/reviews/:id
 */
router.get("/:id", async (req, res, next) => {
  try {
    const reviewById = await Review.findById(req.params.id);

    if (reviewById) {
      res.json(reviewById);
    } else {
      res.status(404).json(`${req.params.id} is not found`);
    }
  } catch (error) {
    next(error);
    // console.log(`Error invalid id: ${req.params.id}`);
  }
});

/**
 * DELETE /api/reviews/:id
 */
router.delete("/:id", async (req, res, next) => {
  try {
    const reviewOrder = await Review.findByIdAndDelete(req.params.id);
    if (reviewOrder) {
      res.json({
        message: `Review deleted: ${req.params.id}`,
        reviewOrder,
      });
    } else {
      res.json(`Error deleting the review: ${req.params.id}`);
    }
  } catch (error) {
    next(error);
    // console.error(`Invalid : ${req.params.id} not Found`);
  }
});

/**
 * PUT /api/reviews/:id
 */
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const updateReview = await Review.findByIdAndUpdate(id, body, {
      new: true,
    });
    if (updateReview) {
      res.json({
        message: `Order updated: ${id}`,
        updateReview,
      });
    } else {
      res.json(`Error updating the order: ${id}`);
    }
  } catch (error) {
    next(error);
    // console.error(`Invalid order id: ${id}`);
  }
});

export default router;
