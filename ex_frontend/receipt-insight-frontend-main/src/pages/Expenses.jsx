import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import ExpenseTable from '@/components/ExpenseTable';
import EditExpenseModal from '@/components/EditExpenseModal';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Search,
  Filter,
  Download,
  Calendar,
  TrendingUp,
  Receipt,
  PlusCircle
} from 'lucide-react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { useNavigate } from 'react-router-dom';
import ExportButton from '@/components/ExportButton';
import ScrollToTop from '@/components/ScrollToTop';
import axios from "axios";
import EmptyState from '@/components/EmptyState';
import SavingsCard from '@/components/SavingsCard';

const Expenses = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  // const [selectedCategory, setSelectedCategory] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [expandedExpenseId, setExpandedExpenseId] = useState(null);
  const [expenseItems, setExpenseItems] = useState({});
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');

  // Mock data - in real app, this would come from state management or API
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState("");

  const categories = [
    'Food & Dining',
    'Transportation',
    'Shopping',
    'Entertainment',
    'Bills & Utilities',
    'Healthcare',
    'Travel',
    'Education',
    'Other'
  ];

  // useEffect(() => {
  //   // const fetchExpenses = async () => {
  //   //   try {
  //   //     const token = localStorage.getItem('token');
  //   //     const res = await axios.get('http://127.0.0.1:8000/api/expenses/', {
  //   //       headers: {
  //   //         Authorization: `Token ${token}`
  //   //       }
  //   //     });
  //   //     setExpenses(res.data);  // Update state with backend response
  //   //   } catch (error) {
  //   //     console.error("Error fetching expenses:", error.response?.data || error.message);
  //   //   }
  //   // };
  //   const fetchExpenses = async () => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       const res = await axios.get("http://127.0.0.1:8000/api/expenses/list/", {
  //         headers: {
  //           Authorization: `Token ${token}`,
  //         },
  //       });
  //       setExpenses(res.data); // <- Set to state
  //     } catch (err) {
  //       console.error("Error fetching expenses:", err.response?.data || err.message);
  //     }
  //   };
  //   fetchExpenses();
  // }, []);

  useEffect(() => {
    const fetchExpenses = async () => {
      const token = localStorage.getItem("token");
      console.log('Token from usestate' + token);
      if (!token) {
        setError("Token not found. Please login.");
        return;
      }

      try {
        const res = await axios.get("http://127.0.0.1:8000/api/expenses/list/", {
          headers: {
            Authorization: `Token ${token}`
          }
        });
        setExpenses(res.data);
      } catch (err) {
        console.error("Error fetching expenses:", err);
        setError("Something went wrong while loading expenses.");
      }
    };

    fetchExpenses();
  }, []);


  // const stats = {
  //   totalExpenses: expenses.reduce((sum, expense) => sum + expense.amount, 0),
  //   transactionCount: expenses.length,
  //   averageAmount: expenses.reduce((sum, expense) => sum + expense.amount, 0) / expenses.length,
  //   withReceipts: expenses.filter(expense => expense.receipt).length
  // };


  // const handleEditExpense = (expense) => {
  //   setSelectedExpense(expense);
  //   setEditModalOpen(true);
  // };
  // const handleEditExpense = async (expenseId) => {
  //   try {
  //     const res = await fetch(`http://127.0.0.1:8000/api/expenses/${expenseId}/`, {
  //       headers: { Authorization: `Token ${localStorage.getItem('token')}` }
  //     });
  //     const data = await res.json();

  //     setSelectedExpense(data); // data should include company_name, items[], total_amount
  //     setEditModalOpen(true);
  //   } catch (err) {
  //     console.error("Error fetching expense details:", err);
  //   }
  // };

  const handleEditExpense = async (expenseId) => {
    try {
      const token = localStorage.getItem('token');

      // Fetch main expense details
      const expenseRes = await axios.get(
        `http://127.0.0.1:8000/api/expenses/${expenseId}/`,
        { headers: { Authorization: `Token ${token}` } }
      );

      // Fetch items for that expense
      const itemsRes = await axios.get(
        `http://127.0.0.1:8000/api/expenses/${expenseId}/items/`,
        { headers: { Authorization: `Token ${token}` } }
      );

      // Merge both into one object
      const expenseData = {
        ...expenseRes.data,
        items: itemsRes.data,
      };

      setSelectedExpense(expenseData);
      setEditModalOpen(true);
    } catch (err) {
      console.error("Error fetching expense details:", err);
    }
  };

  const toggleExpand = async (expenseId) => {
    if (expandedExpenseId === expenseId) {
      setExpandedExpenseId(null);
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/expenses/${expenseId}/items/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
      const data = await response.json();

      setExpenseItems((prev) => ({
        ...prev,
        [expenseId]: data, // Store items for this expense
      }));

      setExpandedExpenseId(expenseId);
    } catch (error) {
      console.error("Failed to fetch expense items:", error);
    }
  };

  // const handleSaveExpense = (updatedExpense) => {
  //   setExpenses(prev => prev.map(expense =>
  //     expense.id === updatedExpense.id ? updatedExpense : expense
  //   ));
  //   setEditModalOpen(false);
  //   setSelectedExpense(null);
  // };
  // const handleSaveExpense = async (updatedExpense) => {
  //   try {
  //     const token = localStorage.getItem("token");

  //     // Update main expense
  //     await axios.put(
  //       `http://127.0.0.1:8000/api/expenses/${updatedExpense.id}/`,
  //       {
  //         company: updatedExpense.company,
  //         date: updatedExpense.date,
  //         total_amount: updatedExpense.total_amount,
  //       },
  //       { headers: { Authorization: `Token ${token}` } }
  //     );

  //     // Update items
  //     if (updatedExpense.items) {
  //       for (const item of updatedExpense.items) {
  //         await axios.put(
  //           `http://127.0.0.1:8000/api/expense-items/${item.id}/`,
  //           {
  //             name: item.name,
  //             price: item.price,
  //             category: item.category,
  //           },
  //           { headers: { Authorization: `Token ${token}` } }
  //         );
  //       }
  //     }

  //     setEditModalOpen(false);
  //     setSelectedExpense(null);
  //   } catch (err) {
  //     console.error("Error saving expense:", err);
  //   }
  //   };

  const handleSaveExpense = async (updatedExpense) => {
    try {
      const token = localStorage.getItem("token");

      // Update main expense with items
      await axios.put(
        `http://127.0.0.1:8000/api/expenses/${updatedExpense.id}/`,
        {
          company: updatedExpense.company,
          date: updatedExpense.date,
          total_amount: updatedExpense.total_amount,
          items: updatedExpense.items, // Send all items here
        },
        { headers: { Authorization: `Token ${token}` } }
      );

      // Refresh the list after saving
      const res = await axios.get("http://127.0.0.1:8000/api/expenses/list/", {
        headers: { Authorization: `Token ${token}` },
      });
      setExpenses(res.data);

      setEditModalOpen(false);
      setSelectedExpense(null);
    } catch (err) {
      console.error("Error saving expense:", err);
    }
  };
  // ...existing code...
  // Refresh the list after saving
  // const res = await axios.get("http://127.0.0.1:8000/api/expenses/list/", {
  //   headers: { Authorization: `Token ${token}` },
  // });
  // setExpenses(res.data);

  //   setEditModalOpen(false);
  //   setSelectedExpense(null);
  // } catch (err) {
  //   console.error("Error saving expense:", err);
  // }
  //   };

  // const handleDeleteExpense = (expenseToDelete) => {
  //   setExpenses(prev => prev.filter(expense => expense.id !== expenseToDelete.id));

  // };

  const handleDeleteExpense = async (expenseToDelete) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://127.0.0.1:8000/api/expenses/${expenseToDelete.id}/`,
        { headers: { Authorization: `Token ${token}` } }
      );
      setExpenses(prev => prev.filter(expense => expense.id !== expenseToDelete.id));
    } catch (err) {
      console.error("Error deleting expense:", err);
    }
  };
  // const filteredExpenses = expenses.filter(expense => {
  //   const matchesSearch = expense.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     expense.description?.toLowerCase().includes(searchTerm.toLowerCase());
  //   const matchesCategory = selectedCategory === 'all' || expense.category === selectedCategory;

  //   return matchesSearch && matchesCategory;
  // });

  // const filteredExpenses = expenses.filter((expense) => {
  //   const matchesSearch = expense.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     expense.description?.toLowerCase().includes(searchTerm.toLowerCase());
  //   // const matchesCategory = selectedCategory === 'all' || expense.category === selectedCategory;
  //   const matchesPrice =
  //     (minPrice === '' || Number(expense.total_amount) >= Number(minPrice)) &&
  //     (maxPrice === '' || Number(expense.total_amount) <= Number(maxPrice));

  //   return matchesSearch && matchesPrice;

  // return matchesSearch && matchesCategory;
  // });
  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch = expense.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPrice =
      (minPrice === '' || Number(expense.total_amount) >= Number(minPrice)) &&
      (maxPrice === '' || Number(expense.total_amount) <= Number(maxPrice));

    const expenseDate = new Date(expense.date); // Ensure your expense object has a "date" field
    const matchesDate =
      (minDate === '' || expenseDate >= new Date(minDate)) &&
      (maxDate === '' || expenseDate <= new Date(maxDate));

    return matchesSearch && matchesPrice && matchesDate;
  });

  const handleViewItems = async (expense) => {
    try {
      const response = await axios.get(
        `/api/expenses/${expense.id}/items/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSelectedExpense(expense);
      setItems(response.data);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const stats = {
    // totalExpenses: filteredExpenses.reduce(
    //   (sum, expense) => sum + (parseFloat(expense.total_amount) || 0), 0
    // ),
    totalExpenses: filteredExpenses.reduce(
      (sum, expense) => sum + Number(expense.total_amount || 0),
      0
    ),

    transactionCount: filteredExpenses.length,
    averageAmount:
      filteredExpenses.length > 0
        ? filteredExpenses.reduce(
          (sum, expense) => sum + (parseFloat(expense.total_amount) || 0), 0
        ) / filteredExpenses.length
        : 0,
    withReceipts: filteredExpenses.filter((expense) => expense.receipt).length,
  };

  const handleRowClick = async (expense) => {
    try {
      const res = await axios.get(`/api/expenses/items/${expense.id}/`);
      setItems(res.data);
      setSelectedExpense(expense);
      setShowModal(true);
    } catch (error) {
      console.error("Failed to fetch expense items", error);
    }
  };

  // const stats = {
  //   totalExpenses: filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0),
  //   transactionCount: filteredExpenses.length,
  //   averageAmount: filteredExpenses.length > 0 ? filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0) / filteredExpenses.length : 0,
  //   withReceipts: filteredExpenses.filter(expense => expense.receipt).length
  // };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <Header />

      <main className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent mb-2">
                All Expenses
              </h1>
              <p className="text-slate-600 dark:text-slate-400">Track and manage your expense history</p>
            </div>
            <div className="flex items-center gap-3">
              <ExportButton expenses={filteredExpenses} title="All Expenses Report" />
              <Button
                onClick={() => navigate('/add-expense')}
                className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/30 transition-all duration-300"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Expense
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border-0 shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50" >
            {/* <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-slate-600 dark:text-slate-400">Total Amount</CardTitle>
              <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl">
                ₹
              </div>
            </CardHeader> */}
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                Total Amount
              </CardTitle>
              <div className="w-8 p-2 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl text-white font-bold text-sm">
                ₹
              </div>
            </CardHeader>

            <CardContent>
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                ₹{stats.totalExpenses.toFixed(2)}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">From {filteredExpenses.length} expenses</p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border-0 shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-slate-600 dark:text-slate-400">Transactions</CardTitle>
              <div className="p-2 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{stats.transactionCount}</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Total records</p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border-0 shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-slate-600 dark:text-slate-400">Average</CardTitle>
              <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl">
                <Calendar className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                ₹{stats.averageAmount.toFixed(2)}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Per transaction</p>
            </CardContent>
          </Card>

          <SavingsCard />
        </div>

        {/* Filters and Search */}
        <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border-0 shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50 mb-8">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-lg font-semibold text-slate-900 dark:text-slate-100">
              <div className="p-2 bg-gradient-to-br from-slate-500 to-slate-600 rounded-xl">
                <Filter className="h-4 w-4 text-white" />
              </div>
              Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search company or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-slate-200 dark:border-slate-600 focus:border-violet-500 focus:ring-violet-500/20 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200"
                  />
                </div>
              </div>

              {/* <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="border-slate-200 dark:border-slate-600 focus:border-violet-500 focus:ring-violet-500/20 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200">
                    <SelectValue placeholder="All categories" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600">
                    <SelectItem value="all" className="text-slate-800 dark:text-slate-200">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category} className="text-slate-800 dark:text-slate-200">
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div> */}

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Price Range</label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Min ₹"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="border-slate-200 dark:border-slate-600 focus:border-violet-500 focus:ring-violet-500/20 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200"
                  />
                  <Input
                    type="number"
                    placeholder="Max ₹"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="border-slate-200 dark:border-slate-600 focus:border-violet-500 focus:ring-violet-500/20 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200"
                  />
                </div>
              </div>

              {/* <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Date Range</label>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="border-slate-200 dark:border-slate-600 focus:border-violet-500 focus:ring-violet-500/20 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200">
                    <SelectValue placeholder="All time" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600">
                    <SelectItem value="all" className="text-slate-800 dark:text-slate-200">All Time</SelectItem>
                    <SelectItem value="today" className="text-slate-800 dark:text-slate-200">Today</SelectItem>
                    <SelectItem value="month" className="text-slate-800 dark:text-slate-200">This Month</SelectItem>
                    <SelectItem value="year" className="text-slate-800 dark:text-slate-200">This Year</SelectItem>
                  </SelectContent>
                </Select>
              </div> */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Date Range
                </label>
                <div className="flex gap-2">
                  <Input
                    type="date"
                    value={minDate}
                    onChange={(e) => setMinDate(e.target.value)}
                    className="border-slate-200 dark:border-slate-600 focus:border-violet-500 focus:ring-violet-500/20 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200"
                  />
                  <Input
                    type="date"
                    value={maxDate}
                    onChange={(e) => setMaxDate(e.target.value)}
                    className="border-slate-200 dark:border-slate-600 focus:border-violet-500 focus:ring-violet-500/20 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200"
                  />
                </div>
              </div>

            </div>
          </CardContent>
        </Card>

        {/* Expenses Table */}
        <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border-0 shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100"> Records
            </CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-400">
              {filteredExpenses.length} of {expenses.length} expenses shown
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* <ExpenseTable
              expenses={filteredExpenses}
              onEdit={handleEditExpense}
              onDelete={handleDeleteExpense}
              // onViewItems={handleViewItems}
              onViewItems={handleRowClick}
            /> */}
            {/* {filteredExpenses.length > 0 ? (
              <ExpenseTable
                expenses={filteredExpenses}
                onEdit={handleEditExpense}
                onDelete={handleDeleteExpense}
                onViewItems={handleRowClick}
              />
            ) : (
              <div className="text-center py-6 text-slate-500 dark:text-slate-400">
                No expenses found for the selected filters.
              </div>
            )} */}

            {filteredExpenses.length > 0 ? (
              <ExpenseTable
                expenses={filteredExpenses}
                // onEdit={handleEditExpense}
                onEdit={(expense) => handleEditExpense(expense.id)}
                onDelete={handleDeleteExpense}
                onViewItems={handleRowClick}
              />
            ) : (
              <EmptyState
                title="No Expenses Found"
                subtitle="Start by adding your first expense to track your spending."
                buttonText="Add Expense"
                buttonAction={() => navigate('/add-expense')}
              />
            )}

            {/* <Dialog open={showModal} onOpenChange={setShowModal}>
            <DialogContent>
              {/* <DialogHeader>
                <DialogTitle>Items for {selectedExpense?.company}</DialogTitle>
              </DialogHeader> 
              <div className="mt-4 space-y-2">
                {/* {items.map((item, index) => ( 
                {Array.isArray(items) && items.map((item) => (
                  <div key={index} className="flex justify-between border-b pb-1">
                    <span>{item.name}</span>
                    <span>₹{item.price}</span>
                    <span className="text-sm text-gray-500">{item.category}</span>
                  </div>
                  // ))}
                ))}
              </div>
            </DialogContent>
          </Dialog> */}

          </CardContent>
        </Card>
      </main >


      <EditExpenseModal
        expense={selectedExpense}
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSave={handleSaveExpense}
      />

      <ScrollToTop />
    </div >
  );
};

export default Expenses;
//         isOpen={editModalOpen}
//         onClose={() => setEditModalOpen(false)}
//         onSave={handleSaveExpense}
//       />

//       <ScrollToTop />
//     </div >
//   );
// };

// export default Expenses;
