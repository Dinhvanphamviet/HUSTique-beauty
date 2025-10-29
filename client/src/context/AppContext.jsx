import React, {
  children,
  createContext,
  use,
  useEffect,
  useState,
} from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useUser, useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState({});
  const [method, setMethod] = useState("COD");
  const [isOwner, setIsOwner] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const getBlogById = (id) => blogs.find((b) => b._id === id);
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY;
  const delivery_charges = 20000;

  //Clerk
  const { user } = useUser();
  const { getToken } = useAuth();

  // Get the user Profile
  const getUser = async () => {
    try {
      const { data } = await axios.get("/api/user", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      if (data.success) {
        setIsOwner(data.role === "owner");
        setCartItems(data.cartData || {});
      } else {
        setTimeout(() => {
          getUser();
        }, 5000);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //fetch all products
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/products");
      if (data.success) {
        setProducts(data.products);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Add product to cart
  const addToCart = async (itemId, size) => {
    if (!size) return toast.error("Hãy chọn size trước");
    let cartData = structuredClone(cartItems);
    cartData[itemId] = cartData[itemId] || {};
    cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    setCartItems(cartData);

    if (user) {
      try {
        const { data } = await axios.post(
          "/api/cart/add",
          { itemId, size },
          { headers: { Authorization: `Bearer ${await getToken()}` } },
        );
        if (data.success) {
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  // Get cart count
  const getCartCount = () => {
    let count = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        count += cartItems[itemId][size];
      }
    }
    return count;
  };

  //Update Cart Quantity
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);

    if (user) {
      try {
        const { data } = await axios.post(
          "/api/cart/update",
          { itemId, size, quantity },
          { headers: { Authorization: `Bearer ${await getToken()}` } },
        );
        if (data.success) {
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  // Get Cart Amount
  const getCartAmount = () => {
    let total = 0;
    for (const itemId in cartItems) {
      const product = products.find((p) => p._id === itemId);
      if (!product) continue;
      for (const size in cartItems[itemId]) {
        total += product.price[size] * cartItems[itemId][size];
      }
    }
    return total;
  };

  // Fetch all blogs
  const fetchBlogs = async () => {
    try {
      const res = await axios.get("/api/blogs");
      const data = res.data.blogs || [];
      setBlogs(data);
      localStorage.setItem("blogs", JSON.stringify(data));
    } catch (err) {
      console.error("Lỗi tải blog:", err);
    }
  };

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchBlogs(); //
    const interval = setInterval(fetchBlogs, 60000);
    return () => clearInterval(interval);
  }, []);

  const value = {
    navigate,
    user,
    products,
    currency,
    searchQuery,
    setSearchQuery,
    cartItems,
    setCartItems,
    method,
    setMethod,
    delivery_charges,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    isOwner,
    setIsOwner,
    fetchProducts,
    axios,
    getToken,
    blogs,
    setBlogs,
    getBlogById,
    fetchBlogs,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
