import { useEffect, useState } from 'react'
import PropertyCard from '../components/property/Propertycard'
import { useSearchParams } from 'react-router-dom'
import { FaFilter, FaTimes, FaSearch, FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { usePropertyContext } from '../context/PropertyContext';

const ListingsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const { getAllProperties, getAllPropertyTypes, getAllSubPropertyTypes, getAllCities } = usePropertyContext();
  const cities = getAllCities();
  const properties = getAllProperties();
  const propertyTypes = getAllPropertyTypes();
  const subPropertyTypes = getAllSubPropertyTypes();
  console.log('properties :', properties);

  // Filter states
  const [filters, setFilters] = useState({
    listingType: searchParams.get('type') || 'all',
    city: searchParams.get('city') || '',
    propertyType: searchParams.get('propertyType') || '',
    subPropertyType: searchParams.get('subPropertyType') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    bedrooms: searchParams.get('bedrooms') || '',
    possession: searchParams.get('possession') || '',
    minSize: searchParams.get('minSize') || '',
    maxSize: searchParams.get('maxSize') || '',
  });
  
  // Get sub-property types based on the selected property type
  const getSubPropertyTypesForPropertyType = (propertyType) => {
    if (!propertyType || !subPropertyTypes[propertyType]) return [];
    return subPropertyTypes[propertyType].map(subType => subType.name);
  };
  const availableSubPropertyTypes = getSubPropertyTypesForPropertyType(filters.propertyType);
  
  const uniquePossessions = [...new Set(properties.map(property => property.possession))];

  // Apply filters
  const filteredProperties = properties.filter(property => {
    // Type filter (rent/buy/all)
    if (filters.listingType === 'rent' && !property.isForRent) return false;
    if (filters.listingType === 'buy' && property.isForRent) return false;

    // City filter
    if (filters.city && property.city !== filters.city) return false;

    // Property Type filter
    if (filters.propertyType && property.propertyType !== filters.propertyType) return false;

    // Sub-Property Type filter
    if (filters.subPropertyType && property.subpropertyType !== filters.subPropertyType) return false;

    // Price range filter
    // if (filters.minPrice && property.priceValue < parseInt(filters.minPrice)) return false;
    // if (filters.maxPrice && property.priceValue > parseInt(filters.maxPrice)) return false;

    // Bedrooms filter
    if (filters.bedrooms && property.bedrooms !== parseInt(filters.bedrooms)) return false;

    // Possession filter
    if (filters.possession && property.possession !== filters.possession) return false;

    // Size filter
    if (filters.minSize && property.area < parseInt(filters.minSize)) return false;
    if (filters.maxSize && property.area > parseInt(filters.maxSize)) return false;

    return true;
  });

  // Pagination
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);

  const currentProperties = filteredProperties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Apply filters and update URL
  const applyFilters = () => {
    const newParams = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value);
      }
    });

    setSearchParams(newParams);
    setCurrentPage(1);
    if (window.innerWidth < 1024) {
      setIsFiltersOpen(false);
    }
  };

  const resetFilters = () => {
    setFilters({
      listingType: 'all',
      city: '',
      propertyType: '',
      subPropertyType: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      possession: '',
      minSize: '',
      maxSize: '',
    });
    setSearchParams({});
    setCurrentPage(1);
  };

  const handleFilterChange = (name, value) => {
    // Special case for propertyType, we need to reset subPropertyType when propertyType changes
    if (name === 'propertyType') {
      setFilters({
        ...filters,
        [name]: value,
        subPropertyType: '', // Reset subPropertyType when propertyType changes
      });
    } 
    else {
      setFilters({
        ...filters,
        [name]: value,
      });
    }
  };

  useEffect(() => {
    let title = 'Property Listings';
   
    if (filters.city) {
      title = `Properties in ${filters.city}`;
    }
    
    document.title = `${title} | Housingwalaa`;

    // Check if city param exists in URL and update filter
    const cityParam = searchParams.get('city');
    if (cityParam && cityParam !== filters.city) {
      setFilters(prev => ({ ...prev, city: cityParam }));
    }
    
    // Check if propertyType param exists and update filter
    const propertyTypeParam = searchParams.get('propertyType');
    if (propertyTypeParam && propertyTypeParam !== filters.propertyType) {
      setFilters(prev => ({ ...prev, propertyType: propertyTypeParam }));
    }
  }, [searchParams, filters.city, filters.propertyType]);

  return (
    <div className="pt-20 lg:pt-24 pb-12 bg-secondary-50 min-h-screen">
      <div className="container-custom">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">
            {filters.city
              ? `Properties in ${filters.city}`
              : 'All Properties'}
          </h1>
          <p className="text-secondary-600">
            {filteredProperties.length} properties found
            {filters.listingType !== 'all' && ` for ${filters.listingType === 'rent' ? 'rent' : 'sale'}`}
            {filters.propertyType && ` - ${filters.propertyType}`}
            {filters.subPropertyType && ` (${filters.subPropertyType})`}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter Toggle Button (Mobile Only) */}
          <div className="block lg:hidden">
            <button
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className="w-full btn-primary flex items-center justify-center"
            >
              {isFiltersOpen ? (
                <>
                  <FaTimes className="mr-2" /> Hide Filters
                </>
              ) : (
                <>
                  <FaFilter className="mr-2" /> Show Filters
                </>
              )}
            </button>
          </div>

          {/* Filters Sidebar */}
          <div className={`lg:w-1/4 transition-all duration-300 ${isFiltersOpen ? 'block' : 'hidden lg:block'
            }`}>
            <div className="bg-white rounded-lg shadow-card p-6 sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-secondary-900">Filters</h2>
                <button
                  onClick={resetFilters}
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  Reset All
                </button>
              </div>

              {/* Listing Type Toggle */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-secondary-700 mb-2">Listing Type</h3>
                <div className="flex bg-secondary-100 p-1 rounded-md">
                  <button
                    className={`flex-1 py-2 text-sm font-medium rounded-md transition ${filters.listingType === 'all'
                        ? 'bg-white shadow-sm text-primary-600'
                        : 'text-secondary-600 hover:text-secondary-800'
                      }`}
                    onClick={() => handleFilterChange('listingType', 'all')}
                  >
                    All
                  </button>
                  <button
                    className={`flex-1 py-2 text-sm font-medium rounded-md transition ${filters.listingType === 'buy'
                        ? 'bg-white shadow-sm text-primary-600'
                        : 'text-secondary-600 hover:text-secondary-800'
                      }`}
                    onClick={() => handleFilterChange('listingType', 'buy')}
                  >
                    Buy
                  </button>
                  <button
                    className={`flex-1 py-2 text-sm font-medium rounded-md transition ${filters.listingType === 'rent'
                        ? 'bg-white shadow-sm text-primary-600'
                        : 'text-secondary-600 hover:text-secondary-800'
                      }`}
                    onClick={() => handleFilterChange('listingType', 'rent')}
                  >
                    Rent
                  </button>
                </div>
              </div>

              {/* Location Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-secondary-700 mb-2">Location</h3>

                {/* City Dropdown */}
                <div>
                  <label className="text-xs text-secondary-500 mb-1 block">City</label>
                  <select
                    value={filters.city}
                    onChange={(e) => handleFilterChange('city', e.target.value)}
                    className="input-field text-sm"
                  >
                    <option value="">All Cities</option>
                    {cities.map(city => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Property Type Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-secondary-700 mb-2">Property Type</h3>
   
                {/* Property Type Dropdown */}
                <div className="mb-3">
                  <label className="text-xs text-secondary-500 mb-1 block">Property Type</label>
                  <select
                    value={filters.propertyType}
                    onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                    className="input-field text-sm"
                  >
                    <option value="">All Property Types</option>
                    {propertyTypes.map(type => (
                      <option key={type.id} value={type.name}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>
   
                {/* Sub-Property Type Dropdown */}
                <div className="mb-3">
                  <label className="text-xs text-secondary-500 mb-1 block">Sub Property Type</label>
                  <select
                    value={filters.subPropertyType}
                    onChange={(e) => handleFilterChange('subPropertyType', e.target.value)}
                    className="input-field text-sm"
                    disabled={!filters.propertyType}
                  >
                    <option value="">All Sub Types</option>
                    {availableSubPropertyTypes.map(subType => (
                      <option key={subType} value={subType}>
                        {subType}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price Range */}
              {/* <div className="mb-6">
                <h3 className="text-sm font-medium text-secondary-700 mb-2">Price Range</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-secondary-500 mb-1 block">Min Price</label>
                    <select
                      value={filters.minPrice}
                      onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                      className="input-field text-sm"
                    >
                      <option value="">No Min</option>
                      {filters.listingType === 'rent' ? (
                        <>
                          <option value="10000">₹10,000</option>
                          <option value="20000">₹20,000</option>
                          <option value="30000">₹30,000</option>
                          <option value="50000">₹50,000</option>
                          <option value="75000">₹75,000</option>
                        </>
                      ) : (
                        <>
                          <option value="1000000">₹10 Lac</option>
                          <option value="3000000">₹30 Lac</option>
                          <option value="5000000">₹50 Lac</option>
                          <option value="10000000">₹1 Cr</option>
                          <option value="20000000">₹2 Cr</option>
                        </>
                      )}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-secondary-500 mb-1 block">Max Price</label>
                    <select
                      value={filters.maxPrice}
                      onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                      className="input-field text-sm"
                    >
                      <option value="">No Max</option>
                      {filters.listingType === 'rent' ? (
                        <>
                          <option value="30000">₹30,000</option>
                          <option value="50000">₹50,000</option>
                          <option value="75000">₹75,000</option>
                          <option value="100000">₹1 Lac</option>
                          <option value="150000">₹1.5 Lac</option>
                        </>
                      ) : (
                        <>
                          <option value="5000000">₹50 Lac</option>
                          <option value="10000000">₹1 Cr</option>
                          <option value="20000000">₹2 Cr</option>
                          <option value="50000000">₹5 Cr</option>
                          <option value="100000000">₹10 Cr</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>
              </div> */}

              {/* Bedrooms */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-secondary-700 mb-2">Bedrooms</h3>
                <select
                  value={filters.bedrooms}
                  onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                  className="input-field text-sm"
                >
                  <option value="">Any</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5+</option>
                </select>
              </div>

              {/* Possession */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-secondary-700 mb-2">Possession</h3>
                <select
                  value={filters.possession}
                  onChange={(e) => handleFilterChange('possession', e.target.value)}
                  className="input-field text-sm"
                >
                  <option value="">Any</option>
                  {uniquePossessions.map(possession => (
                    <option key={possession} value={possession}>
                      {possession}
                    </option>
                  ))}
                </select>
              </div>

              {/* Size */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-secondary-700 mb-2">Size (sq.yard)</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-secondary-500 mb-1 block">Min Size</label>
                    <input
                      type="number"
                      placeholder="Min sq.yard"
                      value={filters.minSize}
                      onChange={(e) => handleFilterChange('minSize', e.target.value)}
                      className="input-field text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-secondary-500 mb-1 block">Max Size</label>
                    <input
                      type="number"
                      placeholder="Max sq.yard"
                      value={filters.maxSize}
                      onChange={(e) => handleFilterChange('maxSize', e.target.value)}
                      className="input-field text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Apply Button */}
              <button
                onClick={applyFilters}
                className="btn-primary w-full flex items-center justify-center"
              >
                <FaSearch className="mr-2" />
                Apply Filters
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Results Count */}
            <div className="bg-white rounded-lg shadow-card p-4 mb-6 flex justify-between items-center">
              <p className="text-secondary-700">
                <span className="font-medium">{filteredProperties.length}</span> properties found
              </p>
              {/* <div className="flex items-center">
                <span className="text-secondary-600 text-sm mr-2">Sort by:</span>
                <select className="input-field text-sm py-1">
                  <option>Newest First</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Size: Small to Large</option>
                </select>
              </div> */}
            </div>

            {/* Property Grid */}
            {currentProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {currentProperties.map((property) => (
                  <PropertyCard key={property.id} propertydetails={property} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-card p-8 text-center">
                <h3 className="text-xl font-semibold text-secondary-800 mb-2">No properties found</h3>
                <p className="text-secondary-600 mb-6">
                  Try adjusting your filters to see more results.
                </p>
                <button
                  onClick={resetFilters}
                  className="btn-primary"
                >
                  Reset Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {filteredProperties.length > 0 && (
              <div className="mt-10 flex justify-center">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-md ${currentPage === 1
                        ? 'text-secondary-400 cursor-not-allowed'
                        : 'text-secondary-700 hover:bg-secondary-100'
                      }`}
                    aria-label="Previous page"
                  >
                    <FaAngleLeft size={18} />
                  </button>

                  {/* Page Numbers */}
                  {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
                    // Show current page, first and last page, and one page before and after current
                    const shouldShow =
                      pageNumber === 1 ||
                      pageNumber === totalPages ||
                      Math.abs(pageNumber - currentPage) <= 1;

                    // Show ellipsis for skipped pages
                    if (!shouldShow) {
                      // Only show one ellipsis between groups of visible pages
                      if (pageNumber === 2 || pageNumber === totalPages - 1) {
                        return (
                          <span
                            key={pageNumber}
                            className="w-10 h-10 flex items-center justify-center text-secondary-600"
                          >
                            ...
                          </span>
                        );
                      }
                      return null;
                    }

                    return (
                      <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`w-10 h-10 rounded-md ${currentPage === pageNumber
                            ? 'bg-primary-600 text-white'
                            : 'text-secondary-800 hover:bg-secondary-100'
                          }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-md ${currentPage === totalPages
                        ? 'text-secondary-400 cursor-not-allowed'
                        : 'text-secondary-700 hover:bg-secondary-100'
                      }`}
                    aria-label="Next page"
                  >
                    <FaAngleRight size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingsPage;