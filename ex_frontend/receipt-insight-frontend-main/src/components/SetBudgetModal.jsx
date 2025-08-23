import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Calculator, PiggyBank } from 'lucide-react';
import axios from 'axios';

const SetBudgetModal = ({ visible, onSubmit, onClose }) => {
  const categories = [
    { key: 'Groceries', label: 'Groceries' },
    { key: 'Food', label: 'Food' },
    { key: 'Household', label: 'Household' },
    { key: 'Personal Care', label: 'Personal Care' },
    { key: 'Medical', label: 'Medical' },
    { key: 'Travel', label: 'Travel' },
    { key: 'Clothing', label: 'Clothing' },
    { key: 'Stationery', label: 'Stationery' },
    { key: 'Electronics', label: 'Electronics' },
    { key: 'Entertainment', label: 'Entertainment' }
  ];

  const [budgetData, setBudgetData] = useState(
    categories.reduce((acc, category) => ({
      ...acc,
      [category.key]: 0
    }), {})
  );

  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newTotal = Object.values(budgetData).reduce((sum, value) => sum + (Number(value) || 0), 0);
    setTotal(newTotal);
  }, [budgetData]);

  const handleInputChange = (categoryKey, value) => {
    setBudgetData(prev => ({
      ...prev,
      [categoryKey]: value === '' ? 0 : Number(value)
    }));
  };


  const handleSubmit = async () => {
    const token = localStorage.getItem('token'); // ✅ same as fetchExpenseData
    const submitData = {
      ...budgetData,
      total,
    };

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/expenses/set-budget/', submitData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`, // ✅ use Token auth just like expense fetch
        },
      });

      console.log('✅ Budget submitted:', response.data);
      onSubmit(submitData); // optional: close modal or trigger reload
    } catch (error) {
      console.error('❌ Failed to submit budget:', error);
    }
  };




  const handleCancel = () => {
    // Reset form
    setBudgetData(categories.reduce((acc, category) => ({
      ...acc,
      [category.key]: 0
    }), {}));
    onClose();
  };

  return (
    <Dialog open={visible} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
            <PiggyBank className="h-5 w-5 text-violet-600" />
            Set Monthly Budget
          </DialogTitle>
          <DialogDescription className="text-slate-600 dark:text-slate-400">
            Set your budget for each category to track your monthly expenses.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {categories.map((category) => (
            <div key={category.key} className="space-y-2">
              <Label
                htmlFor={category.key}
                className="text-slate-700 dark:text-slate-300"
              >
                {category.label} (₹)
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">₹</span>
                <Input
                  id={category.key}
                  type="number"
                  min="0"
                  step="1"
                  value={budgetData[category.key]}
                  onChange={(e) => handleInputChange(category.key, e.target.value)}
                  className="pl-8 bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200"
                  placeholder="0"
                />
              </div>
            </div>
          ))}

          {/* Total Budget Display */}
          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-600">
            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
              <div className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-violet-600" />
                <Label className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                  Total Budget
                </Label>
              </div>
              <span className="text-2xl font-bold text-violet-600">
                ₹{total.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white"
          >
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SetBudgetModal;