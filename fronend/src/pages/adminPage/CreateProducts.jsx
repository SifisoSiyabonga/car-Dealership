import React, { useState } from "react";
import axios from "axios";

const CreateProducts = () => {
 
  const [step, setStep] = useState(1); 
  const [name, setName] = useState("");
  const [product_id, setProductId] = useState("");
  const [price, setPrice] = useState("");
  const [background_image, setBackgroundImage] = useState("");
  const [additional_images, setAdditionalImages] = useState(["", "", ""]);
  const [mileage, setMileage] = useState("");
  const [location, setLocation] = useState("");
  const [dealer_rating, setDealerRating] = useState(1);
  const [typeor_model, setTypeOrModel] = useState("");
  const [drive_type, setDriveType] = useState("");
  const [transmission, setTransmission] = useState("");
  const [fuel_type, setFuelType] = useState("");
  const [consumption, setConsumption] = useState("");
  const [engine_capacity, setEngineCapacity] = useState("");
  const [financing, setFinancing] = useState({ price_including_vat: "", monthly_payment: "" });
  const [dealer, setDealer] = useState({ name: "", contact_number: "", location: "" });

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      name,
      product_id,
      price: parseFloat(price),
      background_image,
      additional_images,
      mileage: parseFloat(mileage),
      location,
      dealer_rating,
      typeor_model,
      drive_type,
      transmission,
      fuel_type,
      consumption: parseFloat(consumption),
      engine_capacity: parseFloat(engine_capacity),
      financing: {
        price_including_vat: parseFloat(financing.price_including_vat),
        monthly_payment: parseFloat(financing.monthly_payment),
      },
      dealer,
    };

    try {
      
      const response = await axios.post("http://localhost:5000/api/products", productData);
      if (response.status === 201) {
        alert("Product created successfully!");
        
        setName("");
        setProductId("");
        setPrice("");
        setBackgroundImage("");
        setAdditionalImages(["", "", ""]);
        setMileage("");
        setLocation("");
        setDealerRating(1);
        setTypeOrModel("");
        setDriveType("");
        setTransmission("");
        setFuelType("");
        setConsumption("");
        setEngineCapacity("");
        setFinancing({ price_including_vat: "", monthly_payment: "" });
        setDealer({ name: "", contact_number: "", location: "" });
        setStep(1); 
      }
    } catch (error) {
      console.error("Error creating product:", error);
      alert(error.response?.data?.message || "Failed to create product. Please try again.");
    }
  };

  const RequiredLabel = ({ children }) => (
    <label className="block text-white p-1">
      {children} <span className="text-red-500">*</span>
    </label>
  );

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-2">Create a New Product</h2>
      <p className="text-gray-400 text-sm mb-4"><span className="text-red-500">*</span> All fields are required</p>
      <div className="flex items-center mb-6 gap-2">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= s ? "bg-white text-black" : "bg-gray-600 text-gray-400"}`}>{s}</div>
            {s < 4 && <div className={`w-12 h-0.5 ${step > s ? "bg-white" : "bg-gray-600"}`} />}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
       
        {step === 1 && (
          <div className=" bg-black p-8 rounded-xl opacity-80">
            <h3 className="text-white font-semibold mb-4">Step 1: Basic Info</h3>
            <div>
              <RequiredLabel>Product Name</RequiredLabel>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>

            <div>
              <RequiredLabel>Product ID</RequiredLabel>
              <input
                type="text"
                value={product_id}
                onChange={(e) => setProductId(e.target.value)}
                required
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>

            <div>
              <RequiredLabel>Price (R)</RequiredLabel>
              <input
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>

            <button
              type="button"
              onClick={handleNextStep}
              className="bg-white text-black py-2 px-4 rounded-md mt-4"
            >
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div className=" bg-black p-8 rounded-xl opacity-80">
            <h3 className="text-white font-semibold mb-4">Step 2: Images & Location</h3>
            <div>
              <RequiredLabel>Background Image URL</RequiredLabel>
              <input
                type="url"
                value={background_image}
                onChange={(e) => setBackgroundImage(e.target.value)}
                required
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>

            <div>
              <RequiredLabel>Additional Images (at least 3 URLs)</RequiredLabel>
              {additional_images.map((image, index) => (
                <input
                  key={index}
                  type="url"
                  value={image}
                  onChange={(e) => {
                    const updatedImages = [...additional_images];
                    updatedImages[index] = e.target.value;
                    setAdditionalImages(updatedImages);
                  }}
                  required
                  className="border border-gray-300 rounded-md p-2 w-full my-2"
                />
              ))}
            </div>

            <div>
              <RequiredLabel>Mileage</RequiredLabel>
              <input
                type="number"
                value={mileage}
                onChange={(e) => setMileage(e.target.value)}
                required
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>

            <div>
              <RequiredLabel>Location</RequiredLabel>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>

            <button
              type="button"
              onClick={handlePreviousStep}
              className="bg-gray-500 text-white py-2 px-4 rounded-md mt-4 mr-2"
            >
              Back
            </button>

            <button
              type="button"
              onClick={handleNextStep}
              className="bg-white text-black py-2 px-4 rounded-md mt-4"
            >
              Next
            </button>
          </div>
        )}

        {step === 3 && (
          <div className=" bg-black p-8 rounded-xl opacity-80">
            <h3 className="text-white font-semibold mb-4">Step 3: Vehicle Specs</h3>
            <div>
              <RequiredLabel>Type or Model</RequiredLabel>
              <input
                type="text"
                value={typeor_model}
                onChange={(e) => setTypeOrModel(e.target.value)}
                required
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>

            <div>
              <RequiredLabel>Drive Type</RequiredLabel>
              <input
                type="text"
                value={drive_type}
                onChange={(e) => setDriveType(e.target.value)}
                required
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>

            <div>
              <RequiredLabel>Transmission</RequiredLabel>
              <input
                type="text"
                value={transmission}
                onChange={(e) => setTransmission(e.target.value)}
                required
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>

            <div>
              <RequiredLabel>Fuel Type</RequiredLabel>
              <input
                type="text"
                value={fuel_type}
                onChange={(e) => setFuelType(e.target.value)}
                required
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>

            <div>
              <RequiredLabel>Fuel Consumption (L/100km)</RequiredLabel>
              <input
                type="number"
                value={consumption}
                onChange={(e) => setConsumption(e.target.value)}
                required
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>

            <div>
              <RequiredLabel>Engine Capacity</RequiredLabel>
              <input
                type="number"
                value={engine_capacity}
                onChange={(e) => setEngineCapacity(e.target.value)}
                required
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>

            <button
              type="button"
              onClick={handlePreviousStep}
              className="bg-gray-500 text-white py-2 px-4 rounded-md mt-4 mr-2"
            >
              Back
            </button>

            <button
              type="button"
              onClick={handleNextStep}
              className="bg-white text-black py-2 px-4 rounded-md mt-4"
            >
              Next
            </button>
          </div>
        )}
        {step === 4 && (
          <div className=" bg-black p-8 rounded-xl opacity-80">
            <h3 className="text-white font-semibold mb-4">Step 4: Financing & Dealer</h3>
            <div>
              <RequiredLabel>Financing Price (Including VAT)</RequiredLabel>
              <input
                type="number"
                value={financing.price_including_vat}
                onChange={(e) => setFinancing({ ...financing, price_including_vat: e.target.value })}
                required
                className="border border-gray-300 rounded-md p-2 w-full rounded-xl"
              />
            </div>

            <div>
              <RequiredLabel>Monthly Payment</RequiredLabel>
              <input
                type="number"
                value={financing.monthly_payment}
                onChange={(e) => setFinancing({ ...financing, monthly_payment: e.target.value })}
                required
                className="border border-gray-300 rounded-md p-2 w-full rounded-xl"
              />
            </div>

            <div>
              <RequiredLabel>Dealer Name</RequiredLabel>
              <input
                type="text"
                value={dealer.name}
                onChange={(e) => setDealer({ ...dealer, name: e.target.value })}
                required
                className="border border-gray-300 rounded-md p-2 w-full rounded-xl"
              />
            </div>

            <div>
              <RequiredLabel>Dealer Contact Number</RequiredLabel>
              <input
                type="text"
                value={dealer.contact_number}
                onChange={(e) => setDealer({ ...dealer, contact_number: e.target.value })}
                required
                className="border border-gray-300 rounded-md p-2 w-full rounded-xl"
              />
            </div>

            <div>
              <RequiredLabel>Dealer Location</RequiredLabel>
              <input
                type="text"
                value={dealer.location}
                onChange={(e) => setDealer({ ...dealer, location: e.target.value })}
                required
                className="border border-gray-300 rounded-md p-2 w-full rounded-xl"
              />
            </div>

            <button
              type="button"
              onClick={handlePreviousStep}
              className="bg-red-600 text-white py-2 px-4 rounded-md mt-4 mr-2"
            >
              Back
            </button>

            <button
              type="submit"
              className="bg-green-600 text-white py-2 px-4 rounded-md mt-4"
            >
              Submit Product
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateProducts;
