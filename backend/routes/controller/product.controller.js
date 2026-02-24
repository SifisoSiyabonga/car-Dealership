import Product from "../../model/product.model.js";
import mongoose from "mongoose";


export const createProduct = async (req, res) => {
    const product = req.body;


    if (
        !product.name || 
        !product.product_id || 
        !product.price || 
        !product.background_image || 
        !product.additional_images || 
        !product.mileage || 
        !product.location || 
        !product.dealer_rating || 
        !product.typeor_model ||
        !product.drive_type || 
        !product.transmission || 
        !product.fuel_type || 
        !product.consumption || 
        !product.engine_capacity || 
        !product.financing || 
        !product.dealer
    ) {
        return res.status(400).json({ success: false, message: "Please provide all required fields" });
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error("Error creating product: ", error.message);
        res.status(500).json({ success: false, message: "Error creating product" });
    }
};

export const getProduct = async (req, res) => {
    try {
       
        const products = await Product.find();
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error("Error fetching products: ", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};


export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const updatedProduct = req.body;

    console.log(id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid product ID" });
    }

    try {
        const product = await Product.findByIdAndUpdate(id, updatedProduct, { new: true });

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, data: product });
    } catch (error) {
        console.error("Error updating product: ", error.message);
        res.status(500).json({ success: false, message: "Error updating product" });
    }
};


export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid product ID" });
    }

    try {
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product: ", error.message);
        res.status(500).json({ success: false, message: "Error deleting product" });
    }
};

export const getProductById = async (req, res) => {
    const { id } = req.params;

    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid product ID" });
    }

    try {
     
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

   
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        console.error("Error fetching product by ID: ", error.message);
        res.status(500).json({ success: false, message: "Error fetching product" });
    }
};
