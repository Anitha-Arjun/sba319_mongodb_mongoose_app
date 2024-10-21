import mongoose from "mongoose";
import { Router } from "express";
import Order from "../model/order.js";
import Item from "../model/item.js";

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

/**
 * POST /api/orders/:id/items
 */
router.post("/:id/items", async (req, res, next) => {
  try {
    // Find the order by ID
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res
        .status(404)
        .json({ message: `Order not found: ${req.params.id}` });
    }

    // Validate incoming item data
    // const { item_id, quantity, price } = req.body;
    // if (!item_id || quantity == null || price == null) {
    //   return res.status(400).json({ message: "Missing required item fields: item_id, quantity, price." });
    // }

    // Create a new item
    const item = await Item.create(req.body);

    // Add the item to the order's items array
    order.items.push(item);

    // Save the updated order
    await order.save();

    // Return the updated order along with the newly created item
    res.status(201).json({ order });
  } catch (error) {
    console.error("Error adding item to order:", error);
    next(error);
  }
});

export default router;
