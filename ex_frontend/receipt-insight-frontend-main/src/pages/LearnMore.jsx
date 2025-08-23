import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight,
  Upload,
  Eye,
  Save,
  BarChart3,
  Brain,
  TrendingUp,
  DollarSign,
  Smartphone,
  Download,
  Check,
  Sun,
  Moon,
  Sparkles,
  PlusCircle,
  Wallet
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import ScrollToTop from '@/components/ScrollToTop';
import Footer from '@/components/Footer';

const LearnMore = () => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Sync with system dark mode
    const darkMode = document.documentElement.classList.contains('dark');
    setIsDark(darkMode);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const handleGetStarted = () => {
    navigate('/auth');
  };

  const keyFeatures = [
    {
      icon: Brain,
      title: "Smart Budget Suggestions",
      description: "Get AI-powered budget recommendations based on your past spending habits and financial goals.",
      delay: 0.1
    },
    {
      icon: TrendingUp,
      title: "Expense Trends & Analysis",
      description: "Identify your spending patterns over time with advanced analytics and visual insights.",
      delay: 0.2
    },
    {
      icon: DollarSign,
      title: "Category-wise Spending Limits",
      description: "Set limits for food, shopping, travel, etc., and get alerts when close to the limit.",
      delay: 0.3
    },
    {
      icon: Smartphone,
      title: "Multi-Device Sync",
      description: "Access your data from phone, tablet, or laptop seamlessly with real-time synchronization.",
      delay: 0.4
    },
    {
      icon: Download,
      title: "Export & Reports",
      description: "Download CSV/PDF reports for personal or business use with detailed financial breakdowns.",
      delay: 0.5
    }
  ];

  const howItWorksSteps = [
  {
    step: "1",
    icon: PlusCircle,
    title: "Add Expense",
    description: "Enter expenses manually or upload a receipt for AI extraction"
  },
  {
    step: "2",
    icon: Brain,
    title: "AI Categorization",
    description: "Automatically predicts and assigns categories to your items"
  },
  {
    step: "3",
    icon: Eye,
    title: "Review & Edit",
    description: "Verify and adjust details such as amount, category, or date"
  },
  {
    step: "4",
    icon: Wallet,
    title: "Set Your Budget",
    description: "Define spending limits for categories and track progress"
  },
  {
      step: "5",
      icon: BarChart3,
      title: "View Insights",
      description: "Get instant analytics and spending insights"
  }
];

  // const howItWorksSteps = [
  //   {
  //     step: "1",
  //     icon: Upload,
  //     title: "Upload Receipt",
  //     description: "Take a photo or upload your receipt image"
  //   },
  //   {
  //     step: "2",
  //     icon: Brain,
  //     title: "AI Extracts Data",
  //     description: "Our AI automatically extracts merchant, amount, and details"
  //   },
  //   {
  //     step: "3",
  //     icon: Eye,
  //     title: "Review & Edit",
  //     description: "Verify the extracted information and make any adjustments"
  //   },
  //   {
  //     step: "4",
  //     icon: Save,
  //     title: "Save & Categorize",
  //     description: "Save the expense with smart auto-categorization"
  //   },
  //   {
  //     step: "5",
  //     icon: BarChart3,
  //     title: "View Insights",
  //     description: "Get instant analytics and spending insights"
  //   }
  // ];

  const whyChooseUs = [
    "Advanced AI technology for accurate data extraction",
    "Military-grade security for your financial data",
    "Intuitive interface designed for ease of use",
    "Real-time synchronization across all devices",
    "Comprehensive reporting and analytics",
    "24/7 customer support and assistance",
    "No ads, no distractions — just smart expense tracking",
    "Works seamlessly across devices",
    
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
        {/* Page Title */}
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
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-slate-800 dark:text-slate-100 leading-tight"
          >
            Learn More About{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              ExpenseTracker
            </span>
          </motion.h1>
        </motion.div>

        {/* What is ExpenseTracker Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 shadow-lg rounded-xl p-8">
            <h2 className="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-100 text-center">
              What is ExpenseTracker?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed text-center">
              ExpenseTracker is a revolutionary expense management platform that combines artificial intelligence 
              with intuitive design to help you take complete control of your finances. Our smart receipt scanning 
              technology automatically captures and categorizes your expenses, while powerful analytics provide 
              insights to help you make better financial decisions and achieve your budgeting goals.
            </p>
          </div>
        </motion.section>

        {/* Key Features Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-12 text-slate-800 dark:text-slate-100 text-center">
            Key Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {keyFeatures.map((feature, index) => (
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
        </motion.section>

        {/* How It Works Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-12 text-slate-800 dark:text-slate-100 text-center">
            How It Works
          </h2>
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-5 gap-6">
              {howItWorksSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
                  className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 shadow-lg rounded-xl p-6 text-center transition-all duration-300 hover:scale-105"
                >
                  <div className="text-indigo-500 font-bold text-sm mb-2">STEP {step.step}</div>
                  <div className="p-3 bg-indigo-500 rounded-xl w-fit mx-auto mb-4">
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-slate-800 dark:text-slate-100">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Why Choose Us Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-12 text-slate-800 dark:text-slate-100 text-center">
            Why Choose Us?
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 shadow-lg rounded-xl p-8">
              <div className="grid md:grid-cols-2 gap-6">
                {whyChooseUs.map((reason, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
                    className="flex items-center space-x-3"
                  >
                    <div className="p-1 bg-green-500 rounded-full">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-slate-700 dark:text-slate-300">{reason}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="text-center"
        >
          <div className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 shadow-lg rounded-xl p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">
              Ready to revolutionize your expense management?
            </h2>
            <p className="mb-6 text-slate-600 dark:text-slate-400">
              Join thousands of users who have transformed their financial tracking with ExpenseTracker.
            </p>
            <Button
              onClick={handleGetStarted}
              size="lg"
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-3 font-semibold rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-300 group"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>
      </div>
      <ScrollToTop/>
    </div>
  );
};

export default LearnMore;



// import { motion } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
// import { Button } from '@/components/ui/button';
// import { BarChart, Wallet, Layers, RefreshCcw, FileText, CheckCircle2 } from 'lucide-react';

// const LearnMore = () => {
//   const navigate = useNavigate();

//   const handleGetStarted = () => navigate('/auth');

//   const newFeatures = [
//     { icon: Wallet, title: "Smart Budget Suggestions", desc: "AI recommends personalized budgets based on your past spending." },
//     { icon: BarChart, title: "Expense Trends & Analysis", desc: "Spot spending patterns over months and plan ahead." },
//     { icon: Layers, title: "Category-wise Spending Limits", desc: "Set monthly caps for each category and get alerts." },
//     { icon: RefreshCcw, title: "Multi-Device Sync", desc: "Access your expense data anywhere, anytime." },
//     { icon: FileText, title: "Export & Reports", desc: "Download PDF or CSV reports for your records or taxes." }
//   ];

//   const steps = [
//     "Upload a receipt or enter expense manually",
//     "AI extracts and categorizes the data",
//     "Review, edit, and save the entry",
//     "View spending insights and reports"
//   ];

//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-slate-900 transition-all duration-300 py-12 px-6">
//       <div className="max-w-6xl mx-auto">
        
//         {/* Title */}
//         <motion.h1 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-4xl md:text-5xl font-bold text-center mb-12 text-slate-800 dark:text-slate-100"
//         >
//           Learn More About{' '}
//           <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
//             ExpenseTracker
//           </span>
//         </motion.h1>

//         {/* What is ExpenseTracker */}
//         <section className="mb-16 text-center max-w-3xl mx-auto">
//           <p className="text-lg text-slate-600 dark:text-slate-400">
//             ExpenseTracker is your all-in-one tool to record, analyze, and optimize your spending. 
//             It’s built with AI to automate receipt scanning, budgeting, and financial insights — 
//             so you can focus on what matters most.
//           </p>
//         </section>

//         {/* Key Features */}
//         <section className="mb-16">
//           <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-8 text-center">Key Features</h2>
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {newFeatures.map((f, i) => (
//               <motion.div 
//                 key={f.title}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: i * 0.1 }}
//                 className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700"
//               >
//                 <div className="p-3 bg-indigo-500 rounded-lg w-fit mb-4">
//                   <f.icon className="w-6 h-6 text-white" />
//                 </div>
//                 <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
//                 <p className="text-slate-600 dark:text-slate-400">{f.desc}</p>
//               </motion.div>
//             ))}
//           </div>
//         </section>

//         {/* How It Works */}
//         <section className="mb-16">
//           <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-8 text-center">How It Works</h2>
//           <div className="max-w-2xl mx-auto">
//             {steps.map((step, i) => (
//               <motion.div 
//                 key={i}
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: i * 0.1 }}
//                 className="flex items-start mb-6"
//               >
//                 <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold mr-4">
//                   {i + 1}
//                 </div>
//                 <p className="text-slate-600 dark:text-slate-400">{step}</p>
//               </motion.div>
//             ))}
//           </div>
//         </section>

//         {/* Why Choose Us */}
//         <section className="mb-16 text-center">
//           <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Why Choose Us?</h2>
//           <ul className="max-w-2xl mx-auto text-left space-y-3">
//             {[
//               "No ads, no distractions — just smart expense tracking",
//               "Advanced AI-powered categorization",
//               "Regular feature updates based on user feedback",
//               "Works seamlessly across devices"
//             ].map((point, i) => (
//               <li key={i} className="flex items-start">
//                 <CheckCircle2 className="text-green-500 w-5 h-5 mt-1 mr-3" />
//                 <span className="text-slate-600 dark:text-slate-400">{point}</span>
//               </li>
//             ))}
//           </ul>
//         </section>

//         {/* CTA */}
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg text-center max-w-2xl mx-auto"
//         >
//           <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-100">Ready to Start Tracking Smarter?</h3>
//           <p className="mb-6 text-slate-600 dark:text-slate-400">
//             Join thousands of users taking control of their spending today.
//           </p>
//           <Button onClick={handleGetStarted} className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-3 rounded-xl">
//             Get Started
//           </Button>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default LearnMore;
