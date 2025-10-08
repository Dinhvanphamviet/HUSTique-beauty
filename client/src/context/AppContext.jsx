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

  useEffect(() => {
    fetchProducts()
  }, [])


  const value = { navigate, user, products, currency, searchQuery , setSearchQuery, cartItems, setCartItems, method, setMethod, delivery_charges, addToCart, getCartCount}



  return (
    <AppContext.Provider value={value}>{children}</AppContext.Provider>
  )
}


export const useAppContext = () => useContext(AppContext)
