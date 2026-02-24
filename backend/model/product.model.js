import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    product_id: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    background_image: {
      type: String,
      required: true,
    },
    additional_images: {
      type: [String],
      validate: {
        validator: (arr) => arr.length > 2,
        message: "There should be exactly three or more additional images",
      },
      required: true,
      validate: {
        validator: (arr) => arr.every(img => /^(http|https):\/\/[^ "]+$/.test(img)),
        message: "Each additional image must be a valid URL",
      },
    },
    mileage: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    dealer_rating: {
      type: Number,
      required: true,
      min: 1, 
      max: 5,
    },
    typeor_model: {
      type: String, 
      required: true,
    },
    drive_type: {
      type: String, 
      required: true,
    },
    transmission: {
      type: String, 
      required: true,
    },
    fuel_type: {
      type: String,
      required: true,
    },
    consumption: {
      type: Number,
      required: true,
    },
    engine_capacity: {
      type: Number, 
      required: true,
    },
    financing: {
      price_including_vat: {
        type: Number,
        required: true,
      },
      monthly_payment: {
        type: Number,
        required: true,
      },
    },
    dealer: {
      name: {
        type: String,
        required: true,
      },
      contact_number: {
        type: String,
        required: true,
      },
      location: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true, 
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
