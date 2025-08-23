// import { useState, useEffect } from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
// import { Calendar, DollarSign, Building2 } from 'lucide-react';
// import { useToast } from '@/hooks/use-toast';

// const EditExpenseModal = ({ expense, isOpen, onClose, onSave }) => {
//   const { toast } = useToast();
//   const [formData, setFormData] = useState({
//     company: '',
//     amount: '',
//     date: ''
//   });

//   useEffect(() => {
//     if (expense) {
//       setFormData({
//         company: expense.company || '',
//         amount: expense.amount?.toString() || '',
//         date: expense.date || ''
//       });
//     }
//   }, [expense]);

//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handleSave = () => {
//     if (!formData.company || !formData.amount || !formData.date) {
//       toast({
//         title: "Validation Error",
//         description: "Please fill in all required fields.",
//         variant: "destructive",
//       });
//       return;
//     }

//     const updatedExpense = {
//       ...expense,
//       company: formData.company,
//       amount: parseFloat(formData.amount),
//       date: formData.date
//     };

//     onSave(updatedExpense);
//     toast({
//       title: "Expense Updated",
//       description: "The expense has been successfully updated.",
//     });
//     onClose();
//   };

//   if (!expense) return null;

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-[425px] bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
//         <DialogHeader>
//           <DialogTitle className="text-slate-900 dark:text-slate-100">Edit Expense</DialogTitle>
//           <DialogDescription className="text-slate-600 dark:text-slate-400">
//             Update the expense details below.
//           </DialogDescription>
//         </DialogHeader>

//         <div className="space-y-4 py-4">
//           <div className="space-y-2">
//             <Label htmlFor="company" className="text-slate-700 dark:text-slate-300">Company Name</Label>
//             <div className="relative">
//               <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
//               <Input
//                 id="company"
//                 value={formData.company}
//                 onChange={(e) => handleInputChange('company', e.target.value)}
//                 className="pl-10 bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200"
//                 placeholder="Enter company name"
//               />
//             </div>
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="amount" className="text-slate-700 dark:text-slate-300">Amount</Label>
//             <div className="relative">
//               <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">₹</span>
//               <Input
//                 id="amount"
//                 type="number"
//                 step="0.01"
//                 value={formData.amount}
//                 onChange={(e) => handleInputChange('amount', e.target.value)}
//                 className="pl-8 bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200"
//                 placeholder="0.00"
//               />
//             </div>
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="date" className="text-slate-700 dark:text-slate-300">Date</Label>
//             <div className="relative">
//               <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
//               <Input
//                 id="date"
//                 type="date"
//                 value={formData.date}
//                 onChange={(e) => handleInputChange('date', e.target.value)}
//                 className="pl-10 bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200"
//               />
//             </div>
//           </div>
//         </div>

//         <div className="flex justify-end space-x-2">
//           <Button 
//             variant="outline" 
//             onClick={onClose}
//             className="border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300"
//           >
//             Cancel
//           </Button>
//           <Button 
//             onClick={handleSave}
//             className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white"
//           >
//             Save Changes
//           </Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default EditExpenseModal;


import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Calendar, Building2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
const EditExpenseModal = ({ expense, isOpen, onClose, onSave }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    company: '',
    date: '',
    items: [],
    total_amount: 0
  });

  useEffect(() => {
    if (expense) {
      setFormData({
        company: expense.company || '',
        date: expense.date || '',
        items: expense.items || [],
        // total_amount: expense.total_amount || 0
        total_amount: Number(expense.total_amount) || 0,

      });
    }
  }, [expense]);

  // Handle company/date changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle changes to individual items
  // const handleItemChange = (index, field, value) => {
  //   const updatedItems = [...formData.items];
  //   updatedItems[index] = { ...updatedItems[index], [field]: value };

  //   // Recalculate total amount
  //   const updatedTotal = updatedItems.reduce(
  //     (sum, item) => sum + (parseFloat(item.price) || 0),
  //     0
  //   );

  //   setFormData(prev => ({
  //     ...prev,
  //     items: updatedItems,
  //     total_amount: updatedTotal
  //   }));
  // };


  // ...existing code...
  // const predictCategory = async (itemName) => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     const res = await axios.post(
  //       "http://127.0.0.1:8000/api/expenses/categorize-items/",
  //       { items: [{ name: itemName }] },
  //       { headers: { Authorization: `Token ${token}` } }
  //     );
  //     // Assuming response: { categories: ["PredictedCategory"] }
  //     return res.data.categories?.[0] || "";
  //   } catch (err) {
  //     console.error("Error predicting category:", err);
  //     return "";
  //   }
  // };
  // ...existing code...

  const predictCategory = async (itemName) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://127.0.0.1:8000/api/expenses/categorize-items/",
        { items: [{ name: itemName }] },
        { headers: { Authorization: `Token ${token}` } }
      );
      // Backend returns: { results: [{ name: ..., category: ... }] }
      console.log('It was calles for predictCategory', itemName);
      return res.data.results?.[0]?.category || "";
    } catch (err) {
      console.error("Error predicting category:", err);
      return "";
    }
  };
  const handleItemChange = async (index, field, value) => {
    // If item name changed, predict category first
    if (field === "name") {
      const predictedCategory = await predictCategory(value);
      setFormData((prev) => {
        const newItems = [...prev.items];
        newItems[index] = {
          ...newItems[index],
          name: value,
          category: predictedCategory,
        };
        // Recalculate total amount
        const updatedTotal = newItems.reduce(
          (sum, item) => sum + (parseFloat(item.price) || 0),
          0
        );
        return { ...prev, items: newItems, total_amount: updatedTotal };
      });
    } else {
      setFormData((prev) => {
        const newItems = [...prev.items];
        newItems[index] = {
          ...newItems[index],
          [field]: value,
        };
        // Recalculate total amount
        const updatedTotal = newItems.reduce(
          (sum, item) => sum + (parseFloat(item.price) || 0),
          0
        );
        return { ...prev, items: newItems, total_amount: updatedTotal };
      });
    }
  };
  // const handleItemChange = async (index, field, value) => {
  //   setFormData((prev) => {
  //     const newItems = [...prev.items];
  //     newItems[index][field] = value;
  //     return { ...prev, items: newItems };
  //   });

  //   // If item name changed, predict category
  //   if (field === "name") {
  //     const predictedCategory = await predictCategory(value);
  //     setFormData((prev) => {
  //       const newItems = [...prev.items];
  //       newItems[index].category = predictedCategory;
  //       return { ...prev, items: newItems };
  //     });
  //   }
  // };
  // ...existing code...
  // Save updates
  const handleSave = () => {
    if (!formData.company || !formData.date || formData.items.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please fill all fields and add at least one item.",
        variant: "destructive",
      });
      return;
    }

    // const updatedExpense = {
    //   ...expense,
    //   company: formData.company,
    //   date: formData.date,
    //   items: formData.items,
    //   total_amount: formData.total_amount
    // };

    // const updatedExpense = {
    //   ...expense,
    //   company: formData.company,
    //   total_amount: parseFloat(formData.amount), // ✅ must be total_amount
    //   date: formData.date,
    //   items: formData.items || [] // send items if your serializer requires it
    // };
    // ...existing code...
    const updatedExpense = {
      ...expense,
      company: formData.company,
      total_amount: formData.total_amount, // ✅ Use total_amount, not amount
      date: formData.date,
      items: formData.items || []
    };
    // ...existing code...
    // const handleSave = () => {
    //   if (!formData.company || !formData.amount || !formData.date) {
    //     toast({
    //       title: "Validation Error",
    //       description: "Please fill in all required fields.",
    //       variant: "destructive",
    //     });
    //     return;
    //   }

    //   const updatedExpense = {
    //     ...expense,
    //     company: formData.company,
    //     total_amount: parseFloat(formData.amount), // ✅ correct key
    //     date: formData.date,
    //     items: expense.items || [] // ✅ include items
    //   };

    onSave(updatedExpense);
    toast({
      title: "Expense Updated",
      description: "The expense has been successfully updated.",
    });
    onClose();
  };


  // const handleDeleteItem = async (index, item) => {
  //   // If item has an id, delete from backend
  //   if (item.id) {
  //     try {
  //       const token = localStorage.getItem("token");
  //       await axios.delete(
  //         `http://127.0.0.1:8000/api/expense-items/delete/${item.id}/`,
  //         { headers: { Authorization: `Token ${token}` } }
  //       );
  //     } catch (err) {
  //       toast({
  //         title: "Delete Error",
  //         description: "Failed to delete item from backend.",
  //         variant: "destructive",
  //       });
  //       return;
  //    
  //  }

  //   }
  // Remove from local state
  //   setFormData(prev => {
  //     const newItems = [...prev.items];
  //     newItems.splice(index, 1);
  //     const updatedTotal = newItems.reduce(
  //       (sum, item) => sum + (parseFloat(item.price) || 0),
  //       0
  //     );
  //     return { ...prev, items: newItems, total_amount: updatedTotal };
  //   });
  // };


  const handleDeleteItem = async (index, item) => {
    const token = localStorage.getItem("token");

    // If item has an id, delete from backend
    if (item.id) {
      try {
        await axios.delete(
          `http://127.0.0.1:8000/api/expense-items/delete/${item.id}/`,
          { headers: { Authorization: `Token ${token}` } }
        );
      } catch (err) {
        toast({
          title: "Delete Error",
          description: "Failed to delete item from backend.",
          variant: "destructive",
        });
        return;
      }
    }

    // If this was the last item, delete the whole expense
    if (formData.items.length === 1 && expense.id) {
      try {
        await axios.delete(
          `http://127.0.0.1:8000/api/expenses/${expense.id}/`,
          { headers: { Authorization: `Token ${token}` } }
        );
        toast({
          title: "Expense Deleted",
          description: "All items deleted, so the bill was removed.",
        });
        onClose();
        return;
      } catch (err) {
        toast({
          title: "Delete Error",
          description: "Failed to delete the whole expense.",
          variant: "destructive",
        });
        return;
      }
    }

    // Remove from local state
    setFormData(prev => {
      const newItems = [...prev.items];
      newItems.splice(index, 1);
      const updatedTotal = newItems.reduce(
        (sum, item) => sum + (parseFloat(item.price) || 0),
        0
      );
      return { ...prev, items: newItems, total_amount: updatedTotal };
    });
  };
  if (!expense) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-slate-900 dark:text-slate-100">
            Edit Expense
          </DialogTitle>
          <DialogDescription className="text-slate-600 dark:text-slate-400">
            Update the company, items, and prices below.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Company Name */}
          <div className="space-y-2">
            <Label htmlFor="company" className="text-slate-700 dark:text-slate-300">
              Company Name
            </Label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                className="pl-10 bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200"
                placeholder="Enter company name"
              />
            </div>
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label htmlFor="date" className="text-slate-700 dark:text-slate-300">Date</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className="pl-10 bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200"
              />
            </div>
          </div>

          {/* Items List */}
          <div className="space-y-2">
            <Label className="text-slate-700 dark:text-slate-300">Items</Label>
            {/* {formData.items.map((item, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  type="text"
                  value={item.name}
                  onChange={(e) => handleItemChange(index, "name", e.target.value)}
                  placeholder="Item name"
                  className="bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600"
                />
                <Input
                  type="number"
                  step="0.01"
                  value={item.price}
                  onChange={(e) => handleItemChange(index, "price", e.target.value)}
                  placeholder="Price"
                  className="bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600"
                />
              </div>
            ))} */}
            {/* 
            {formData.items.map((item, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <Input
                  value={item.name}
                  onChange={e => handleItemChange(idx, "name", e.target.value)}
                  placeholder="Item name"
                />
                <Input
                  type="number"
                  value={item.price}
                  onChange={e => handleItemChange(idx, "price", e.target.value)}
                  placeholder="Price"
                />
                <Input
                  value={item.category}
                  readOnly
                  placeholder="Category"
                />
              </div>
            ))} */}

            {formData.items.map((item, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <Input
                  value={item.name}
                  onChange={e => handleItemChange(idx, "name", e.target.value)}
                  placeholder="Item name"
                />
                <Input
                  type="number"
                  value={item.price}
                  onChange={e => handleItemChange(idx, "price", e.target.value)}
                  placeholder="Price"
                />
                {/* <Input
                  value={item.category}
                  readOnly
                  placeholder="Category"
                /> */}
                <Button
                  variant="outline"
                  color="danger"
                  onClick={() => handleDeleteItem(idx, item)}
                  className="ml-2"
                >
                  Delete
                </Button>
              </div>
            ))}

          </div>

          {/* Total Amount */}
          <div className="mt-4 font-semibold">
            Total Amount: ₹{formData.total_amount.toFixed(2)}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white"
          >
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditExpenseModal;
