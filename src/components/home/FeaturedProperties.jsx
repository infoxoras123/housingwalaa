import { useState } from 'react'
import { Link } from 'react-router-dom'
import PropertyCard from '../property/Propertycard'
import { usePropertyContext } from '../../context/PropertyContext'

const FeaturedProperties = () => {
  const [activeTab, setActiveTab] = useState('all')
  const { getFeaturedProperties } = usePropertyContext()

  const properties = getFeaturedProperties()

  // Enhanced filtering to handle multiple data types or structures
  const filteredProperties =
    activeTab === 'all'
      ? properties
      : activeTab === 'rent'
      ? properties.filter(
          p =>
            p.isForRent === true ||
            p.isForRent === 'true' ||
            p.type?.toLowerCase() === 'rent'
        )
      : properties.filter(
          p =>
            p.isForRent === false ||
            p.isForRent === 'false' ||
            p.type?.toLowerCase() === 'buy'
        )

  return (
    <section className="py-16 bg-secondary-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary-900 mb-4">Featured Properties</h2>
          <p className="text-secondary-600 max-w-2xl mx-auto">
            Explore our handpicked properties across Gujarat. Whether you're looking to buy or rent,
            we have options to match your requirements and budget.
          </p>

          {/* <div className="flex justify-center mt-8">
            <div className="bg-white p-1 rounded-lg shadow-sm inline-flex">
              <button
                className={`px-6 py-2 rounded-md transition ${
                  activeTab === 'all'
                    ? 'bg-primary-600 text-white'
                    : 'text-secondary-600 hover:bg-secondary-100'
                }`}
                onClick={() => setActiveTab('all')}
              >
                All
              </button>
              <button
                className={`px-6 py-2 rounded-md transition ${
                  activeTab === 'buy'
                    ? 'bg-primary-600 text-white'
                    : 'text-secondary-600 hover:bg-secondary-100'
                }`}
                onClick={() => setActiveTab('buy')}
              >
                For Sale
              </button>
              <button
                className={`px-6 py-2 rounded-md transition ${
                  activeTab === 'rent'
                    ? 'bg-primary-600 text-white'
                    : 'text-secondary-600 hover:bg-secondary-100'
                }`}
                onClick={() => setActiveTab('rent')}
              >
                For Rent
              </button>
            </div>
          </div> */}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} propertydetails={property} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/listings" className="btn-primary inline-block">
            View All Properties
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProperties
