import React from 'react'
import Header from './components/Header'
import Home from './pages/Home'
import Collection from './pages/Collection'
import { Routes, Route } from 'react-router-dom'
import { Router } from 'react-router-dom'
import Footer from './components/Footer'
import Blog from './pages/Blog'


function App() {
  return (
    <main className='overflow-hidden text-tertiary'> 
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/collection' element={<Collection/>}/>
        <Route path='/blog' element={<Blog/>}/>
      </Routes>
      <Footer/>
    </main>
  )
}

export default App