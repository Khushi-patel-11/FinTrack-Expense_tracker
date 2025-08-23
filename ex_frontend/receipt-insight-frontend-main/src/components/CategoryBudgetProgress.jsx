// import { AlertTriangle } from 'lucide-react';
// import { Card, CardContent } from '@/components/ui/card';
// import { Progress } from '@/components/ui/progress';
// import React, { useEffect, useState } from 'react'; // ✅ Add useEffect and useState

// const CategoryBudgetProgress = () => {
//   // Mock data - in real app this would come from props or state

//   const token = localStorage.getItem('token');
//   const [categoryData, setCategoryData] = useState([]);

//   useEffect(() => {
//     const fetchBudget = async () => {
//       try {
//         const res = await fetch('http://127.0.0.1:8000/api/expenses/category-month-budget/', {
//           headers: {
//             Authorization: `Token ${token}`
//           },
//         });
//         const data = await res.json();

//         if (res.ok) {
//           // Combine with spending data (maybe fetched from a separate API)
//           const spentData = {
//             food: 2100,
//             groceries: 4500,
//             household: 800,
//             personalCare: 450,
//             entertainment: 900,
//             electronics: 1800,
//             stationery: 200,
//             clothing: 600,
//             travel: 3200,
//             medical: 1200,
//           };

//           const categories = Object.keys(spentData).map((key) => ({
//             name: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
//             spent: spentData[key],
//             budget: data[key],
//           }));

//           setCategoryData(categories); // useState hook
//         } else {
//           console.error('Budget fetch error', data.error);
//         }
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchBudget();
//   }, []);

//   // const categoryData = [
//   //   { name: 'Food', spent: 2100, budget: 3000 },
//   //   { name: 'Groceries', spent: 4500, budget: 4000 },
//   //   { name: 'Household', spent: 800, budget: 1500 },
//   //   { name: 'Personal Care', spent: 450, budget: 1000 },
//   //   { name: 'Medical', spent: 1200, budget: 1500 },
//   //   { name: 'Travel', spent: 3200, budget: 2000 },
//   //   { name: 'Clothing', spent: 600, budget: 1000 },
//   //   { name: 'Stationery', spent: 200, budget: 500 },
//   //   { name: 'Electronics', spent: 1800, budget: 2500 },
//   //   { name: 'Entertainment', spent: 900, budget: 1500 }
//   // ];

//   const getProgressColor = (spent, budget) => {
//     const percentage = (spent / budget) * 100;
//     if (percentage > 100) return 'bg-progress-danger';
//     if (percentage > 80) return 'bg-progress-warning';
//     return 'bg-progress-safe';
//   };

//   const getProgressPercentage = (spent, budget) => {
//     return Math.min((spent / budget) * 100, 100);
//   };

//   const isExceeded = (spent, budget) => spent > budget;

//   return (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-bold text-foreground">Category Budget Progress</h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
//         {categoryData.map((category, index) => {
//           const percentage = getProgressPercentage(category.spent, category.budget);
//           const exceeded = isExceeded(category.spent, category.budget);

//           return (
//             <Card key={index} className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
//               <CardContent className="p-4 space-y-3">
//                 {/* Category Name */}
//                 <div className="flex items-center justify-between">
//                   <h3 className="font-semibold text-foreground text-sm">{category.name}</h3>
//                   {exceeded && (
//                     <AlertTriangle className="h-4 w-4 text-progress-danger" />
//                   )}
//                 </div>

//                 {/* Progress Bar */}
//                 <div className="space-y-2">
//                   <Progress
//                     value={percentage}
//                     className="h-3 bg-muted"
//                     indicatorClassName={getProgressColor(category.spent, category.budget)}
//                   />
//                 </div>

//                 {/* Amount Label */}
//                 <div className="space-y-1">
//                   <p className="text-xs text-muted-foreground">
//                     {/* ₹{category.spent.toLocaleString()} of ₹{category.budget.toLocaleString()} */}
//                     ₹{category.spent?.toLocaleString?.() ?? 0} of ₹{category.budget?.toLocaleString?.() ?? 0}
//                   </p>
//                   {exceeded && (
//                     <p className="text-xs text-progress-danger font-medium">Exceeded</p>
//                   )}
//                 </div>

//                 {/* Percentage Badge */}
//                 <div className="flex justify-end">
//                   <span className={`text-xs px-2 py-1 rounded-full font-medium ${exceeded
//                       ? 'bg-progress-danger/10 text-progress-danger border border-progress-danger/20'
//                       : percentage > 80
//                         ? 'bg-progress-warning/10 text-progress-warning border border-progress-warning/20'
//                         : 'bg-progress-safe/10 text-progress-safe border border-progress-safe/20'
//                     }`}>
//                     {Math.round((category.spent / category.budget) * 100)}%
//                   </span>
//                 </div>
//               </CardContent>
//             </Card>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default CategoryBudgetProgress;

// import { AlertTriangle } from 'lucide-react';
// import { Card, CardContent } from '@/components/ui/card';
// import { Progress } from '@/components/ui/progress';
// import React, { useEffect, useState } from 'react';

// const CategoryBudgetProgress = () => {
//   const token = localStorage.getItem('token');
//   const [categoryData, setCategoryData] = useState([]);
//   const [month, setMonth] = useState('');

//   useEffect(() => {
//     const fetchBudget = async () => {
//       try {
//         const res = await fetch('http://127.0.0.1:8000/api/expenses/category-month-budget/', {
//           headers: {
//             Authorization: `Token ${token}`,
//           },
//         });

//         const data = await res.json();

//         if (res.ok) {
//           setMonth(data.month || '');

//           const parsedCategories = Object.entries(data.categories).map(([key, value]) => ({
//             name: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
//             spent: value.spent,
//             budget: value.budget,
//             percent: value.percent_used
//           }));

//           setCategoryData(parsedCategories);
//         } else {
//           console.error('Budget fetch error', data.error);
//         }
//       } catch (err) {
//         console.error('Error fetching category budgets:', err);
//       }
//     };

//     fetchBudget();
//   }, []);

//   const getProgressColor = (percentage) => {
//     if (percentage > 100) return 'bg-progress-danger';
//     if (percentage > 80) return 'bg-progress-warning';
//     return 'bg-progress-safe';
//   };

//   return (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-bold text-foreground">Category Budget Progress</h2>
//       {month && (
//         <p className="text-muted-foreground text-sm mb-4">
//           For month: <span className="font-medium">{month}</span>
//         </p>
//       )}

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
//         {categoryData.map((category, index) => {
//           const exceeded = category.spent > category.budget;
//           const percentage = Math.min(category.percent ?? (category.spent / category.budget) * 100, 100);

//           return (
//             // <Card key={index} className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
//             <Card key={index} className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card border-border hover:bg-card/80">
//               <CardContent className="p-4 space-y-3">
//                 {/* Header */}
//                 <div className="flex items-center justify-between">
//                   <h3 className="font-semibold text-foreground text-sm">{category.name}</h3>
//                   {exceeded && <AlertTriangle className="h-4 w-4 text-progress-danger" />}
//                 </div>

//                 {/* Progress Bar */}
//                 <div className="space-y-2">
//                   <Progress
//                     value={percentage}
//                     className="h-3 bg-slate-800"
//                     indicatorClassName={getProgressColor(percentage)}
//                   />
//                 </div>

//                 {/* Labels */}
//                 <div className="space-y-1">
//                   <p className="text-xs text-muted-foreground">
//                     ₹{category.spent?.toLocaleString?.() ?? 0} of ₹{category.budget?.toLocaleString?.() ?? 0}
//                   </p>
//                   {exceeded && (
//                     <p className="text-xs text-progress-danger font-medium">Exceeded</p>
//                   )}
//                 </div>

//                 {/* Percentage Badge */}
//                 <div className="flex justify-end">
//                   <span className={`text-xs px-2 py-1 rounded-full font-medium ${exceeded
//                     ? 'bg-progress-danger/10 text-progress-danger border border-progress-danger/20'
//                     : percentage > 80
//                       ? 'bg-progress-warning/10 text-progress-warning border border-progress-warning/20'
//                       : 'bg-progress-safe/10 text-progress-safe border border-progress-safe/20'
//                     }`}>
//                     {Math.round(percentage)}%
//                   </span>
//                 </div>
//               </CardContent>
//             </Card>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default CategoryBudgetProgress;


// import { AlertTriangle } from 'lucide-react';
// import { Card, CardContent } from '@/components/ui/card';
// import { Progress } from '@/components/ui/progress';
// import React, { useEffect, useState } from 'react';

// const CategoryBudgetProgress = () => {
//   const token = localStorage.getItem('token');
//   const [categoryData, setCategoryData] = useState([]);
//   const [month, setMonth] = useState('');

//   useEffect(() => {
//     const fetchBudget = async () => {
//       try {
//         const res = await fetch(
//           'http://127.0.0.1:8000/api/expenses/category-month-budget/',
//           {
//             headers: {
//               Authorization: `Token ${token}`,
//             },
//           }
//         );

//         const data = await res.json();

//         if (res.ok) {
//           setMonth(data.month || '');

//           const parsedCategories = Object.entries(data.categories).map(
//             ([key, value]) => ({
//               name: key
//                 .replace(/([A-Z])/g, ' $1')
//                 .replace(/^./, (str) => str.toUpperCase()),
//               spent: value.spent,
//               budget: value.budget,
//               percent: value.percent_used,
//             })
//           );

//           setCategoryData(parsedCategories);
//         } else {
//           console.error('Budget fetch error', data.error);
//         }
//       } catch (err) {
//         console.error('Error fetching category budgets:', err);
//       }
//     };

//     fetchBudget();
//   }, []);

//   const getProgressColor = (percentage) => {
//     if (percentage > 100) return 'bg-progress-danger';
//     if (percentage > 80) return 'bg-progress-warning';
//     return 'bg-progress-safe';
//   };

//   return (
//     // <Card className="bg-background border border-border shadow-sm rounded-xl p-6">
//     <Card className="bg-card border border-border shadow-sm">
//       <CardContent className="space-y-6">
//         <h2 className="text-2xl font-bold text-foreground">
//           Category Budget Progress
//         </h2>
//         {month && (
//           <p className="text-muted-foreground text-sm mb-4">
//             For month: <span className="font-medium">{month}</span>
//           </p>
//         )}

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
//           {categoryData.map((category, index) => {
//             const exceeded = category.spent > category.budget;
//             const percentage = Math.min(
//               category.percent ??
//                 (category.spent / category.budget) * 100,
//               100
//             );

//             return (
//               <Card
//                 key={index}
//                 // className="bg-muted border border-border/30 shadow-sm hover:shadow-lg transition-all duration-200 rounded-lg"
//                 className="bg-card border border-border/50 shadow-sm hover:shadow-md"

//               >
//                 <CardContent className="p-4 space-y-3">
//                   {/* Header */}
//                   <div className="flex items-center justify-between">
//                     <h3 className="font-semibold text-muted-foreground text-sm">
//                       {category.name}
//                     </h3>
//                     {exceeded && (
//                       <AlertTriangle className="h-4 w-4 text-progress-danger" />
//                     )}
//                   </div>

//                   {/* Progress Bar */}
//                   <div className="space-y-2">
//                     <Progress
//                       value={percentage}
//                       className="h-3 bg-border"
//                       indicatorClassName={getProgressColor(percentage)}
//                     />
//                   </div>

//                   {/* Labels */}
//                   <div className="space-y-1">
//                     <p className="text-xs text-muted-foreground">
//                       ₹{category.spent?.toLocaleString?.() ?? 0} of ₹
//                       {category.budget?.toLocaleString?.() ?? 0}
//                     </p>
//                     {exceeded && (
//                       <p className="text-xs text-progress-danger font-medium">
//                         Exceeded
//                       </p>
//                     )}
//                   </div>

//                   {/* Percentage Badge */}
//                   <div className="flex justify-end">
//                     <span
//                       className={`text-xs px-2 py-1 rounded-full font-medium ${
//                         exceeded
//                           ? 'bg-progress-danger/10 text-progress-danger border border-progress-danger/20'
//                           : percentage > 80
//                           ? 'bg-progress-warning/10 text-progress-warning border border-progress-warning/20'
//                           : 'bg-progress-safe/10 text-progress-safe border border-progress-safe/20'
//                       }`}
//                     >
//                       {Math.round(percentage)}%
//                     </span>
//                   </div>
//                 </CardContent>
//               </Card>
//             );
//           })}
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default CategoryBudgetProgress;


import { AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import React, { useEffect, useState } from 'react';

const CategoryBudgetProgress = () => {
  const token = localStorage.getItem('token');
  const [categoryData, setCategoryData] = useState([]);
  const [month, setMonth] = useState('');

  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/expenses/category-month-budget/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setMonth(data.month || '');

          const parsedCategories = Object.entries(data.categories).map(([key, value]) => ({
            name: key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase()),
            spent: value.spent,
            budget: value.budget,
            percent: value.percent_used,
          }));

          setCategoryData(parsedCategories);
        } else if (res.status === 404 && data.error && data.error.includes("No budget found")) {
          // Show a user-friendly message for no budget
          setCategoryData([]);
          setMonth('');
        } else {
          console.error('Budget fetch error', data.error);
        }
      } catch (err) {
        console.error('Error fetching category budgets:', err);
      }
    };

    fetchBudget();
  }, []);

  const getProgressColor = (percentage) => {
    if (percentage > 95) return 'bg-progress-danger';
    if (percentage > 80) return 'bg-progress-warning';
    return 'bg-progress-safe';
  };

  return (
    // Outer Card → Light Mode: bg-card / Dark Mode: bg-background
    // <Card className="bg-card dark:bg-background border border-border shadow-sm rounded-xl p-6">
    //   <CardContent className="space-y-6">
    //     <h2 className="text-2xl font-bold text-foreground">Category Budget Progress</h2>
    //     {month && (
    //       <p className="text-muted-foreground text-sm mb-4">
    //         For month: <span className="font-medium">{month}</span>
    //       </p>
    //     )}
    // <Card className="bg-card dark:bg-background border border-border shadow-sm rounded-xl p-6">
    //   <CardContent className="space-y-6">
    //     <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
    //       Category Budget Progress
    //     </h2>
    //     {month && (
    //       <p className="text-muted-foreground text-sm mb-4">
    //         For month: <span className="font-medium">{month}</span>
    //       </p>
    //     )}

    //     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
    //       {categoryData.map((category, index) => {
    //         const exceeded = category.spent > category.budget;
    //         const percentage = Math.min(
    //           category.percent ?? (category.spent / category.budget) * 100,
    //           100
    //         );

    //         return (
    //           // Inner Card → Light Mode: bg-card / Dark Mode: bg-muted
    //           <Card
    //             key={index}
    //             className="bg-card dark:bg-muted border border-border/50 dark:border-border/30 shadow-sm hover:shadow-md transition-all duration-200 rounded-lg"
    //           >
    //             <CardContent className="p-4 space-y-3">
    //               {/* Header */}
    //               <div className="flex items-center justify-between">
    //                 <h3 className="font-semibold text-muted-foreground text-sm">
    //                   {category.name}
    //                 </h3>
    //                 {exceeded && <AlertTriangle className="h-4 w-4 text-progress-danger" />}
    //               </div>

    //               {/* Progress Bar */}
    //               <div className="space-y-2">
    //                 {/* <Progress
    //                   value={percentage}
    //                   className="h-3 bg-border"
    //                   indicatorClassName={getProgressColor(percentage)}
    //                 /> */}
    //                 {/* <Progress
    //                   value={percentage}
    //                   className="h-3 bg-border dark:bg-muted"
    //                   indicatorClassName={getProgressColor(percentage)}
    //                 /> */}
    //                 {/* <Progress
    //                   value={percentage}
    //                   className="h-3 !bg-border dark:!bg-muted"
    //                   indicatorClassName={`${getProgressColor(percentage)} dark:opacity-90`}
    //                 /> */}
    //                 <Progress
    //                   value={percentage}
    //                   className="h-3 bg-slate-300 dark:bg-slate-700" // Track color visible in both modes
    //                   indicatorClassName={`${getProgressColor(percentage)} transition-all`}
    //                 />

    //               </div>

    //               {/* Labels */}
    //               <div className="space-y-1">
    //                 <p className="text-xs text-muted-foreground">
    //                   ₹{category.spent?.toLocaleString?.() ?? 0} of ₹
    //                   {category.budget?.toLocaleString?.() ?? 0}
    //                 </p>
    //                 {exceeded && (
    //                   <p className="text-xs text-progress-danger font-medium">Exceeded</p>
    //                 )}
    //               </div>

    //               {/* Percentage Badge */}
    //               <div className="flex justify-end">
    //                 <span
    //                   className={`text-xs px-2 py-1 rounded-full font-medium ${exceeded
    //                     ? 'bg-progress-danger/10 text-progress-danger border border-progress-danger/20'
    //                     : percentage > 80
    //                       ? 'bg-progress-warning/10 text-progress-warning border border-progress-warning/20'
    //                       : 'bg-progress-safe/10 text-progress-safe border border-progress-safe/20'
    //                     }`}
    //                 >
    //                   {Math.round(percentage)}%
    //                 </span>
    //               </div>
    //             </CardContent>
    //           </Card>
    //         );
    //       })}
    //     </div>
    //   </CardContent>
    // </Card>
    <Card className="bg-card dark:bg-background border border-border shadow-sm rounded-xl p-6">
      <CardContent className="space-y-6">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
          Category Budget Progress
        </h2>

        {month && (
          <p className="text-muted-foreground text-sm mb-4">
            For month: <span className="font-medium">{month}</span>
          </p>
        )}

        {categoryData.length === 0 || categoryData.every(c => (c.spent || 0) === 0 && (c.budget || 0) === 0) ? (
          <div className="text-center text-slate-500 dark:text-slate-400 py-8">
            No category budget data available
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {categoryData.map((category, index) => {
              const exceeded = category.spent > category.budget;
              const percentage = Math.min(
                category.percent ?? (category.spent / category.budget) * 100,
                100
              );

              return (
                <Card
                  key={index}
                  className="bg-card dark:bg-muted border border-border/50 dark:border-border/30 shadow-sm hover:shadow-md transition-all duration-200 rounded-lg"
                >
                  <CardContent className="p-4 space-y-3">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-muted-foreground text-sm">
                        {category.name}
                      </h3>
                      {exceeded && <AlertTriangle className="h-4 w-4 text-progress-danger" />}
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <Progress
                        value={percentage}
                        className="h-3 bg-slate-300 dark:bg-slate-700"
                        indicatorClassName={`${getProgressColor(percentage)} transition-all`}
                      />
                    </div>

                    {/* Labels */}
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">
                        ₹{category.spent?.toLocaleString?.() ?? 0} of ₹
                        {category.budget?.toLocaleString?.() ?? 0}
                      </p>
                      {exceeded && (
                        <p className="text-xs text-progress-danger font-medium">Exceeded</p>
                      )}
                    </div>

                    {/* Percentage Badge */}
                    <div className="flex justify-end">
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${exceeded
                            ? 'bg-progress-danger/10 text-progress-danger border border-progress-danger/20'
                            : percentage > 80
                              ? 'bg-progress-warning/10 text-progress-warning border border-progress-warning/20'
                              : 'bg-progress-safe/10 text-progress-safe border border-progress-safe/20'
                          }`}
                      >
                        {Math.round(percentage)}%
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>

  );
};

export default CategoryBudgetProgress;
