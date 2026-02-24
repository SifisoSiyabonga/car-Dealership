import express from "express";
import Product from "../model/product.model.js";
const router = express.Router();
import mongoose from "mongoose";


import {  createProduct, getProduct ,updateProduct  , deleteProduct , getProductById} from "./controller/product.controller.js";
export default router;



router.post("/", createProduct);
router.get("/",getProduct);
router.patch("/update/:id", updateProduct);
router.get("/getproduct/:id", getProductById);
router.delete("/delete/:id", deleteProduct);

