
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  MoreHorizontal,
  Edit2,
  Trash2,
  Receipt,
  Calendar,
  DollarSign,
  Building2,
  // Tag
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import DeleteExpenseDialog from './DeleteExpenseDialog';
import EmptyState from './EmptyState';
const ExpenseTable = ({ expenses, onEdit, onDelete, onViewItems }) => {
  const { toast } = useToast();
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedExpenses = [...expenses].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];

    if (sortField === 'date') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }

    if (sortField === 'total_amount') {
      aValue = parseFloat(aValue);
      bValue = parseFloat(bValue);
    }

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  // const getCategoryColor = (category) => {
  //   const colors = {
  //     'Food & Dining': 'bg-violet-100 text-violet-700 border-violet-200',
  //     'Transportation': 'bg-blue-100 text-blue-700 border-blue-200',
  //     'Shopping': 'bg-amber-100 text-amber-700 border-amber-200',
  //     'Entertainment': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  //     'Bills & Utilities': 'bg-red-100 text-red-700 border-red-200',
  //     'Healthcare': 'bg-pink-100 text-pink-700 border-pink-200',
  //     'Travel': 'bg-cyan-100 text-cyan-700 border-cyan-200',
  //     'Education': 'bg-indigo-100 text-indigo-700 border-indigo-200',
  //     'Other': 'bg-gray-100 text-gray-700 border-gray-200'
  //   };
  //   return colors[category] || colors['Other'];
  // };



  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleEdit = (expense) => {
    console.log('Edit expense:', expense);
    // Implement edit functionality
    if (onEdit) {
      onEdit(expense);
    }
  };

  const handleDeleteClick = (expense) => {
    setExpenseToDelete(expense);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (expenseToDelete && onDelete) {
      onDelete(expenseToDelete);
      toast({
        title: "Expense Deleted",
        description: `${expenseToDelete.company} expense has been removed.`,
      });
    }
    setDeleteDialogOpen(false);
    setExpenseToDelete(null);
  };

  return (
    <>
      <div className="rounded-xl border border-slate-200/60 dark:border-slate-700/60 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-200/60 dark:border-slate-700/60 bg-slate-50/50 dark:bg-slate-700/50 text-center">
              <TableHead
                className="cursor-pointer hover:bg-slate-100/50 dark:hover:bg-slate-600/50 transition-colors"
                onClick={() => handleSort('company')}
              >
                <div className="flex items-center gap-2 justify-center">
                  <Building2 className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Company</span>
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-slate-100/50 dark:hover:bg-slate-600/50 transition-colors text-center"
                onClick={() => handleSort('total_amount')}
              >
                <div className="flex items-center gap-2 justify-center">
                  {/* <DollarSign className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Total Amount</span> */}
                  <span className="text-lg text-slate-500 dark:text-slate-400">₹</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Total Amount</span>
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-slate-100/50 dark:hover:bg-slate-600/50 transition-colors text-center"
                onClick={() => handleSort('date')}
              >
                <div className="flex items-center gap-2 justify-center">
                  <Calendar className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Date</span>
                </div>
              </TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedExpenses.map((expense) => (
              // <TableRow
              //   key={expense.id}
              //   className="border-slate-200/40 dark:border-slate-700/40 hover:bg-slate-50/50 dark:hover:bg-slate-700/50 transition-colors group"
              // >
              <TableRow
                key={expense.id}
                onClick={() => onViewItems && onViewItems(expense)}
                className="cursor-pointer border-slate-200/40 dark:border-slate-700/40 hover:bg-slate-50/50 dark:hover:bg-slate-700/50 transition-colors group"
              >

                <TableCell className="font-medium text-slate-900 dark:text-slate-100">
                  {expense.company}
                </TableCell>
                <TableCell>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">
                    {/* ₹{expense.total_amount.toFixed(2)} */}
                    ₹{Number(expense.total_amount).toFixed(2)}
                  </span>
                </TableCell>
                <TableCell className="text-slate-600 dark:text-slate-400">
                  {formatDate(expense.date)}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-slate-200 dark:border-slate-700">
                      <DropdownMenuItem
                        onClick={() => handleEdit(expense)}
                        className="cursor-pointer hover:bg-slate-100/50 dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-300"
                      >
                        <Edit2 className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteClick(expense)}
                        className="cursor-pointer text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700 dark:hover:text-red-300"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>


        {/* <EmptyState /> */}
      </div>
      <DeleteExpenseDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        expense={expenseToDelete}
      />
    </>
  );
};

export default ExpenseTable;
