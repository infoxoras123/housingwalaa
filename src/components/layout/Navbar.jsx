import { useState, useRef, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FaBars, FaTimes, FaChevronDown, FaCalculator, FaExchangeAlt } from 'react-icons/fa'
import logo from '../../assets/logo.webp'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [toolsDropdown, setToolsDropdown] = useState(false)
  const dropdownRef = useRef(null)
  const toolsButtonRef = useRef(null)
 
  const toggleMenu = () => setIsOpen(!isOpen)
  
  const closeMenu = () => {
    setIsOpen(false)
    setToolsDropdown(false)
  }

  const toggleToolsDropdown = (e) => {
    e.preventDefault()
    setToolsDropdown(!toolsDropdown)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
          toolsButtonRef.current && !toolsButtonRef.current.contains(event.target)) {
        setToolsDropdown(false)
      }
    }

    // Add event listener when dropdown is open
    if (toolsDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    // Clean up
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [toolsDropdown])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md py-3">
      <div className="container-custom flex justify-between items-center">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-2xl font-bold"
          onClick={closeMenu}
        >
          <img src={logo} alt='housing-walaa' className='w-[130px]' />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <NavLink 
            to="/" 
            className={({ isActive }) =>
              isActive 
                ? 'text-primary-600 font-medium' 
                : 'text-black hover:text-primary-600 transition'
            }
          >
            Home
          </NavLink>

          {/* Tools Dropdown - Desktop */}
          <div className="relative group" ref={dropdownRef}>
            <button 
              ref={toolsButtonRef}
              onClick={toggleToolsDropdown}
              className="flex items-center text-black hover:text-primary-600 transition"
            >
              Tools <FaChevronDown className="ml-1 h-3 w-3" />
            </button>
            
            {toolsDropdown && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-10">
                <Link
                  to="/emi-calculator"
                  className=" px-4 py-2 text-sm text-black hover:bg-primary-50 hover:text-primary-600 flex items-center"
                  onClick={closeMenu}
                >
                  <FaCalculator className="mr-2" /> EMI Calculator
                </Link>
                <Link
                  to="/compare"
                  className=" px-4 py-2 text-sm text-black hover:bg-primary-50 hover:text-primary-600 flex items-center"
                  onClick={closeMenu}
                >
                  <FaExchangeAlt className="mr-2" /> Compare Properties
                </Link>
              </div>
            )}
          </div>

          <NavLink 
            to="/about" 
            className={({ isActive }) =>
              isActive 
                ? 'text-primary-600 font-medium' 
                : 'text-black hover:text-primary-600 transition'
            }
          >
            About Us
          </NavLink>

          <NavLink 
            to="/blog" 
            className={({ isActive }) =>
              isActive 
                ? 'text-primary-600 font-medium' 
                : 'text-black hover:text-primary-600 transition'
            }
          >
            Blog
          </NavLink>

          <NavLink 
            to="/contact" 
            className={({ isActive }) =>
              isActive 
                ? 'text-primary-600 font-medium' 
                : 'text-black hover:text-primary-600 transition'
            }
          >
            Contact Us
          </NavLink>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center space-x-4">
        <Link to="/add-property" className="btn-secondary">
            Add Property
          </Link>
          {/* <Link to="/login" className="btn-secondary">
            Log In
          </Link>
          <Link to="/signup" className="btn-primary">
            Register
          </Link> */}
        </div>

        {/* Mobile Button */}
        <button 
          className="md:hidden text-black p-2" 
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0">
          <div className="container-custom py-4 flex flex-col space-y-4">
            <NavLink 
              to="/" 
              className={({ isActive }) =>
                `${isActive ? 'text-primary-600 font-medium' : 'text-black'} py-2 block`
              }
              onClick={closeMenu}
            >
              Home
            </NavLink>

            {/* Tools Dropdown - Mobile */}
            <div ref={dropdownRef}>
              <button 
                ref={toolsButtonRef}
                onClick={toggleToolsDropdown}
                className="flex items-center justify-between w-full text-black py-2"
              >
                Tools <FaChevronDown className={`ml-1 h-3 w-3 transition-transform ${toolsDropdown ? 'rotate-180' : ''}`} />
              </button>
              
              {toolsDropdown && (
                <div className="pl-4 pt-2 pb-1 space-y-2">
                  <Link
                    to="/emi-calculator"
                    className=" py-1 text-black hover:text-primary-600 flex items-center"
                    onClick={closeMenu}
                  >
                    <FaCalculator className="mr-2" /> EMI Calculator
                  </Link>
                  <Link
                    to="/compare"
                    className=" py-1 text-black hover:text-primary-600 flex items-center"
                    onClick={closeMenu}
                  >
                    <FaExchangeAlt className="mr-2" /> Compare Properties
                  </Link>
                </div>
              )}
            </div>

           <NavLink 
             to="/blog" 
             className={({ isActive }) =>
               `${isActive ? 'text-primary-600 font-medium' : 'text-black'} py-2 block`
             }
             onClick={closeMenu}
           >
             Blog
           </NavLink>

            <NavLink 
              to="/about" 
              className={({ isActive }) =>
                `${isActive ? 'text-primary-600 font-medium' : 'text-black'} py-2 block`
              }
              onClick={closeMenu}
            >
              About Us
            </NavLink>
            
            <NavLink 
              to="/contact" 
              className={({ isActive }) =>
                `${isActive ? 'text-primary-600 font-medium' : 'text-black'} py-2 block`
              }
              onClick={closeMenu}
            >
              Contact Us
            </NavLink>
            
            <div className="pt-2 border-t border-secondary-200 flex space-x-4">
             <Link to="/add-property" className="btn-primary w-full text-center" onClick={closeMenu}>
                Add Property
              </Link>
              {/* <Link to="/login" className="btn-secondary w-full text-center" onClick={closeMenu}>
                Log In
              </Link>
              <Link to="/register" className="btn-primary w-full text-center" onClick={closeMenu}>
                Register
              </Link> */}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar;