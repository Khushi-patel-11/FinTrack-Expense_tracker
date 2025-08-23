import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
// import { Eye, EyeOff, Mail, Lock, User, Sun, Moon } from 'lucide-react';
import { Eye, EyeOff, Mail, Lock, User, Sun, Moon, TrendingUp, Receipt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';

const Auth = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "true") setDarkMode(true);
  }, []);
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);
//   useEffect(() => {
//   const token = localStorage.getItem('token');
//   console.log('Token is exists :', token);
//   if (token) {
//     // Optionally, verify token with backend before redirecting
//     navigate('/'); // Redirect to home if token exists
//   }
//   // If no token, show login form
// }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (isSignUp) {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    setIsLoading(true);

    try {
      if (isSignUp) {
        // Sign Up API
        const res = await axios.post('http://127.0.0.1:8000/user/signup/', {
          name: formData.name,
          email: formData.email,
          password: formData.password
        });

        // Optional: success message
        console.log('Signup Success:', res.data);
        // Do NOT set token or isAuthenticated here
        // localStorage.setItem('username', res.data.name);
        // localStorage.setItem('token', res.data.token);
        // localStorage.setItem('isAuthenticated', 'true');

        // After signup, switch to sign-in form
        setIsSignUp(false);

      } else {
        // Sign In API
        console.log('signin page')
        const res = await axios.post('http://127.0.0.1:8000/user/signin/', {
          email: formData.email,
          password: formData.password
        });

        // Optional: handle token or session
        console.log('Login Success:', res.data);
        localStorage.setItem('username', res.data.name);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('isAuthenticated', 'true');
        // Redirect to dashboard after login
        navigate('/'); // Redirect to dashboard
      }

      // localStorage.setItem('isAuthenticated', 'true');
      // navigate('/'); // Redirect to dashboard

    } catch (error) {
      console.error('Auth Error:', error.response?.data || error.message);
      alert(error.response?.data?.error || "Authentication failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    // <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${isDark ? 'bg-[#0f172a]' : 'bg-gray-50'
    //   }`}>
    //   <motion.div
    //     initial={{ opacity: 0, y: 20, scale: 0.95 }}
    //     animate={{ opacity: 1, y: 0, scale: 1 }}
    //     transition={{ duration: 0.5 }}
    //     className={`w-full max-w-md rounded-2xl shadow-2xl border transition-all duration-300 ${isDark
    //       ? 'bg-[#1e293b] border-slate-700'
    //       : 'bg-white border-gray-200'
    //       }`}
    //   >
    //     {/* Theme Toggle */}
    //     <div className="flex justify-end p-6 pb-0">
    //       <Button
    //         variant="ghost"
    //         size="sm"
    //         onClick={toggleTheme}
    //         className={`${isDark
    //           ? 'text-slate-400 hover:text-white hover:bg-slate-700'
    //           : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
    //           }`}
    //       >
    //         {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    //       </Button>
    //     </div>

    //     <div className="px-8 pb-8">
    //       {/* Header */}
    //       <div className="text-center mb-8">
    //         <motion.div
    //           initial={{ scale: 0 }}
    //           animate={{ scale: 1 }}
    //           transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
    //           className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gradient-to-r from-purple-700 to-purple-500"
    //         >
    //           <User className="w-8 h-8 text-white" />
    //         </motion.div>

    //         <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'
    //           }`}>
    //           Receipt Insight
    //         </h1>

    //         <p className={`${isDark ? 'text-slate-400' : 'text-gray-600'
    //           }`}>
    //           Your AI-powered expense tracker
    //         </p>
    //       </div>

    //       {/* Tabs */}
    //       <div className={`flex mb-8 p-1 rounded-xl ${isDark ? 'bg-[#0f172a]' : 'bg-gray-100'
    //         }`}>
    //         <button
    //           onClick={() => setIsSignUp(false)}
    //           className={`flex-1 py-2.5 px-4 text-sm font-medium rounded-lg transition-all duration-200 ${!isSignUp
    //             ? 'bg-gradient-to-r from-purple-700 to-purple-500 text-white shadow-lg'
    //             : isDark
    //               ? 'text-slate-400 hover:text-white'
    //               : 'text-gray-600 hover:text-gray-900'
    //             }`}
    //         >
    //           Sign In
    //         </button>
    //         <button
    //           onClick={() => setIsSignUp(true)}
    //           className={`flex-1 py-2.5 px-4 text-sm font-medium rounded-lg transition-all duration-200 ${isSignUp
    //             ? 'bg-gradient-to-r from-purple-700 to-purple-500 text-white shadow-lg'
    //             : isDark
    //               ? 'text-slate-400 hover:text-white'
    //               : 'text-gray-600 hover:text-gray-900'
    //             }`}
    //         >
    //           Sign Up
    //         </button>
    //       </div>

    //       {/* Form */}
    //       <form onSubmit={handleSubmit} className="space-y-6">
    // <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-background' : 'bg-background'
    //   }`}>
    <div className={darkMode ? "dark" : ""}>
      {/* <Header /> */}
      <div className="min-h-screen flex">
        {/* Left side - Branding */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          // className={`hidden lg:flex lg:w-1/2 relative overflow-hidden ${isDark ? 'bg-gradient-to-br from-primary/20 to-accent/20' : 'bg-gradient-to-br from-blue-600 to-purple-700'
          className={`hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-blue-600 to-purple-700
            }`}
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
                Smart Financial
                <br />
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  Management
                </span>
              </h2>

              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Take control of your spending with smart categorization, detailed reports, and actionable insights.
              </p>

              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-400 mr-3" />
                  <span className="text-white/90">Easy expense recording</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-blue-400 mr-3" />
                  <span className="text-white/90">Smart budget recommendations</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-purple-400 mr-3" />
                  <span className="text-white/90">Real-time expense tracking</span>
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
            {/* Theme Toggle
            <div className="flex justify-between items-center mb-8">
              <div className="lg:hidden flex items-center">
                <Receipt className={`w-6 h-6 mr-2 ${isDark ? 'text-primary' : 'text-blue-600'}`} />
                <span className={`text-xl font-bold ${isDark ? 'text-foreground' : 'text-gray-900'}`}>
                  ExpenseTracker
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className={`${isDark
                  ? 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
              >
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </div> */}

            {/* Header */}
            <div className="text-center mb-8">
              <h1 className={`text-3xl lg:text-4xl font-bold mb-2 ${isDark ? 'text-foreground' : 'text-gray-900'
                }`}>
                {isSignUp ? 'Create Account' : 'Welcome Back'}
              </h1>

              <p className={`text-lg ${isDark ? 'text-muted-foreground' : 'text-gray-600'
                }`}>
                {isSignUp
                  ? 'Start your financial journey today'
                  : 'Sign in to your account'
                }
              </p>
            </div>

            {/* Tabs */}
            {/* <div className={`flex mb-8 p-1 rounded-xl ${isDark ? 'bg-muted' : 'bg-gray-100'
              }`}>
              <button
                onClick={() => setIsSignUp(false)}
                // className={`flex-1 py-3 px-4 text-sm font-medium rounded-lg transition-all duration-200 ${!isSignUp
                //   ? isDark
                //     ? 'bg-primary text-primary-foreground shadow-lg'
                //     : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                //   : isDark
                //     ? 'text-muted-foreground hover:text-foreground'
                //     : 'text-gray-600 hover:text-gray-900'
                //   }`}
                className='hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-blue-600 to-purple-700'
              >
                Sign In
              </button>
              <button
                onClick={() => setIsSignUp(true)}
                // className={`flex-1 py-3 px-4 text-sm font-medium rounded-lg transition-all duration-200 ${isSignUp
                //   ? isDark
                //     ? 'bg-primary text-primary-foreground shadow-lg'
                //     : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                //   : isDark
                //     ? 'text-muted-foreground hover:text-foreground'
                //     : 'text-gray-600 hover:text-gray-900'
                //   }`}
                // className='flex-1 py-3 px-4 text-sm font-medium rounded-lg transition-all duration-200 hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-blue-600 to-purple-700'
              >
                Sign Up
              </button>
            </div> */}

            <div className="flex mb-8 p-1 rounded-xl bg-gray-100 dark:bg-muted">
              <button
                onClick={() => setIsSignUp(false)}
                className={`flex-1 py-3 px-4 text-sm font-medium rounded-lg transition-all duration-200 ${!isSignUp
                    ? 'bg-gradient-to-r from-blue-500  to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900 dark:text-muted-foreground dark:hover:text-foreground'
                  }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsSignUp(true)}
                className={`flex-1 py-3 px-4 text-sm font-medium rounded-lg transition-all duration-200 ${isSignUp
                    // ? 'bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white shadow-lg'
                    ? 'bg-gradient-to-r from-blue-500  to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900 dark:text-muted-foreground dark:hover:text-foreground'
                  }`}
              >
                Sign Up
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {isSignUp && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative">
                    {/* <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5
                    //  ${isDark ? 'text-slate-400' : 'text-gray-500'
                      isDark ? 'text-muted-foreground' : 'text-gray-500'
                      }`} /> */}

                    <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5
                      isDark ? 'text-muted-foreground' : 'text-gray-500'
                      }`} />

                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      // className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 ${isDark
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 
                          ${isDark
                          // ? 'bg-[#0f172a] border-slate-600 text-white placeholder-slate-400'
                          // : 'bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500'
                          ? 'bg-background border-border text-foreground placeholder-muted-foreground focus:ring-ring'
                          : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500'
                        } ${errors.name ? 'border-red-500' : ''}`}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </motion.div>
              )}

              <div>
                <div className="relative">
                  <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${isDark ? 'text-slate-400' : 'text-gray-500'
                    }`} />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    // className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 
                      ${isDark
                        // ? 'bg-[#0f172a] border-slate-600 text-white placeholder-slate-400'
                        // : 'bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500'
                        ? 'bg-background border-border text-foreground placeholder-muted-foreground focus:ring-ring'
                        : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500'
                      } ${errors.email ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <div className="relative">
                  <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5
                   ${isDark
                      //  ? 'text-slate-400' : 'text-gray-500'
                      ? 'text-muted-foreground' : 'text-gray-500'
                    }`} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    // className={`w-full pl-10 pr-12 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 
                    className={`w-full pl-10 pr-12 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 

                      ${isDark
                        // ? 'bg-[#0f172a] border-slate-600 text-white placeholder-slate-400'
                        // : 'bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500'
                        ? 'bg-background border-border text-foreground placeholder-muted-foreground focus:ring-ring'
                        : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500'
                      } ${errors.password ? 'border-red-500' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2
                       ${isDark
                        // ? 'text-slate-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'
                        ? 'text-muted-foreground hover:text-foreground' : 'text-gray-500 hover:text-gray-700'
                      }`}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}

                {!isSignUp && (
                  <div className="mt-2">
                    <button
                      type="button"
                      onClick={() => navigate('/forgot-password')}
                      className={`text-sm hover:underline ${isDark
                        // ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-500'
                        ? 'text-primary hover:text-primary/80' : 'text-blue-600 hover:text-blue-500'
                        }`}
                    >
                      Forgot Password?
                    </button>
                  </div>
                )}
              </div>

              {isSignUp && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative">
                    <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${isDark
                      //  ? 'text-slate-400' : 'text-gray-500'
                      ? 'text-muted-foreground' : 'text-gray-500'
                      }`} />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      // className={`w-full pl-10 pr-12 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 ${isDark
                      className={`w-full pl-10 pr-12 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2  ${isDark
                        // ? 'bg-[#0f172a] border-slate-600 text-white placeholder-slate-400'
                        // : 'bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500'
                        ? 'bg-background border-border text-foreground placeholder-muted-foreground focus:ring-ring'
                        : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500'
                        } ${errors.confirmPassword ? 'border-red-500' : ''}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${isDark
                        //  ? 'text-slate-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'
                        ? 'text-muted-foreground hover:text-foreground' : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                  )}
                </motion.div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                // className="w-full py-3 bg-gradient-to-r from-purple-700 to-purple-500 hover:from-purple-800 hover:to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                // className={`w-full py-3 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${isDark
                //   ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
                //   : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                //   }`}
                className='w-full py-3 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed  bg-gradient-to-r from-blue-500  to-purple-600 text-white '
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    {isSignUp ? 'Creating Account...' : 'Signing In...'}
                  </div>
                ) : (
                  isSignUp ? 'Create Account' : 'Sign In'
                )}
              </Button>
            </form>
          </motion.div>
        </div>
        {/* </motion.div> */}
      </div>
    </div>
  );
};

export default Auth;
