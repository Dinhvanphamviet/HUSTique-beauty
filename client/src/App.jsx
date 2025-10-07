import React from 'react'
import Header from './components/Header'
import Home from './pages/Home'
import Collection from './pages/Collection'
import { Routes, Route } from 'react-router-dom'
import { Router } from 'react-router-dom'
import Footer from './components/Footer'
import Blog from './pages/Blog'
import ProductDetails from './pages/ProductDetails'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import AddressForm from './pages/AddressForm'
import MyOrders from './pages/MyOrders'


function App() {
  return (
    <main className='overflow-hidden text-tertiary'> 
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/collection' element={<Collection/>}/>
        <Route path='/collection/:productId' element={<ProductDetails/>}/>
        <Route path='/blog' element={<Blog/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/address-form' element={<AddressForm/>}/>
        <Route path='/my-orders' element={<MyOrders/>}/>


      </Routes>
      <Footer/>
    </main>
  )
}

export default App