import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaPhoneAlt, FaLocationArrow, FaStar } from "react-icons/fa";

const ViewProduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchedProduct = {
      name: "2003 Toyota Tazz 130",
      product_id: "Toyota Tazz 1",
      price: 95000,
      background_image: "https://img.autotrader.co.za/27991648/Crop800x600",
      additional_images: [
        "https://img.autotrader.co.za/27991646/Crop800x600",
        "https://img.autotrader.co.za/27991638/Crop800x600",
        "https://img.autotrader.co.za/27991645/Crop800x600",
      ],
      mileage: 1200000,
      location: "Cape Town, South Africa",
      dealer_rating: 4.7,
      type_or_model: "Coupe",
      drive_type: "Rear-wheel drive",
      transmission: "Manual",
      fuel_type: "Petrol",
      consumption: 10.0,
      engine_capacity: 3.0,
      financing: {
        price_including_vat: 100000,
        monthly_payment: 12000,
      },
      dealer: {
        name: "truck",
        contact_number: "+27 123 987 654",
        location: "Cape Town, South Africa",
      },
    };

    setProduct(fetchedProduct);
  }, [productId]);

  const [mainImage, setMainImage] = useState(product?.background_image);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="flex p-8 space-x-8">
      <div className="flex flex-col w-2/3">
      <div
          className="relative bg-cover bg-center h-96 rounded-lg"
          style={{ backgroundImage: `url(${mainImage})` }}
        >
          <div className="absolute top-0 left-0 p-4 text-white bg-opacity-50 w-full h-full flex justify-center items-center flex-col">
            <h2 className="text-3xl font-bold">{product.name}</h2>
            <p className="text-xl mt-2">${product.price.toLocaleString()}</p>
            <div className="flex space-x-4 mt-4">
              <div className="flex items-center">
                <FaStar className="text-yellow-400" />
                <span className="ml-2">{product.dealer_rating}</span>
              </div>
              <div className="flex items-center">
                <FaLocationArrow className="text-white" />
                <span className="ml-2">{product.location}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex space-x-4 mt-4">
          {product.additional_images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Product image ${index + 1}`}
              className="w-32 h-32 object-cover rounded-lg cursor-pointer hover:opacity-80"
              onClick={() => setMainImage(image)} 
            />
          ))}
        </div>
        <div className="mt-6">
          <h3 className="text-2xl font-semibold">Specifications</h3>
          <ul className="mt-2">
            <li><strong>Type/Model:</strong> {product.type_or_model}</li>
            <li><strong>Drive Type:</strong> {product.drive_type}</li>
            <li><strong>Transmission:</strong> {product.transmission}</li>
            <li><strong>Fuel Type:</strong> {product.fuel_type}</li>
            <li><strong>Engine Capacity:</strong> {product.engine_capacity}L</li>
            <li><strong>Mileage:</strong> {product.mileage.toLocaleString()} km</li>
            <li><strong>Fuel Consumption:</strong> {product.consumption} L/100 km</li>
          </ul>
        </div>
      </div>
      <div className="w-1/3 bg-gray-100 p-6 rounded-lg">
        <h3 className="text-2xl font-semibold mb-4">Dealer Information</h3>
        <div className="mb-4">
          <p><strong>Dealer Name:</strong> {product.dealer.name}</p>
          <div className="flex items-center mt-2">
            <FaPhoneAlt className="text-blue-500" />
            <span className="ml-2">{product.dealer.contact_number}</span>
          </div>
          <div className="flex items-center mt-2">
            <FaLocationArrow className="text-blue-500" />
            <span className="ml-2">{product.dealer.location}</span>
          </div>
        </div>
        <form className="mt-6 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold">Your Name</label>
            <input
              type="text"
              id="name"
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold">Your Email</label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-semibold">Your Message</label>
            <textarea
              id="message"
              rows="4"
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Contact Dealer
          </button>
        </form>
      </div>
    </div>
  );
};

export default ViewProduct;
