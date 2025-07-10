import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from '../assets/logo.webp';

const Login = () => {
  const [formData, setFormData] = useState({ mobile: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [shake, setShake] = useState(false);
  const [focusField, setFocusField] = useState(null);

  // Add a subtle animation when errors occur
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setShake(true);
      const timer = setTimeout(() => setShake(false), 500);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  // Validate form
  const validate = () => {
    const newErrors = {};
    if (!formData.mobile) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Please enter a valid 10-digit mobile number";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one uppercase letter";
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one number";
    }

    return newErrors;
  };

  // Validate on change when field has been touched
  useEffect(() => {
    if (touched.phone || touched.password) {
      setErrors(validate());
    }
  }, [formData, touched]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "mobile" && !/^\d*$/.test(value)) {
      return; // Only allow digits in mobile field
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when typing, but only if the new value is valid
    if (errors[name]) {
      if ((name === "mobile" && /^\d{10}$/.test(value))) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      } else if (name === "password" && value.length >= 6) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({
      phone: true,
      password: true
    });

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    // Simulate API call with error handling
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Logging in with:", formData);
      // Here you would typically redirect on success
    } catch (error) {
      setErrors({ form: "Invalid credentials. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className={`w-full max-w-md rounded-2xl overflow-hidden shadow-2xl bg-white p-8 sm:p-10 transition-all duration-300 ${shake ? "animate-shake" : ""}`}>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-700 mb-1">Welcome to</h2>
          <Link to="/" className="inline-block transition-transform hover:scale-105">
            <img src={logo} alt="housingwalaa Logo" className="w-48 mx-auto mb-2" />
          </Link>
          <p className="text-gray-500 text-sm">Find your perfect stay with us</p>
        </div>

        {errors.form && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.form}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
              <div className="mt-1 relative rounded-md shadow-sm transition-all duration-200">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">+91</span>
                </div>
                <input
                  id="mobile"
                  name="mobile"
                  type="text"
                  maxLength={10}
                  value={formData.mobile}
                  onChange={handleChange}
                  onFocus={() => setFocusField('mobile')}
                  onBlur={() => setFocusField(null)}
                  className={`w-full pl-12 pr-4 py-3 border ${
                    errors.mobile ? "border-red-500" : focusField === 'mobile' ? "border-blue-500" : "border-gray-300"
                  } rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
                    focusField === 'mobile' ? "ring-blue-400" : "ring-transparent"
                  } transition-all duration-200 text-sm`}
                  placeholder="Enter 10-digit mobile number"
                />
                {formData.mobile && !errors.mobile && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              {errors.mobile && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.mobile}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="mt-1 relative rounded-md shadow-sm transition-all duration-200">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setFocusField('password')}
                  onBlur={() => setFocusField(null)}
                  className={`w-full px-4 py-3 border ${
                    errors.password ? "border-red-500" : focusField === 'password' ? "border-blue-500" : "border-gray-300"
                  } rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
                    focusField === 'password' ? "ring-blue-400" : "ring-transparent"
                  } transition-all duration-200 text-sm`}
                  placeholder="••••••••"
                />
                <div 
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer transition-colors hover:text-blue-600" 
                  onClick={togglePasswordVisibility}
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </div>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.password}
                </p>
              )}
            </div>
            {errors.password && touched.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input 
                id="remember-me" 
                name="remember-me" 
                type="checkbox" 
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition" 
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 cursor-pointer hover:text-gray-700 transition">Remember me</label>
            </div>
            <div className="text-sm">
              <Link 
                to="/forgot-password" 
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors flex items-center"
              >
                Forgot password?
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] ${
              isSubmitting ? "opacity-80 cursor-not-allowed" : ""
            }`}
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
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Signing in...
              </>
            ) : (
              <>
                Sign in
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-700">
          New here?{' '}
          <Link 
            to="/signup" 
            className="text-blue-600 hover:text-blue-800 font-medium transition-colors inline-flex items-center"
          >
            Create an account to find your perfect stay
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;