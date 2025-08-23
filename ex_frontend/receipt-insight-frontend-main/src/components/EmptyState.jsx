
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PlusCircle, Receipt } from 'lucide-react';

const EmptyState = ({ 
  title = "No Expenses Found", 
  subtitle = "Start by adding your first expense to track your spending.",
  buttonText = "Add Expense",
  buttonAction,
  icon: IconComponent = Receipt
}) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (buttonAction) {
      buttonAction();
    } else {
      navigate('/add-expense');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      {/* Icon/Illustration */}
      <div className="mb-6 p-6 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 rounded-full shadow-lg">
        <IconComponent className="h-12 w-12 text-slate-400 dark:text-slate-500" />
      </div>

      {/* Heading */}
      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">
        {title}
      </h3>

      {/* Subtext */}
      <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md leading-relaxed">
        {subtitle}
      </p>

      {/* Primary Button */}
      <Button
        onClick={handleButtonClick}
        className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/30 transition-all duration-300"
        size="lg"
      >
        <PlusCircle className="mr-2 h-5 w-5" />
        {buttonText}
      </Button>
    </div>
  );
};

export default EmptyState;
