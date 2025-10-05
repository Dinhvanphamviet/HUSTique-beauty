import React from 'react'
import { NavLink } from 'react-router-dom';


const Navbar = ({ containerStyles, setMenuOpened }) => {
    const navLinks = [
        { path: '/', title: 'Trang chủ' },
        { path: '/collection', title: 'Bộ sưu tập' },
        { path: '/blog', title: 'Chuyện làm đẹp' },
        { path: '/contact', title: 'Liên hệ' }
    ]

    return (
        <nav className={`${containerStyles}`}>
            {navLinks.map((link) => (
                <NavLink
                    onClick = {() => setMenuOpened(false)}
                    key={link.title}
                    to={link.path}
                    className={({ isActive }) =>
                        `${isActive ? "active-link" : ""} p-2.5 px-4 rounded-full capitalize text-sm font-semibold`}>
                    {link.title}
                </NavLink>

            ))}
        </nav>
    );
};

export default Navbar