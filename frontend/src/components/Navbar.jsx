import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiMenu, FiSearch } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  const categories = [
    { name: 'رجال', href: '/products?category=men' },
    { name: 'نساء', href: '/products?category=women' },
    { name: 'أطفال', href: '/products?category=kids' },
  ];

  const [showCategories, setShowCategories] = useState(false);

  return (
    <nav className="bg-white border-b border-teal-100 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:bg-teal-50 hover:text-teal-600 transition-all"
          >
            <FiMenu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center p-2">
            <img
              src="/logo.svg"
              alt="Store Logo"
              className="h-10 transform hover:scale-105 transition-transform duration-300"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 mr-8">
            <Link
              to="/"
              className="px-3 py-2 rounded-md font-medium text-gray-600 hover:bg-teal-50 hover:text-teal-600 hover:-translate-y-0.5 transition-all duration-200"
            >
              الرئيسية
            </Link>
            
            <div className="relative">
              <button
                onClick={() => setShowCategories(!showCategories)}
                className="px-3 py-2 rounded-md font-medium text-gray-600 hover:bg-teal-50 hover:text-teal-600 transition-all duration-200 flex items-center"
              >
                التصنيفات
                <svg className={`w-4 h-4 mr-1 transition-transform duration-200 ${showCategories ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showCategories && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      to={category.href}
                      className="block px-4 py-2 text-gray-600 hover:bg-teal-50 hover:text-teal-600"
                      onClick={() => setShowCategories(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/products"
              className="px-3 py-2 rounded-md font-medium text-gray-600 hover:bg-teal-50 hover:text-teal-600 hover:-translate-y-0.5 transition-all duration-200"
            >
              المنتجات
            </Link>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <button
              className="hidden md:flex p-2 rounded-md text-gray-600 hover:bg-teal-50 hover:text-teal-600 hover:scale-105 transition-all duration-200"
            >
              <FiSearch className="w-5 h-5" />
            </button>

            <Link to="/cart" className="relative p-2">
              <FiShoppingCart className="w-5 h-5 text-gray-600 hover:text-teal-600 transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-teal-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center transform scale-110">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-50 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
        <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsOpen(false)} />
        <div className="absolute inset-y-0 right-0 w-64 bg-white shadow-xl">
          <div className="p-6">
            <div className="flex justify-between items-center mb-8">
              <img src="/logo.svg" alt="Store Logo" className="h-8" />
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-md text-gray-600 hover:bg-teal-50 hover:text-teal-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="px-4 py-2 rounded-md text-gray-600 hover:bg-teal-50 hover:text-teal-600"
                onClick={() => setIsOpen(false)}
              >
                الرئيسية
              </Link>
              
              <div className="space-y-2">
                <h3 className="px-4 font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-500">
                  التصنيفات
                </h3>
                <div className="flex flex-col space-y-2 pr-4">
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      to={category.href}
                      className="px-4 py-2 rounded-md text-gray-600 hover:bg-teal-50 hover:text-teal-600"
                      onClick={() => setIsOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
              
              <Link
                to="/products"
                className="px-4 py-2 rounded-md text-gray-600 hover:bg-teal-50 hover:text-teal-600"
                onClick={() => setIsOpen(false)}
              >
                المنتجات
              </Link>
              
              <Link
                to="/cart"
                className="px-4 py-2 rounded-md text-gray-600 hover:bg-teal-50 hover:text-teal-600"
                onClick={() => setIsOpen(false)}
              >
                سلة التسوق ({cartCount})
              </Link>
              
              <Link
                to="/login"
                className="px-4 py-2 rounded-md text-gray-600 hover:bg-teal-50 hover:text-teal-600"
                onClick={() => setIsOpen(false)}
              >
                تسجيل الدخول
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
