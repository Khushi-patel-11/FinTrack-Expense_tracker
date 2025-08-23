import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import OCRExtraction from '@/components/OCRExtraction';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import {
  FaDollarSign, FaCalendarAlt, FaUpload, FaSave, FaArrowLeft, FaMagic, FaImage, FaTimes, FaPlus, FaRobot
} from 'react-icons/fa';
import ScrollToTop from '@/components/ScrollToTop';
import axios from 'axios';


const AddExpense = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    company: '',
    total_amount: '',
    date: new Date().toISOString().split('T')[0],
    category: '',
    // description: '',
    receipt: null,
    items: [{ name: '', price: '' }]
  });

  const [isLoading, setIsLoading] = useState(false);
  const [suggestedCategory, setSuggestedCategory] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);
  // const [extractedItems, setExtractedItems] = useState([]);
  // const [isExtracting, setIsExtracting] = useState(false);
  const [showOCR, setShowOCR] = useState(false);
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

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Simulate ML category suggestion
    if (field === 'company' && value.length > 2) {
      const lowerValue = value.toLowerCase();
      // if (lowerValue.includes('restaurant') || lowerValue.includes('cafe')) {
      if (lowerValue.includes('restaurant') || lowerValue.includes('cafe') || lowerValue.includes('starbucks')) {
        setSuggestedCategory('Food & Dining');
      } else if (lowerValue.includes('uber') || lowerValue.includes('gas')) {
        setSuggestedCategory('Transportation');
      } else if (lowerValue.includes('amazon') || lowerValue.includes('store')) {
        setSuggestedCategory('Shopping');
      } else {
        setSuggestedCategory('');
      }
    }
  };

  // const handleFileUpload = async (event) => {
  //   const file = event.target.files?.[0];
  //   if (!file) return;

  //   if (file && file.type.startsWith('image/')) {
  //     setFormData(prev => ({
  //       ...prev,
  //       receipt: file
  //     }));

  //     // Create preview URL
  //     const url = URL.createObjectURL(file);
  //     setPreviewUrl(url);
  //     setShowOCR(true);
  //   }
  // };

  // const handleFileUpload = async (event) => {
  //   const file = event.target.files?.[0];
  //   if (!file) return;

  //   if (file && file.type.startsWith('image/')) {
  //     setFormData(prev => ({ ...prev, receipt: file }));
  //     const url = URL.createObjectURL(file);
  //     setPreviewUrl(url);
  //     setShowOCR(true);

  //     // 🔗 Send to Django backend
  //     const formData = new FormData();
  //     formData.append('receipt', file);

  //     try {
  //       const response = await fetch('http://localhost:8000/extract/', {
  //         method: 'POST',
  //         body: formData
  //       });

  //       const data = await response.json();
  //       console.log("OCR Response:", data);

  //       // Auto-fill extracted info
  //       setFormData(prev => ({
  //         ...prev,
  //         company: data["Company Name"] || "",
  //         amount: data["Total Amount"] || "",
  //         date: data["Date"] || new Date().toISOString().split('T')[0],
  //         description: (data["Items"] || []).map(i => i.Item).join(', ')
  //       }));

  //       // Suggested category
  //       const name = (data["Company Name"] || "").toLowerCase();
  //       if (name.includes("starbucks") || name.includes("coffee")) {
  //         setSuggestedCategory("Food & Dining");
  //       }

  //     } catch (err) {
  //       console.error("Failed to extract OCR data:", err);
  //     }
  //   }
  // };


  // const handleFileUpload = async (event) => {
  //   const file = event.target.files?.[0];
  //   if (!file) return;

  //   if (file && file.type.startsWith('image/')) {
  //     setFormData(prev => ({ ...prev, receipt: file }));
  //     const url = URL.createObjectURL(file);
  //     setPreviewUrl(url);
  //     setShowOCR(true);

  //     // 🔗 Send to Django backend using Axios
  //     const formData = new FormData();
  //     formData.append('receipt', file);

  //     try {
  //       const response = await axios.post('http://localhost:8000/extract/', formData, {
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //         },
  //       });

  //       const data = response.data;
  //       console.log("OCR Response:", data);

  //       // Auto-fill extracted info
  //       setFormData(prev => ({
  //         ...prev,
  //         company: data["Company Name"] || "",
  //         amount: data["Total Amount"] || "",
  //         date: data["Date"] || new Date().toISOString().split('T')[0],
  //         description: (data["Items"] || []).map(i => i.Item).join(', ')
  //       }));

  //       // Suggested category
  //       const name = (data["Company Name"] || "").toLowerCase();
  //       if (name.includes("starbucks") || name.includes("coffee")) {
  //         setSuggestedCategory("Food & Dining");
  //       }

  //     } catch (err) {
  //       console.error("❌ Failed to extract OCR data:", err);
  //     }
  //   }
  // };


  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type.startsWith('image/')) {
      setFormData(prev => ({ ...prev, receipt: file }));
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setShowOCR(true);  // Show OCR UI with image preview and "Extract Data" button
    }
  };


  const handleOCRDataAdd = (ocrData) => {
    setFormData(prev => ({
      ...prev,
      company: ocrData.company,
      total_amount: ocrData.total_amount,
      date: ocrData.date,
      // description: ocrData.items?.map(item => item.name).join(', ') || prev.description
    }));

    // Auto-suggest category based on company
    if (ocrData.company.toLowerCase().includes('starbucks') || ocrData.company.toLowerCase().includes('coffee')) {
      setSuggestedCategory('Food & Dining');
    }

    setShowOCR(false);
  };

  const removeFile = () => {
    setFormData(prev => ({ ...prev, receipt: null }));
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    setShowOCR(false);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);

  //   try {
  //     // Simulate API call
  //     await new Promise(resolve => setTimeout(resolve, 1500));

  //     toast({
  //       title: "Expense Added Successfully!",
  //       description: `₹${parseFloat(formData.amount).toFixed(2)} expense for ${formData.company} has been recorded.`,
  //     });

  //     // Reset form
  //     setFormData({
  //       company: '',
  //       amount: '',
  //       date: new Date().toISOString().split('T')[0],
  //       category: '',
  //       description: '',
  //       receipt: null
  //     });
  //     setSuggestedCategory('');
  //     setPreviewUrl(null);
  //     setShowOCR(false);

  //   } catch (error) {
  //     toast({
  //       title: "Error",
  //       description: "Failed to add expense. Please try again.",
  //       variant: "destructive",
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);

  //   try {
  //     const response = await axios.post('http://localhost:8000/api/expenses/', {
  //       company: formData.company,
  //       date: formData.date,
  //       // description: formData.description,
  //       items: formData.items
  //     });

  //     toast({
  //       title: "Expense Added Successfully!",
  //       description: `₹${parseFloat(formData.amount || 0).toFixed(2)} expense for ${formData.company} has been recorded.`,
  //     });

  //     // Reset form
  //     setFormData({
  //       company: '',
  //       amount: '',
  //       date: new Date().toISOString().split('T')[0],
  //       category: '',
  //       // description: '',
  //       receipt: null,
  //       items: [{ name: '', price: '' }]
  //     });
  //     setSuggestedCategory('');
  //     setPreviewUrl(null);
  //     setShowOCR(false);

  //   } catch (error) {
  //     toast({
  //       title: "Error",
  //       description: "Failed to add expense. Please try again.",
  //       variant: "destructive",
  //     });
  //     console.error("Submission Error:", error.response?.data || error.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);

  //   const token = localStorage.getItem('token'); // ✅ Get token from localStorage

  //   try {
  //     const response = await axios.post(
  //       'http://127.0.0.1:8000/api/expenses/',
  //       {
  //         company: formData.company,
  //         date: formData.date,
  //         total_amount: formData.total_amount,
  //         items: formData.items
  //       },
  //       {
  //         headers: {
  //           Authorization: `Token ${token}` // ✅ Include token in header
  //         }
  //       }
  //     );

  //     toast({
  //       title: "Expense Added Successfully!",
  //       description: `₹${parseFloat(formData.total_amount || 0).toFixed(2)} expense for ${formData.company} has been recorded.`,
  //     });

  //     // Reset form
  //     setFormData({
  //       company: '',
  //       total_amount: '',
  //       date: new Date().toISOString().split('T')[0],
  //       category: '',
  //       receipt: null,
  //       items: [{ name: '', price: '' }]
  //     });
  //     setSuggestedCategory('');
  //     setPreviewUrl(null);
  //     setShowOCR(false);

  //   } catch (error) {
  //     toast({
  //       title: "Error",
  //       description: "Failed to add expense. Please try again.",
  //       variant: "destructive",
  //     });
  //     console.error("Submission Error:", error.response?.data || error.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const token = localStorage.getItem('token');
    try {
      // Step 1: Extract item names to predict categories
      // const itemNames = formData.items.map(item => item.name);
      const itemObjects = formData.items.map(item => ({ name: item.name }));

      const categoryResponse = await axios.post(
        "http://127.0.0.1:8000/api/expenses/categorize-items/",
        { items: itemObjects },
        {
          headers: {
            Authorization: `Token ${token}`
          }
        }
      );

      const categorizedItems = categoryResponse.data.results;

      // Step 2: Match categories back to items with price
      const enrichedItems = formData.items.map((item, index) => ({
        name: item.name,
        price: item.price,
        category: categorizedItems[index]?.category || "Other"
      }));

      // Step 3: Submit the expense with categorized items
      const response = await axios.post(
        "http://127.0.0.1:8000/api/expenses/",
        {
          company: formData.company,
          date: formData.date,
          total_amount: formData.total_amount,
          items: enrichedItems
        },
        {
          headers: {
            Authorization: `Token ${token}`
          }
        }
      );

      toast({
        title: "Expense Added Successfully!",
        description: `₹${parseFloat(formData.total_amount || 0).toFixed(2)} expense for ${formData.company} has been recorded.`,
      });

      // Reset form
      setFormData({
        company: '',
        total_amount: '',
        date: new Date().toISOString().split('T')[0],
        category: '',
        receipt: null,
        items: [{ name: '', price: '' }]
      });
      setSuggestedCategory('');
      setPreviewUrl(null);
      setShowOCR(false);

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add expense. Please try again.",
        variant: "destructive",
      });
      console.error("Submission Error:", error.response?.data || error.message);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 transition-all duration-300">
      <Header />

      <main className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/')}
              className="border-gray-200 dark:border-slate-600 hover:bg-gray-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400"
            >
              <FaArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>

          <div className="text-center">
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
              Add New Expense
            </h1>
            <p className="text-slate-600 dark:text-slate-400">Add and manage your daily expenses with ease.</p>
          </div>
        </motion.div>

        {/* Receipt Upload Section
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border-0 shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-3 text-xl font-semibold text-slate-800 dark:text-slate-100">
                <div className="p-2 bg-emerald-500 rounded-xl">
                  <FaUpload className="h-5 w-5 text-white" />
                </div>
                Receipt Upload & AI Extraction
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                Upload your receipt for automatic data extraction and item recognition
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!showOCR ? (
                <div className="border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-xl p-8 text-center hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-slate-700/50 transition-all duration-200 cursor-pointer"
                  onClick={() => document.getElementById('receipt-upload').click()}>
                  <FaImage className="mx-auto h-12 w-12 text-gray-400 dark:text-slate-500 mb-4" />
                  <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-2">Upload Receipt</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">Drag and drop your receipt image here, or click to browse</p>
                  <Button variant="outline" type="button" className="border-gray-200 dark:border-slate-600 text-slate-600 dark:text-slate-400">
                    <FaUpload className="mr-2 h-4 w-4" />
                    Choose File
                  </Button>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">PNG, JPG, JPEG up to 10MB</p>
                </div>
              ) : (
                <OCRExtraction
                  uploadedFile={formData.receipt}
                  previewUrl={previewUrl}
                  onAddToReport={handleOCRDataAdd}
                  onClose={removeFile}
                />
              )}

              <input
                id="receipt-upload"
                type="file"
                accept="image/*"

                onChange={handleFileUpload}
                className="hidden"
              />
            </CardContent>
          </Card>
        </motion.div> */}

        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border-0 shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-3 text-xl font-semibold text-slate-800 dark:text-slate-100">
                <div className="p-2 bg-indigo-500 rounded-xl">
                  <FaDollarSign className="h-5 w-5 text-white" />
                </div>
                Expense Details
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                Fill in the expense information below
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-slate-700 dark:text-slate-300 font-medium">Company/Merchant</Label>
                  <Input
                    id="company"
                    placeholder="e.g. Dmart, National Handloom"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className="border-gray-200 dark:border-slate-600 focus:border-indigo-500 focus:ring-indigo-500/20 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200"
                    required
                  />
                  {suggestedCategory && (
                    <motion.div
                      className="flex items-center gap-2 mt-2"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <FaMagic className="h-4 w-4 text-indigo-500" />
                      <span className="text-sm text-slate-600 dark:text-slate-400">Suggested category:</span>
                      <Badge
                        className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-700 cursor-pointer hover:bg-indigo-200 dark:hover:bg-indigo-900/50"
                        onClick={() => handleInputChange('category', suggestedCategory)}
                      >
                        {suggestedCategory}
                      </Badge>
                    </motion.div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, items: [...formData.items, { name: '', price: '' }] })}
                  className="text-indigo-500 hover:text-indigo-700 text-sm"
                >
                  + Add Item
                </button>

                {formData.items.map((item, index) => (
                  <div key={index} className="flex gap-3 mb-3">
                    <Input
                      type="text"
                      placeholder="Item name"
                      value={item.name}
                      onChange={(e) => {
                        const updatedItems = [...formData.items];
                        updatedItems[index].name = e.target.value;
                        setFormData({ ...formData, items: updatedItems });
                      }}
                      className="flex-1 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200"
                      required
                    />
                    <Input
                      type="number"
                      placeholder="₹ Price"
                      value={item.price}
                      onChange={(e) => {
                        const updatedItems = [...formData.items];
                        updatedItems[index].price = e.target.value;
                        setFormData({ ...formData, items: updatedItems });
                      }}

                      className="w-32 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updatedItems = formData.items.filter((_, i) => i !== index);
                        setFormData({ ...formData, items: updatedItems });
                      }}
                      className="text-red-500 hover:text-red-700 text-xl"
                    >
                      ✕
                    </button>
                  </div>
                ))}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="total_amount" className="text-slate-700 dark:text-slate-300 font-medium">Total Amount</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">₹</span>
                      <Input
                        id="total_amount"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={formData.total_amount}
                        onChange={(e) => handleInputChange('total_amount', e.target.value)}
                        className="pl-8 border-gray-200 dark:border-slate-600 focus:border-indigo-500 focus:ring-indigo-500/20 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date" className="text-slate-700 dark:text-slate-300 font-medium">Date</Label>
                    <div className="relative">
                      <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleInputChange('date', e.target.value)}
                        className="pl-10 border-gray-200 dark:border-slate-600 focus:border-indigo-500 focus:ring-indigo-500/20 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* <div className="space-y-2">
                  <Label htmlFor="category" className="text-slate-700 dark:text-slate-300 font-medium">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger className="border-gray-200 dark:border-slate-600 focus:border-indigo-500 focus:ring-indigo-500/20 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-slate-700 border-gray-200 dark:border-slate-600">
                      {categories.map((category) => (
                        <SelectItem key={category} value={category} className="text-slate-800 dark:text-slate-200">
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div> */}

                {/* <div className="space-y-2">
                  <Label htmlFor="description" className="text-slate-700 dark:text-slate-300 font-medium">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Add any additional notes..."
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="border-gray-200 dark:border-slate-600 focus:border-indigo-500 focus:ring-indigo-500/20 resize-none bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200"
                    rows={3}
                  />
                </div> */}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-300"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <FaSave className="mr-2 h-4 w-4" />
                      Add Expense
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      <ScrollToTop />
    </div>
  );
};

export default AddExpense;
