
import { motion } from 'framer-motion';
import { FaExclamationTriangle, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const BudgetAlert = ({ totalExpenses, monthlyBudget }) => {
  const budgetUsed = (totalExpenses / monthlyBudget) * 100;
  
  const getAlertConfig = () => {
    if (budgetUsed >= 100) {
      return {
        type: 'danger',
        bgColor: 'bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-700',
        textColor: 'text-red-800 dark:text-red-200',
        iconColor: 'text-red-600 dark:text-red-400',
        icon: FaExclamationCircle,
        title: 'Budget Exceeded!',
        message: `You've spent ₹${(totalExpenses - monthlyBudget).toFixed(2)} over your monthly budget.`
      };
    } else if (budgetUsed >= 80) {
      return {
        type: 'warning',
        bgColor: 'bg-amber-100 dark:bg-amber-900/30 border-amber-200 dark:border-amber-700',
        textColor: 'text-amber-800 dark:text-amber-200',
        iconColor: 'text-amber-600 dark:text-amber-400',
        icon: FaExclamationTriangle,
        title: 'Budget Alert',
        message: `You've used ${budgetUsed.toFixed(1)}% of your monthly budget. Consider reducing expenses.`
      };
    } else if (budgetUsed >= 60) {
      return {
        type: 'info',
        bgColor: 'bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700',
        textColor: 'text-blue-800 dark:text-blue-200',
        iconColor: 'text-blue-600 dark:text-blue-400',
        icon: FaCheckCircle,
        title: 'On Track',
        message: `You've used ${budgetUsed.toFixed(1)}% of your monthly budget. Keep up the good work!`
      };
    }
    return null;
  };

  const alertConfig = getAlertConfig();

  if (!alertConfig) return null;

  const Icon = alertConfig.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`mb-6 p-4 rounded-xl border-l-4 ${alertConfig.bgColor} ${alertConfig.textColor}`}
    >
      <div className="flex items-center gap-3">
        <Icon className={`h-5 w-5 ${alertConfig.iconColor}`} />
        <div>
          <h3 className="font-semibold">{alertConfig.title}</h3>
          <p className="text-sm mt-1">{alertConfig.message}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default BudgetAlert;
