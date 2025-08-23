
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import AddExpense from "./pages/AddExpense";
import Expenses from "./pages/Expenses";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Intro from "./pages/Intro";
import NotFound from "./pages/NotFound";
import LearnMore from "./pages/LearnMore";
import './App.css';
import Footer from "./components/Footer";


const queryClient = new QueryClient();


// Simple auth check
const isAuthenticated = () => {
  return localStorage.getItem('isAuthenticated') === 'true';
};

// Protected Route wrapper for dashboard pages
// const ProtectedRoute = ({ children }) => {
//   return isAuthenticated() ? children : <Navigate to="/intro" replace />;
// };
const PrivateRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isAuthenticated') === 'true';
  return isLoggedIn ? children : <Navigate to="/auth" />;
};


// Public Route wrapper for intro/auth pages
const PublicRoute = ({ children }) => {
  return !isAuthenticated() ? children : <Navigate to="/" replace />;
};

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/intro" replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {/* <Toaster />
      <Sonner /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Index />
            </ProtectedRoute>
          } />
          <Route path="/intro" element={
            <PublicRoute>
              <Intro />
            </PublicRoute>
          } />

          <Route path="/auth" element={
            <PublicRoute>
              <Auth />
            </PublicRoute>
          } />
          <Route path="/learn-more" element={
            // <PublicRoute>
            <LearnMore />
            // </PublicRoute>
          } />
          <Route path="/add-expense" element={
            <PrivateRoute>
              <AddExpense />
            </PrivateRoute>
          } />
          <Route path="/expenses" element={
            <PrivateRoute>
              <Expenses />
            </PrivateRoute>
          } />
          <Route path="/forgot-password" element={

            <ForgotPassword />

          } />
          {/* <Route path="/reset-password/:token" element={<ResetPassword />} /> */}
          <Route path="/reset-password/:uidb64/:token" element={<ResetPassword />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
        <Footer />
        <Sonner />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
