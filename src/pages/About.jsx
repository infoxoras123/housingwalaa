import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FaAward, FaUsers, FaHome, FaHandshake, FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'

const About = () => {
  useEffect(() => {
    document.title = 'About Us - HousingWalaa'
  }, [])

  const [loadedImages, setLoadedImages] = useState([])
  const [activeTab, setActiveTab] = useState('story')
  const [expandedTeamMember, setExpandedTeamMember] = useState(null)
  const [isStatsVisible, setIsStatsVisible] = useState(false)
  const statsRef = useRef(null)

  // Track scroll position for animations
  useEffect(() => {
    const handleScroll = () => {
      if (statsRef.current) {
        const rect = statsRef.current.getBoundingClientRect()
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0
        setIsStatsVisible(isVisible)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check visibility on initial render

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleImageLoad = (id) => {
    setLoadedImages(prev => [...prev, id])
  }

  const stats = [
    { id: 1, number: '2+', label: 'Years Experience', icon: <FaAward className="text-4xl text-white mb-3" /> },
    { id: 2, number: '1000+', label: 'Happy Clients', icon: <FaUsers className="text-4xl text-white mb-3" /> },
    { id: 3, number: '1800+', label: 'Properties Sold', icon: <FaHome className="text-4xl text-white mb-3" /> },
    { id: 4, number: '50+', label: 'Expert Agents', icon: <FaHandshake className="text-4xl text-white mb-3" /> }
  ]

  // const team = [
  //   {
  //     id: 1,
  //     name: 'Emily Thompson',
  //     position: 'CEO & Founder',
  //     image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
  //     bio: 'With over 20 years of real estate experience, Emily leads our team with a passion for connecting people with their perfect homes.',
  //     expanded: 'Emily started HousingWalaa with a vision to transform the real estate industry. Prior to founding the company, she worked with several leading agencies and gained extensive knowledge of the market. Her approach combines cutting-edge technology with personalized service, ensuring that each client receives the attention they deserve.'
  //   },
  //   {
  //     id: 2,
  //     name: 'Michael Johnson',
  //     position: 'Lead Sales Agent',
  //     image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
  //     bio: 'Michael specializes in luxury properties and has been consistently recognized as a top-performing agent in the region.',
  //     expanded: 'Having closed over $500 million in sales throughout his career, Michael brings unparalleled expertise to luxury real estate. He holds numerous certifications and has been featured in Real Estate Monthly as one of the "Top 50 Agents to Watch." His clients appreciate his attention to detail and commitment to excellence.'
  //   },
  //   {
  //     id: 3,
  //     name: 'Sarah Williams',
  //     position: 'Marketing Director',
  //     image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
  //     bio: 'Sarah brings innovative marketing strategies to showcase our properties and connect with potential buyers worldwide.',
  //     expanded: 'With a background in digital marketing and a degree in Business Communications, Sarah revolutionized our approach to property marketing. She introduced virtual tours, drone photography, and targeted social media campaigns that increased property visibility by 300%. Her strategies have been adopted by real estate firms nationwide.'
  //   },
  //   {
  //     id: 4,
  //     name: 'David Chen',
  //     position: 'Property Manager',
  //     image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
  //     bio: 'David ensures that all properties are maintained to the highest standards, providing peace of mind to owners and tenants alike.',
  //     expanded: 'David oversees a portfolio of over 500 properties, with a focus on preventative maintenance and responsive service. He leads a team of 15 maintenance professionals and has implemented a proprietary software system that reduces response time by 40%. His background in construction management gives him unique insight into property upkeep and improvement.'
  //   }
  // ]

  const aboutTabs = [
    { id: 'story', label: 'Our Story' },
    { id: 'mission', label: 'Our Mission' },
    { id: 'values', label: 'Our Values' },
    { id: 'approach', label: 'Our Approach' }
  ]

  const tabContent = {
    story: (
      <>
        <h3 className="text-2xl font-semibold mb-4">Founded with a Vision</h3>
        <p className="text-neutral-600 mb-4">
          HousingWalaa was established in 2023 with a clear mission: to revolutionize the real estate industry by putting people first. Our founder, Nachiket Patel , recognized that buying or selling a home is more than just a transaction—it's a life-changing experience.
        </p>
        <p className="text-neutral-600 mb-4">
          Starting with just three agents in a small office, we've grown to become one of the most trusted real estate companies in the region, with over 50 expert agents serving thousands of clients each year.
        </p>
        <p className="text-neutral-600">
          Our approach combines technological innovation with personalized service, ensuring that every client receives the attention, expertise, and support they deserve throughout their real estate journey.
        </p>
      </>
    ),
    mission: (
      <>
        <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
        <p className="text-neutral-600 mb-4">
          At HousingWalaa, our mission is to simplify the real estate process while maximizing value for our clients. We believe that finding the perfect home or investment property should be an exciting journey, not a stressful experience.
        </p>
        <p className="text-neutral-600 mb-4">
          We're committed to leveraging technology, market insights, and personalized service to create exceptional outcomes for buyers, sellers, and investors alike.
        </p>
        <p className="text-neutral-600">
          Every member of our team is dedicated to this mission, working tirelessly to ensure that each client achieves their real estate goals with confidence and peace of mind.
        </p>
      </>
    ),
    values: (
      <>
        <h3 className="text-2xl font-semibold mb-4">Our Core Values</h3>
        <ul className="space-y-4">
          {[
            { id: 1, title: 'Integrity', text: 'We believe in honest, transparent communication with our clients and partners. Trust is the foundation of every relationship we build.' },
            { id: 2, title: 'Excellence', text: `We strive for excellence in every aspect of our service, from marketing to client communication. We're never satisfied with "good enough.` },
            { id: 3, title: 'Innovation', text: 'We embrace technology and innovative approaches to solve real estate challenges and stay ahead of market trends.' },
            { id: 4, title: 'Community', text: 'We believe in giving back to the communities where we live and work. Our success is measured not just in transactions, but in positive impact.' }
          ].map(item => (
            <li key={item.id} className="flex items-start">
              <span className="bg-primary-100 text-primary-600 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
              </span>
              <div>
                <span className="font-semibold text-lg">{item.title}:</span> {item.text}
              </div>
            </li>
          ))}
        </ul>
      </>
    ),
    approach: (
      <>
        <h3 className="text-2xl font-semibold mb-4">Our Unique Approach</h3>
        <p className="text-neutral-600 mb-4">
          What sets HousingWalaa apart is our comprehensive approach to real estate. We don't just list properties—we create customized strategies for each client based on their unique needs and goals.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="bg-primary-50 p-4 rounded-lg">
            <h4 className="font-semibold text-lg mb-2">For Buyers</h4>
            <p className="text-neutral-600">
              We utilize advanced search technologies, market analyses, and our extensive network to find options that meet your criteria, often before they hit the market.
            </p>
          </div>
          <div className="bg-primary-50 p-4 rounded-lg">
            <h4 className="font-semibold text-lg mb-2">For Sellers</h4>
            <p className="text-neutral-600">
              Our marketing strategies combine traditional methods with cutting-edge digital approaches to ensure maximum visibility for your property.
            </p>
          </div>
        </div>
        <p className="text-neutral-600">
          Throughout the process, our team remains accessible, responsive, and committed to representing your interests with the highest level of professionalism and care.
        </p>
      </>
    )
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container-custom">
        {/* Hero Section with Parallax */}
        <motion.section 
          className="bg-primary-50 rounded-lg p-8 md:p-12 mb-16 overflow-hidden relative"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <motion.h1 
                className="text-4xl md:text-5xl font-bold mb-4"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                About HousingWalaa
              </motion.h1>
              <motion.p 
                className="text-neutral-600 text-lg mb-6"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                We're more than just a real estate company. We're your partners in finding the perfect place to call home.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Link 
                  to="/contact" 
                  className="btn btn-primary transition-transform hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2"
                  aria-label="Contact us"
                >
                  Get in Touch
                </Link>
              </motion.div>
            </div>
            <motion.div 
              className="rounded-lg overflow-hidden h-80 relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-100 to-transparent z-10 w-1/3"></div>
              <img 
                src="https://cdn.pixabay.com/photo/2018/01/28/10/08/purchase-3113198_1280.jpg" 
                alt="Our Office" 
                className="w-full h-full object-cover transition-opacity duration-300"
                loading="lazy"
                onLoad={() => handleImageLoad('hero')}
              />
            </motion.div>
          </div>
        </motion.section>

        {/* Our Story with Tabs */}
        <section className="mb-16" aria-labelledby="our-story-heading">
          <div className="text-center mb-10">
            <motion.h2 
              id="our-story-heading" 
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Our Company
            </motion.h2>
            <motion.div 
              className="w-20 h-1 bg-primary-600 mx-auto"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            ></motion.div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="rounded-lg overflow-hidden h-[500px] relative group"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute inset-0 bg-primary-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300 z-10"></div>
              <img 
                src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg" 
                alt="Team Meeting" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                onLoad={() => handleImageLoad('story')}
              />
            </motion.div>
            
            <div>
              {/* Interactive Tabs */}
              <div className="flex flex-wrap mb-6 border-b border-neutral-200">
                {aboutTabs.map(tab => (
                  <button
                    key={tab.id}
                    className={`px-4 py-3 text-lg font-medium transition-colors duration-200 ${
                      activeTab === tab.id 
                        ? 'text-primary-600 border-b-2 border-primary-600' 
                        : 'text-neutral-500 hover:text-primary-500'
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                    aria-selected={activeTab === tab.id}
                    aria-controls={`tab-content-${tab.id}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              
              {/* Tab Content with Animation */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  id={`tab-content-${activeTab}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {tabContent[activeTab]}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Stats with Counting Animation */}
        <motion.section 
          ref={statsRef}
          className="bg-blue-950 rounded-lg p-8 md:p-12 mb-16" 
          aria-labelledby="stats-heading"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 id="stats-heading" className="sr-only">Our Achievements</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={stat.id} 
                className="text-center text-white p-6 rounded-lg bg-blue-900 bg-opacity-40 backdrop-blur-sm hover:bg-opacity-50 transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                {stat.icon}
                <CountingNumber 
                  value={stat.number} 
                  isVisible={isStatsVisible}
                  duration={2000}
                />
                <p className="opacity-80">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Team with Interactive Expansion */}
        {/* <section className="mb-16" aria-labelledby="team-heading">
          <div className="text-center mb-10">
            <motion.h2 
              id="team-heading" 
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Meet Our Team
            </motion.h2>
            <motion.p 
              className="text-neutral-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Our experienced team of real estate professionals is dedicated to providing exceptional service and expertise.
            </motion.p>
            <motion.div 
              className="w-20 h-1 bg-primary-600 mx-auto mt-4"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            ></motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div 
                key={member.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="h-64 overflow-hidden relative">
                  <div className="absolute inset-0 bg-primary-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300 z-10"></div>
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    loading="lazy"
                    onLoad={() => handleImageLoad(`team-${member.id}`)}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-primary-600 mb-3">{member.position}</p>
                  <p className="text-neutral-600">
                    {expandedTeamMember === member.id ? member.expanded : member.bio}
                  </p>
                   */}
                  {/* Read More/Less Toggle */}
                  {/* <button 
                    className="mt-3 text-primary-600 hover:text-primary-800 flex items-center font-medium focus:outline-none"
                    onClick={() => setExpandedTeamMember(expandedTeamMember === member.id ? null : member.id)}
                    aria-expanded={expandedTeamMember === member.id}
                  >
                    {expandedTeamMember === member.id ? (
                      <>Read less <FaChevronUp className="ml-1" /></>
                    ) : (
                      <>Read more <FaChevronDown className="ml-1" /></>
                    )}
                  </button>
                  
                  <div className="mt-4 flex space-x-3">
                    {['LinkedIn', 'Twitter', 'Email'].map(social => (
                      <button 
                        key={social}
                        className="text-neutral-400 hover:text-primary-600 transition-colors"
                        aria-label={`${member.name}'s ${social}`}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section> */}

        {/* Interactive CTA */}
        <motion.section 
          className="bg-primary-600 rounded-lg p-8 md:p-12 text-center text-white overflow-hidden relative" 
          aria-labelledby="cta-heading"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-secondary-500 opacity-10 rounded-full translate-x-1/3 translate-y-1/3"></div>
          
          <motion.h2 
            id="cta-heading" 
            className="text-3xl md:text-4xl font-bold mb-4 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Ready to Work With Us?
          </motion.h2>
          <motion.p 
            className="text-lg opacity-90 max-w-3xl mx-auto mb-6 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Whether you're looking to buy, sell, or rent a property, our team is here to help you every step of the way.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center relative z-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link 
                to="/listings" 
                className="btn bg-white text-primary-700 hover:bg-neutral-100 transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600"
                aria-label="Browse our properties"
              >
                Browse Properties
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link 
                to="/contact" 
                className="btn bg-secondary-500 text-white hover:bg-secondary-600 transition-all focus:outline-none focus:ring-2 focus:ring-secondary-300 focus:ring-offset-2 focus:ring-offset-primary-600"
                aria-label="Contact our team"
              >
                Contact Us
              </Link>
            </motion.div>
          </motion.div>
        </motion.section>
      </div>
    </div>
  )
}

// Custom animated counter component
const CountingNumber = ({ value, isVisible, duration = 2000 }) => {
  const [displayValue, setDisplayValue] = useState('0')
  const numericValue = parseInt(value.replace(/\D/g, '')) || 0
  const suffix = value.replace(/[0-9]/g, '')
  
  useEffect(() => {
    if (!isVisible) return
    
    let startTime
    let animationFrame
    
    const startAnimation = (timestamp) => {
      if (!startTime) startTime = timestamp
      const elapsedTime = timestamp - startTime
      
      if (elapsedTime < duration) {
        const progress = elapsedTime / duration
        const currentValue = Math.floor(progress * numericValue)
        setDisplayValue(`${currentValue}${suffix}`)
        animationFrame = requestAnimationFrame(startAnimation)
      } else {
        setDisplayValue(value)
      }
    }
    
    animationFrame = requestAnimationFrame(startAnimation)
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [isVisible, numericValue, duration, value, suffix])
  
  return (
    <p className="text-4xl font-bold mb-2">{displayValue}</p>
  )
}

export default About