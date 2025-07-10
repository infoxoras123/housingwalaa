import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.webp";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [shake, setShake] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);

  // Validate email format
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(email));
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isValidEmail) {
      setError("Please enter a valid email address");
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess(true);
    } catch (err) {
      setError("Failed to send reset link. Please try again.");
      setShake(true);
      setTimeout(() => setShake(false), 500);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className={`w-full max-w-md rounded-2xl overflow-hidden shadow-2xl bg-white p-8 sm:p-10 transition-all ${shake ? "animate-shake" : ""}`}>
        <div className="text-center mb-8">
          <Link to="/" className="inline-block transition-transform hover:scale-105">
            <img src={Logo} alt="Logo" className="w-[170px] mx-auto" />
            {/* <h1 className="text-3xl font-bold text-blue-600">YourLogo</h1> */}
          </Link>
          <h2 className="mt-4 text-2xl font-bold text-gray-900">
            Forgot your password?
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your email and we'll send you a link to reset your password.
          </p>
        </div>

        {success ? (
          <div className="text-center p-4 bg-green-50 rounded-lg mb-6 animate-fade-in">
            <div className="flex items-center justify-center text-green-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Check your email for a password reset link.</span>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Didn't receive the email? <button 
                onClick={() => setSuccess(false)} 
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Try again
              </button>
            </p>
          </div>
        ) : (
          <>
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm flex items-center animate-fade-in">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="animate-slide-up delay-100">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError(null);
                      }}
                      className={`block w-full px-4 py-3 border ${
                        error ? "border-red-500" : "border-gray-300"
                      } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                      placeholder="you@example.com"
                    />
                    {isValidEmail && email && (
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !email}
                className={`w-full flex justify-center items-center py-3 px-4 rounded-lg shadow-sm text-base font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 ${
                  isSubmitting ? "opacity-80 cursor-not-allowed" : ""
                } ${!email ? "opacity-70 cursor-not-allowed" : "hover:shadow-md transform hover:-translate-y-0.5"}`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Reset Link
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </>
        )}

        <div className="mt-6 text-center text-sm text-gray-600">
          Remember your password?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center"
          >
            Sign in
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;