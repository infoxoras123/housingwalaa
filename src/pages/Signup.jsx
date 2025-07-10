import { useState, useEffect } from "react";
import {
  EnvelopeIcon,
  UserIcon,
  PhoneIcon,
  CheckCircleIcon,
  KeyIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import Logo from '../assets/logo.webp';
import { motion } from "framer-motion";

const SignupPage = () => {
  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // Validation state
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Prevent scrolling on mount
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, []);

  // Validation rules
  const validateField = (name, value) => {
    switch (name) {
      case "fullName":
        if (!value.trim()) return "Full name is required";
        if (value.trim().length < 3) return "Name must be at least 3 characters";
        return "";
      case "email":
        if (!value) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Invalid email format";
        return "";
      case "phone":
        if (!value) return "Phone number is required";
        if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(value))
          return "Invalid phone number";
        return "";
      case "password":
        if (!value) return "Password is required";
        if (value.length < 8) return "Password must be at least 8 characters";
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value))
          return "Must contain uppercase, lowercase and number";
        return "";
      case "confirmPassword":
        if (!value) return "Please confirm your password";
        if (value !== formData.password) return "Passwords do not match";
        return "";
      default:
        return "";
    }
  };

  // Handle input changes with validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validate on change if we've already tried to submit
    if (isSubmitting || errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: validateField(name, value)
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate all fields
    const newErrors = {};
    let isValid = true;

    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      newErrors[key] = error;
      if (error) isValid = false;
    });

    setErrors(newErrors);

    if (isValid) {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitSuccess(true);
    }
    
    setIsSubmitting(false);
  };

  // Reset form after successful submission
  useEffect(() => {
    if (submitSuccess) {
      const timer = setTimeout(() => {
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
        });
        setSubmitSuccess(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [submitSuccess]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <motion.div 
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              className="text-center mb-8"
            >
              <img src={Logo} alt="housing-walaa-logo" className="w-[180px] mx-auto pb-2" />
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Create Account
              </h1>
              <p className="text-gray-500">
                Join us today and get started
              </p>
            </motion.div>

            {submitSuccess ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-green-50 border border-green-200 rounded-xl p-6 text-center"
              >
                <div className="flex justify-center">
                  <CheckCircleIcon className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="mt-3 text-lg font-medium text-green-800">
                  Registration successful!
                </h3>
                <p className="mt-2 text-sm text-green-600">
                  Your account has been created successfully.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <UserIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-3 py-3 border ${errors.fullName ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"} rounded-lg shadow-sm placeholder-gray-400 focus:outline-none transition duration-200`}
                      placeholder="John Doe"
                    />
                  </div>
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-3 py-3 border ${errors.email ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"} rounded-lg shadow-sm placeholder-gray-400 focus:outline-none transition duration-200`}
                      placeholder="you@example.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <PhoneIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-3 py-3 border ${errors.phone ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"} rounded-lg shadow-sm placeholder-gray-400 focus:outline-none transition duration-200`}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>

                {/* Password and Confirm Password - Side by Side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <KeyIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        className={`block w-full pl-10 pr-10 py-3 border ${errors.password ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"} rounded-lg shadow-sm placeholder-gray-400 focus:outline-none transition duration-200`}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                        ) : (
                          <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <KeyIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`block w-full pl-10 pr-10 py-3 border ${errors.confirmPassword ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"} rounded-lg shadow-sm placeholder-gray-400 focus:outline-none transition duration-200`}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                        ) : (
                          <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                    )}
                  </div>
                </div>

                {/* Password requirements hint */}
                <div className="text-xs text-gray-500 -mt-3">
                  Password must contain at least 8 characters, including uppercase, lowercase, and a number
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  className={`w-full py-3 px-4 rounded-lg font-medium text-white ${isSubmitting ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 shadow-md`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating Account...
                    </span>
                  ) : (
                    "Create Account"
                  )}
                </motion.button>
              </form>
            )}

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <a href="/login" className="font-medium text-blue-600 hover:text-blue-500 transition duration-200">
                  Sign in
                </a>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;