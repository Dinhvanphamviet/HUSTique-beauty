import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/data.js'
import Navbar from './Navbar.jsx'
import { useState } from 'react'
import { UserButton, useClerk} from '@clerk/clerk-react'
import { useAppContext } from '../context/AppContext.jsx'
import { ScrollText } from "lucide-react";




const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);

  const { openSignIn } = useClerk();
  const { navigate, user, getCartCount } = useAppContext();


  const toggleMenu = () => setMenuOpened((prev) => !prev);

  return (
    <header className='absolute top-0 left-0 right-0 z-50 bg-white py-3'>
      <div className="max-padd-container flexBetween">
        {/* Logo */}
        <div className="flex flex-1">
          <Link to={"/"} className='flex items-center gap-2'>
            <img src={assets.logoImg} alt="logo" className="h-11" />
            <span className='hidden sm:inline-block text-2xl font-bold'>
              HUSTique Beauty
            </span>
          </Link>
        </div>
        {/*Navbar*/}
        <div>
          <Navbar
            setMenuOpened={setMenuOpened}
            containerStyles={`${menuOpened
              ? "flex item-start flex-col gap-y-8 fixed top-16 right-6 p-5 bg-white shadow-md w-52 z-50"
              : "hidden lg:flex gap-x-5 xl:gap-x-8 text-sm font-medium bg-gray-100 rounded-full px-3 py-1"
              }`}
          />
        </div>

        {/*Buttons and profile icon*/}
        <div className='flex flex-1 items-center sm:justify-end gap-x-4 sm:gap-x-8'>
          <div>
            <button className='btn-outline px-2 py-1 text-xs font-semibold'>
              Dashboard
            </button>
          </div>
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
          <div onClick={() => navigate('/cart')} className='relative cursor-pointer'>
            <img src={assets.cartAdded} alt="" className='min-w-7' />
            <label className='absolute bottom-7 right-0 left-0 text-xs font-bold bg-secondary/15 flexCenter rounded-full'>
            {getCartCount()}
            </label>
          </div>
          {/*User Profile*/}
          <div className='group'>
            {user ? (
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: {
                      width: "42px",
                      height: "42px"
                    }
                  }
                }}
              >
                <UserButton.MenuItems>
                  <UserButton.Action
                    label='My orders'
                    labelIcon={<ScrollText size={18} strokeWidth={1.5} />}
                    onClick={() => navigate / '/my-orders'}
                  />
                </UserButton.MenuItems>

              </UserButton>
            ) : (
              <button onClick={openSignIn} className='btn-secondary flexCenter gap-2 rounded-full'>
                Đăng nhập
                <img src={assets.user} alt="" className='invert w-5' />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header