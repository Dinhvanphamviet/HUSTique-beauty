import React, { children, createContext, use } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'

const AppContext = createContext()

export const AppContextProvider = ({ children }) => {

    const navigate = useNavigate()
    const {user} =useUser()

    const value = {navigate, user}


  return (
    <AppContext.Provider value={value}>{children}</AppContext.Provider>
  )
}


export const useAppContext = () => useContext(AppContext)
