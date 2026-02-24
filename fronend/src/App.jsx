import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import CreateProductForm from "./pages/CreateProductForm.jsx";
import AllProducts from "./pages/AllProducts.jsx";
import AdminDashBoard from "./pages/AdminDashBoard.jsx";
import About from "./components/About.jsx";
import Footer from "./components/Footer.jsx";
import ViewProduct from "./components/ViewProduct.jsx"; 

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <NavBar />
            <AllProducts />
            <About />
            <Footer/>
          </>
        } />
        <Route path="/create-product" element={<CreateProductForm />} />
        <Route path="/admin-dashboard" element={<AdminDashBoard />} />

        <Route path="/product/:id" element={
          <>
            <NavBar />
            <ViewProduct />
            
            <Footer/>
          </>
        } />
        {/* <Route path="" element={<ViewProduct />} /> */}
      </Routes>
    </Router>
  );
}
