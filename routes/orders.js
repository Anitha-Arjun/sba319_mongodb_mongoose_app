import mongoose from "mongoose";
// import Order from "../model/order.js";
import { Router } from "express";
import Order from "../model/order.js";

const router = new Router();

/**
 * GET api/orders/
 */
router.get("/", async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

/**
 * GET /api/orders/:id
 */
router.get("/:id", async (req, res, next) => {
  try {
    const orderById = await Order.findById(req.params.id);

    if (orderById) {
      res.json(orderById);
    } else {
      res.status(404).json(`${req.params.id} is not found`);
    }
  } catch (error) {
    console.log(`Error invalid id: ${req.params.id}`);
  }
});

/**
 * POST api/orders/
 */

router.post("/", async (req, res) => {
  try {
    const newOrder = await Order.create(req.body);
    if (newOrder) {
      res.json(newOrder);
    } else {
      res.json("Cannot create a new order");
    }
  } catch (error) {
    console.error("error in creating new order");
  }
});

/**
 * DELETE /api/orders/:id
 */
router.delete("/:id", async (req, res) => {
  try {
    const deleteOrder = await Order.findByIdAndDelete(req.params.id);
    if (deleteOrder) {
      res.json({
        message: `Order deleted: ${req.params.id}`,
        deleteOrder,
      });
    } else {
      res.json(`Error deleting the order: ${req.params.id}`);
    }
  } catch (error) {
    console.error(`Invalid order id: ${req.params.id}`);
  }
});

/**
 * PUT /api/orders/:id
 */
router.put("/:id", async (req, res) => {
  try {
    const updateOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (updateOrder) {
      res.json({
        message: `Order updated: ${req.params.id}`,
        updateOrder,
      });
    } else {
      res.json(`Error updating the order: ${req.params.id}`);
    }
  } catch (error) {
    console.error(`Invalid order id: ${req.params.id}`);
  }
});

export default router;
