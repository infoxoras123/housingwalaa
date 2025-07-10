import { Link } from 'react-router-dom';
import EMICalculator from '../components/calculator/EMICalculator';
import { FaCalculator, FaChartLine, FaPercentage, FaClock, FaRegLightbulb } from 'react-icons/fa';

const EMICalculatorPage = () => {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">Home Loan EMI Calculator</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Plan your finances with our easy-to-use EMI calculator. Estimate your monthly payments, 
            total interest, and more for your home loan.
          </p>
        </div>

        {/* Main Calculator */}
        <div className="mb-12">
          <EMICalculator />
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="rounded-lg border border-gray-200 p-5">
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <FaCalculator className="text-primary-500 mr-2" />
                What is EMI?
              </h3>
              <p className="text-gray-700">
                EMI (Equated Monthly Installment) is the fixed amount that you pay to the bank or 
                financial institution every month until the loan is fully paid off. It consists of 
                the principal amount and the interest on your loan.
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 p-5">
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <FaChartLine className="text-primary-500 mr-2" />
                How is EMI calculated?
              </h3>
              <p className="text-gray-700">
                The EMI is calculated using the formula: EMI = P × r × (1 + r)^n / ((1 + r)^n - 1), where P 
                is the principal loan amount, r is the monthly interest rate, and n is the total number of 
                monthly payments.
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 p-5">
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <FaPercentage className="text-primary-500 mr-2" />
                How does the interest rate affect my EMI?
              </h3>
              <p className="text-gray-700">
                A higher interest rate increases your EMI or extends your loan tenure. Even a small difference 
                in interest rate can significantly impact the total interest paid over the loan term.
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 p-5">
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <FaClock className="text-primary-500 mr-2" />
                How does the loan tenure affect my EMI?
              </h3>
              <p className="text-gray-700">
                A longer loan tenure reduces your monthly EMI but increases the total interest paid over the
                life of the loan. A shorter tenure means higher EMIs but less interest overall.
              </p>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-primary-50 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-6 text-center text-primary-800">Home Loan Tips</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-lg shadow-sm flex">
              <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 mr-4">
                <FaRegLightbulb className="text-primary-600 text-xl" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Prepay when possible</h3>
                <p className="text-gray-700 text-sm">
                  Making prepayments reduces your loan principal and total interest cost. Even small 
                  prepayments can lead to significant savings over time.
                </p>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow-sm flex">
              <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 mr-4">
                <FaRegLightbulb className="text-primary-600 text-xl" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Compare loan offers</h3>
                <p className="text-gray-700 text-sm">
                  Shop around and compare offers from different lenders. Even a slight difference in 
                  interest rate can save you a significant amount over the loan tenure.
                </p>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow-sm flex">
              <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 mr-4">
                <FaRegLightbulb className="text-primary-600 text-xl" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Consider refinancing</h3>
                <p className="text-gray-700 text-sm">
                  If interest rates fall significantly, consider refinancing your loan to take advantage 
                  of the lower rates and reduce your EMI or loan tenure.
                </p>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow-sm flex">
              <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 mr-4">
                <FaRegLightbulb className="text-primary-600 text-xl" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Maintain a good credit score</h3>
                <p className="text-gray-700 text-sm">
                  A higher credit score can help you secure a home loan at a lower interest rate, 
                  potentially saving you lakhs of rupees over the loan term.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EMICalculatorPage;