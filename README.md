# HUSTique Beauty

This is a full-stack MERN stack (MongoDB, Express, React, Node.js) e-commerce website project for beauty products, built with modern technologies.

## Introduction

HUSTique Beauty is an e-commerce platform that allows users to view, search, and order cosmetic products. The project also includes an admin dashboard for managing products, orders, and blog posts.

## Key Features

* **Client-side:**
    * Homepage, Shop (Collections) page, Product Detail page.
    * Blog page, Blog Detail page.
    * Shopping Cart and Checkout process.
    * User Authentication (Login, Register) using Clerk.
    * User's "My Orders" page.
    * Product Search.
    * Responsive Design.
* **Server-side:**
    * RESTful API for Products, Users, Orders, Cart, Blog, and Addresses.
    * Secure payment processing with Stripe.
    * User authentication and management with Clerk.
    * Image storage and management using Cloudinary.
    * Automatic email sending (e.g., order confirmation) with Nodemailer.
    * File uploads with Multer.
* **Admin-side (Owner):**
    * Overview Dashboard.
    * Product Management (Add, Remove, Edit, List).
    * Blog Management.

## Technology Stack

### Client (Frontend)

* **Framework/Library:** React 19, Vite
* **Routing:** React Router DOM
* **Styling:** Tailwind CSS
* **API Calls:** Axios
* **Auth Management:** @clerk/clerk-react
* **Components:** Swiper (for sliders), Lucide React, React Icons
* **Markdown:** @uiw/react-md-editor, @uiw/react-markdown-preview
* **Notifications (Toast):** React Hot Toast

### Server (Backend)

* **Framework:** Express.js
* **Database:** MongoDB (with Mongoose)
* **Auth Management:** @clerk/express
* **Payment Processing:** Stripe
* **Image Storage:** Cloudinary (with `multer-storage-cloudinary`)
* **File Uploads:** Multer
* **Emailing:** Nodemailer
* **Environment Variables:** Dotenv
* **Middleware/Other:** Cors, Svix
* **Development:** Nodemon

## Installation and Setup

### Prerequisites

* [Node.js](https://nodejs.org/) (v18 or later)
* [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
* [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (or a running MongoDB instance)
* [Clerk](https://clerk.dev/) account
* [Stripe](https://stripe.com/) account
* [Cloudinary](https://cloudinary.com/) account

### 1. Server Setup

1.  Navigate to the `server` directory:
    ```bash
    cd server
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `server` directory and add the necessary environment variables (based on `server/config/` and `server/controllers/`):
    ```env
    PORT=4000
    MONGODB_URI=your_mongodb_connection_string
    CLERK_SECRET_KEY=your_clerk_secret_key
    STRIPE_SECRET_KEY=your_stripe_secret_key
    STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
    SVIX_WEBHOOK_SECRET=your_svix_webhook_secret
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    EMAIL_USER=your_nodemailer_email
    EMAIL_PASS=your_nodemailer_password
    CLIENT_URL=http://localhost:5173
    ```
4.  Run the server in development mode (with nodemon):
    ```bash
    npm run server
    ```
    Or run in production mode:
    ```bash
    npm start
    ```

### 2. Client Setup

1.  Navigate to the `client` directory:
    ```bash
    cd ../client
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env.local` file in the `client` directory and add your environment variables:
    ```env
    VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
    VITE_API_URL=http://localhost:4000
    VITE_CURRENCY=$
    ```
4.  Run the client:
    ```bash
    npm run dev
    ```

The client project will run at `http://localhost:5173` and connect to the server at `http://localhost:4000`.

## Available Scripts

### Client

* `npm run dev`: Starts the Vite development server.
* `npm run build`: Builds the app for production.
* `npm run lint`: Runs ESLint to check for code errors.
* `npm run preview`: Previews the production build locally.

### Server

* `npm start`: Runs the server using Node.
* `npm run server`: Runs the server using Nodemon for development (auto-restarts on file changes).
