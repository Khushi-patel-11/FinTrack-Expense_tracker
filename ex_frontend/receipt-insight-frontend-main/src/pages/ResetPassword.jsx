// import { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { AlertCircle, CheckCircle } from "lucide-react";
// import { Button } from "@/components/ui/button";
// export default function ResetPassword() {
//   const navigate = useNavigate();
//   const { uidb64, token } = useParams();

//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!password || !confirmPassword) {
//       setError("All fields are required");
//       return;
//     }
//     if (password !== confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }
//     if (password.length < 6) {
//       setError("Password must be at least 6 characters");
//       return;
//     }

//     setError("");
//     setIsLoading(true);

//     try {
//       const res = await fetch("http://127.0.0.1:8000/user/reset-password-confirm/", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         // body: JSON.stringify({ token, password }),
//         body: JSON.stringify({ uidb64, token, new_password: password })
//       });

//       if (res.ok) {
//         setSuccess(true);
//       } else {
//         const data = await res.json();
//         setError(data.message || "Failed to reset password");
//       }
//     } catch (err) {
//       setError("Network error. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (success) {
//     return (
//       <div className="min-h-screen flex items-center justify-center p-4">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="bg-white dark:bg-card rounded-lg shadow-lg p-8 max-w-md w-full text-center"
//         >
//           <div className="flex justify-center mb-4">
//             <CheckCircle className="text-green-500 w-12 h-12" />
//           </div>
//           <h2 className="text-xl font-bold mb-2">Password Reset Successful</h2>
//           <p className="text-gray-600 dark:text-muted-foreground mb-6">
//             Your password has been updated. You can now log in with your new password.
//           </p>
//           <Button onClick={() => navigate("/auth")}>Go to Sign In</Button>
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center p-4">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="bg-white dark:bg-card rounded-lg shadow-lg p-8 max-w-md w-full"
//       >
//         <h2 className="text-2xl font-bold mb-6">Reset Your Password</h2>

//         {error && (
//           <div className="flex items-center text-red-500 text-sm mb-4">
//             <AlertCircle className="w-4 h-4 mr-1" /> {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="password"
//             placeholder="New Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
//           />
//           <input
//             type="password"
//             placeholder="Confirm New Password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
//           />
//           <Button
//             type="submit"
//             disabled={isLoading}
//             className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white"
//           >
//             {isLoading ? "Resetting..." : "Reset Password"}
//           </Button>
//         </form>
//       </motion.div>
//     </div>
//   );
// }


import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import axios from "axios";
export default function ResetPassword() {
  // Get uidb64 and token from the URL
  const { uidb64, token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setError("All fields are required");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/user/reset-password-confirm/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uidb64,
          token,
          new_password: password
        }),
      });

      if (res.ok) {
        setSuccess(true);
      } else {
        const data = await res.json();
        setError(data.error || "Failed to reset password");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <>
        {/* <Header /> */}
        <div className="min-h-screen flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-card rounded-lg shadow-lg p-8 max-w-md w-full text-center"
          >
            <div className="flex justify-center mb-4">
              <CheckCircle className="text-green-500 w-12 h-12" />
            </div>
            <h2 className="text-xl font-bold mb-2">Password Reset Successful</h2>
            <p className="text-gray-600 dark:text-muted-foreground mb-6">
              Your password has been updated. You can now log in with your new password.
            </p>
            {/* <Button onClick={() => navigate("/auth")}>Go to Sign In</Button> */}
            <Button
              onClick={() => { localStorage.removeItem('token'); navigate("/auth") }}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 mt-4"
            >
              Go to Sign In
            </Button>
          </motion.div>
        </div>
      </>
    );
  }

  return (
    // <div className="min-h-screen flex items-center justify-center p-4">
    //   <motion.div
    //     initial={{ opacity: 0, y: 20 }}
    //     animate={{ opacity: 1, y: 0 }}
    //     className="bg-white dark:bg-card rounded-lg shadow-lg p-8 max-w-md w-full"
    //   >
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 p-4">
        {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-card rounded-2xl shadow-2xl p-8 max-w-md w-full"
      >

        <h2 className="text-2xl font-bold mb-6">Reset Your Password</h2>

        {error && (
          <div className="flex items-center text-red-500 text-sm mb-4">
            <AlertCircle className="w-4 h-4 mr-1" /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
          /> 
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-xl shadow focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-xl shadow focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
          />
          {/* <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white"
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </Button> 
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      </motion.div> */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-900 dark:border dark:border-slate-700 rounded-2xl shadow-2xl p-8 max-w-md w-full"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-slate-900 dark:text-white">Reset Your Password</h2>
          {error && (
            <div className="flex items-center text-red-500 text-sm mb-4">
              <AlertCircle className="w-4 h-4 mr-1" /> {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-xl shadow focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-xl shadow focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </Button>
          </form>
        </motion.div>
      </div>
    </>
  );
}
