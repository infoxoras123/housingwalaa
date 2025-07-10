import { Link } from 'react-router-dom'
import { FaBed, FaBath, FaRulerCombined } from 'react-icons/fa'

const PropertyCard = ({ propertydetails }) => {
  
  return (
    <div className="card group h-full flex flex-col">
      <div className="relative">
        {/* Property Image */}
        <Link to={`/property/${propertydetails.id}/${propertydetails.name}`} >
          <div className="h-56 overflow-hidden rounded-t-lg">
            <img 
              src={propertydetails.images[0]} 
              alt={propertydetails.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
        </Link>
        
        {/* Property Type Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            propertydetails.isForRent 
              ? 'bg-accent-500 text-white' 
              : 'bg-primary-600 text-white'
          }`}>
            {propertydetails.isForRent ? 'For Rent' : 'For Sale'}
          </span>
        </div>
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <div className="mb-2">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-lg font-bold text-secondary-900">₹{propertydetails.price}</span>
              
            </div>
            <span className="bg-secondary-100 text-secondary-800 text-xs px-2 py-1 rounded">
              {propertydetails.propertyType}
            </span>
          </div>
        </div>
        
        <Link to={`/property/${propertydetails.id}/${propertydetails.name}`} className="group-hover:text-primary-600 transition-colors">
          <h3 className="text-lg font-medium text-secondary-800 line-clamp-1 mb-2">{propertydetails.title}</h3>
        </Link>
        
        <p className="text-secondary-500 text-sm mb-4 line-clamp-1">{propertydetails.address}</p>
        
        <div className="flex items-center justify-between text-secondary-600 text-sm mb-3">
          <div className="flex items-center">
            <FaBed className="mr-1" />
            <span>{propertydetails.bedrooms} Beds</span>
          </div>
          <div className="flex items-center">
            <FaBath className="mr-1" />
            <span>{propertydetails.bathrooms} Baths</span>
          </div>
          <div className="flex items-center">
            <FaRulerCombined className="mr-1" />
            <span>{propertydetails.area} sq.yard</span>
          </div>
        </div>
        
        <div className="mt-auto pt-3 border-t border-secondary-100 flex justify-between items-center">
          <span className="text-secondary-600 text-sm">Possession: {propertydetails.possession}</span>
          <Link 
          to={`/property/${propertydetails.id}/${propertydetails.name}`}
            className="text-primary-600 text-sm font-medium hover:text-primary-700"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;