
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FaExclamationTriangle, FaCheckCircle, FaInfoCircle, FaLightbulb } from 'react-icons/fa';

const InsightCard = ({ title, description, type, suggestion }) => {
  const getIcon = () => {
    switch (type) {
      case 'warning':
        return <FaExclamationTriangle className="h-5 w-5 text-white" />;
      case 'success':
        return <FaCheckCircle className="h-5 w-5 text-white" />;
      case 'info':
        return <FaInfoCircle className="h-5 w-5 text-white" />;
      default:
        return <FaInfoCircle className="h-5 w-5 text-white" />;
    }
  };

  const getIconBg = () => {
    switch (type) {
      case 'warning':
        return 'bg-amber-500';
      case 'success':
        return 'bg-emerald-500';
      case 'info':
        return 'bg-blue-500';
      default:
        return 'bg-blue-500';
    }
  };

  const getAccentColor = () => {
    switch (type) {
      case 'warning':
        return 'border-l-amber-500';
      case 'success':
        return 'border-l-emerald-500';
      case 'info':
        return 'border-l-blue-500';
      default:
        return 'border-l-blue-500';
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'warning':
        return 'text-amber-700 dark:text-amber-400';
      case 'success':
        return 'text-emerald-700 dark:text-emerald-400';
      case 'info':
        return 'text-blue-700 dark:text-blue-400';
      default:
        return 'text-blue-700 dark:text-blue-400';
    }
  };

  return (
    <Card className={`group bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 shadow-lg transition-all duration-500 border-l-4 ${getAccentColor()}`}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-lg">
          <div className={`p-2 ${getIconBg()} rounded-lg`}>
            {getIcon()}
          </div>
          <span className="text-slate-800 dark:text-slate-100 font-semibold">{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <CardDescription className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
          {description}
        </CardDescription>
        {suggestion && (
          <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-slate-700/50 rounded-xl border border-gray-200 dark:border-slate-600">
            <div className="p-1.5 bg-amber-500 rounded-lg mt-0.5 flex-shrink-0">
              <FaLightbulb className="h-3.5 w-3.5 text-white" />
            </div>
            <p className={`text-sm font-medium leading-relaxed ${getTextColor()}`}>
              {suggestion}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InsightCard;
