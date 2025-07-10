import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaCheck,
  FaWhatsapp,
} from "react-icons/fa";

const ContactUs = () => {
  // Form states
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [mapActive, setMapActive] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  // WhatsApp number
  const whatsappNumber = "919510774987";

  useEffect(() => {
    document.title = "Contact Us - HousingWalaa";
    const timer = setTimeout(() => {
      setMapActive(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^[0-9]{10,12}$/.test(formData.phone.replace(/[^0-9]/g, ""))) {
      errors.phone = "Please enter a valid phone number";
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required";
    } else if (formData.message.length < 10) {
      errors.message = "Message should be at least 10 characters";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      try {
        const { name, phone, email, message } = formData;

        // Enhanced WhatsApp message formatting
        const whatsappMessage = `Hello HousingWalaa Team,%0A%0A*I'm interested in your properties*%0A%0A*My Details:*%0A🔹 *Name:* ${name}%0A🔹 *Phone:* ${phone}%0A🔹 *Email:* ${email || "Not provided"}%0A%0A*My Message:*%0A${message}%0A%0A*Sent via HousingWalaa Website*`;

        window.open(
          `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`,
          "_blank",
          "noopener,noreferrer"
        );

        setFormSubmitted(true);
        setFormData({
          name: "",
          phone: "",
          email: "",
          message: "",
        });

        setTimeout(() => {
          setFormSubmitted(false);
        }, 5000);
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const contactInfo = [
    {
      id: 1,
      title: "Visit Our Office",
      detail: `Office No 110, First floor, Pramukh square, Above D-Mart , Kudasan-sargasan road,
Gandhinagar - 382421.`,
      icon: <FaMapMarkerAlt className="text-primary-600" />,
      color: "bg-red-100",
      iconColor: "text-red-600",
      moreInfo: `Our office is open from Monday to Saturday, 9:00 AM to 6:00 PM.`,
    },
    {
      id: 2,
      title: "Call Us",
      detail: "+91 9510774987",
      icon: <FaPhone className="text-primary-600" />,
      color: "bg-blue-100",
      iconColor: "text-blue-600",
      moreInfo: "Our customer service team is available 24/7 to answer your calls.",
    },
    {
      id: 3,
      title: "Email Us",
      detail: "infoxoras@gmail.com",
      icon: <FaEnvelope className="text-primary-600" />,
      color: "bg-green-100",
      iconColor: "text-green-600",
      moreInfo: "For general inquiries, please email infoxoras@gmial.com.",
    },
    {
      id: 4,
      title: "Business Hours",
      detail: "Monday - Saturday: 9:00 AM - 6:00 PM",
      icon: <FaClock className="text-primary-600" />,
      color: "bg-purple-100",
      iconColor: "text-purple-600",
      moreInfo: "Our office is closed on Sundays and national holidays.",
    },
  ];

  const infoCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
    hover: {
      y: -10,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        duration: 0.3,
      },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="text-center mb-14"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <motion.h1
            className="text-5xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Contact <span className="text-primary-600">HousingWalaa</span>
          </motion.h1>
          <motion.div
            className="w-24 h-1 bg-primary-600 mx-auto mb-5"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          />
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Have questions or need assistance? Reach out to our team - we're here to help you find your dream home!
          </motion.p>
        </motion.div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {contactInfo.map((info, i) => (
            <motion.div
              key={info.id}
              custom={i}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              variants={infoCardVariants}
              className={`bg-white rounded-2xl shadow-md p-6 cursor-pointer ${
                hoveredCard === info.id ? "ring-2 ring-primary-500" : ""
              }`}
              onClick={() =>
                setSelectedContact(selectedContact === info.id ? null : info.id)
              }
              onMouseEnter={() => setHoveredCard(info.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="flex items-center mb-4">
                <div
                  className={`${info.color} p-3 rounded-lg ${info.iconColor}`}
                >
                  {info.icon}
                </div>
                <h3 className="ml-4 text-lg font-semibold text-gray-900">
                  {info.title}
                </h3>
              </div>
              <p className="text-gray-600">{info.detail}</p>

              <AnimatePresence>
                {selectedContact === info.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 pt-4 border-t border-gray-100"
                  >
                    <p className="text-gray-600 text-sm">{info.moreInfo}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Map Section */}
          <motion.div
            className="lg:col-span-2 bg-white rounded-2xl shadow-md overflow-hidden h-[420px] relative cursor-pointer"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onClick={() => {
              window.open(
                "https://www.google.com/maps/dir/?api=1&destination=PRAMUKH+SQUARE+Kudasan-sargasan+road+Gandhinagar+382421",
                "_blank"
              );
            }}
          >
            <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>

            {mapActive && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14670.484629541077!2d72.61115755362789!3d23.18402306497185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395c2b8bc10762b5%3A0x2f81295ef85614b4!2sPRAMUKH%20SQUARE!5e0!3m2!1sen!2sin!4v1747904704037!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                  <div className="relative">
                    <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center animate-ping absolute"></div>
                    <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center relative">
                      <FaMapMarkerAlt className="text-white" />
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 bg-white p-2 rounded-lg shadow-md">
                  <p className="text-xs font-medium">HousingWalaa</p>
                  <p className="text-xs text-gray-600">Gandhinagar,Gujarat, India</p>
                </div>
              </motion.div>
            )}

            <div className="absolute top-4 left-4 bg-white px-4 py-2 rounded-full shadow-md z-10">
              <h3 className="font-medium text-gray-900">Our Location</h3>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="lg:col-span-3 bg-white p-8 rounded-2xl shadow-md"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Send Us a Message
            </h2>

            <AnimatePresence>
              {formSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-green-50 border border-green-200 text-green-700 px-4 py-5 rounded-lg flex items-center mb-6"
                >
                  <FaCheck className="text-green-500 mr-3 text-lg" />
                  <div>
                    <p className="font-medium">Message sent successfully!</p>
                    <p className="text-sm">
                      We'll get back to you as soon as possible.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Your Name
                    </label>
                    <motion.div whileTap={{ scale: 0.99 }}>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`block w-full px-4 py-3 border ${
                          formErrors.name
                            ? "border-red-300 ring-1 ring-red-300"
                            : "border-gray-300"
                        } rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200`}
                        placeholder="Enter your full name"
                      />
                    </motion.div>
                    {formErrors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-sm text-red-600"
                      >
                        {formErrors.name}
                      </motion.p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Phone Number
                      </label>
                      <motion.div whileTap={{ scale: 0.99 }}>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`block w-full px-4 py-3 border ${
                            formErrors.phone
                              ? "border-red-300 ring-1 ring-red-300"
                              : "border-gray-300"
                          } rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200`}
                          placeholder="Enter your phone number"
                        />
                      </motion.div>
                      {formErrors.phone && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1 text-sm text-red-600"
                        >
                          {formErrors.phone}
                        </motion.p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email (Optional)
                      </label>
                      <motion.div whileTap={{ scale: 0.99 }}>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`block w-full px-4 py-3 border ${
                            formErrors.email
                              ? "border-red-300 ring-1 ring-red-300"
                              : "border-gray-300"
                          } rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200`}
                          placeholder="Enter your email address"
                        />
                      </motion.div>
                      {formErrors.email && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1 text-sm text-red-600"
                        >
                          {formErrors.email}
                        </motion.p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Your Message
                    </label>
                    <motion.div whileTap={{ scale: 0.99 }}>
                      <textarea
                        id="message"
                        name="message"
                        rows="4"
                        value={formData.message}
                        onChange={handleChange}
                        className={`block w-full px-4 py-3 border ${
                          formErrors.message
                            ? "border-red-300 ring-1 ring-red-300"
                            : "border-gray-300"
                        } rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200`}
                        placeholder="Tell us how we can help you..."
                      ></textarea>
                    </motion.div>
                    {formErrors.message && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-sm text-red-600"
                      >
                        {formErrors.message}
                      </motion.p>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex items-center justify-center py-3 px-4 rounded-lg shadow-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 ${
                      isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        <FaWhatsapp className="mr-2 text-lg" /> Send Message via WhatsApp
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </AnimatePresence>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-gray-600 text-sm text-center">
                By submitting this form, you agree to our{" "}
                <a
                  href="#"
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Terms of Service
                </a>
                .
              </p>
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <FAQSection />
      </div>
    </div>
  );
};

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How soon can I expect a response after submitting my inquiry?",
      answer:
        "We aim to respond to all inquiries within 24 hours during business days.",
    },
    {
      question: "Do I need an appointment to visit your office?",
      answer:
        "While walk-ins are welcome, we recommend scheduling an appointment.",
    },
    {
      question: "Can I schedule a property viewing on weekends?",
      answer:
        "Yes, we offer property viewings on Saturdays from 10:00 AM to 4:00 PM.",
    },
    {
      question: "What information should I provide when inquiring about a property?",
      answer:
        "Please include property reference number, your budget range, and desired location.",
    },
  ];

  return (
    <motion.div
      className="mt-16 bg-white rounded-2xl shadow-md p-8"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <button
              className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50"
              onClick={() =>
                setActiveIndex(activeIndex === index ? null : index)
              }
            >
              <span className="font-medium text-gray-900">{faq.question}</span>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                  activeIndex === index ? "transform rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ContactUs;