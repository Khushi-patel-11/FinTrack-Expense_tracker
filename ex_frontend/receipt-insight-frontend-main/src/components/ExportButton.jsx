
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { FaDownload, FaFilePdf, FaFileCsv, FaChevronDown } from 'react-icons/fa';
import { exportToPDF, exportToCSV } from '@/utils/exportUtils';

const ExportButton = ({ expenses, title = 'Expense Report' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleExportPDF = () => {
    exportToPDF(expenses, title);
    setIsOpen(false);
  };

  const handleExportCSV = () => {
    exportToCSV(expenses, 'expenses');
    console.log("Exporting expenses:", expenses);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        className="border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
      >
        <FaDownload className="mr-2 h-4 w-4" />
        Export
        <FaChevronDown className={`ml-2 h-3 w-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg shadow-lg z-50"
        >
          <div className="py-1">
            <button
              onClick={handleExportPDF}
              className="flex items-center w-full px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <FaFilePdf className="mr-3 h-4 w-4 text-red-500" />
              Export as PDF
            </button>
            <button
              onClick={handleExportCSV}
              className="flex items-center w-full px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <FaFileCsv className="mr-3 h-4 w-4 text-green-500" />
              Export as CSV
            </button>
          </div>
        </motion.div>
      )}

      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default ExportButton;
