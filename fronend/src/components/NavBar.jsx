import { useState } from "react";
import menioc_logo from "./assets/menioc_logo.png";
import { FaRegCircleUser } from "react-icons/fa6";
import axios from 'axios'; 
import { useNavigate } from "react-router-dom";

const NavBar = () => {
    const navigate = useNavigate(); 
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [isRegisterMode, setIsRegisterMode] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "buyer",
        idNumber: "",
        mobileNumber: ""
    });
    const [errors, setErrors] = useState({});

    const handleLoginClick = () => {
        setShowLoginModal(true);
        setIsRegisterMode(false);
    };

    const handleCloseModal = () => {
        setShowLoginModal(false);
        setIsRegisterMode(false);
        setFormData({
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: "customer",
            idNumber: "",
            mobileNumber: ""
        });
        setErrors({});
    };

    const toggleRegisterMode = () => {
        setIsRegisterMode((prev) => !prev);
        setErrors({});
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.username.trim()) {
            newErrors.username = "Username is required";
        }
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        }
        if (!formData.password) {
            newErrors.password = "Password is required";
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }
        if (!formData.idNumber.trim()) {
            newErrors.idNumber = "ID number is required";
        } else if (formData.idNumber.length !== 13) {
            newErrors.idNumber = "ID number must be exactly 13 digits";
        }
        if (!formData.mobileNumber.trim()) {
            newErrors.mobileNumber = "Mobile number is required";
        } else if (!/^\d+$/.test(formData.mobileNumber)) {
            newErrors.mobileNumber = "Mobile number must contain only digits";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await axios.post('http://localhost:5000/api/user', formData);
                console.log(formData);
                console.log("Registration successful:", response.data);
                alert("Account Created!");
                handleCloseModal();
            } catch (error) {
                console.error("Error during registration:", error);
                alert(error.response?.data?.message || "Registration failed. Please try again.");
            }
        }
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        if (formData.username && formData.password) {
            try {
                const response = await axios.post('http://localhost:5000/api/user/auth', {
                    username: formData.username,
                    password: formData.password,
                });

                console.log("Login successful:", response.data);
               navigate('/admin-dashboard');
             handleCloseModal();
            } catch (error) {
                console.error("Error during login:", error.response?.data || error.message);
                alert(error.response?.data?.message || "Login failed. Please try again.");
            }
        } else {
            alert("Please fill in the credentials");
        }
    };
    
    return (
        <section
            className="relative h-[650px] bg-gray-600"
            style={{
                backgroundImage: 'url("https://www.bmw-m.com/content/dam/bmw/marketBMW_M/www_bmw-m_com/all-models/model-navigation/bmw-m8-competition-gran-coupe-flyout-2022.png")',
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <nav className="absolute top-0 left-0 w-full h-20 flex items-center bg-black opacity-60 justify-between px-4 py-2">
                <div className="flex items-center">
                    <a href="/"><img src={menioc_logo} alt="Menioc Logo" className="h-24 w-auto" /></a>
                </div>
                <ul className="flex space-x-8 text-white font-semibold">
                    <li><a href="#" className="hover:text-orange-600">Buy a Car</a></li>
                    <li><a href="#" className="hover:text-orange-600">About</a></li>
                    <li><a href="#" className="hover:text-orange-600">Contact Us</a></li>
                </ul>
                <div className="flex items-center text-white rounded-lg hover:bg-orange-500">
                    <FaRegCircleUser size={20} className="ml-2" />
                    <button onClick={handleLoginClick} className="px-4 py-2 font-semibold">Login</button>
                </div>
            </nav>
            <section className="absolute w-[600px] mt-32 ml-12">
                <div>
                    <h1 className="font-bold text-4xl text-white p-4">Affordable Cars, Unmatched Quality – Drive Away Today!</h1>
                </div>
                <div>
                    <button className="bg-orange-400 rounded-md text-black p-2 text-center ml-32">Join for Discount</button>
                </div>
            </section>
            {showLoginModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg w-96 p-6 relative">
                        <button onClick={handleCloseModal} className="absolute top-2 right-2 text-gray-600 text-xl font-bold">&times;</button>
                        <div className="flex justify-center mb-4">
                            <img src={menioc_logo} alt="Menioc Logo" className="h-16 w-auto" />
                        </div>
                        <h2 className="text-2xl font-bold text-center mb-4">
                            {isRegisterMode ? "Register" : "Login"}
                        </h2>

                        <form onSubmit={isRegisterMode ? handleRegisterSubmit : handleLoginSubmit}>
                            {isRegisterMode ? (
                                <>
                                    <input
                                        type="text"
                                        name="username"
                                        placeholder="Username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 mb-3 border rounded-md"
                                    />
                                    {errors.username && <p className="text-red-500 text-sm mb-2">{errors.username}</p>}
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 mb-3 border rounded-md"
                                    />
                                    {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email}</p>}
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 mb-3 border rounded-md"
                                    />
                                    {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password}</p>}
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Confirm Password"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 mb-3 border rounded-md"
                                    />
                                    {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}

                                    <select
                                        name="role"
                                        value={formData.role}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 mb-3 border rounded-md"
                                    >
                                        <option value="buyer">Buyer</option>
                                        <option value="admin">Admin</option>
                                    </select>

                                    <input
                                        type="text"
                                        name="idNumber"
                                        placeholder="ID Number"
                                        value={formData.idNumber}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 mb-3 border rounded-md"
                                    />
                                    {errors.idNumber && <p className="text-red-500">{errors.idNumber}</p>}

                                    <input
                                        type="text"
                                        name="mobileNumber"
                                        placeholder="Mobile Number"
                                        value={formData.mobileNumber}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 mb-3 border rounded-md"
                                    />
                                    {errors.mobileNumber && <p className="text-red-500">{errors.mobileNumber}</p>}

                                    <button type="submit" className="w-full bg-orange-500 text-white px-4 py-2 rounded-md font-semibold mb-3">
                                        Register
                                    </button>
                                    <p className="text-center text-sm">
                                        Already have an account?{" "}
                                        <span onClick={toggleRegisterMode} className="text-blue-500 cursor-pointer">Login</span>
                                    </p>
                                </>
                            ) : (
                                <>
                                    <input
                                        type="text"
                                        name="username"
                                        placeholder="Username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 mb-3 border rounded-md"
                                    />
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 mb-3 border rounded-md"
                                    />

                                    <button type="submit" className="w-full bg-orange-500 text-white px-4 py-2 rounded-md font-semibold mb-3">
                                        Login
                                    </button>
                                    <p className="text-center text-sm">
                                        Don't have an account?{" "}
                                        <span onClick={toggleRegisterMode} className="text-blue-500 cursor-pointer">Register</span>
                                    </p>
                                </>
                            )}
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
};

export default NavBar;
