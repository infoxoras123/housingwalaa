import { Link } from 'react-router-dom'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'
import logo from '../../assets/logo.webp';

const Footer = () => {
  // Contact information
  const address = `Office No 110, First floor, Pramukh square,
Above D-Mart , Kudasan-sargasan road,
Gandhinagar - 382421.`;
  const phoneNumber = "+919510774987";
  const email = "infoxoras@gmail.com";
  
  // Functions to handle clicks
  const handleAddressClick = () => {
    // Encode the address for a Google Maps URL
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };
  
  const handlePhoneClick = () => {
    // Remove all non-digit characters and add tel: prefix
    const telNumber = phoneNumber.replace(/\D/g, '');
    window.location.href = `tel:${telNumber}`;
  };
  
  const handleEmailClick = () => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <footer className="bg-secondary-900 text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <img src={logo} alt='housing-walaa' className='w-[130px] bg-white p-2' />
            </Link>
            <p className="text-secondary-300 mb-6">
              Housingwalaa is Gujarat's premier property portal that helps you find your perfect home across Gujarat with detailed listings, virtual tours, and expert guidance.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-secondary-300 hover:text-accent-500 transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-secondary-300 hover:text-accent-500 transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="https://www.instagram.com/housingwalaa?igsh=M2FlenJmOG10a3Bz" className="text-secondary-300 hover:text-accent-500 transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-secondary-300 hover:text-accent-500 transition-colors">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-secondary-300 hover:text-accent-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-secondary-300 hover:text-accent-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/listings" className="text-secondary-300 hover:text-accent-500 transition-colors">
                  Listed Properties
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-secondary-300 hover:text-accent-500 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Locations */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Popular Locations</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/listings?city=Gandhinagar" className="text-secondary-300 hover:text-accent-500 transition-colors">
                  Gandhinagar, Gujarat
                </Link>
              </li>
              <li>
                <Link to="/listings?city=Ahmedabad" className="text-secondary-300 hover:text-accent-500 transition-colors">
                  Ahmedabad, Gujarat
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 cursor-pointer" onClick={handleAddressClick}>
                <FaMapMarkerAlt className="text-accent-500 mt-1 flex-shrink-0" />
                <span className="text-secondary-300 hover:text-accent-500 transition-colors">
                  {address}
                </span>
              </li>
              <li className="flex items-center space-x-3 cursor-pointer" onClick={handlePhoneClick}>
                <FaPhone className="text-accent-500 flex-shrink-0" />
                <span className="text-secondary-300 hover:text-accent-500 transition-colors">
                  {phoneNumber}
                </span>
              </li>
              <li className="flex items-center space-x-3 cursor-pointer" onClick={handleEmailClick}>
                <FaEnvelope className="text-accent-500 flex-shrink-0" />
                <span className="text-secondary-300 hover:text-accent-500 transition-colors">
                  {email}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-secondary-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} housingwalaa. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy-policy" className="text-secondary-400 hover:text-accent-500 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-secondary-400 hover:text-accent-500 text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/sitemap" className="text-secondary-400 hover:text-accent-500 text-sm transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer