import React from "react";

const About = () => {
  return (
    <div
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
        height: "100vh",
      }}
      className="w-full"
    >
      {/* Logo Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
        className="flex-wrap"
      >
        <img
          src="https://www.nbi.org.za/wp-content/uploads/2020/08/web_photo_absa_logo-1024x585.jpg"
          alt="Absa Logo"
          className="w-20 md:w-28 lg:w-32 opacity-50 grayscale hover:opacity-80 hover:grayscale-0 transition"
        />
        <img
          src="https://techcentral.co.za/wp-content/uploads/2020/07/nedbank-2156-1120-2048x1064.jpg"
          alt="Nedbank Logo"
          className="w-20 md:w-28 lg:w-32 opacity-50 grayscale hover:opacity-80 hover:grayscale-0 transition"
        />
        <img
          src="https://th.bing.com/th/id/OIP.t--aWSHaEUGqAEE0-ERJbAAAAA?rs=1&pid=ImgDetMain"
          alt="World Bank Logo"
          className="w-20 md:w-22 lg:w-32 opacity-50 grayscale hover:opacity-80 hover:grayscale-0 transition"
        />
        <img
          src="https://th.bing.com/th/id/OIP.xJiy5IzfTU0tbWWeVJrfPgAAAA?rs=1&pid=ImgDetMain"
          alt="FNB Logo"
          className="w-20 md:w-28 lg:w-32 opacity-50 grayscale hover:opacity-80 hover:grayscale-0 transition"
        />
        <img
          src="https://foresthillcity.co.za/wp-content/uploads/2021/03/Capitec-Bank_Colour-700x700.jpg"
          alt="Capitec Logo"
          className="w-20 md:w-28 lg:w-32 opacity-50 grayscale hover:opacity-80 hover:grayscale-0 transition"
        />
      </div>

      {/* Text Section */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          color: "#fff",
          fontSize: "2rem",
          textAlign: "center",
          paddingTop: "60vh",
        }}
      >
        <h1 className="text-gray-500">Welcome to Our Company</h1>
        <p className="text-gray-400 font-small text-sm">
          We are committed to providing the best services.
        </p>
      </div>
    </div>
  );
};

export default About;
