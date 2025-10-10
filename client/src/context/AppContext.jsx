import React, { children, createContext, use, useEffect, useState } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import toast from "react-hot-toast"
import { dummyProducts } from '../assets/data'

const AppContext = createContext()

export const AppContextProvider = ({ children }) => {

  const [products, setProducts] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [cartItems, setCartItems] = useState({})
  const [method, setMethod] = useState("COD")
  const [isOwner, setIsOwner] = useState(true)
  const navigate = useNavigate()
  const currency = import.meta.env.VITE_CURRENCY
  const delivery_charges = 10;



  //Clerk
  const { user } = useUser()

  //fetch all products
  const fetchProducts = async () => {
    setProducts(dummyProducts)
  }


  // Add product to cart
  const addToCart = (itemId, size) => {
    if (!size) return toast.error("Hãy chọn size trước")
    let cartData = structuredClone(cartItems)
    cartData[itemId] = cartData[itemId] || {}
    cartData[itemId][size] = (cartData[itemId][size] || 0) + 1
    setCartItems(cartData)
  }

  // Get cart count
  const getCartCount = () => {
    let count = 0
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        count += cartItems[itemId][size]
      }
    }
    return count
  }

  //Update Cart Quantity
  const updateQuantity = (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems)
    cartData[itemId][size] = quantity
    setCartItems(cartData)
  }

  // Get Cart Amount
  const getCartAmount = () => {
    let total = 0
    for (const itemId in cartItems) {
      const product = products.find(p => p._id === itemId)
      if (!product) continue
      for (const size in cartItems[itemId]) {
        total += product.price[size] * cartItems[itemId][size]
      }
    }
    return total
  }

  useEffect(() => {
    fetchProducts()
  }, [])


  const value = { navigate, user, products, currency, searchQuery, setSearchQuery, cartItems, setCartItems, method, setMethod, delivery_charges, addToCart, getCartCount, updateQuantity, getCartAmount, isOwner, setIsOwner }



  return (
    <AppContext.Provider value={value}>{children}</AppContext.Provider>
  )
}


export const useAppContext = () => useContext(AppContext)
