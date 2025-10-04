import React from 'react'
import { NavLink } from 'react-router-dom';


const Navbar = ({ containerStyles, setMenuOpened }) => {
    const navLinks = [
        { path: '/', title: 'Trang chủ' },
        { path: '/collection', title: 'Bộ sưu tập' },
        { path: '/blog', title: 'Blog' },
        { path: '/contact', title: 'Contact' }
    ]

    return (
        <nav className={`${containerStyles}`}>
            {navLinks.map((link) => (
                <NavLink
                    onClick = {() => setMenuOpened(false)}
                    key={link.title}
                    to={link.path}
                    className={({ isActive }) =>
                        `${isActive ? "active-link" : ""} p-2 px-4 rounded-full capitalize text-sm font-semibold`}>
                    {link.title}
                </NavLink>

            ))}
        </nav>
    );
};

export default Navbar