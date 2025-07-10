import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaUser, FaChevronLeft, FaChevronRight, FaPhone, FaEnvelope, FaSchool, FaHospital, FaShoppingBag, FaBus } from 'react-icons/fa'
import { usePropertyContext } from '../context/PropertyContext';
import PropertyMap from '../components/property/PropertyMap';
import ContactOwnerCard from '../components/property/ContactOwnerCard';

const PropertyDetails = () => {
  const { id } = useParams();
  const [activeSlide, setActiveSlide] = useState(0);
 
  const [activeTab, setActiveTab] = useState('overview');

  const { getAllProperties } = usePropertyContext();
  const property = getAllProperties().find((property) => property.id === parseInt(id));

  useEffect(() => {
    document.title = `${property.title} | Housingwalaa`;

    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? property.images.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev === property.images.length - 1 ? 0 : prev + 1));
  };


  return (
    <div className="pt-20 lg:pt-24 pb-12 bg-secondary-50 min-h-screen">
      <div className="container-custom">
        {/* Breadcrumbs */}
       <div className="mb-4 text-sm">
  <Link to="/" className="text-secondary-600 hover:text-primary-600">Home</Link>
  <span className="mx-2 text-secondary-400">/</span>

  <Link to="/listings" className="text-secondary-600 hover:text-primary-600">Properties</Link>
  <span className="mx-2 text-secondary-400">/</span>

  <Link
    to={`/listings?state=${property.state}`}
    className="text-secondary-600 hover:text-primary-600"
  >
    {property.state}
  </Link>
  <span className="mx-2 text-secondary-400">/</span>

  <Link
    to={`/listings?state=${property.state}&city=${property.city}`}
    className="text-secondary-600 hover:text-primary-600"
  >
    {property.city}
  </Link>
  <span className="mx-2 text-secondary-400">/</span>

  <span className="text-secondary-400">{property.locality}</span>
</div>


        {/* Property Header */}
        <div className="mb-6 md:flex justify-between items-start">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-secondary-900 mb-2">
              {property.title}
            </h1>
            <p className="flex items-center text-secondary-600 mb-1">
              <FaMapMarkerAlt className="mr-2 text-primary-600" />
              {property.fullAddress}
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-3">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${property.isForRent
                  ? 'bg-accent-500 text-white'
                  : 'bg-primary-600 text-white'
                }`}>
                {property.isForRent ? 'For Rent' : 'For Sale'}
              </span>


              <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Verified
              </span>

              <span className="px-3 py-1 rounded-full text-xs font-medium bg-secondary-100 text-secondary-800">
                {property.propertyType}
              </span>

              <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {property.possession}
              </span>
            </div>
          </div>


          <div className="mt-4 md:mt-0 flex flex-col items-end">
            <div className="text-right">
              <div className="text-3xl font-bold text-secondary-900">₹{property.price}</div>
              
            </div>
            <div className="text-secondary-500 text-sm mt-2">Posted by {property.postedDate}week ago </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column - Property Details */}
          <div className="lg:w-8/12">
            {/* Property Images Slider */}
            <div className="bg-white rounded-lg shadow-card overflow-hidden mb-6">
              <div className="relative h-64 sm:h-96 md:h-[500px]">
                {property.images.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-500 ${index === activeSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
                      }`}
                  >
                 <img
  src={image}
  alt={`Property image ${index + 1}`}
  className="w-full h-full object-cover"
/>

                  </div>
                ))}

                {/* Slider Controls */}
                <button
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full text-secondary-800 shadow-md transition"
                  onClick={handlePrevSlide}
                  aria-label="Previous image"
                >
                  <FaChevronLeft size={20} />
                </button>
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full text-secondary-800 shadow-md transition"
                  onClick={handleNextSlide}
                  aria-label="Next image"
                >
                  <FaChevronRight size={20} />
                </button>

                {/* Slider Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                  {property.images.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all ${index === activeSlide
                          ? 'bg-white w-4'
                          : 'bg-white/50 hover:bg-white/80'
                        }`}
                      onClick={() => setActiveSlide(index)}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Image Counter */}
                <div className="absolute top-4 right-4 bg-secondary-900/75 text-white text-sm px-3 py-1 rounded-full">
                  {activeSlide + 1} / {property.images.length}
                </div>
              </div>

              {/* Thumbnail Navigation */}
              <div className="flex p-2 overflow-x-auto">
                {property.images.map((image, index) => (
                  <button
                    key={index}
                    className={`flex-shrink-0 w-20 h-16 mr-2 rounded overflow-hidden border-2 transition ${index === activeSlide
                        ? 'border-primary-600'
                        : 'border-transparent hover:border-primary-400'
                      }`}
                    onClick={() => setActiveSlide(index)}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Property Details Tabs */}
            <div className="bg-white rounded-lg shadow-card overflow-hidden mb-6">
              <div className="flex border-b border-secondary-200">
                <button
                  className={`px-4 py-3 text-sm font-medium ${activeTab === 'overview'
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : 'text-secondary-600 hover:text-secondary-900'
                    }`}
                  onClick={() => setActiveTab('overview')}
                >
                  Overview
                </button>
                <button
                  className={`px-4 py-3 text-sm font-medium ${activeTab === 'amenities'
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : 'text-secondary-600 hover:text-secondary-900'
                    }`}
                  onClick={() => setActiveTab('amenities')}
                >
                  Amenities
                </button>
                <button
                  className={`px-4 py-3 text-sm font-medium ${activeTab === 'nearby'
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : 'text-secondary-600 hover:text-secondary-900'
                    }`}
                  onClick={() => setActiveTab('nearby')}
                >
                  Nearby Places
                </button>
              </div>

              <div className="p-6">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div>
                    <h2 className="text-xl font-semibold text-secondary-900 mb-4">Property Details</h2>

                    <div className="mb-6 text-secondary-700">
                      <p>{property.description}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-8">
                      <div className="flex items-center">
                        <FaBed className="text-primary-600 mr-3" size={20} />
                        <div>
                          <div className="text-secondary-900 font-medium">{property.bedrooms} Bedrooms</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <FaBath className="text-primary-600 mr-3" size={20} />
                        <div>
                          <div className="text-secondary-900 font-medium">{property.bathrooms} Bathrooms</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <FaRulerCombined className="text-primary-600 mr-3" size={20} />
                        <div>
                          <div className="text-secondary-900 font-medium">{property.area} sq.yard</div>
                          <div className="text-sm text-secondary-500">Super Built-up Area</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-5 h-5 flex items-center justify-center text-primary-600 mr-3">B</div>
                        <div>
                          <div className="text-secondary-900 font-medium">{property.balconies} Balconies</div>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-secondary-900 mb-3">Additional Details</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 mb-6">
                      <div className="flex justify-between py-2 border-b border-secondary-100">
                        <span className="text-secondary-600">Floor</span>
                        <span className="text-secondary-900 font-medium">{property.floor}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-secondary-100">
                        <span className="text-secondary-600">Facing</span>
                        <span className="text-secondary-900 font-medium">{property.facing}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-secondary-100">
                        <span className="text-secondary-600">Furnishing</span>
                        <span className="text-secondary-900 font-medium">{property.furnished}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-secondary-100">
                        <span className="text-secondary-600">Age of Property</span>
                        <span className="text-secondary-900 font-medium">{property.age}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-secondary-100">
                        <span className="text-secondary-600">Carpet Area</span>
                        <span className="text-secondary-900 font-medium">{property.area} sq.yard</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-secondary-100">
                        <span className="text-secondary-600">Possession Status</span>
                        <span className="text-secondary-900 font-medium">{property.possession}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Amenities Tab */}
                {activeTab === 'amenities' && (
                  <div>
                    <h2 className="text-xl font-semibold text-secondary-900 mb-6">Amenities & Features</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {property.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-8 h-8 bg-primary-100 text-primary-600 rounded-md flex items-center justify-center mr-3">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-secondary-700">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Nearby Places Tab */}
                {activeTab === 'nearby' && (
                  <div>
                    <h2 className="text-xl font-semibold text-secondary-900 mb-6">Nearby Facilities</h2>

                    <div className="grid grid-cols-1 gap-4">
                      {property.nearbyFacilities.map((facility, index) => (
                        <div key={index} className="flex items-center p-3 border border-secondary-200 rounded-md hover:bg-secondary-50 transition">
                          <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mr-4">
                            {facility.type === 'school' && <FaSchool />}
                            {facility.type === 'hospital' && <FaHospital />}
                            {facility.type === 'shopping' && <FaShoppingBag />}
                            {facility.type === 'transport' && <FaBus />}
                            {facility.type === 'business' && <FaUser />}
                          </div>
                          <div className="flex-grow">
                            <div className="text-secondary-900 font-medium">{facility.name}</div>
                            <div className="text-sm text-secondary-500 capitalize">{facility.type}</div>
                          </div>
                          <div className="text-primary-600 font-medium">
                            {facility.distance}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:w-4/12">
            {/* Contact Owner */}
            <ContactOwnerCard property={property} />

            {/* Property Map */}
            <PropertyMap property={property} />
            
          </div>


        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;