
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Trash2 } from 'lucide-react';

const DeleteExpenseDialog = ({ isOpen, onClose, onConfirm, expense }) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
            <Trash2 className="h-5 w-5 text-red-500" />
            Delete Expense
          </AlertDialogTitle>
          <AlertDialogDescription className="text-slate-600 dark:text-slate-400">
            Are you sure you want to delete this expense? This action cannot be undone.
            {expense && (
              <div className="mt-3 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <div className="font-medium text-slate-800 dark:text-slate-200">{expense.company}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  ₹{expense.amount?.toFixed(2)} • {new Date(expense.date).toLocaleDateString()}
                </div>
              </div>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Delete Expense
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteExpenseDialog;
