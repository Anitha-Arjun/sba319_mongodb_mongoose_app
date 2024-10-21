import e, { Router } from "express";
import Product from "../model/product.js";

const router = new Router();

/**
 * GET api/products/
 */
router.get("/", async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/products/:id
 */
router.get("/:id", async (req, res, next) => {
  try {
    const productById = await Product.findById(req.params.id);
    if (productById) {
      res.json(productById);
    } else {
      res.status(404).json(`${req.params.id} not found`);
    }
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/products/
 */
router.post("/", async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    console.log("new product is created");
    if (newProduct) {
      res.json(newProduct);
    } else {
      res.status(404).json({ message: "Error creating a new product" });
    }
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE /api/products/:id
 */
router.delete("/:id", async (req, res, next) => {
  try {
    const deleteById = await Product.findByIdAndDelete(req.params.id);
    if (deleteById) {
      res.json(deleteById);
    } else {
      res.json({ message: "Error in deleting the product by ID" });
    }
  } catch (error) {
    next(error);
  }
});

/**
 * PUT /api/products/:id
 */
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const updateById = await Product.findByIdAndUpdate(id, body);
    if (updateById) {
      res.json(updateById);
    } else {
      res.status(404).json(`Cannot update:${id} `);
    }
  } catch (error) {
    next(error);
    // console.log(error`missing ${id}  to update`);
  }
});

export default router;
