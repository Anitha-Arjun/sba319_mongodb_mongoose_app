import express from "express";
import morgan from "morgan";
// import mongoose from "mongoose";
import dotenv from "dotenv";
import productsRouter from "./routes/products.js";
import ordersRouter from "./routes/orders.js";
import reviewsRouter from "./routes/reviews.js"
import mongoose, { mongo } from "mongoose";


dotenv.config();
const app = express();

const PORT = process.env.PORT || 4000;

//connect to mongodb
try {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log(`Connected to mongodb`);
} catch (error) {
  console.error(error);
}

//Middleware
app.use(morgan("dev")); //logger
app.use(express.json()); //parse data to the body
app.use(express.urlencoded({ extended: true }));

//Routes
app.get("/", (req, res) => {
  res.send("SBA319_Mongoose");
});

app.use("/api/products/", productsRouter);
app.use("/api/orders/", ordersRouter);
app.use("/api/reviews/", reviewsRouter);

//Error Middlewar
// app.use((e, req, res, next) => {
//   console.error(e);
//   res.status(501).json({ message: e.message, error: e });
// });

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT} `);
});
