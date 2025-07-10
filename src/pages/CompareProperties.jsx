import { useState, useEffect, useRef } from 'react';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import { FaSearch, FaExchangeAlt, FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaTimes } from 'react-icons/fa';
import { usePropertyContext } from '../context/PropertyContext';

const CompareProperties = () => {
  const { getAllProperties } = usePropertyContext();
  const properties = getAllProperties();

  const [property1, setProperty1] = useState(null);
  const [property2, setProperty2] = useState(null);
  const [searchTerm1, setSearchTerm1] = useState('');
  const [searchTerm2, setSearchTerm2] = useState('');
  const [showDropdown1, setShowDropdown1] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);
  
  const dropdownRef1 = useRef(null);
  const dropdownRef2 = useRef(null);
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef1.current && !dropdownRef1.current.contains(event.target) && 
          inputRef1.current && !inputRef1.current.contains(event.target)) {
        setShowDropdown1(false);
      }
      if (dropdownRef2.current && !dropdownRef2.current.contains(event.target) && 
          inputRef2.current && !inputRef2.current.contains(event.target)) {
        setShowDropdown2(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filteredProperties1 = properties.filter(property =>
    (property?.title?.toLowerCase().includes(searchTerm1.toLowerCase()) ||
      property?.location?.toLowerCase().includes(searchTerm1.toLowerCase())) ?? false
  );

  const filteredProperties2 = properties.filter(property =>
    (property?.title?.toLowerCase().includes(searchTerm2.toLowerCase()) ||
      property?.location?.toLowerCase().includes(searchTerm2.toLowerCase())) ?? false
  );

  const handleSelectProperty = (property, position) => {
    if (position === 1) {
      setProperty1(property);
      setSearchTerm1(property.title);
      setShowDropdown1(false);
    } else {
      setProperty2(property);
      setSearchTerm2(property.title);
      setShowDropdown2(false);
    }
  };

  const clearSearch = (position) => {
    if (position === 1) {
      setSearchTerm1('');
      setProperty1(null);
    } else {
      setSearchTerm2('');
      setProperty2(null);
    }
  };

  const swapProperties = () => {
    const temp = property1;
    setProperty1(property2);
    setProperty2(temp);
    setSearchTerm1(property2?.title || '');
    setSearchTerm2(property1?.title || '');
  };

  return (
    <div className="pt-20 lg:pt-24 pb-12 bg-secondary-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-secondary-900 mb-4">Compare Properties</h1>
          <p className="text-secondary-600 max-w-2xl mx-auto">
            Compare different properties side by side to make an informed decision
          </p>
        </div>

        {/* Search Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Property 1 Search */}
          <div className="relative">
            <div className="flex">
              <div className="relative flex-grow">
                <input
                  ref={inputRef1}
                  type="text"
                  placeholder="Search first property..."
                  value={searchTerm1}
                  onChange={(e) => {
                    setSearchTerm1(e.target.value);
                    setShowDropdown1(true);
                  }}
                  className="input-field pr-10"
                  aria-label="Search for first property to compare"
                  onClick={() => setShowDropdown1(true)}
                />
                {searchTerm1 ? (
                  <button 
                    onClick={() => clearSearch(1)}
                    className="absolute right-8 top-1/2 -translate-y-1/2 text-secondary-400 hover:text-secondary-600"
                    aria-label="Clear search"
                  >
                    <FaTimes />
                  </button>
                ) : (
                  <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-400" />
                )}
              </div>
            </div>

            {showDropdown1 && filteredProperties1.length > 0 && (
              <div ref={dropdownRef1} className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg max-h-96 overflow-y-auto">
                {filteredProperties1.map(property => (
                  <button
                    key={property.id}
                    className="w-full px-4 py-2 text-left hover:bg-secondary-50 flex items-center space-x-2"
                    onClick={() => handleSelectProperty(property, 1)}
                  >
                    <img
                      src={property.images[0] || '/placeholder-property.jpg'}
                      alt={`${property.title} thumbnail`}
                      className="w-12 h-12 object-cover rounded"
                      onError={(e) => {
                        e.target.src = '/placeholder-property.jpg';
                      }}
                    />
                    <div>
                      <div className="font-medium text-secondary-900">{property.title}</div>
                      <div className="text-sm text-secondary-500">{property.location}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Property 2 Search */}
          <div className="relative">
            <div className="flex">
              <div className="relative flex-grow">
                <input
                  ref={inputRef2}
                  type="text"
                  placeholder="Search second property..."
                  value={searchTerm2}
                  onChange={(e) => {
                    setSearchTerm2(e.target.value);
                    setShowDropdown2(true);
                  }}
                  className="input-field pr-10"
                  aria-label="Search for second property to compare"
                  onClick={() => setShowDropdown2(true)}
                />
                {searchTerm2 ? (
                  <button 
                    onClick={() => clearSearch(2)}
                    className="absolute right-8 top-1/2 -translate-y-1/2 text-secondary-400 hover:text-secondary-600"
                    aria-label="Clear search"
                  >
                    <FaTimes />
                  </button>
                ) : (
                  <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-400" />
                )}
              </div>
            </div>

            {showDropdown2 && filteredProperties2.length > 0 && (
              <div ref={dropdownRef2} className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg max-h-96 overflow-y-auto">
                {filteredProperties2.map(property => (
                  <button
                    key={property.id}
                    className="w-full px-4 py-2 text-left hover:bg-secondary-50 flex items-center space-x-2"
                    onClick={() => handleSelectProperty(property, 2)}
                  >
                    <img
                      src={property.images[0] || '/placeholder-property.jpg'}
                      alt={`${property.title} thumbnail`}
                      className="w-12 h-12 object-cover rounded"
                      onError={(e) => {
                        e.target.src = '/placeholder-property.jpg';
                      }}
                    />
                    <div>
                      <div className="font-medium text-secondary-900">{property.title}</div>
                      <div className="text-sm text-secondary-500">{property.location}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Comparison Section */}
        {property1 && property2 ? (
          <div className="bg-white rounded-lg shadow-card overflow-hidden">
            {/* Swap Button */}
            <div className="p-4 border-b border-secondary-200 flex justify-end">
              <button
                onClick={swapProperties}
                className="flex items-center text-primary-600 hover:text-primary-700"
                aria-label="Swap properties positions"
              >
                <FaExchangeAlt className="mr-2" />
                Swap Properties
              </button>
            </div>

            {/* Image Comparison */}
            <div className="h-96 relative">
              <ReactCompareSlider
                itemOne={
                  <ReactCompareSliderImage 
                    src={property1.images[0] || '/placeholder-property.jpg'} 
                    alt={property1.title} 
                  />
                }
                itemTwo={
                  <ReactCompareSliderImage 
                    src={property2.images[0] || '/placeholder-property.jpg'} 
                    alt={property2.title} 
                  />
                }
                style={{ height: '100%' }}
              />
            </div>

            {/* Details Comparison */}
            <div className="grid grid-cols-2 gap-4 p-6">
              {/* property 1 */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-secondary-900">{property1.title}</h2>
                <div className="flex items-center text-secondary-600 text-sm">
                  <FaMapMarkerAlt className="mr-2" />
                  {property1.location}
                </div>
                <div className="text-2xl font-bold text-primary-600">₹{property1.price}</div>
                <div className="flex items-center space-x-4 text-secondary-600">
                  <div className="flex items-center">
                    <FaBed className="mr-1" />
                    <span>{property1.bedrooms} Beds</span>
                  </div>
                  <div className="flex items-center">
                    <FaBath className="mr-1" />
                    <span>{property1.bathrooms} Baths</span>
                  </div>
                  <div className="flex items-center">
                    <FaRulerCombined className="mr-1" />
                    <span>{property1.area} sq.yard</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-secondary-900 mb-2">Amenities</h3>
                  <ul className="list-disc list-inside text-secondary-600">
                    {property1.amenities?.map((amenity, index) => (
                      <li key={index}>{amenity}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* property 2 */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-secondary-900">{property2.title}</h2>
                <div className="flex items-center text-secondary-600 text-sm">
                  <FaMapMarkerAlt className="mr-2" />
                  {property2.location}
                </div>
                <div className="text-2xl font-bold text-primary-600">₹{property2.price}</div>
                <div className="flex items-center space-x-4 text-secondary-600">
                  <div className="flex items-center">
                    <FaBed className="mr-1" />
                    <span>{property2.bedrooms} Beds</span>
                  </div>
                  <div className="flex items-center">
                    <FaBath className="mr-1" />
                    <span>{property2.bathrooms} Baths</span>
                  </div>
                  <div className="flex items-center">
                    <FaRulerCombined className="mr-1" />
                    <span>{property2.area} sq.yard</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-secondary-900 mb-2">Amenities</h3>
                  <ul className="list-disc list-inside text-secondary-600">
                    {property2.amenities?.map((amenity, index) => (
                      <li key={index}>{amenity}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-card">
            <div className="text-secondary-600">
              {property1 || property2 ? (
                'Select another property to compare'
              ) : (
                'Search and select two properties to compare'
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompareProperties;