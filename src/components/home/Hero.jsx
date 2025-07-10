import { useNavigate } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'
import { usePropertyContext } from '../../context/PropertyContext'
import { useState } from 'react'

const Hero = () => {
  const navigate = useNavigate()
  const { getAllCities } = usePropertyContext()

  const cities = getAllCities()
  const [selectedCity, setSelectedCity] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()

    if (selectedCity) {
      navigate(`/listings?city=${selectedCity}`)
    }
  }

  return (
    <div className="relative h-screen flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg)',
          backgroundPosition: 'center 30%',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/80 to-neutral-900/30" />
      </div>

      {/* Centered Content */}
      <div className="relative z-10 w-full px-4">
        <div className="container-custom text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            Find Your Perfect Home in Gujarat
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Discover thousands of properties across Gujarat's major cities and states. Whether you're looking to buy, rent, or invest — your ideal property is just a search away.
          </p>

          {/* Search Form */}
          <form
            onSubmit={handleSearch}
            className="backdrop-blur-md bg-white/10 border border-white/20 p-6 rounded-2xl shadow-lg flex flex-col md:flex-row gap-4 md:gap-6 items-stretch md:items-end justify-center"
          >
            {/* City Select */}
            <div className="w-full md:flex-1 text-left">
              <label className="block text-white text-sm font-medium mb-2">
                Select City
              </label>
              <div className="relative">
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="input-field bg-white/90 text-gray-900 pr-10"
                  required
                >
                  <option value="">Select a city</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn-primary h-12 flex items-center justify-center w-full md:w-auto"
            >
              <FaSearch className="mr-2" />
              Search Properties
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Hero
