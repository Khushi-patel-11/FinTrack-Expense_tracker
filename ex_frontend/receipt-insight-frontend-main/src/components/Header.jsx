
// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { Button } from '@/components/ui/button';
// import { useNavigate, useLocation } from 'react-router-dom';
// import {
//   FaHome,
//   FaPlus,
//   FaList,
//   FaChartPie,
//   FaMoon,
//   FaSun,
//   FaSignOutAlt
// } from 'react-icons/fa';

// const Header = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [isDarkMode, setIsDarkMode] = useState(() => {
//     // Check localStorage or default to false
//     const saved = localStorage.getItem('darkMode');
//     return saved ? JSON.parse(saved) : false;
//   });

//   const handleLogout = () => {
//     localStorage.removeItem('isAuthenticated');
//     localStorage.removeItem('username');
//     navigate('/intro');
//   };
//   useEffect(() => {
//     // Apply dark mode class to document
//     if (isDarkMode) {
//       document.documentElement.classList.add('dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//     }
//     // Save to localStorage
//     localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
//   }, [isDarkMode]);

//   const toggleDarkMode = () => {
//     setIsDarkMode(!isDarkMode);
//   };

//   const navItems = [
//     { path: '/', label: 'Dashboard', icon: FaHome },
//     { path: '/add-expense', label: 'Add Expense', icon: FaPlus },
//     { path: '/expenses', label: 'Expenses', icon: FaList },
//   ];

//   return (
//     <motion.header
//       className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-gray-200/60 dark:border-slate-700/60 sticky top-0 z-50"
//       initial={{ y: -100 }}
//       animate={{ y: 0 }}
//       transition={{ duration: 0.6 }}
//     >
//       <div className="container mx-auto px-6 py-4">
//         <div className="flex items-center justify-between">
//           {/* Logo */}
//           <motion.div
//             className="flex items-center space-x-3 cursor-pointer"
//             onClick={() => navigate('/')}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <div className="p-2 bg-indigo-500 rounded-xl">
//               <FaChartPie className="h-6 w-6 text-white" />
//             </div>
//             <div>
//               <h1 className="text-xl font-bold text-indigo-500">
//                 ExpenseTracker
//               </h1>
//               <p className="text-xs text-gray-500 dark:text-slate-400">Smart Financial Management</p>
//             </div>
//           </motion.div>

//           {/* Navigation */}
//           <nav className="hidden md:flex items-center space-x-1">
//             {navItems.map((item, index) => {
//               const Icon = item.icon;
//               const isActive = location.pathname === item.path;

//               return (
//                 <motion.div
//                   key={item.path}
//                   initial={{ opacity: 0, y: -20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                 >
//                   <Button
//                     variant={isActive ? "default" : "ghost"}
//                     onClick={() => navigate(item.path)}
//                     className={`px-4 py-2 rounded-lg transition-all duration-300 ${isActive
//                       ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25 hover:bg-indigo-600'
//                       : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-gray-100 dark:hover:bg-slate-700'
//                       }`}
//                   >
//                     <Icon className="mr-2 h-4 w-4" />
//                     {item.label}
//                   </Button>

//                 </motion.div>

//               );
//             })}
//             {/* <Button
//               onClick={handleLogout}
//               variant="outline"
//               className="border-red-200 dark:border-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
//             >
//               <FaSignOutAlt className="mr-2 h-4 w-4" />
//               Logout
//             </Button> */}

//           </nav>

//           {/* Dark Mode Toggle */}
//           {/* <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: 0.3 }}
//           >
//             <Button
//               onClick={toggleDarkMode}
//               variant="outline"
//               size="sm"
//               className="border-gray-200 dark:border-slate-600 hover:bg-gray-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400"
//             >
//               {isDarkMode ? <FaSun className="h-4 w-4" /> : <FaMoon className="h-4 w-4" />}
//             </Button>
//           </motion.div> */}
//           {/* Right Section - Logout and Dark Mode Toggle */}
//           <div className="flex items-center space-x-3">
//             {/* Logout Button */}
//             <motion.div
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: 0.2 }}
//             >
//               <Button
//                 onClick={handleLogout}
//                 variant="outline"
//                 size="sm"
//                 className="border-red-200 dark:border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
//               >
//                 Logout
//               </Button>
//             </motion.div>

//             {/* Dark Mode Toggle */}
//             <motion.div
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: 0.3 }}
//             >
//               <Button
//                 onClick={toggleDarkMode}
//                 variant="outline"
//                 size="sm"
//                 className="border-gray-200 dark:border-slate-600 hover:bg-gray-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400"
//               >
//                 {isDarkMode ? <FaSun className="h-4 w-4" /> : <FaMoon className="h-4 w-4" />}
//               </Button>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </motion.header>
//   );
// };

// export default Header;


// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { Button } from '@/components/ui/button';
// import { useNavigate, useLocation } from 'react-router-dom';
// import {
//   FaHome,
//   FaPlus,
//   FaList,
//   FaChartPie,
//   FaMoon,
//   FaSun
// } from 'react-icons/fa';

// const Header = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Track login state
//   const [isLoggedIn, setIsLoggedIn] = useState(() => {
//     if (typeof window !== 'undefined') {
//       return localStorage.getItem('isAuthenticated') === 'true';
//     }
//     return false;
//   });

//   // Dark mode toggle
//   const [isDarkMode, setIsDarkMode] = useState(() => {
//     if (typeof window !== 'undefined') {
//       const saved = localStorage.getItem('darkMode');
//       return saved ? JSON.parse(saved) : false;
//     }
//     return false;
//   });

//   // Apply dark mode class when it changes
//   useEffect(() => {
//     if (isDarkMode) {
//       document.documentElement.classList.add('dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//     }
//     localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
//   }, [isDarkMode]);

//   // Listen for login/logout changes from other parts of the app
//   useEffect(() => {
//     const handleStorageChange = () => {
//       setIsLoggedIn(localStorage.getItem('isAuthenticated') === 'true');
//     };
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);

//   // Logout
//   const handleLogout = () => {
//     localStorage.removeItem('isAuthenticated');
//     localStorage.removeItem('username');
//     setIsLoggedIn(false);
//     navigate('/intro');
//   };

//   const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

//   // Public and private nav items
//   const privateItems = [
//     { path: '/', label: 'Dashboard', icon: FaHome },
//     { path: '/add-expense', label: 'Add Expense', icon: FaPlus },
//     { path: '/expenses', label: 'Expenses', icon: FaList }
//   ];

//   const publicItems = [
//     { path: '/intro', label: 'Home', icon: FaHome }
//   ];

//   const alwaysItems = [
//     { path: '/learn-more', label: 'Learn More', icon: FaChartPie }
//   ];

//   const navItems = isLoggedIn
//     ? [...privateItems, ...alwaysItems]
//     : [...publicItems, ...alwaysItems];

//   return (
//     <motion.header
//       className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-gray-200/60 dark:border-slate-700/60 sticky top-0 z-50"
//       initial={{ y: -100 }}
//       animate={{ y: 0 }}
//       transition={{ duration: 0.6 }}
//     >
//       <div className="container mx-auto px-6 py-4 flex items-center justify-between">

//         {/* Logo */}
//         <motion.div
//           className="flex items-center space-x-3 cursor-pointer"
//           onClick={() => navigate(isLoggedIn ? '/' : '/intro')}
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//         >
//           <div className="p-2 bg-indigo-500 rounded-xl">
//             <FaChartPie className="h-6 w-6 text-white" />
//           </div>
//           <div>
//             <h1 className="text-xl font-bold text-indigo-500">
//               ExpenseTracker
//             </h1>
//             <p className="text-xs text-gray-500 dark:text-slate-400">
//               Smart Financial Management
//             </p>
//           </div>
//         </motion.div>

//         {/* Navigation */}
//         <nav className="hidden md:flex items-center space-x-1">
//           {navItems.map((item, index) => {
//             const Icon = item.icon;
//             const isActive = location.pathname === item.path;
//             return (
//               <motion.div
//                 key={item.path}
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1 }}
//               >
//                 <Button
//                   variant={isActive ? "default" : "ghost"}
//                   onClick={() => navigate(item.path)}
//                   className={`px-4 py-2 rounded-lg transition-all duration-300 ${
//                     isActive
//                       ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25 hover:bg-indigo-600'
//                       : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-gray-100 dark:hover:bg-slate-700'
//                   }`}
//                 >
//                   <Icon className="mr-2 h-4 w-4" />
//                   {item.label}
//                 </Button>
//               </motion.div>
//             );
//           })}
//         </nav>

//         {/* Right section */}
//         <div className="flex items-center space-x-3">
//           {isLoggedIn && (
//             <motion.div
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: 0.2 }}
//             >
//               <Button
//                 onClick={handleLogout}
//                 variant="outline"
//                 size="sm"
//                 className="border-red-200 dark:border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
//               >
//                 Logout
//               </Button>
//             </motion.div>
//           )}

//           {/* Dark Mode Toggle */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: 0.3 }}
//           >
//             <Button
//               onClick={toggleDarkMode}
//               variant="outline"
//               size="sm"
//               className="border-gray-200 dark:border-slate-600 hover:bg-gray-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400"
//             >
//               {isDarkMode ? <FaSun className="h-4 w-4" /> : <FaMoon className="h-4 w-4" />}
//             </Button>
//           </motion.div>
//         </div>
//       </div>
//     </motion.header>
//   );
// };

// export default Header;


// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { Button } from '@/components/ui/button';
// import { useNavigate, useLocation } from 'react-router-dom';
// import {
//   FaHome,
//   FaPlus,
//   FaList,
//   FaChartPie,
//   FaMoon,
//   FaSun
// } from 'react-icons/fa';

// const Header = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [isLoggedIn, setIsLoggedIn] = useState(() => {
//     if (typeof window !== 'undefined') {
//       return localStorage.getItem('isAuthenticated') === 'true';
//     }
//     return false;
//   });

//   const [isDarkMode, setIsDarkMode] = useState(() => {
//     if (typeof window !== 'undefined') {
//       const saved = localStorage.getItem('darkMode');
//       return saved ? JSON.parse(saved) : false;
//     }
//     return false;
//   });

//   useEffect(() => {
//     if (isDarkMode) {
//       document.documentElement.classList.add('dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//     }
//     localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
//   }, [isDarkMode]);

//   useEffect(() => {
//     const handleStorageChange = () => {
//       setIsLoggedIn(localStorage.getItem('isAuthenticated') === 'true');
//     };
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('isAuthenticated');
//     localStorage.removeItem('username');
//     setIsLoggedIn(false);
//     navigate('/intro');
//   };

//   const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

//   // If on intro page → fixed nav items
//   let navItems;
//   if (location.pathname === '/intro') {
//     navItems = [
//       { path: '/intro', label: 'Home', icon: FaHome },
//       { path: '/learn-more', label: 'Learn More', icon: FaChartPie }
//     ];
//   } else {
//     const privateItems = [
//       { path: '/', label: 'Dashboard', icon: FaHome },
//       { path: '/add-expense', label: 'Add Expense', icon: FaPlus },
//       { path: '/expenses', label: 'Expenses', icon: FaList }
//     ];
//     const publicItems = [
//       { path: '/intro', label: 'Home', icon: FaHome }
//     ];
//     const alwaysItems = [
//       { path: '/learn-more', label: 'Learn More', icon: FaChartPie }
//     ];

//     navItems = isLoggedIn
//       ? [...privateItems, ...alwaysItems]
//       : [...publicItems, ...alwaysItems];
//   }

//   return (
//     <motion.header
//       className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-gray-200/60 dark:border-slate-700/60 sticky top-0 z-50"
//       initial={{ y: -100 }}
//       animate={{ y: 0 }}
//       transition={{ duration: 0.6 }}
//     >
//       <div className="container mx-auto px-6 py-4 flex items-center justify-between">

//         {/* Logo */}
//         <motion.div
//           className="flex items-center space-x-3 cursor-pointer"
//           onClick={() => navigate(isLoggedIn ? '/' : '/intro')}
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//         >
//           <div className="p-2 bg-indigo-500 rounded-xl">
//             <FaChartPie className="h-6 w-6 text-white" />
//           </div>
//           <div>
//             <h1 className="text-xl font-bold text-indigo-500">
//               ExpenseTracker
//             </h1>
//             <p className="text-xs text-gray-500 dark:text-slate-400">
//               Smart Financial Management
//             </p>
//           </div>
//         </motion.div>

//         {/* Navigation */}
//         <nav className="hidden md:flex items-center space-x-1">
//           {navItems.map((item, index) => {
//             const Icon = item.icon;
//             const isActive = location.pathname === item.path;
//             return (
//               <motion.div
//                 key={item.path}
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1 }}
//               >
//                 <Button
//                   variant={isActive ? "default" : "ghost"}
//                   onClick={() => navigate(item.path)}
//                   className={`px-4 py-2 rounded-lg transition-all duration-300 ${
//                     isActive
//                       ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25 hover:bg-indigo-600'
//                       : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-gray-100 dark:hover:bg-slate-700'
//                   }`}
//                 >
//                   <Icon className="mr-2 h-4 w-4" />
//                   {item.label}
//                 </Button>
//               </motion.div>
//             );
//           })}

//           {/* Sign In / Sign Up for intro page */}
//           {location.pathname === '/intro' && (
//             <Button
//               onClick={() => navigate('/auth')}
//               className="ml-4 bg-indigo-500 text-white hover:bg-indigo-600"
//             >
//               Sign In / Sign Up
//             </Button>
//           )}
//         </nav>

//         {/* Right section */}
//         {location.pathname !== '/intro' && (
//           <div className="flex items-center space-x-3">
//             {isLoggedIn && (
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ delay: 0.2 }}
//               >
//                 <Button
//                   onClick={handleLogout}
//                   variant="outline"
//                   size="sm"
//                   className="border-red-200 dark:border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
//                 >
//                   Logout
//                 </Button>
//               </motion.div>
//             )}

//             {/* Dark Mode Toggle */}
//             <motion.div
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: 0.3 }}
//             >
//               <Button
//                 onClick={toggleDarkMode}
//                 variant="outline"
//                 size="sm"
//                 className="border-gray-200 dark:border-slate-600 hover:bg-gray-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400"
//               >
//                 {isDarkMode ? <FaSun className="h-4 w-4" /> : <FaMoon className="h-4 w-4" />}
//               </Button>
//             </motion.div>
//           </div>
//         )}
//       </div>
//     </motion.header>
//   );
// };

// export default Header;



// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { Button } from '@/components/ui/button';
// import { useNavigate, useLocation } from 'react-router-dom';
// import {
//   FaHome,
//   FaPlus,
//   FaList,
//   FaChartPie,
//   FaMoon,
//   FaSun
// } from 'react-icons/fa';

// const Header = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [isLoggedIn, setIsLoggedIn] = useState(() => {
//     return localStorage.getItem('isAuthenticated') === 'true';
//   });

//   const [isDarkMode, setIsDarkMode] = useState(() => {
//     const saved = localStorage.getItem('darkMode');
//     return saved ? JSON.parse(saved) : false;
//   });

//   // Apply dark mode setting
//   useEffect(() => {
//     if (isDarkMode) {
//       document.documentElement.classList.add('dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//     }
//     localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
//   }, [isDarkMode]);

//   // Listen for changes to login status
//   useEffect(() => {
//     const handleStorageChange = () => {
//       setIsLoggedIn(localStorage.getItem('isAuthenticated') === 'true');
//     };
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('isAuthenticated');
//     localStorage.removeItem('username');
//     setIsLoggedIn(false);
//     navigate('/auth');
//   };

//   const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

//   // Always visible nav items
//   const navItems = [
//     { path: '/', label: 'Home', icon: FaHome },
//     { path: '/add-expense', label: 'Add Expense', icon: FaPlus },
//     { path: '/expenses', label: 'Expenses', icon: FaList },
//     { path: '/learn-more', label: 'Learn More', icon: FaChartPie }
//   ];

//   return (
//     <motion.header
//       className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-gray-200/60 dark:border-slate-700/60 sticky top-0 z-50"
//       initial={{ y: -100 }}
//       animate={{ y: 0 }}
//       transition={{ duration: 0.6 }}
//     >
//       <div className="container mx-auto px-6 py-4 flex items-center justify-between">

//         {/* Logo */}
//         <motion.div
//           className="flex items-center space-x-3 cursor-pointer"
//           onClick={() => navigate('/')}
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//         >
//           <div className="p-2 bg-indigo-500 rounded-xl">
//             <FaChartPie className="h-6 w-6 text-white" />
//           </div>
//           <div>
//             <h1 className="text-xl font-bold text-indigo-500">
//               ExpenseTracker
//             </h1>
//             <p className="text-xs text-gray-500 dark:text-slate-400">
//               Smart Financial Management
//             </p>
//           </div>
//         </motion.div>

//         {/* Navigation */}
//         <nav className="hidden md:flex items-center space-x-1">
//           {navItems.map((item, index) => {
//             const Icon = item.icon;
//             const isActive = location.pathname === item.path;
//             return (
//               <motion.div
//                 key={item.path}
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1 }}
//               >
//                 <Button
//                   variant={isActive ? "default" : "ghost"}
//                   onClick={() => navigate(item.path)}
//                   className={`px-4 py-2 rounded-lg transition-all duration-300 ${
//                     isActive
//                       ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25 hover:bg-indigo-600'
//                       : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-gray-100 dark:hover:bg-slate-700'
//                   }`}
//                 >
//                   <Icon className="mr-2 h-4 w-4" />
//                   {item.label}
//                 </Button>
//               </motion.div>
//             );
//           })}

//           {/* Auth Button */}
//           {!isLoggedIn ? (
//             <Button
//               onClick={() => navigate('/auth')}
//               className="ml-4 bg-indigo-500 text-white hover:bg-indigo-600"
//             >
//               Sign In / Sign Up
//             </Button>
//           ) : (
//             <Button
//               onClick={handleLogout}
//               variant="outline"
//               className="ml-4 border-red-200 dark:border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
//             >
//               Logout
//             </Button>
//           )}
//         </nav>

//         {/* Dark Mode Toggle */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: 0.3 }}
//         >
//           <Button
//             onClick={toggleDarkMode}
//             variant="outline"
//             size="sm"
//             className="border-gray-200 dark:border-slate-600 hover:bg-gray-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400"
//           >
//             {isDarkMode ? <FaSun className="h-4 w-4" /> : <FaMoon className="h-4 w-4" />}
//           </Button>
//         </motion.div>
//       </div>
//     </motion.header>
//   );
// };

// export default Header;


import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  FaHome,
  FaPlus,
  FaList,
  FaChartPie,
  FaMoon,
  FaSun,
  FaInfoCircle,
  FaSignOutAlt
} from 'react-icons/fa';
// import logo from '@/assets/logo.png';
// import logo from '@/assets/logo1.png';
// import logo from '@/assets/logo2.png';
import logo from '@/assets/logo3.png';
// import logo from '@/assets/logo4.png';
const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  // Apply dark mode setting
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Listen for login status changes
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(localStorage.getItem('isAuthenticated') === 'true');
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    navigate('/auth');
  };

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const navItems = [
    { path: '/', label: 'Home', icon: FaHome },
    { path: '/add-expense', label: 'Add Expense', icon: FaPlus },
    { path: '/expenses', label: 'Expenses', icon: FaList },
    { path: '/learn-more', label: 'Learn More', icon: FaInfoCircle }
  ];

  return (
    <motion.header
      className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-gray-200/60 dark:border-slate-700/60 sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">

        {/* Left section - Logo + Nav */}
        <div className="flex items-center space-x-8">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="p-2 bg-indigo-500 rounded-xl">
              <FaChartPie className="h-6 w-6 text-white" />
            </div>
            {/* <img
              src={logo}
              alt="ExpenseTracker Logo"
              // className="h-10 w-10 object-contain"
              className="h-10 w-10 object-contain rounded-xl shadow-sm hover:scale-105 transition-transform duration-300"
            /> */}

            <div>
              <h1 className="text-xl font-bold text-indigo-500">ExpenseTracker</h1>
              <p className="text-xs text-gray-500 dark:text-slate-400">
                Smart Financial Management
              </p>
            </div>
          </motion.div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    onClick={() => navigate(item.path)}
                    className={`px-4 py-2 rounded-lg transition-all duration-300 ${isActive
                      ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25 hover:bg-indigo-600'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-gray-100 dark:hover:bg-slate-700'
                      }`}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Button>
                </motion.div>
              );
            })}
          </nav>
        </div>

        {/* Right section - Auth + Dark Mode */}
        <div className="flex items-center space-x-3">
          {!isLoggedIn ? (
            <Button
              onClick={() => navigate('/auth')}
              className="bg-indigo-500 text-white hover:bg-indigo-600"
            >
              <FaSignOutAlt className="mr-2 h-4 w-4" />
              Sign In
            </Button>
          ) : (
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-red-200 dark:border-600 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
            >
              <FaSignOutAlt className="mr-2 h-4 w-4" />
              Logout
            </Button>
          )}

          <Button
            onClick={toggleDarkMode}
            variant="outline"
            size="sm"
            className="border-gray-200 dark:border-slate-600 hover:bg-gray-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400"
          >
            {isDarkMode ? <FaSun className="h-4 w-4" /> : <FaMoon className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
