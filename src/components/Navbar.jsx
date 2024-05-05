import React, { useEffect, useState } from "react";
import { FaBlog } from "react-icons/fa6";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { ThemeProvider, THEME_ID, createTheme } from '@mui/material/styles';
import { theme } from "flowbite-react";
import { Switch } from "@mui/material";

const navLinks = [
    {name: 'Home', route: '/'},
    {name: 'About', route: '/about'},
    {name: 'Shop', route: '/shop'},
    {name: 'Sell Your Book', route: '/admin/dashboard'},
];

const materialTheme = createTheme({
    palette: {
        primary: {
            main: "#ff0000",
        },
        secondary: {
            main: "#00ff00",
        }
    }
});

const Navbar = () => {
        const navigate = useNavigate();
        const location = useLocation();
        const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
        const [isHome, setIsHome] = useState(false);
        const [isLogin, setIsLogin] = useState(false);
        const [scrollPosition, setScrollPosition] = useState(0);
        const [isFixed, setIsFixed] = useState(false);
        const [isDarkMode, setIsDarkMode] = useState(false);
        const [navBg, setNavBg] = useState('bg-[#15151580]');
        const user = false;

        const toggleMobileMenu = () => {
            setIsMobileMenuOpen(!isMobileMenuOpen)
        };

        useEffect(() => {
            const darkBook = 'dark';
            const root = window.document.documentElement;
            if(isDarkMode){
                root.classList.add(darkBook);
            } else {
                root.classList.remove(darkBook);
            }
        }, [isDarkMode]);

        useEffect(() => {
            setIsHome(location.pathname === '/');
            setIsLogin(location.pathname === '/login');
            setIsFixed(location.pathname === '/register' || location.pathname === '/login');
        }, [location]);

        useEffect(() => {
            const handleScroll = () => {
                const currentPosition = window.pageYOffset;
                setScrollPosition(currentPosition);
            };
            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        }, []);

        useEffect(()=> {
            if(scrollPosition > 100) {
                if(isHome) {
                    setNavBg('bg-white backdrop-filter backdrop-blur-xl bg-opacity-0 dark:text-white text-black')
                }
                else {
                    setNavBg('bg-white dark:bg-black dark:text-white text-black')
                }
            } else {
                setNavBg(`${isHome || location.pathname === '/' ? 'bg-transparent' : 'bg-white dark:bg-black'}
                dark:text-white text-white`)
            }
        }, [scrollPosition])
    return (
        <nav className="">
            <div className="lg:w-[95%] mx-auto sm:px-6 lg:px-6">
                <div className="px-4 py-4 flex items-center justify-between">
                    {/* logo */}
                    <div>
                        <Link to='/' className='text-2xl font-bold text-blue-700 flex items-center gap-2'>
                        <FaBlog className='inline-block'/>BooksMaster</Link>
                        <p className="font-bold text-[13px] tracking-[8px]">Books Knowledge</p>
                    </div>

                    {/* mobile menu icons */}

                    {/* Navigational Links */}
                    <div className="hidden md:block text-black dark:text-white">
                        <div className="flex">
                            <ul className="ml-10 flex items-center space-x-4 pr-4">
                                {
                                    navLinks.map((link) => (
                                        <li key={link.route}>
                                            <NavLink
                                            to={link.route}
                                            className={({ isActive }) => 
                                                `font-bold ${isActive ? 'text-secondary' : `${navBg.includes('bg-transparent') ?
                                                'text-white' : 'text-black dark:text-white'}`} hover:text-secondary duration-300`    
                                            }
                                            >
                                            {link.name}
                                            </NavLink>
                                        </li>
                                    ))}

                                {/* based on users */}
                                {
                                    user ? null: isLogin ?  <li><NavLink to="/register"
                                className={({ isActive }) => 
                                `font-bold ${isActive ? 'text-secondary' : `${navBg.includes('bg-transparent') ?
                                'text-white' : 'text-black dark:text-white'}`} hover:text-secondary duration-300`    
                                }>Register</NavLink></li> :  <li><NavLink to="/login"
                                className={({ isActive }) => 
                                `font-bold ${isActive ? 'text-secondary' : `${navBg.includes('bg-transparent') ?
                                'text-white' : 'text-black dark:text-white'}`} hover:text-secondary duration-300`    
                                }>Login</NavLink></li>
                                }
                                
                                {/* color toggle */}
                                <li>
                                    <ThemeProvider theme={theme}>
                                        <div className="flex flex-col justify-center items-center">
                                            {/* <Switch onChange={() => setIsDarkMode(!isDarkMode)}/> */}
                                            <h1 className="text-[8px]">Light/Dark</h1>
                                        </div>
                                    </ThemeProvider>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar