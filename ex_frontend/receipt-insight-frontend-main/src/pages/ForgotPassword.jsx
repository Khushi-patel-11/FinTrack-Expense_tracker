import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, Sun, Moon, Receipt, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import axios from 'axios';
const ForgotPassword = () => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Invalid email format');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/user/forgot-password/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSuccess(true);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to send reset link');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setEmail(e.target.value);
    if (error) {
      setError('');
    }
  };

  if (success) {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-background' : 'bg-gray-50'
        }`}>
        <Header />

        <div className="min-h-screen flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className={`w-full max-w-md p-8 rounded-xl shadow-lg ${isDark ? 'bg-card' : 'bg-white'
              }`}
          >
            <div className="text-center">
              <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${isDark ? 'bg-green-500/20' : 'bg-green-100'
                }`}>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>

              <h1 className={`text-2xl font-bold mb-2 ${isDark ? 'text-foreground' : 'text-gray-900'
                }`}>
                Reset Link Sent
              </h1>

              <p className={`mb-6 ${isDark ? 'text-muted-foreground' : 'text-gray-600'
                }`}>
                We've sent a password reset link to <strong>{email}</strong>.
                Check your inbox and follow the instructions.
              </p>

              <Button
                onClick={() => navigate('/auth')}
                // className={`w-full ${isDark
                //     ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
                //     : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                //   }`}
                  className='w-full mt-2 py-3 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center justify-center'

              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Sign In
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-background' : 'bg-gray-50'
      }`}>
      <Header />

      <div className="min-h-screen flex">
        {/* Left side - Branding */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          //   transition={{ duration: 0.6 }}
          //   className={`hidden lg:flex lg:w-1/2 relative overflow-hidden
          //       'bg-gradient-to-br from-blue-600 to-purple-700'
          //   `}
          className={`hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-blue-600 to-purple-700`}

        >
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/20" />
          <div className="relative z-10 flex flex-col justify-center px-12 text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="flex items-center mb-8">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm mr-4">
                  <Receipt className="w-6 h-6" />
                </div>
                <h1 className="text-3xl font-bold">ExpenseTracker</h1>
              </div>

              <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Reset Your
                <br />
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  Password
                </span>
              </h2>

              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Don't worry, it happens to the best of us. Enter your email address
                and we'll send you a link to reset your password.
              </p>

              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-400 mr-3" />
                  <span className="text-white/90">Secure password reset</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-blue-400 mr-3" />
                  <span className="text-white/90">Quick and easy process</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-purple-400 mr-3" />
                  <span className="text-white/90">Get back to tracking expenses</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-md"
          >

            {/* Header */}
            <div className="text-center mb-8">
              <h1 className={`text-3xl lg:text-4xl font-bold mb-2 ${isDark ? 'text-foreground' : 'text-gray-900'
                }`}>
                Forgot Password?
              </h1>

              <p className={`text-lg ${isDark ? 'text-muted-foreground' : 'text-gray-600'
                }`}>
                Enter your email to receive a reset link
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <div className="relative">
                  <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${isDark ? 'text-muted-foreground' : 'text-gray-500'
                    }`} />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 ${isDark
                        ? 'bg-background border-border text-foreground placeholder-muted-foreground focus:ring-ring'
                        : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500'
                      } ${error ? 'border-red-500' : ''}`}
                  />
                </div>
                {error && (
                  <div className="flex items-center mt-2 text-red-500 text-sm">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {error}
                  </div>
                )}
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                // className={`w-full py-3 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                //   isDark 
                //     ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
                //     : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                // }`}
                className='w-full py-3 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed  bg-gradient-to-r from-blue-500  to-purple-600 text-white '

              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending Reset Link...
                  </div>
                ) : (
                  'Send Reset Link'
                )}
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => navigate('/auth')}
                  className={`inline-flex items-center text-sm hover:underline transition-colors ${
                    isDark ? 'text-primary hover:text-primary/80' : 'text-blue-600 hover:text-blue-500'
                  }`}
                  // className='w-full mt-2 py-3 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center justify-center'
                  // className={`w-full ${isDark
                  //     ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
                  //     : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                  //   }`}
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back to Sign In
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;