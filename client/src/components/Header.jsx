import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/data.js'
import Navbar from './Navbar.jsx'
import { useState } from 'react'


const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);

  const toggleMenu = () => setMenuOpened((prev) => !prev);


  return (
    <header className='absolute top-0 left-0 right-0 z-50 bg-white py-3'>
      <div className="max-padd-container flexBetween">
        {/* Logo */}
        <div className="flex flex-1">
          <Link to={"/"} className='flex items-end'>
            <img
              src={assets.logoImg}
              alt="logoImg"
              className="h-11"
            />
            <span className='hidden sm:block bold-24 relative right-0'> HUSTique </span>
          </Link>
        </div>
        {/*Navbar*/}
        <div className='flex-1'>
          <Navbar 
          setMenuOpened = {setMenuOpened}
          containerStyles={`${
            menuOpened 
            ? "flex item-start flex-col gap-y-8 fixed top-16 right-6 p-5 bg-rounded-xl shadow-md w-52 z-50" 
            : "hidden lg:flex gap-x-5 xl:gap-x-8 medium-15 bg-secondary/10 rounded-full p-1"}`} />
        </div>
        {/*Buttons and profile icon*/}
        <div className='flex flex-1 items-center sm:justify-end gap-x-4 sm:gap-x-8'>
          {/*Menu Togggle*/}
          <div className="relative lg:hidden w-7 h-6">
            <img
              onClick={toggleMenu}
              src={assets.menu}
              alt=""
              className={`absolute inset-0 lg:hidden cursor-pointer transition-opacity duration-700 ${menuOpened ? 'opacity-0' : 'opacity-100'
                }`} />
            <img
              onClick={toggleMenu}
              src={assets.menuClose}
              alt=""
              className={`absolute inset-0 lg:hidden cursor-pointer transition-opacity duration-700 ${menuOpened ? 'opacity-100' : 'opacity-0'
                }`} />
          </div>
          {/*Cart button*/}
          <div className='relative cursor-pointer'>
            <img src={assets.cartAdded} alt="" className='min-w-7' />
            <label className='absolute bottom-7 right-0 left-0 text-xs font-bold bg-secondary/15 flexCenter rounded-full'>0</label>
          </div>
          {/*User Profile*/}
          <div className='group relative top-1'>
            <button className='btn-secondary flexCenter gap-2 rounded-full'>
              Login
              <img src={assets.user} alt="" className='invert w-5' />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header