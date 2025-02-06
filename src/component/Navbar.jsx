import React, { useEffect, useState } from 'react';

function Navbar() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Function to toggle theme
    const toggleTheme = () => {
        const htmlElement = document.documentElement;
        htmlElement.classList.toggle('dark');
        const newIsDarkMode = htmlElement.classList.contains('dark');
        setIsDarkMode(newIsDarkMode);
        localStorage.setItem('theme', newIsDarkMode ? 'dark' : 'light');
    };

    // Check localStorage for theme on component mount
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
            setIsDarkMode(true);
        }
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div id='navbar' className="navbar p-4 rounded-b-lg flex justify-between shadow-black mb-3">
            {/* Logo */}
            <a href="#" className="text-black text-2xl font-bold">Rd Advisor.</a>
            <nav className="flex justify-center">
                <div className="nav-item mx-auto flex justify-between items-center">
                    {/* Desktop Menu */}
                    <div className="hidden lg:flex space-x-4">
                        <a href="#" className="text-black hover:text-green-600">Home</a>
                        <a href="#" className="text-black hover:text-green-600">About</a>
                        <a href="#" className="text-black hover:text-green-600">Services</a>
                        <a href="#" className="text-black hover:text-green-600">Contact</a>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div id="mobile-menu" className={`lg:hidden mt-4 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
                    <a href="#" className="block text-black hover:text-green-600 py-2">Home</a>
                    <a href="#" className="block text-black hover:text-green-600 py-2">About</a>
                    <a href="#" className="block text-black hover:text-green-600 py-2">Services</a>
                    <a href="#" className="block text-black hover:text-green-600 py-2">Contact</a>
                </div>
            </nav>

            {/* Dark Mode Toggle Button */}
            <div className="dark_mode" >
                <button onClick={toggleTheme} className="rounded-full flex items-center justify-center shadow-lg transition-all">
                <img src="src/assets/day-mode (1).png" alt="" />
                </button>
            </div>

            {/* Mobile Menu Button */}
            <button id="mobile-menu-button" onClick={toggleMobileMenu} className="text-black lg:hidden">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
            </button>
        </div>
    );
}

export default Navbar;
