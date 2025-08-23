import { useEffect, useState } from "react";
import { PiggyBank } from "lucide-react";

const SavingsCard = () => {
  const [savings, setSavings] = useState(0);
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavings = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://127.0.0.1:8000/api/expenses/savings-summary/", {
          headers: { Authorization: `Token ${token}` }
        });
        const data = await res.json();
        setSavings(data.savings);
        setTotalBudget(data.total_budget);
        setTotalExpenses(data.total_expenses);
      } catch (err) {
        setSavings(0);
      } finally {
        setLoading(false);
      }
    };
    fetchSavings();
  }, []);

  const isPositive = savings >= 0;

  return (
    <div className={`rounded-2xl shadow-lg p-6 flex flex-col justify-center border
      ${isPositive
        ? "bg-green-50 border-green-200 dark:bg-green-900/40 dark:border-green-700"
        : "bg-red-50 border-red-200 dark:bg-red-900/40 dark:border-red-700"
      }`}>
      <div className="flex items-center justify-between w-full mb-2">
        <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400">Savings</h3>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center
          ${isPositive
            ? "bg-gradient-to-br from-green-400 to-green-600"
            : "bg-gradient-to-br from-red-400 to-red-600"
          }`}>
          <PiggyBank className="w-7 h-7 text-white" />
        </div>
      </div>
      <div className={`text-2xl font-bold ${isPositive ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300"}`}>
        {loading ? "..." : `₹${savings.toFixed(2)}`}
      </div>
      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
        {isPositive ? "Remaining budget" : "Overspent budget"}
      </div>
      <div className="mt-2 text-xs text-slate-400 dark:text-slate-500">
        <span>Total Budget: ₹{totalBudget.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default SavingsCard;
