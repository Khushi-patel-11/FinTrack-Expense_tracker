// import { FaHome, FaPlus, FaList, FaChartPie } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';

// const Footer = () => {
//   const navigate = useNavigate();

//   const navItems = [
//     { label: 'Home', path: '/', icon: FaHome },
//     { label: 'Add Expense', path: '/add-expense', icon: FaPlus },
//     { label: 'Expenses', path: '/expenses', icon: FaList },
//     { label: 'Learn More', path: '/learn-more', icon: FaChartPie },
//   ];

//   return (
//     <footer className="bg-indigo-600 text-white mt-8">
//       <div className="container mx-auto px-6 py-12 min-h-64 flex flex-col justify-between">

//         {/* Navigation Links */}
//         <div className="flex justify-center space-x-6 mb-8 flex-wrap">
//           {navItems.map((item, index) => {
//             const Icon = item.icon;
//             return (
//               <button
//                 key={index}
//                 onClick={() => navigate(item.path)}
//                 className="flex items-center gap-2 text-lg font-medium hover:text-yellow-300 transition"
//               >
//                 <Icon />
//                 {item.label}
//               </button>
//             );
//           })}
//         </div>

//         {/* Divider */}
//         <div className="border-t border-white/30 pt-6 text-center">
//           <p className="text-sm opacity-80">
//             &copy; {new Date().getFullYear()} ExpenseTracker. All rights reserved.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


// import { motion } from "framer-motion";
// import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
// import { Receipt } from "lucide-react";

// const Footer = () => {
//   const currentYear = new Date().getFullYear();

//   const quickLinks = [
//     { name: "Home", href: "/" },
//     { name: "Add Expense", href: "/add-expense" },
//     { name: "Expenses", href: "/expenses" },
//     { name: "Learn More", href: "/learn-more" }
//   ];

//   const resources = [
//     { name: "Privacy Policy", href: "#" },
//     { name: "Terms & Conditions", href: "#" },
//     { name: "Help Center", href: "#" },
//     { name: "Blog", href: "#" }
//   ];

//   const socialLinks = [
//     { icon: FaFacebook, href: "https://facebook.com", label: "Facebook" },
//     { icon: FaTwitter, href: "https://twitter.com", label: "Twitter" },
//     { icon: FaLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
//     { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" }
//   ];

//   return (
//     <motion.footer
//       initial={{ opacity: 0, y: 50 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6, ease: "easeOut" }}
//       className="w-full h-72 bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10 dark:from-primary/20 dark:via-primary/10 dark:to-secondary/20 border-t border-border/50"
//     >
//       <div className="container mx-auto px-6 h-full flex flex-col justify-between py-12">
//         {/* Top Section - Brand */}
//         <div className="flex flex-col items-center space-y-2 mb-8">
//           <div className="flex items-center space-x-3">
//             <div className="p-2 bg-gradient-to-br from-primary to-primary/80 rounded-lg">
//               <Receipt className="h-6 w-6 text-primary-foreground" />
//             </div>
//             <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
//               ExpenseTracker
//             </h2>
//           </div>
//           <p className="text-muted-foreground text-sm">Smart Financial Management</p>
//         </div>

//         {/* Main Content - Three Columns */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
//           {/* Quick Links */}
//           <div className="text-center md:text-left">
//             <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
//             <ul className="space-y-2">
//               {quickLinks.map((link) => (
//                 <li key={link.name}>
//                   <a
//                     href={link.href}
//                     className="text-muted-foreground hover:text-primary transition-colors duration-200 hover:scale-105 inline-block"
//                   >
//                     {link.name}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Resources */}
//           <div className="text-center md:text-left">
//             <h3 className="font-semibold text-foreground mb-4">Resources</h3>
//             <ul className="space-y-2">
//               {resources.map((link) => (
//                 <li key={link.name}>
//                   <a
//                     href={link.href}
//                     className="text-muted-foreground hover:text-primary transition-colors duration-200 hover:scale-105 inline-block"
//                   >
//                     {link.name}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Contact Us */}
//           <div className="text-center md:text-left">
//             <h3 className="font-semibold text-foreground mb-4">Contact Us</h3>
//             <div className="space-y-2 text-muted-foreground">
//               <p>
//                 <a
//                   href="tel:+919876543210"
//                   className="hover:text-primary transition-colors duration-200 hover:scale-105 inline-block"
//                 >
//                   +91-98765-43210
//                 </a>
//               </p>
//               <p>
//                 <a
//                   href="mailto:support@expensetracker.com"
//                   className="hover:text-primary transition-colors duration-200 hover:scale-105 inline-block"
//                 >
//                   support@expensetracker.com
//                 </a>
//               </p>
//               <p className="text-sm">123 Finance Street, Mumbai, India</p>

//               {/* Social Icons */}
//               <div className="flex justify-center md:justify-start space-x-4 mt-4">
//                 {socialLinks.map((social) => {
//                   const IconComponent = social.icon;
//                   return (
//                     <a
//                       key={social.label}
//                       href={social.href}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-110"
//                       aria-label={social.label}
//                     >
//                       <IconComponent className="h-5 w-5" />
//                     </a>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Section - Copyright */}
//         <div className="text-center border-t border-border/50 pt-6">
//           <p className="text-muted-foreground text-sm">
//             © {currentYear} ExpenseTracker. All rights reserved.
//           </p>
//         </div>
//       </div>
//     </motion.footer>
//   );
// };

// export default Footer;


import { motion } from "framer-motion";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram , FaChartPie} from "react-icons/fa";
import { Receipt } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Add Expense", href: "/add-expense" },
    { name: "Expenses", href: "/expenses" },
    { name: "Learn More", href: "/learn-more" }
  ];

  const resources = [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms & Conditions", href: "#" },
    { name: "Help Center", href: "#" },
    // { name: "Blog", href: "#" }
  ];

  const socialLinks = [
    { icon: FaFacebook, href: "https://facebook.com", label: "Facebook" },
    { icon: FaTwitter, href: "https://twitter.com", label: "Twitter" },
    { icon: FaLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" }
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      // className="w-full h-72 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700"
      className="w-full h-72 bg-white dark:bg-slate-950 border-t border-gray-200 dark:border-slate-700"

    >
      <div className="container mx-auto px-6 h-full flex flex-col justify-between py-12">
        {/* Brand */}
        <div className="flex flex-col items-center space-y-2 mb-8">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-500 rounded-lg">
              {/* <Receipt className="h-6 w-6 text-white" /> */}
              <FaChartPie className="h-6 w-6 text-white" />

            </div>
            <h2 className="text-3xl font-bold text-indigo-500">
              ExpenseTracker
            </h2>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Smart Financial Management
          </p>
        </div>

        {/* Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-slate-600 dark:text-slate-400 hover:text-indigo-500 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-4">Resources</h3>
            <ul className="space-y-2">
              {resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-slate-600 dark:text-slate-400 hover:text-indigo-500 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-4">Contact Us</h3>
            <div className="space-y-2 text-slate-600 dark:text-slate-400">
              <p>
                <a href="tel:+919876543210" className="hover:text-indigo-500 transition-colors duration-200">
                  +91-98765-43210
                </a>
              </p>
              <p>
                <a href="mailto:support@expensetracker.com" className="hover:text-indigo-500 transition-colors duration-200">
                  support@expensetracker.com
                </a>
              </p>
              <p className="text-sm">123 Finance Street, Mumbai, India</p>

              {/* Social */}
              <div className="flex justify-center md:justify-start space-x-4 mt-4">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-500 dark:text-slate-400 hover:text-indigo-500 transition-colors duration-200"
                      aria-label={social.label}
                    >
                      <IconComponent className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center border-t border-gray-200 dark:border-slate-700 pt-6">
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            © {currentYear} ExpenseTracker. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
