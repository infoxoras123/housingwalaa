import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTenure, setLoanTenure] = useState(20);
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [amortizationSchedule, setAmortizationSchedule] = useState([]);
  const [yearsArray, setYearsArray] = useState([]);
  const [principalArray, setPrincipalArray] = useState([]);
  const [interestArray, setInterestArray] = useState([]);

  // Calculate EMI and related values
  useEffect(() => {
    const calculateEMI = () => {
      const p = loanAmount;
      const r = interestRate / 12 / 100;
      const n = loanTenure * 12;
      
      if (p > 0 && r > 0 && n > 0) {
        // EMI calculation formula: EMI = P * r * (1 + r)^n / ((1 + r)^n - 1)
        const emiValue = p * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
        setEmi(emiValue);
        setTotalPayment(emiValue * n);
        setTotalInterest(emiValue * n - p);
        
        // Generate amortization schedule
        generateAmortizationSchedule(p, r, n, emiValue);
      } else {
        setEmi(0);
        setTotalPayment(0);
        setTotalInterest(0);
        setAmortizationSchedule([]);
      }
    };
    
    calculateEMI();
  }, [loanAmount, interestRate, loanTenure]);

  // Generate year-by-year amortization data for the chart
  const generateAmortizationSchedule = (principal, monthlyRate, numberOfPayments, monthlyEMI) => {
    let balance = principal;
    let yearlyData = [];
    let totalPrincipalPaid = 0;
    let totalInterestPaid = 0;
    
    // Prepare data for each month
    for (let payment = 1; payment <= numberOfPayments; payment++) {
      const interestForThisMonth = balance * monthlyRate;
      const principalForThisMonth = monthlyEMI - interestForThisMonth;
      
      balance -= principalForThisMonth;
      totalPrincipalPaid += principalForThisMonth;
      totalInterestPaid += interestForThisMonth;
      
      // Group by year
      if (payment % 12 === 0 || payment === numberOfPayments) {
        yearlyData.push({
          year: Math.ceil(payment / 12),
          principalPaid: totalPrincipalPaid,
          interestPaid: totalInterestPaid,
          balance: balance > 0 ? balance : 0
        });
      }
    }
    
    setAmortizationSchedule(yearlyData);
    
    // Prepare data for chart
    const years = yearlyData.map(item => `Year ${item.year}`);
    const principalPaidData = yearlyData.map(item => item.principalPaid);
    const interestPaidData = yearlyData.map(item => item.interestPaid);
    
    setYearsArray(years);
    setPrincipalArray(principalPaidData);
    setInterestArray(interestPaidData);
  };

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  // Chart data
  const chartData = {
    labels: yearsArray,
    datasets: [
      {
        label: 'Principal Paid',
        data: principalArray,
        borderColor: 'rgba(14, 165, 233, 1)', // primary-500
        backgroundColor: 'rgba(14, 165, 233, 0.2)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Interest Paid',
        data: interestArray,
        borderColor: 'rgba(249, 115, 22, 1)', // accent-500
        backgroundColor: 'rgba(249, 115, 22, 0.2)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += formatCurrency(context.parsed.y);
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        ticks: {
          callback: function(value) {
            return formatCurrency(value);
          }
        }
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Home Loan EMI Calculator</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Form */}
        <div>
          <div className="mb-6">
            <label htmlFor="loanAmount" className="form-label flex justify-between">
              <span>Loan Amount</span>
              <span className="text-primary-600">{formatCurrency(loanAmount)}</span>
            </label>
            <input
              type="range"
              id="loanAmount"
              min="100000"
              max="10000000"
              step="100000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>₹1 Lakh</span>
              <span>₹1 Crore</span>
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="interestRate" className="form-label flex justify-between">
              <span>Interest Rate</span>
              <span className="text-primary-600">{interestRate}%</span>
            </label>
            <input
              type="range"
              id="interestRate"
              min="5"
              max="20"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>5%</span>
              <span>20%</span>
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="loanTenure" className="form-label flex justify-between">
              <span>Loan Tenure</span>
              <span className="text-primary-600">{loanTenure} Years</span>
            </label>
            <input
              type="range"
              id="loanTenure"
              min="1"
              max="30"
              step="1"
              value={loanTenure}
              onChange={(e) => setLoanTenure(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1 Year</span>
              <span>30 Years</span>
            </div>
          </div>
          
          {/* Results Summary */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="bg-primary-50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-600">Monthly EMI</p>
              <p className="text-xl font-semibold text-primary-700 mt-1">{formatCurrency(emi)}</p>
            </div>
            <div className="bg-accent-50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-600">Interest Amount</p>
              <p className="text-xl font-semibold text-accent-700 mt-1">{formatCurrency(totalInterest)}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-600">Total Amount</p>
              <p className="text-xl font-semibold text-gray-700 mt-1">{formatCurrency(totalPayment)}</p>
            </div>
          </div>
        </div>
        
        {/* Chart */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Loan Amortization Chart</h3>
          <div className="bg-gray-50 p-4 rounded-lg h-[300px]">
            <Line data={chartData} options={chartOptions} />
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Payment Distribution</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div className="text-xs text-primary-600 font-semibold">
                    Principal ({((loanAmount / totalPayment) * 100).toFixed(1)}%)
                  </div>
                  <div className="text-xs text-accent-600 font-semibold">
                    Interest ({((totalInterest / totalPayment) * 100).toFixed(1)}%)
                  </div>
                </div>
                <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                  <div 
                    style={{ width: `${(loanAmount / totalPayment) * 100}%` }} 
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-500"
                  ></div>
                  <div 
                    style={{ width: `${(totalInterest / totalPayment) * 100}%` }} 
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-accent-500"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EMICalculator;