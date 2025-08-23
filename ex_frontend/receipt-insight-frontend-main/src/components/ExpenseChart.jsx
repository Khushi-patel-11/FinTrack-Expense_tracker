import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { motion } from 'framer-motion';
import axios from 'axios';

const ExpenseChart = () => {
  const [monthlyData, setMonthlyData] = useState([]);
  const [predictedPoint, setPredictedPoint] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchMonthlyTotals = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/expenses/monthly-totals/", {
          headers: {
            Authorization: `Token ${token}`
          }
        });
        setMonthlyData(response.data);
        console.log('Monthly data :', response.data)
      } catch (error) {
        console.error("❌ Failed to fetch monthly totals:", error);
      }
    };

    const fetchPrediction = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/expenses/predict-next-month/", {
          headers: {
            Authorization: `Token ${token}`
          }
        });
        const { predicted_month, predicted_total } = response.data;
        // Only set predictedPoint if both are not null
        if (predicted_month !== null && predicted_total !== null) {
          const prediction = {
            month: predicted_month,
            amount: parseFloat(predicted_total.toFixed(2))
          };
          setPredictedPoint(prediction);
          console.log("📈 After predict data :", prediction);
        } else {
          setPredictedPoint(null);
        }
      } catch (error) {
        console.error("❌ Failed to fetch prediction", error);
      }
    };

    fetchMonthlyTotals();
    fetchPrediction();
  }, []);

  // Combine actual + predicted (with prediction flag)
  const combinedData = [...monthlyData];
  if (predictedPoint) {
    combinedData.push({
      ...predictedPoint,
      isPrediction: true
    });
  }

  return (
    <motion.div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={combinedData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" interval={0} />
          <YAxis />
          {/* <Tooltip /> */}
          {/* <Tooltip
            labelFormatter={(label) => `Month: ${label}`}
            formatter={(value) => [`₹${value}`, 'Amount']}
          /> */}
          <Tooltip
            labelFormatter={(label) => `Month: ${label}`}
            formatter={(value) => [`₹${value}`, 'Amount']}
            contentStyle={{ backgroundColor: '#fff', borderRadius: 6, color: '#333' }}
            labelStyle={{ color: '#333', fontWeight: 'bold' }}
          />


          {/* Combined line with custom dot style for prediction */}
          {/* <Line
            type="monotone"
            dataKey="amount"
            data={combinedData}
            stroke="#6366F1"
            strokeWidth={3}
            dot={(props) => {
              const { cx, cy, payload, index } = props;
              if (payload.isPrediction) {
                return (
                  <circle
                    key={`dot-${index}`}
                    cx={cx}
                    cy={cy}
                    r={6}
                    fill="#6b1bd3ff"
                    stroke="#3c64dcff"
                    strokeWidth={2}
                  />
                );
              }
              return (
                <circle
                  key={`dot-${index}`}
                  cx={cx}
                  cy={cy}
                  r={4}
                  fill="#6366F1"
                />
              );
            }}

            // dot={(props) => {
            //   const { cx, cy, payload } = props;
            //   if (payload.isPrediction) {
            //     return (
            //       <circle
            //         cx={cx}
            //         cy={cy}
            //         r={6}
            //         fill="#6b1bd3ff"
            //         stroke="#3c64dcff"
            //         strokeWidth={2}
            //       />
            //     );
            //   }
            //   return (
            //     <circle
            //       cx={cx}
            //       cy={cy}
            //       r={4}
            //       fill="#6366F1"
            //     />
            //   );
            // }}
            activeDot={{ r: 6 }}
          /> */}
          <Line
            type="monotone"
            dataKey="amount"
            data={combinedData}
            stroke="#6366F1"
            strokeWidth={3}
            dot={(props) => {
              const { cx, cy, index } = props;
              const lastIndex = combinedData.length - 1;
              const shouldHighlight = combinedData.length >= 3;
              const isLastTwo = index === lastIndex || index === lastIndex - 1;

              const isHighlighted = shouldHighlight && isLastTwo;

              return (
                <circle
                  key={`dot-${index}`}
                  cx={cx}
                  cy={cy}
                  r={isHighlighted ? 6 : 4}
                  fill={isHighlighted ? '#ff5722' : '#6366F1'}
                  stroke={isHighlighted ? '#d84315' : '#d84315'}
                  strokeWidth={isHighlighted ? 2 : 0}
                />
              );
            }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
      {/* Add legend/note for orange dot */}
      {predictedPoint && (
      <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
        <span
          style={{
            display: 'inline-block',
            width: 14,
            height: 14,
            borderRadius: '50%',
            background: '#ff5722',
            border: '2px solid #d84315',
            marginRight: 8
          }}
        ></span>
        Orange color is the predicted next month amount
      </div>
      )}
    </motion.div>
  );
};

export default ExpenseChart;
//   //     try {
//   //       const token = localStorage.getItem('token');
//   //       const response = await axios.get("http://localhost:8000/api/expenses/monthly-totals/", {
//   //         headers: {
//   //           Authorization: `Token ${token}`
//   //         },
//   //       });
//   //       console.log("📊 From fetchMonthlyTotals method:", response.data);
//   //       setMonthlyData(response.data);
//   //     } catch (error) {
//   //       console.error("❌ Failed to fetch monthly totals:", error);
//   //     }
//   //   };

//   //   const fetchPrediction = async () => {
//   //     try {
//   //       const response = await axios.get("http://localhost:8000/api/expenses/predict-next-month/", {
//   //         headers: {
//   //           Authorization: `Token ${localStorage.getItem('token')}`
//   //         }
//   //       });
//   //       const { predicted_month, predicted_total } = response.data;
//   //       setPredictedPoint({ month: predicted_month, amount: predicted_total });
//   //     } catch (error) {
//   //       console.error("❌ Failed to fetch prediction", error);
//   //     }
//   //   };
//   //   fetchMonthlyTotals();
//   // }, []);

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     const fetchMonthlyTotals = async () => {
//       try {
//         const response = await axios.get("http://localhost:8000/api/expenses/monthly-totals/", {
//           headers: {
//             Authorization: `Token ${token}`
//           }
//         });
//         const data = response.data;
//         setMonthlyData(data);

//         // ⛔ Only fetch prediction if 6 or more months of data
//         if (Array.isArray(data) && data.length >= 6) {
//           fetchPrediction();  // Call only when condition met
//         }
//       } catch (error) {
//         console.error("❌ Failed to fetch monthly totals:", error);
//       }
//     };

//     const fetchPrediction = async () => {
//       try {
//         console.log('Before Predict')
//         const response = await axios.get("http://localhost:8000/api/expenses/predict-next-month/", {
//           headers: {
//             Authorization: `Token ${token}`
//           }
//         });
//         const { predicted_month, predicted_total } = response.data;
//         console.log('After predict data :',response.data)
//         setPredictedPoint({ month: predicted_month, amount: parseFloat(predicted_total.toFixed(2)) });
//       } catch (error) {
//         console.error("❌ Failed to fetch prediction", error);
//       }
//     };

//     fetchMonthlyTotals();
//     fetchPrediction();

//   }, []);

//   const CustomTooltip = ({ active, payload, label }) => {
//     if (active && payload && payload.length) {
//       return (
//         <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-lg border border-slate-200 dark:border-slate-600">
//           <p className="font-medium text-slate-900 dark:text-slate-100">{label}</p>
//           <p className="text-sm text-slate-600 dark:text-slate-400">
//             Amount: <span className="font-semibold text-indigo-600 dark:text-indigo-400">₹{payload[0].value.toLocaleString()}</span>
//           </p>
//         </div>
//       );
//     }
//     return null;
//   };

//   return (
//     <motion.div
//       className="w-full h-80"
//       initial={{ opacity: 0, scale: 0.95 }}
//       animate={{ opacity: 1, scale: 1 }}
//       transition={{ duration: 0.5 }}
//     >
//       {monthlyData.length > 0 ? (
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart data={monthlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
//             <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-slate-200 dark:text-slate-600" />
//             <XAxis
//               dataKey="month"
//               stroke="currentColor"
//               className="text-slate-600 dark:text-slate-400"
//               fontSize={12}
//             />
//             <YAxis
//               stroke="currentColor"
//               className="text-slate-600 dark:text-slate-400"
//               fontSize={12}
//               tickFormatter={(value) => `₹${value}`}
//             />
//             <Tooltip content={<CustomTooltip />} />
//             <Line
//               type="monotone"
//               dataKey="amount"
//               stroke="#6366F1"
//               strokeWidth={3}
//               dot={{ fill: '#6366F1', strokeWidth: 2, r: 4 }}
//               activeDot={{ r: 6, fill: '#4F46E5', stroke: '#6366F1', strokeWidth: 2 }}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       ) : (
//         <p className="text-center text-gray-500 mt-4">📭 No data to display</p>
//       )}
//     </motion.div>
//   );
// };

// export default ExpenseChart;

// import { useEffect, useState } from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import { motion } from 'framer-motion';
// import axios from 'axios';

// const ExpenseChart = () => {
//   const [monthlyData, setMonthlyData] = useState([]);
//   const [predictedPoint, setPredictedPoint] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     // 1. Fetch actual monthly totals
//     const fetchMonthlyTotals = async () => {
//       try {
//         const response = await axios.get("http://localhost:8000/api/expenses/monthly-totals/", {
//           headers: {
//             Authorization: `Token ${token}`
//           }
//         });
//         setMonthlyData(response.data);
//       } catch (error) {
//         console.error("❌ Failed to fetch monthly totals:", error);
//       }
//     };

//     // 2. Fetch prediction
//     const fetchPrediction = async () => {
//       try {
//         const response = await axios.get("http://localhost:8000/api/expenses/predict-next-month/", {
//           headers: {
//             Authorization: `Token ${token}`
//           }
//         });
//         const { predicted_month, predicted_total } = response.data;

//         // Make sure predicted data uses the same keys as actual data
//         const prediction = {
//           month: predicted_month,
//           amount: parseFloat(predicted_total.toFixed(2))
//         };

//         setPredictedPoint(prediction);
//         console.log("📈 After predict data :", prediction);
//       } catch (error) {
//         console.error("❌ Failed to fetch prediction", error);
//       }
//     };

//     console.log("📊 Before Predict");
//     fetchMonthlyTotals();
//     fetchPrediction();
//   }, []);

//   // Combine actual + prediction
//   const combinedData = [...monthlyData];
//   if (predictedPoint) combinedData.push(predictedPoint);

//   return (
//     <motion.div className="w-full h-80">
//       <ResponsiveContainer width="100%" height="100%">
//         <LineChart data={combinedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="month" />
//           <YAxis />
//           <Tooltip />
//           <Line
//             type="monotone"
//             dataKey="amount"
//             stroke="#6366F1"
//             strokeWidth={3}
//             dot={{ fill: '#6366F1', strokeWidth: 2, r: 4 }}
//             activeDot={{ r: 6, fill: '#4F46E5', stroke: '#6366F1', strokeWidth: 2 }}
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </motion.div>
//   );
// };

// export default ExpenseChart;


// import { useEffect, useState } from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import { motion } from 'framer-motion';
// import axios from 'axios';

// const ExpenseChart = () => {
//   const [monthlyData, setMonthlyData] = useState([]);
//   const [predictedPoint, setPredictedPoint] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     const fetchMonthlyTotals = async () => {
//       try {
//         const response = await axios.get("http://localhost:8000/api/expenses/monthly-totals/", {
//           headers: {
//             Authorization: `Token ${token}`
//           }
//         });
//         setMonthlyData(response.data);
//       } catch (error) {
//         console.error("❌ Failed to fetch monthly totals:", error);
//       }
//     };

//     const fetchPrediction = async () => {
//       try {
//         const response = await axios.get("http://localhost:8000/api/expenses/predict-next-month/", {
//           headers: {
//             Authorization: `Token ${token}`
//           }
//         });
//         const { predicted_month, predicted_total } = response.data;
//         const prediction = {
//           month: predicted_month,
//           amount: parseFloat(predicted_total.toFixed(2))
//         };
//         setPredictedPoint(prediction);
//         console.log("📈 After predict data :", prediction);
//       } catch (error) {
//         console.error("❌ Failed to fetch prediction", error);
//       }
//     };

//     fetchMonthlyTotals();
//     fetchPrediction();
//   }, []);

//   // Prepare separate arrays
//   const actualData = monthlyData;
//   const predictedData = predictedPoint ? [predictedPoint] : [];

//   const combinedData = [...monthlyData];

//   if (predictedPoint) combinedData.push(predictedPoint, isPrediction : true);
//   console.log("Predicted Point ➤", predictedPoint);


//   // Plot one Line only with strokeDasharray applied conditionally.

//   return (
//     <motion.div className="w-full h-80">
//       <ResponsiveContainer width="100%" height="100%">
//         <LineChart
//           data={[...actualData, ...predictedData]}
//           margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//         >

//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="month" interval={0} />
//           <YAxis />
//           <Tooltip />

//           {/* Solid line for actual data */}
//           {/* <Line
//             type="monotone"
//             dataKey="amount"
//             data={actualData}
//             stroke="#6366F1"
//             strokeWidth={3}
//             dot={{ fill: '#6366F1', r: 4 }}
//             activeDot={{ r: 6 }}
//           /> */}

//           {/* Dashed line for predicted point */}
//           {/* {predictedData.length > 0 && (
//             <Line
//               type="monotone"
//               dataKey="amount"
//               data={predictedData}
//               stroke="#6b1bd3ff"
//               strokeWidth={3}
//               strokeDasharray="5 5"
//               dot={{ fill: '#3c64dcff', r: 10 }}
//               activeDot={{ r: 6 }}
//               name="Predicted"
//             />
//           )}*/}
//         </LineChart> 
//           <Line
//             type="monotone"
//             dataKey="amount"
//             data={combinedData}
//             stroke="#6366F1"
//             strokeWidth={3}
//             dot={(props) => {
//               const { cx, cy, payload } = props;
//               if (payload.isPrediction) {
//                 return (
//                   <circle
//                     cx={cx}
//                     cy={cy}
//                     r={6}
//                     fill="#6b1bd3ff"
//                     stroke="#3c64dcff"
//                     strokeWidth={2}
//                   />
//                 );
//               }
//               return (
//                 <circle
//                   cx={cx}
//                   cy={cy}
//                   r={4}
//                   fill="#6366F1"
//                 />
//               );
//             }}
//             activeDot={{ r: 6 }}
//           />
//       </ResponsiveContainer>
//     </motion.div>
//   );
// };

// export default ExpenseChart;

// import { useEffect, useState } from 'react';
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer
// } from 'recharts';
// import { motion } from 'framer-motion';
// import axios from 'axios';

const ExpenseChart1 = () => {
  const [monthlyData, setMonthlyData] = useState([]);
  const [predictedPoint, setPredictedPoint] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchMonthlyTotals = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/expenses/monthly-totals/", {
          headers: {
            Authorization: `Token ${token}`
          }
        });
        setMonthlyData(response.data);
        console.log('Monthly data :', response.data)
      } catch (error) {
        console.error("❌ Failed to fetch monthly totals:", error);
      }
    };

    const fetchPrediction = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/expenses/predict-next-month/", {
          headers: {
            Authorization: `Token ${token}`
          }
        });
        const { predicted_month, predicted_total } = response.data;
        // Only set predictedPoint if both are not null
        if (predicted_month !== null && predicted_total !== null) {
          const prediction = {
            month: predicted_month,
            amount: parseFloat(predicted_total.toFixed(2))
          };
          setPredictedPoint(prediction);
          console.log("📈 After predict data :", prediction);
        } else {
          setPredictedPoint(null);
        }
      } catch (error) {
        console.error("❌ Failed to fetch prediction", error);
      }
    };

    fetchMonthlyTotals();
    fetchPrediction();
  }, []);

  // Combine actual + predicted (with prediction flag)
  const combinedData = [...monthlyData];
  if (predictedPoint) {
    combinedData.push({
      ...predictedPoint,
      isPrediction: true
    });
  }

  return (
    <motion.div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={combinedData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" interval={0} />
          <YAxis />
          {/* <Tooltip /> */}
          {/* <Tooltip
            labelFormatter={(label) => `Month: ${label}`}
            formatter={(value) => [`₹${value}`, 'Amount']}
          /> */}
          <Tooltip
            labelFormatter={(label) => `Month: ${label}`}
            formatter={(value) => [`₹${value}`, 'Amount']}
            contentStyle={{ backgroundColor: '#fff', borderRadius: 6, color: '#333' }}
            labelStyle={{ color: '#333', fontWeight: 'bold' }}
          />


          {/* Combined line with custom dot style for prediction */}
          {/* <Line
            type="monotone"
            dataKey="amount"
            data={combinedData}
            stroke="#6366F1"
            strokeWidth={3}
            dot={(props) => {
              const { cx, cy, payload, index } = props;
              if (payload.isPrediction) {
                return (
                  <circle
                    key={`dot-${index}`}
                    cx={cx}
                    cy={cy}
                    r={6}
                    fill="#6b1bd3ff"
                    stroke="#3c64dcff"
                    strokeWidth={2}
                  />
                );
              }
              return (
                <circle
                  key={`dot-${index}`}
                  cx={cx}
                  cy={cy}
                  r={4}
                  fill="#6366F1"
                />
              );
            }}

            // dot={(props) => {
            //   const { cx, cy, payload } = props;
            //   if (payload.isPrediction) {
            //     return (
            //       <circle
            //         cx={cx}
            //         cy={cy}
            //         r={6}
            //         fill="#6b1bd3ff"
            //         stroke="#3c64dcff"
            //         strokeWidth={2}
            //       />
            //     );
            //   }
            //   return (
            //     <circle
            //       cx={cx}
            //       cy={cy}
            //       r={4}
            //       fill="#6366F1"
            //     />
            //   );
            // }}
            activeDot={{ r: 6 }}
          /> */}
          <Line
            type="monotone"
            dataKey="amount"
            data={combinedData}
            stroke="#6366F1"
            strokeWidth={3}
            dot={(props) => {
              const { cx, cy, index } = props;
              const lastIndex = combinedData.length - 1;
              const shouldHighlight = combinedData.length >= 3;
              const isLastTwo = index === lastIndex || index === lastIndex - 1;

              const isHighlighted = shouldHighlight && isLastTwo;

              return (
                <circle
                  key={`dot-${index}`}
                  cx={cx}
                  cy={cy}
                  r={isHighlighted ? 6 : 4}
                  fill={isHighlighted ? '#ff5722' : '#6366F1'}
                  stroke={isHighlighted ? '#d84315' : '#d84315'}
                  strokeWidth={isHighlighted ? 2 : 0}
                />
              );
            }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
      {/* Add legend/note for orange dot */}
      {predictedPoint && (
      <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
        <span
          style={{
            display: 'inline-block',
            width: 14,
            height: 14,
            borderRadius: '50%',
            background: '#ff5722',
            border: '2px solid #d84315',
            marginRight: 8
          }}
        ></span>
        Orange color is the predicted next month amount
      </div>
      )};
    </motion.div>
  );
};

// export default ExpenseChart;
