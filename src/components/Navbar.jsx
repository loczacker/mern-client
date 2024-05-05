import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { FaBarsStaggered, FaBlog, FaXmark } from "react-icons/fa6";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const user = false;

    // toggle menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    useEffect(() => {
        const handleScroll = () => {
            if(window.scrollY > 100){
                setIsSticky(true);
            }
            else {
                setIsSticky(false);
            }
        }

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.addEventListener("scroll", handleScroll);
        }
    }, [])

    //navItems here
    const navItems = [
        {link: 'Home', path: '/'},
        {link: 'About', path: '/about'},
        {link: 'Shop', path: '/shop'},
        {link: 'Sell Your Book', path: '/admin/dashboard'},
        {link: 'Blog', path: '/blog'}
    ]

    const navLinks = [
        {name: 'Home', route: '/'},
        {name: 'About', route: '/about'},
        {name: 'Shop', route: '/shop'},
        {name: 'Sell Your Book', route: '/admin/dashboard'},
        {name: 'Blog', path: '/blog'}
    ]

  return (
    <header className='w-full bg-transparent fixed top-0 left-0 right-0 translate-all ease-in duration-300'>
        <nav className={`py-4 lg:px-24 px-4 ${isSticky ? "sticky top-0 left-0 right-0 bg-blue-300" : ""}`}>
            <div className='flex justify-between items-center text-base gap-8'>
                {/* logo */}
                <Link to='/' className='text-2xl font-bold text-blue-700 flex items-center gap-2'>
                <FaBlog className='inline-block'/>Books</Link>

                {/* nav item for large device */}
                <ul className='md:flex space-x-12 hidden'>
                    {
                        navItems.map(({link, path}) => <Link key={path} to={path}
                        className='block text-base text-black uppercase cursor-pointer hover:text-blue-700'>{link}</Link>)
                    }
                </ul>

                {/* btn for lg devices */}
                <div className='space-x-12 hidden lg:flex items-center'>
                    <button><FaBarsStaggered className='w-5 hover:text-blue-700'/></button>
                </div>

                {/* menu btn for the mobile devices */}
                <div className='md:hidden'>
                    <button onClick={toggleMenu} className='text-black focus:outline-none'>
                        {
                            isMenuOpen ? <FaXmark className='h-5 w-5 text-black'/> : <FaBarsStaggered
                            className='h-5 w-5 text-black'
                            />
                        }
                    </button>
                </div>
            </div>

            {/* navitems for sm devices */}
            <div className={`space-x-4 px-4 mt-16 py-7 bg-blue-700 
            ${isMenuOpen?"block fixed top-0 right-0 left-0" : "hidden"}`}>
                {
                    navItems.map(({link, path}) => <Link key={path} to={path}
                    className='block text-base text-white uppercase cursor-pointer'>{link}</Link>)
                }
            </div>

            {/* Based on users
            <NavLink>Login</NavLink> */}
        </nav>
    </header>
  )
}

export default Navbar