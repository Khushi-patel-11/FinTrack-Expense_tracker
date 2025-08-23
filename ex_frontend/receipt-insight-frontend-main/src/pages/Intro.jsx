
// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { 
//   Receipt, 
//   Tags, 
//   TrendingUp, 
//   Shield, 
//   Lock, 
//   Sparkles,
//   Moon,
//   Sun,
//   ArrowRight
// } from 'lucide-react';
// import { Button } from '@/components/ui/button';

// const Intro = () => {
//   const navigate = useNavigate();
//   const [isDark, setIsDark] = useState(true);

//   useEffect(() => {
//     // Check if user is already authenticated
//     if (localStorage.getItem('isAuthenticated') === 'true') {
//       navigate('/');
//     }
//   }, [navigate]);

//   const toggleTheme = () => {
//     setIsDark(!isDark);
//     document.documentElement.classList.toggle('dark');
//   };

//   const handleGetStarted = () => {
//     navigate('/auth');
//   };

//   const features = [
//     {
//       icon: Receipt,
//       title: "AI-Powered Receipt Scanning",
//       description: "Simply snap a photo of your receipt and let our AI extract all the details automatically.",
//       delay: 0.1
//     },
//     {
//       icon: Tags,
//       title: "Auto-Categorization",
//       description: "Smart categorization of your expenses saves time and keeps your finances organized.",
//       delay: 0.2
//     },
//     {
//       icon: TrendingUp,
//       title: "Visual Insights & Predictions",
//       description: "Get monthly visualizations and spending predictions to make informed financial decisions.",
//       delay: 0.3
//     },
//     {
//       icon: Shield,
//       title: "Secure Login System",
//       description: "Your account is protected with industry-standard security measures.",
//       delay: 0.4
//     },
//     {
//       icon: Lock,
//       title: "Data Privacy",
//       description: "Your financial data is encrypted and stored securely. We never share your information.",
//       delay: 0.5
//     }
//   ];

//   return (
//     <div className={`min-h-screen transition-colors duration-500 ${
//       isDark 
//         ? 'bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900' 
//         : 'bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50'
//     }`}>
//       {/* Theme Toggle */}
//       <div className="absolute top-6 right-6 z-10">
//         <Button
//           variant="outline"
//           size="icon"
//           onClick={toggleTheme}
//           className={`${
//             isDark 
//               ? 'bg-slate-800/50 border-slate-700 hover:bg-slate-700/50' 
//               : 'bg-white/50 border-gray-200 hover:bg-white/80'
//           } backdrop-blur-sm`}
//         >
//           {isDark ? (
//             <Sun className="h-4 w-4 text-yellow-500" />
//           ) : (
//             <Moon className="h-4 w-4 text-slate-600" />
//           )}
//         </Button>
//       </div>

//       <div className="container mx-auto px-4 py-12">
//         {/* Hero Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-16"
//         >
//           <motion.div
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
//             className="inline-flex items-center justify-center w-20 h-20 mb-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-600"
//           >
//             <Sparkles className="w-10 h-10 text-white" />
//           </motion.div>

//           <motion.h1
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3, duration: 0.8 }}
//             className={`text-5xl md:text-7xl font-bold mb-6 ${
//               isDark ? 'text-white' : 'text-gray-900'
//             }`}
//           >
//             Track Expenses Smarter with{' '}
//             <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
//               SmartBill
//             </span>
//           </motion.h1>

//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.5, duration: 0.8 }}
//             className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto ${
//               isDark ? 'text-slate-300' : 'text-gray-600'
//             }`}
//           >
//             Transform how you manage expenses with AI-powered receipt scanning, 
//             smart categorization, and insightful financial analytics.
//           </motion.p>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.7, duration: 0.8 }}
//           >
//             <Button
//               onClick={handleGetStarted}
//               size="lg"
//               className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
//             >
//               Get Started
//               <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
//             </Button>
//           </motion.div>
//         </motion.div>

//         {/* Features Grid */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
//           {features.map((feature, index) => (
//             <motion.div
//               key={feature.title}
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: feature.delay + 0.8, duration: 0.6 }}
//               className={`p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:scale-105 ${
//                 isDark 
//                   ? 'bg-slate-800/50 border-slate-700/50 hover:bg-slate-800/70' 
//                   : 'bg-white/50 border-gray-200/50 hover:bg-white/80'
//               }`}
//             >
//               <div className={`inline-flex items-center justify-center w-12 h-12 mb-4 rounded-lg ${
//                 isDark ? 'bg-purple-600/20' : 'bg-purple-100'
//               }`}>
//                 <feature.icon className={`w-6 h-6 ${
//                   isDark ? 'text-purple-400' : 'text-purple-600'
//                 }`} />
//               </div>
              
//               <h3 className={`text-xl font-semibold mb-3 ${
//                 isDark ? 'text-white' : 'text-gray-900'
//               }`}>
//                 {feature.title}
//               </h3>
              
//               <p className={`${
//                 isDark ? 'text-slate-300' : 'text-gray-600'
//               }`}>
//                 {feature.description}
//               </p>
//             </motion.div>
//           ))}
//         </div>

//         {/* Bottom CTA */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 1.5, duration: 0.8 }}
//           className="text-center mt-16"
//         >
//           <div className={`inline-block p-8 rounded-2xl backdrop-blur-sm border ${
//             isDark 
//               ? 'bg-slate-800/30 border-slate-700/30' 
//               : 'bg-white/30 border-gray-200/30'
//           }`}>
//             <h2 className={`text-2xl font-bold mb-4 ${
//               isDark ? 'text-white' : 'text-gray-900'
//             }`}>
//               Ready to take control of your expenses?
//             </h2>
//             <p className={`mb-6 ${
//               isDark ? 'text-slate-300' : 'text-gray-600'
//             }`}>
//               Join thousands of users who are already managing their finances smarter.
//             </p>
//             <Button
//               onClick={handleGetStarted}
//               variant="outline"
//               size="lg"
//               className={`${
//                 isDark 
//                   ? 'border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white' 
//                   : 'border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white'
//               } px-6 py-3 font-semibold rounded-full transition-all duration-300`}
//             >
//               Start Your Journey
//             </Button>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Intro;



// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { 
//   Receipt, 
//   Tags, 
//   TrendingUp, 
//   Shield, 
//   Lock, 
//   Sparkles,
//   Moon,
//   Sun,
//   ArrowRight
// } from 'lucide-react';
// import { Button } from '@/components/ui/button';

// const Intro = () => {
//   const navigate = useNavigate();
//   const [isDark, setIsDark] = useState(true);

//   useEffect(() => {
//     // Check if user is already authenticated
//     if (localStorage.getItem('isAuthenticated') === 'true') {
//       navigate('/');
//     }
//   }, [navigate]);

//   const toggleTheme = () => {
//     setIsDark(!isDark);
//     document.documentElement.classList.toggle('dark');
//   };

//   const handleGetStarted = () => {
//     navigate('/auth');
//   };

//   const features = [
//     {
//       icon: Receipt,
//       title: "AI-Powered Receipt Scanning",
//       description: "Simply snap a photo of your receipt and let our AI extract all the details automatically.",
//       delay: 0.1
//     },
//     {
//       icon: Tags,
//       title: "Auto-Categorization",
//       description: "Smart categorization of your expenses saves time and keeps your finances organized.",
//       delay: 0.2
//     },
//     {
//       icon: TrendingUp,
//       title: "Visual Insights & Predictions",
//       description: "Get monthly visualizations and spending predictions to make informed financial decisions.",
//       delay: 0.3
//     },
//     {
//       icon: Shield,
//       title: "Secure Login System",
//       description: "Your account is protected with industry-standard security measures.",
//       delay: 0.4
//     },
//     {
//       icon: Lock,
//       title: "Data Privacy",
//       description: "Your financial data is encrypted and stored securely. We never share your information.",
//       delay: 0.5
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-slate-100 dark:from-slate-900 dark:via-purple-900/20 dark:to-indigo-900/30 transition-all duration-300">
//       {/* Theme Toggle */}
//       <div className="absolute top-6 right-6 z-10">
//         <Button
//           variant="outline"
//           size="icon"
//           onClick={toggleTheme}
//           className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-700 shadow-lg"
//         >
//           {isDark ? (
//             <Sun className="h-4 w-4 text-yellow-500" />
//           ) : (
//             <Moon className="h-4 w-4 text-slate-600" />
//           )}
//         </Button>
//       </div>

//       <div className="container mx-auto px-6 py-12 max-w-7xl">
//         {/* Hero Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-16"
//         >
//           <motion.div
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
//             className="inline-flex items-center justify-center w-20 h-20 mb-8 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 shadow-2xl shadow-indigo-500/25"
//           >
//             <Sparkles className="w-10 h-10 text-white" />
//           </motion.div>

//           <motion.h1
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3, duration: 0.8 }}
//             className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-slate-800 dark:text-slate-100 leading-tight"
//           >
//             Track Expenses Smarter with{' '}
//             <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
//               SmartBill
//             </span>
//           </motion.h1>

//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.5, duration: 0.8 }}
//             className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-slate-600 dark:text-slate-400 leading-relaxed"
//           >
//             Transform how you manage expenses with AI-powered receipt scanning, 
//             smart categorization, and insightful financial analytics.
//           </motion.p>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.7, duration: 0.8 }}
//             className="flex flex-col sm:flex-row gap-4 justify-center"
//           >
//             <Button
//               onClick={handleGetStarted}
//               size="lg"
//               className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-300 group"
//             >
//               Get Started
//               <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
//             </Button>
//             <Button
//               variant="outline"
//               size="lg"
//               className="border-gray-200 dark:border-slate-600 hover:bg-gray-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
//             >
//               Learn More
//             </Button>
//           </motion.div>
//         </motion.div>

//         {/* Features Grid */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
//           {features.map((feature, index) => (
//             <motion.div
//               key={feature.title}
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: feature.delay + 0.8, duration: 0.6 }}
//               className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 shadow-lg rounded-xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl group cursor-pointer"
//             >
//               <div className="p-2 bg-indigo-500 rounded-xl w-fit mb-4">
//                 <feature.icon className="w-6 h-6 text-white" />
//               </div>
              
//               <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-100">
//                 {feature.title}
//               </h3>
              
//               <p className="text-slate-600 dark:text-slate-400">
//                 {feature.description}
//               </p>
//             </motion.div>
//           ))}
//         </div>

//         {/* Bottom CTA */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 1.5, duration: 0.8 }}
//           className="text-center"
//         >
//           <div className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 shadow-lg rounded-xl p-8 max-w-2xl mx-auto">
//             <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">
//               Ready to take control of your expenses?
//             </h2>
//             <p className="mb-6 text-slate-600 dark:text-slate-400">
//               Join thousands of users who are already managing their finances smarter.
//             </p>
//             <Button
//               onClick={handleGetStarted}
//               size="lg"
//               className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-3 font-semibold rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-300"
//             >
//               Start Your Journey
//             </Button>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Intro;



import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Receipt, 
  Tags, 
  TrendingUp, 
  Shield, 
  Lock, 
  Sparkles,
  Moon,
  Sun,
  ArrowRight,FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import ScrollToTop from '@/components/ScrollToTop';


const Intro = () => {
  const navigate = useNavigate();
  // const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated
    if (localStorage.getItem('isAuthenticated') === 'true') {
      navigate('/');
    }
  }, [navigate]);

  // const toggleTheme = () => {
  //   setIsDark(!isDark);
  //   document.documentElement.classList.toggle('dark');
  // };

  const handleGetStarted = () => {
    navigate('/auth');
  };

  const features = [
    // {
    //   icon: Receipt,
    //   title: "AI-Powered Receipt Scanning",
    //   description: "Simply snap a photo of your receipt and let our AI extract all the details automatically.",
    //   delay: 0.1
    // },
    {
      icon: FileText,
      title: "Easy Expense Entry",
      description: "Record your daily spending in seconds with our easy-to-use expense entry system.",
      delay: 0.1
    },
    {
      icon: Tags,
      title: "Auto-Categorization",
      description: "Smart categorization of your expenses saves time and keeps your finances organized.",
      delay: 0.2
    },
    {
      icon: TrendingUp,
      title: "Visual Insights & Predictions",
      description: "Get monthly visualizations and spending predictions to make informed financial decisions.",
      delay: 0.3
    },
    {
      icon: Shield,
      title: "Secure Login System",
      description: "Your account is protected with industry-standard security measures.",
      delay: 0.4
    },
    {
      icon: Lock,
      title: "Data Privacy",
      description: "Your financial data is encrypted and stored securely. We never share your information.",
      delay: 0.5
    }
  ];

  return (
    // <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-slate-100 dark:from-slate-900 dark:via-purple-900/20 dark:to-indigo-900/30 transition-all duration-300">
        <div className="min-h-screen bg-gray-100 dark:bg-slate-900 transition-all duration-300">
          <Header/>
      {/* Theme Toggle */}
      {/* <div className="absolute top-6 right-6 z-10">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleTheme}
          className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-700 shadow-lg"
        >
          {isDark ? (
            <Sun className="h-4 w-4 text-yellow-500" />
          ) : (
            <Moon className="h-4 w-4 text-slate-600" />
          )}
        </Button>
      </div> */}

      <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 mb-8 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 shadow-2xl shadow-indigo-500/25"
          >
            <Sparkles className="w-10 h-10 text-white" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-slate-800 dark:text-slate-100 leading-tight"
          >
            Track Expenses Smarter with{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              ExpenseTracker
            </span>
          </motion.h1>


          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-slate-600 dark:text-slate-400 leading-relaxed"
          >
            Take control of your spending with smart categorization, detailed reports, and actionable insights.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              onClick={handleGetStarted}
              size="lg"
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-300 group"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/learn-more')}
              className="border-gray-200 dark:border-slate-600 hover:bg-gray-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
            >
              Learn More
            </Button>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: feature.delay + 0.8, duration: 0.6 }}
              className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 shadow-lg rounded-xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl group cursor-pointer"
            >
              <div className="p-2 bg-indigo-500 rounded-xl w-fit mb-4">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-100">
                {feature.title}
              </h3>
              
              <p className="text-slate-600 dark:text-slate-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="text-center"
        >
          <div className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 shadow-lg rounded-xl p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">
              Ready to take control of your expenses?
            </h2>
            <p className="mb-6 text-slate-600 dark:text-slate-400">
              Join thousands of users who are already managing their finances smarter.
            </p>
            <Button
              onClick={handleGetStarted}
              size="lg"
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-3 font-semibold rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-300"
            >
              Start Your Journey
            </Button>
          </div>
        </motion.div>
      </div>
      <ScrollToTop/>
    </div>
  );
};

export default Intro;