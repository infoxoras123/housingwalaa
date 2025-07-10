import { useEffect } from 'react'
import Hero from '../components/home/Hero'
import FeaturedProperties from '../components/home/FeaturedProperties'
import { FaBriefcase, FaHandshake, FaUsers, FaClock } from 'react-icons/fa'
import PopularCities from '../components/home/PopularCities'
import { Link } from 'react-router-dom'

const Home = () => {
  useEffect(() => {
    document.title = 'housingwalaa - Find Your Perfect Home'
  }, [])

  return (
    <div>
      <Hero />
      
      <PopularCities />

      
      <FeaturedProperties />
      
      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">Why Choose housingwalaa</h2>
            <p className="text-secondary-600 max-w-2xl mx-auto">
              We're committed to making your property journey smooth and successful. Here's what sets us apart.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-secondary-50 rounded-lg hover:shadow-card transition-all duration-300">
              <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaBriefcase size={24} />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-3">Verified Properties</h3>
              <p className="text-secondary-600">
                All our listings are thoroughly verified to ensure you get accurate information.
              </p>
            </div>
            
            <div className="text-center p-6 bg-secondary-50 rounded-lg hover:shadow-card transition-all duration-300">
              <div className="w-16 h-16 bg-accent-100 text-accent-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHandshake size={24} />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-3">Expert Guidance</h3>
              <p className="text-secondary-600">
                Our real estate experts provide personalized advice throughout your property journey.
              </p>
            </div>
            
            <div className="text-center p-6 bg-secondary-50 rounded-lg hover:shadow-card transition-all duration-300">
              <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers size={24} />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-3">Largest Network</h3>
              <p className="text-secondary-600">
                Access India's largest network of property buyers, sellers, and agents.
              </p>
            </div>
            
            <div className="text-center p-6 bg-secondary-50 rounded-lg hover:shadow-card transition-all duration-300">
              <div className="w-16 h-16 bg-accent-100 text-accent-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaClock size={24} />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-3">Timely Assistance</h3>
              <p className="text-secondary-600">
                Get prompt responses and support throughout your property transaction.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-primary-700 to-primary-600 text-white">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="mb-8 lg:mb-0 lg:mr-12 text-center lg:text-left">
              <h2 className="text-3xl font-bold mb-4">Ready to Find Your Dream Home?</h2>
              <p className="text-white/90 max-w-lg">
                Take the first step towards finding your perfect property. Our team is ready to help you every step of the way.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/listings" className="btn bg-white text-primary-700 hover:bg-secondary-100">
                Browse Properties
              </Link>
              <Link to="/contact" className="btn border-2 border-white text-white hover:bg-white/10">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  )
}

export default Home