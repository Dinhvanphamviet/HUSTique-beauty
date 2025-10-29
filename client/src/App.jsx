import React, { use } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import { Routes, Route } from "react-router-dom";
import { Router } from "react-router-dom";
import Footer from "./components/Footer";
import Blog from "./pages/Blog";
import ProductDetails from "./pages/ProductDetails";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import AddressForm from "./pages/AddressForm";
import MyOrders from "./pages/MyOrders";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/owner/Dashboard";
import AddProduct from "./pages/owner/AddProduct";
import ListProduct from "./pages/owner/ListProduct";
import Sidebar from "./components/owner/Sidebar";
import ManageBlogs from "./pages/owner/ManageBlogs";
import BlogDetail from "./pages/BlogDetail";
import { useLocation } from "react-router-dom";
import Processing from "./pages/Processing";

function App() {
  const location = useLocation();
  const isOwnerPath = location.pathname.includes("/owner");

  return (
    <main className="overflow-hidden text-tertiary">
      {!isOwnerPath && <Header />}
      <Toaster position="bottom-right" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/collection/:productId" element={<ProductDetails />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/address-form" element={<AddressForm />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/processing/:nextUrl" element={<Processing />} />
        <Route path="/owner" element={<Sidebar />}>
          <Route index element={<Dashboard />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="list-product" element={<ListProduct />} />
          <Route path="manage-blogs" element={<ManageBlogs />} />
        </Route>
      </Routes>
      {!isOwnerPath && <Footer />}
    </main>
  );
}

export default App;
