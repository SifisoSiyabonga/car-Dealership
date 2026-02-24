import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRouter from './routes/product.routes.js';
import {notFound , errorHandler} from "./middleware/errorMiddleware.js";
import userRouter from './routes/user.routes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

connectDB();

app.use("/api/products", productRouter);
app.use("/api/user", userRouter);

app.use(notFound);
app.use(errorHandler);

console.log("Product Routes:", productRouter.stack.map(r => r.route.path));
console.log("User Routes:", userRouter.stack.map(r => r.route.path));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
  console.log(`Products API available at http://localhost:${PORT}/api/products`);
  console.log(`User API available at http://localhost:${PORT}/api/user`);
});
