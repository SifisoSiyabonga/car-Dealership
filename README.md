# Menioc Car Dealership

A full-stack car dealership web application built with **React** (Vite) on the frontend and **Express + MongoDB** on the backend. Users can browse available cars, view detailed specifications, register/login, and admins can manage inventory through a dedicated dashboard.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Project Structure](#project-structure)
3. [Getting Started](#getting-started)
   - [1. Clone the Repository](#1-clone-the-repository)
   - [2. Set Up Environment Variables](#2-set-up-environment-variables)
   - [3. Install Dependencies](#3-install-dependencies)
   - [4. Start the Backend Server](#4-start-the-backend-server)
   - [5. Start the Frontend Dev Server](#5-start-the-frontend-dev-server)
4. [Using the Application](#using-the-application)
   - [Home Page](#home-page)
   - [Browsing Cars](#browsing-cars)
   - [Viewing Car Details](#viewing-car-details)
   - [Registering an Account](#registering-an-account)
   - [Logging In](#logging-in)
   - [Admin Dashboard](#admin-dashboard)
5. [API Endpoints](#api-endpoints)
6. [Tech Stack](#tech-stack)

---

## Prerequisites

Make sure you have the following installed on your machine before starting:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB Atlas account** (or a local MongoDB instance) - The app uses a MongoDB connection string

---

## Project Structure

```
carDealership/
├── backend/
│   ├── config/
│   │   └── db.js                  # MongoDB connection setup
│   ├── middleware/
│   │   └── errorMiddleware.js     # Error handling middleware
│   ├── model/
│   │   ├── product.model.js       # Car/Product schema
│   │   └── user.model.js          # User schema (with bcrypt hashing)
│   ├── routes/
│   │   ├── controller/
│   │   │   ├── product.controller.js
│   │   │   └── user.controller.js
│   │   ├── product.routes.js      # Product API routes
│   │   └── user.routes.js         # User API routes
│   ├── utils/
│   │   └── generateToken.js       # JWT token generation
│   └── server.js                  # Express app entry point
├── fronend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── About.jsx          # About section with partner logos
│   │   │   ├── Footer.jsx         # Site footer
│   │   │   ├── NavBar.jsx         # Navigation bar with Login/Register modal
│   │   │   └── ViewProduct.jsx    # Single product detail view
│   │   ├── pages/
│   │   │   ├── adminPage/
│   │   │   │   ├── CreateProducts.jsx
│   │   │   │   ├── Dealers.jsx
│   │   │   │   ├── GetAllProducts.jsx
│   │   │   │   ├── Sales.jsx
│   │   │   │   └── UpdateProduct.jsx
│   │   │   ├── AdminDashBoard.jsx # Admin panel with sidebar navigation
│   │   │   ├── AllProducts.jsx    # Product listing with pagination
│   │   │   └── CreateProductForm.jsx
│   │   ├── App.jsx                # Main router configuration
│   │   ├── main.jsx               # React entry point
│   │   └── index.css              # Global styles (Tailwind)
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── .env                           # Environment variables (do NOT commit)
├── package.json                   # Backend dependencies & scripts
└── README.md
```

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/carDealership.git
cd carDealership
```

### 2. Set Up Environment Variables

Create a `.env` file in the **root** of the project with the following variables:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

Replace `your_mongodb_connection_string` with your MongoDB Atlas connection string (or local MongoDB URI) and `your_jwt_secret_key` with any secure secret string.

### 3. Install Dependencies

You need to install dependencies for **both** the backend and the frontend.

**Backend** (from the project root):

```bash
npm install
```

**Frontend** (from the `fronend` folder):

```bash
cd fronend
npm install
cd ..
```

### 4. Start the Backend Server

From the **project root**, run one of the following:

```bash
# Production mode
npm start

# Development mode (auto-restarts on file changes)
npm run dev
```

The backend server will start on **http://localhost:5000**. You should see:

```
MongoDB connected: ...
Server started at http://localhost:5000
Products API available at http://localhost:5000/api/products
User API available at http://localhost:5000/api/user
```

### 5. Start the Frontend Dev Server

Open a **second terminal** and run:

```bash
cd fronend
npm run dev
```

The frontend will start on **http://localhost:5173** (default Vite port). Open this URL in your browser.

---

## Using the Application

### Home Page

When you open **http://localhost:5173** in your browser, you will see:

- A **navigation bar** at the top with the Menioc logo, links for "Buy a Car", "About", and "Contact Us", and a **Login** button on the right
- A **hero banner** with a background car image and the tagline "Affordable Cars, Unmatched Quality -- Drive Away Today!"
- A **"Join for Discount"** button in the hero section
- Below the hero, a **grid of available cars** with images, prices, mileage, and location
- An **About** section showing partner bank logos
- A **Footer** with navigation links

### Browsing Cars

- Scroll down past the hero banner to see the **Available Products** grid
- Cars are displayed in a **4-column grid** (responsive: 1 column on mobile, 2 on small screens, 3 on medium, 4 on large)
- Each car card shows:
  - Main image (click the **thumbnail images** below it to swap the displayed image)
  - Car name, price (in Rands), mileage, and location
- Use the **pagination buttons** at the bottom to navigate between pages (8 cars per page)
- There is a **search bar** and **filter dropdowns** (Filter by Model, Filter by Type) at the top of the listings section
- Click the **"View Details"** button on any car card to see the full details

### Viewing Car Details

After clicking "View Details" on a car, you are taken to `/product/:id` where you can see:

- **Large main image** -- click the **thumbnail images** below to change the main image
- **Car name and price** overlaid on the image
- **Dealer rating** (star icon) and **location**
- **Specifications** section with:
  - Type/Model, Drive Type, Transmission, Fuel Type, Engine Capacity, Mileage, Fuel Consumption
- **Dealer Information** panel on the right with:
  - Dealer name, phone number, and location
  - A **contact form** (Your Name, Your Email, Your Message) with a **"Contact Dealer"** button

### Registering an Account

1. Click the **Login** button (user icon) in the top-right of the navigation bar
2. A modal popup will appear with a login form
3. Click **"Register"** at the bottom of the modal ("Don't have an account? Register")
4. Fill in the registration form:
   - **Username** -- required
   - **Email** -- required
   - **Password** -- required
   - **Confirm Password** -- must match the password
   - **Role** -- select "Buyer" or "Admin" from the dropdown
   - **ID Number** -- required, must be exactly 13 digits
   - **Mobile Number** -- required, digits only
5. Click the **"Register"** button to create your account
6. You will see an "Account Created!" alert on success

### Logging In

1. Click the **Login** button in the top-right of the navigation bar
2. Enter your **Username** and **Password**
3. Click the **"Login"** button
4. On successful login, you will be redirected to the **Admin Dashboard** (at `/admin-dashboard`)

### Admin Dashboard

After logging in, you will see the admin panel at `/admin-dashboard`:

**Sidebar (left side):**
- **Menioc logo** at the top
- **Create Product** -- click to open the product creation form
- **Update Product** -- click to open the product update interface
- **Get All Users** -- click to view all registered users
- **Dealers** -- click to view dealer information
- **Sales** -- click to view sales data
- **Logout** button at the bottom -- click to return to the home page

**Top bar (right side):**
- Admin name displayed
- **User icon** -- click to toggle a **calendar popup**

**Main content area:**
- Displays the component selected from the sidebar
- Default message: "Welcome to the Admin Dashboard! Please select an option from the menu."

---

## API Endpoints

### Products (`/api/products`)

| Method | Endpoint                     | Description            |
|--------|------------------------------|------------------------|
| GET    | `/api/products`              | Get all products       |
| GET    | `/api/products/getproduct/:id` | Get a product by ID |
| POST   | `/api/products`              | Create a new product   |
| PATCH  | `/api/products/update/:id`   | Update a product by ID |
| DELETE | `/api/products/delete/:id`   | Delete a product by ID |

### Users (`/api/user`)

| Method | Endpoint         | Description                |
|--------|------------------|----------------------------|
| POST   | `/api/user`      | Register a new user        |
| POST   | `/api/user/login`| Login (get user)           |
| POST   | `/api/user/auth` | Authenticate user (login)  |

---

## Tech Stack

**Frontend:**
- React 18 with Vite
- React Router DOM (client-side routing)
- Tailwind CSS (utility-first styling)
- Axios (HTTP requests)
- Chart.js / react-chartjs-2 (charts in admin dashboard)
- react-calendar (calendar widget)
- react-loader-spinner (loading animations)
- react-icons (icon components)
- AOS (animate on scroll)

**Backend:**
- Node.js with Express
- MongoDB with Mongoose ODM
- bcryptjs (password hashing)
- jsonwebtoken (JWT authentication)
- cookie-parser
- cors
- dotenv (environment variable management)
- nodemon (development auto-restart)
