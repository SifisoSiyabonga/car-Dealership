import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Circles } from "react-loader-spinner"; // For the spinner

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImages, setCurrentImages] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data.data);
        // Delay hiding the loading spinner for 10 seconds
        setTimeout(() => setLoading(false), 100);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Error fetching products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleImageClick = (productId, image) => {
    setCurrentImages((prevImages) => ({
      ...prevImages,
      [productId]: image,
    }));
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Circles
          height="80"
          width="80"
          color="#4f46e5"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          visible={true}
        />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6 flex items-center justify-between px-4">
        <input
          type="text"
          placeholder="Search for cars..."
          className="w-1/3 px-4 py-2 border rounded-lg"
        />
        <select className="px-4 py-2 border rounded-lg">
          <option>Filter by Model</option>
          <option>Model A</option>
          <option>Model B</option>
          <option>Model C</option>
        </select>
        <select className="px-4 py-2 border rounded-lg">
          <option>Filter by Type</option>
          <option>SUV</option>
          <option>Sedan</option>
          <option>Truck</option>
        </select>
      </div>

      <h2 className="text-2xl font-semibold mb-6">Available Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.map((product) => {
          const currentImage = currentImages[product.product_id] || product.background_image;

          return (
            <div key={product.product_id} className="border rounded-lg shadow-lg p-4">
              <img
                src={currentImage}
                alt={product.name}
                className="w-full h-40 object-cover rounded-lg"
              />
              <div className="flex space-x-2 mt-4">
                {product.additional_images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`thumbnail-${index}`}
                    className="w-10 h-10 object-cover border rounded-lg cursor-pointer"
                    onClick={() => handleImageClick(product.product_id, image)}
                  />
                ))}
              </div>
              <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
              <p className="text-gray-700">Price: R{product.price}</p>
              <p className="text-sm text-gray-500">Mileage: {product.mileage} km</p>
              <p className="text-sm text-gray-500">Location: {product.location}</p>
              <Link
                to={`/product/${product._id}`}
                className="block mt-4 text-center bg-gray-300 text-white px-4 py-2 rounded hover:bg-gray-100 w-[180px]"
              >
                View Details
              </Link>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center mt-6">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`px-4 py-2 mx-1 rounded ${
              currentPage === number ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
