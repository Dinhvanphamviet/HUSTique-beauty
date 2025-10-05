import React, { children, createContext, use, useEffect, useState } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import { dummyProducts } from '../assets/data'

const AppContext = createContext()

export const AppContextProvider = ({ children }) => {

  const [products, setProducts] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate()
  const currency = import.meta.env.VITE_CURRENCY
  const { user } = useUser()


  const fetchProducts = async () => {
    setProducts(dummyProducts)
  }

  useEffect(() => {
    fetchProducts()
  }, [])


  const value = { navigate, user, products, currency, searchQuery , setSearchQuery}



  return (
    <AppContext.Provider value={value}>{children}</AppContext.Provider>
  )
}


export const useAppContext = () => useContext(AppContext)
