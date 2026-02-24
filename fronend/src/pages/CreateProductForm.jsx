import React, { useState } from "react";
import axios from "axios";

const CreateProductForm = () => {
 s
  const [product, setProduct] = useState({
    name: "",
    product_id: "",
    price: "",
    background_image: "",
    additional_images: [],
    mileage: "",
    location: "",
    dealer_rating: "",
    type_or_model: "",
    drive_type: "",
    transmission: "",
    fuel_type: "",
    consumption: "",
    engine_capacity: "",
    financing: {
      price_including_vat: "",
      monthly_payment: "",
    },
    dealer: {
      name: "",
      contact_number: "",
      location: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/products",
        product
      );
      console.log("Product created successfully:", response.data);
      alert("Product created successfully!");
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Error creating product");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
      <h2 className="text-2xl mb-4">Create Product</h2>

      <div className="mb-4">
        <label htmlFor="name" className="block mb-1">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={product.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="product_id" className="block mb-1">
          Product ID
        </label>
        <input
          type="text"
          id="product_id"
          name="product_id"
          value={product.product_id}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="price" className="block mb-1">
          Price
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={product.price}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="background_image" className="block mb-1">
          Background Image URL
        </label>
        <input
          type="url"
          id="background_image"
          name="background_image"
          value={product.background_image}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="additional_images" className="block mb-1">
          Additional Images (Comma separated URLs)
        </label>
        <input
          type="text"
          id="additional_images"
          name="additional_images"
          value={product.additional_images.join(", ")}
          onChange={(e) => setProduct({
            ...product,
            additional_images: e.target.value.split(", ")
          })}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="mileage" className="block mb-1">
          Mileage (in km)
        </label>
        <input
          type="number"
          id="mileage"
          name="mileage"
          value={product.mileage}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="location" className="block mb-1">
          Location
        </label>
        <input
          type="text"
          id="location"
          name="location"
          value={product.location}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="dealer_rating" className="block mb-1">
          Dealer Rating
        </label>
        <input
          type="number"
          id="dealer_rating"
          name="dealer_rating"
          value={product.dealer_rating}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
          min="1"
          max="5"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="dealer_name" className="block mb-1">
          Dealer Name
        </label>
        <input
          type="text"
          id="dealer_name"
          name="dealer_name"
          value={product.dealer.name}
          onChange={(e) => setProduct({
            ...product,
            dealer: { ...product.dealer, name: e.target.value }
          })}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="dealer_contact_number" className="block mb-1">
          Dealer Contact Number
        </label>
        <input
          type="tel"
          id="dealer_contact_number"
          name="dealer_contact_number"
          value={product.dealer.contact_number}
          onChange={(e) => setProduct({
            ...product,
            dealer: { ...product.dealer, contact_number: e.target.value }
          })}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="dealer_location" className="block mb-1">
          Dealer Location
        </label>
        <input
          type="text"
          id="dealer_location"
          name="dealer_location"
          value={product.dealer.location}
          onChange={(e) => setProduct({
            ...product,
            dealer: { ...product.dealer, location: e.target.value }
          })}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Submit Product
      </button>
    </form>
  );
};

export default CreateProductForm;
