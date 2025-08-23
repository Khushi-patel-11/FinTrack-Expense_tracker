// import { useEffect, useState } from "react";
// import { TrendingUp } from "lucide-react";

// const PredictedAmountCard = () => {
//   const [prediction, setPrediction] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPrediction = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await fetch("http://127.0.0.1:8000/api/expenses/predict-next-month/", {
//           headers: { Authorization: `Token ${token}` }
//         });
//         const data = await res.json();
//         setPrediction(data);
//       } catch (err) {
//         setPrediction(null);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPrediction();
//   }, []);

//   return (
//     <div className="rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 h-full">
//       <div className="flex items-center justify-between w-full mb-2">
//         <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400">Predicted Amount</h3>
//         <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-orange-400 to-pink-500">
//           <TrendingUp className="w-6 h-6 text-white" />
//         </div>
//       </div>
//       <div className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">
//         {loading
//           ? "..."
//           : prediction && prediction.predicted_total !== null
//             ? `₹${prediction.predicted_total.toFixed(2)}`
//             : "--"}
//       </div>
//       <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
//         {prediction && prediction.predicted_month
//           ? `For ${prediction.predicted_month}`
//           : "No prediction available"}
//       </div>
//     </div>
//   );
// };

// export default PredictedAmountCard;

import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";

const PredictedAmountCard = () => {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrediction = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://127.0.0.1:8000/api/expenses/predict-next-month/", {
          headers: { Authorization: `Token ${token}` }
        });
        const data = await res.json();
        setPrediction(data);
      } catch (err) {
        setPrediction(null);
      } finally {
        setLoading(false);
      }
    };
    fetchPrediction();
  }, []);

  return (
    <div className="rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 h-full">
      
      {/* Icon on top */}
      <div className="w-14 h-14 mb-4 rounded-2xl flex items-center justify-center bg-gradient-to-br from-orange-400 to-pink-500">
        <TrendingUp className="w-8 h-8 text-white" />
      </div>

      {/* Heading */}
      <h3 className="text-base font-semibold text-slate-700 dark:text-slate-300 mb-2">
        Predicted Amount For next month
      </h3>

      {/* Predicted value */}
      <div className="text-3xl font-extrabold text-indigo-700 dark:text-indigo-300 mb-1">
        {loading
          ? "..."
          : prediction && prediction.predicted_total !== null
          ? `₹${prediction.predicted_total.toFixed(2)}`
          : "--"}
      </div>

      {/* Month */}
      <div className="text-sm text-slate-500 dark:text-slate-400">
        {prediction && prediction.predicted_month
          ? `For ${prediction.predicted_month}`
          : "No prediction available"}
      </div>
    </div>
  );
};

export default PredictedAmountCard;
