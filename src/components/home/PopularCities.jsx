import React from 'react'
import { usePropertyContext } from '../../context/PropertyContext'
import { Link } from 'react-router-dom'
import GandhinagarImg from '../../assets/gandhinagr.jpeg'
import AhmedabadImg from '../../assets/ahmedabad.jpg'

const PopularCities = () => {
  const { getAllCities, getPropertiesByCity } = usePropertyContext()
  const cities = getAllCities()

  const getCityImage = (city) => {
    switch (city) {
      case 'Gandhinagar':
        return GandhinagarImg
      case 'Ahmedabad':
        return AhmedabadImg
      default:
        return 'https://images.pexels.com/photos/2093323/pexels-photo-2093323.jpeg' // fallback image
    }
  }

  return (
    <>
      {/* Cities Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Explore Cities</h2>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
              Discover rental properties in these popular cities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cities.map((city, index) => (
              <div key={index} className="group relative rounded-lg overflow-hidden shadow-md h-60">
                <div 
                  className="absolute inset-0 bg-center bg-cover transition-transform duration-500 group-hover:scale-110"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), 
                    url(${getCityImage(city)})`,
                  }}
                ></div>
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="text-white text-2xl font-bold">{city}</h3>
                  <div className="flex mt-2 overflow-hidden h-0 group-hover:h-auto transition-all duration-300">
                    <Link 
                      to={`/listings?city=${city}`}
                      onClick={() => getPropertiesByCity({ city })}
                      className="text-white bg-primary-500/80 hover:bg-primary-600 px-4 py-2 rounded-md text-sm transition-colors"
                    >
                      View Properties
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default PopularCities
