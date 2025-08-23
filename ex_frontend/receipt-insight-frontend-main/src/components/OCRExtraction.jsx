
// import { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { useToast } from '@/hooks/use-toast';
// import { 
//   FaDollarSign, 
//   FaCalendarAlt, 
//   FaUpload, 
//   FaSave, 
//   FaArrowLeft, 
//   FaMagic,
//   FaImage,
//   FaPlus,
//   FaRobot,
//   FaTimes,
//   FaCheckCircle,
// } from 'react-icons/fa';
// import ScrollToTop from '@/components/ScrollToTop';
// const OCRExtraction = ({ previewUrl, onAddToReport, onClose }) => {
//   const { toast } = useToast();
//   const [isExtracting, setIsExtracting] = useState(false);
//   const [extractedData, setExtractedData] = useState(null);
//   const [editableData, setEditableData] = useState({
//     company: '',
//     date: '',
//     amount: '',
//     items: []
//   });

//   const simulateOCRExtraction = async () => {
//     setIsExtracting(true);

//     // Simulate OCR processing time
//     await new Promise(resolve => setTimeout(resolve, 3000));

//     // Mock OCR extracted data
//     const mockData = {
//       company: 'Starbucks Coffee',
//       date: new Date().toISOString().split('T')[0],
//       amount: '24.75',
//       items: [
//         { name: 'Grande Latte', price: 5.95 },
//         { name: 'Blueberry Muffin', price: 3.25 },
//         { name: 'Cappuccino', price: 4.75 },
//         { name: 'Service Fee', price: 0.80 },
//         { name: 'Tax', price: 2.00 }
//       ]
//     };

//     setExtractedData(mockData);
//     setEditableData(mockData);
//     setIsExtracting(false);

//     toast({
//       title: "OCR Extraction Complete!",
//       description: "Receipt data has been automatically extracted and can be edited.",
//     });
//   };

//   const handleInputChange = (field, value) => {
//     setEditableData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handleItemChange = (index, field, value) => {
//     setEditableData(prev => ({
//       ...prev,
//       items: prev.items.map((item, i) => 
//         i === index ? { ...item, [field]: value } : item
//       )
//     }));
//   };

//   const handleAddToReport = () => {
//     if (!editableData.company || !editableData.amount || !editableData.date) {
//       toast({
//         title: "Validation Error",
//         description: "Please fill in company name, amount, and date.",
//         variant: "destructive",
//       });
//       return;
//     }

//     onAddToReport(editableData);
//     toast({
//       title: "Added to Report!",
//       description: "Expense has been successfully added to your records.",
//     });
//   };

//   const totalAmount = editableData.items.reduce((sum, item) => sum + parseFloat(item.price || 0), 0);

//   return (
//     <div className="space-y-6">
//       {/* Image Preview */}
//       <div className="relative">
//         <img
//           src={previewUrl}
//           alt="Receipt preview"
//           className="w-full max-w-md mx-auto rounded-lg border shadow-lg"
//         />
//         <Button
//           variant="ghost"
//           size="sm"
//           onClick={onClose}
//           className="absolute top-2 right-2 bg-white/80 hover:bg-white text-slate-600 hover:text-red-500"
//         >
//           <FaTimes className="h-4 w-4" />
//         </Button>
//       </div>

//       {/* OCR Processing */}
//       {!extractedData && !isExtracting && (
//         <div className="text-center">
//           <Button
//             onClick={simulateOCRExtraction}
//             className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
//           >
//             <FaRobot className="mr-2 h-4 w-4" />
//             Extract Data with OCR
//           </Button>
//         </div>
//       )}

//       {isExtracting && (
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800 text-center"
//         >
//           <div className="flex items-center justify-center gap-3 mb-4">
//             <div className="animate-spin">
//               <FaRobot className="h-8 w-8 text-blue-600 dark:text-blue-400" />
//             </div>
//             <span className="text-lg font-medium text-blue-800 dark:text-blue-200">
//               Processing Receipt...
//             </span>
//           </div>
//           <p className="text-sm text-blue-600 dark:text-blue-300">
//             Using OCR to extract company name, date, amount, and item details
//           </p>
//         </motion.div>
//       )}

//       {/* Extracted Data Form */}
//       <AnimatePresence>
//         {extractedData && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             className="space-y-6"
//           >
//             <Card className="bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2 text-emerald-800 dark:text-emerald-200">
//                   <FaCheckCircle className="h-5 w-5" />
//                   Extracted Receipt Data
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 {/* Company Name */}
//                 <div className="space-y-2">
//                   <Label className="text-slate-700 dark:text-slate-300">Company Name</Label>
//                   <Input
//                     value={editableData.company}
//                     onChange={(e) => handleInputChange('company', e.target.value)}
//                     className="bg-white dark:bg-slate-700 border-emerald-200 dark:border-emerald-700"
//                   />
//                 </div>

//                 {/* Date and Amount */}
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <Label className="text-slate-700 dark:text-slate-300">Date</Label>
//                     <Input
//                       type="date"
//                       value={editableData.date}
//                       onChange={(e) => handleInputChange('date', e.target.value)}
//                       className="bg-white dark:bg-slate-700 border-emerald-200 dark:border-emerald-700"
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label className="text-slate-700 dark:text-slate-300">Total Amount</Label>
//                     <div className="relative">
//                       <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">₹</span>
//                       <Input
//                         type="number"
//                         value={editableData.amount}
//                         onChange={(e) => handleInputChange('amount', e.target.value)}
//                         className="pl-8 bg-white dark:bg-slate-700 border-emerald-200 dark:border-emerald-700"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Items List */}
//                 {editableData.items.length > 0 && (
//                   <div className="space-y-3">
//                     <Label className="text-slate-700 dark:text-slate-300">Extracted Items</Label>
//                     <div className="space-y-2 max-h-48 overflow-y-auto">
//                       {editableData.items.map((item, index) => (
//                         <div key={index} className="flex items-center gap-2 p-3 bg-white dark:bg-slate-700 rounded-lg border">
//                           <Input
//                             value={item.name}
//                             onChange={(e) => handleItemChange(index, 'name', e.target.value)}
//                             placeholder="Item name"
//                             className="flex-1"
//                           />
//                           <div className="relative w-24">
//                             <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-xs text-slate-400">₹</span>
//                             <Input
//                               type="number"
//                               step="0.01"
//                               value={item.price}
//                               onChange={(e) => handleItemChange(index, 'price', e.target.value)}
//                               className="pl-6 text-sm"
//                               placeholder="0.00"
//                             />
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                     <div className="text-right">
//                       <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
//                         Calculated Total: ₹{totalAmount.toFixed(2)}
//                       </span>
//                     </div>
//                   </div>
//                 )}

//                 {/* Action Buttons */}
//                 <div className="flex justify-end gap-3 pt-4">
//                   <Button
//                     variant="outline"
//                     onClick={onClose}
//                     className="border-slate-200 dark:border-slate-600"
//                   >
//                     Cancel
//                   </Button>
//                   <Button
//                     onClick={handleAddToReport}
//                     className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
//                   >
//                     <FaPlus className="mr-2 h-4 w-4" />
//                     Add to Report
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default OCRExtraction;

// import { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { useToast } from '@/hooks/use-toast';
// import { FaRobot, FaTimes, FaCheckCircle, FaPlus } from 'react-icons/fa';
// import ScrollToTop from '@/components/ScrollToTop';

// const OCRExtraction = ({ uploadedFile, previewUrl, onAddToReport, onClose }) => {
//   const { toast } = useToast();
//   const [isExtracting, setIsExtracting] = useState(false);
//   const [extractedData, setExtractedData] = useState(null);
//   const [editableData, setEditableData] = useState({
//     company: '',
//     date: '',
//     amount: '',
//     items: [],
//   });

//   const extractFromBackend = async () => {
//     if (!uploadedFile) {
//       toast({
//         title: "Upload Required",
//         description: "Please upload a receipt image first.",
//         variant: "destructive",
//       });
//       return;
//     }

//     setIsExtracting(true);

//     const formData = new FormData();
//     formData.append("image", uploadedFile);

//     try {
//       const res = await fetch("http://127.0.0.1:8000/extract/", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();

//       if (res.ok) {
//         const formatted = {
//           company: data["Company Name"] || '',
//           date: data["Date"] || '',
//           amount: data["Total Amount"] || '',
//           items: (data.Items || []).map((item) => ({
//             name: item.Item,
//             price: item.Price,
//           })),
//         };
//         setExtractedData(formatted);
//         setEditableData(formatted);
//         toast({ title: "Extraction Success", description: "Receipt data extracted." });
//       } else {
//         toast({ title: "Extraction Failed", description: data.error || "Try another receipt.", variant: "destructive" });
//       }
//     } catch (err) {
//       console.error("OCR API error:", err);
//       toast({ title: "Server Error", description: "Could not connect to OCR API.", variant: "destructive" });
//     } finally {
//       setIsExtracting(false);
//     }
//   };

//   const handleInputChange = (field, value) => {
//     setEditableData((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleItemChange = (index, field, value) => {
//     setEditableData((prev) => ({
//       ...prev,
//       items: prev.items.map((item, i) =>
//         i === index ? { ...item, [field]: value } : item
//       ),
//     }));
//   };

//   const handleAddToReport = () => {
//     if (!editableData.company || !editableData.amount || !editableData.date) {
//       toast({
//         title: "Validation Error",
//         description: "Please fill in all required fields.",
//         variant: "destructive",
//       });
//       return;
//     }
//     onAddToReport(editableData);
//     toast({ title: "Saved!", description: "Added to report." });
//   };

//   const totalAmount = editableData.items.reduce((sum, item) => sum + parseFloat(item.price || 0), 0);

//   return (
//     <div className="space-y-6">
//       {/* Preview Image */}
//       <div className="relative">
//         <img
//           src={previewUrl}
//           alt="Receipt preview"
//           className="w-full max-w-md mx-auto rounded-lg border shadow-lg"
//         />
//         <Button
//           variant="ghost"
//           size="sm"
//           onClick={onClose}
//           className="absolute top-2 right-2 bg-white/80 hover:bg-white text-slate-600 hover:text-red-500"
//         >
//           <FaTimes className="h-4 w-4" />
//         </Button>
//       </div>

//       {/* OCR Trigger Button */}
//       {!extractedData && !isExtracting && (
//         <div className="text-center">
//           <Button
//             onClick={extractFromBackend}
//             className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white"
//           >
//             <FaRobot className="mr-2 h-4 w-4" />
//             Extract Data with OCR
//           </Button>
//         </div>
//       )}

//       {/* Loading Spinner */}
//       {isExtracting && (
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border text-center"
//         >
//           <div className="animate-spin text-blue-600 dark:text-blue-400 mb-2">
//             <FaRobot className="h-8 w-8" />
//           </div>
//           <p className="text-sm text-blue-600 dark:text-blue-300">Extracting data...</p>
//         </motion.div>
//       )}

//       {/* Extracted Data Form */}
//       <AnimatePresence>
//         {extractedData && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             className="space-y-6"
//           >
//             <Card className="bg-emerald-50 dark:bg-emerald-900/20">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2 text-emerald-800 dark:text-emerald-200">
//                   <FaCheckCircle className="h-5 w-5" />
//                   Extracted Receipt Data
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 {/* Company, Date, Amount */}
//                 <div className="space-y-2">
//                   <Label>Company Name</Label>
//                   <Input value={editableData.company} onChange={(e) => handleInputChange('company', e.target.value)} />
//                 </div>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <Label>Date</Label>
//                     <Input type="date" value={editableData.date} onChange={(e) => handleInputChange('date', e.target.value)} />
//                   </div>
//                   <div className="space-y-2">
//                     <Label>Total Amount</Label>
//                     <Input type="number" value={editableData.amount} onChange={(e) => handleInputChange('amount', e.target.value)} />
//                   </div>
//                 </div>

//                 {/* Item List */}
//                 <div className="space-y-3">
//                   <Label>Extracted Items</Label>
//                   {editableData.items.map((item, idx) => (
//                     <div key={idx} className="flex items-center gap-3">
//                       <Input value={item.name} onChange={(e) => handleItemChange(idx, 'name', e.target.value)} placeholder="Item" />
//                       <Input type="number" value={item.price} onChange={(e) => handleItemChange(idx, 'price', e.target.value)} className="w-24" />
//                     </div>
//                   ))}
//                   <p className="text-right text-sm">Calculated Total: ₹{totalAmount.toFixed(2)}</p>
//                 </div>

//                 {/* Save Button */}
//                 <div className="text-right pt-4">
//                   <Button onClick={handleAddToReport} className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
//                     <FaPlus className="mr-2" /> Add to Report
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default OCRExtraction;
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { FaRobot, FaTimes, FaCheckCircle, FaPlus } from 'react-icons/fa';
import ScrollToTop from '@/components/ScrollToTop';
import axios from 'axios';

const OCRExtraction = ({ uploadedFile, previewUrl, onAddToReport, onClose }) => {
  const { toast } = useToast();
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractedData, setExtractedData] = useState(null);
  const [editableData, setEditableData] = useState({
    company: '',
    date: '',
    amount: '',
    items: [],
  });

  // const extractFromBackend = async () => {
  //   if (!uploadedFile) {
  //     toast({
  //       title: "Upload Required",
  //       description: "Please upload a receipt image first.",
  //       variant: "destructive",
  //     });
  //     return;
  //   }

  //   setIsExtracting(true);

  //   const formData = new FormData();
  //   formData.append("image", uploadedFile);

  //   try {
  //     const res = await axios.post("http://127.0.0.1:8000/extract/", formData);
  //     const data = res.data;

  //     const formatted = {
  //       company: data["Company Name"] || '',
  //       date: data["Date"] || '',
  //       amount: data["Total Amount"] || '',
  //       items: (data.Items || []).map((item) => ({
  //         name: item.Item,
  //         price: item.Price,
  //       })),
  //     };
  //     setExtractedData(formatted);
  //     setEditableData(formatted);
  //     toast({ title: "Extraction Success", description: "Receipt data extracted." });

  //   } catch (err) {
  //     console.error("OCR API error:", err);
  //     toast({
  //       title: "Server Error",
  //       description: "Could not connect to OCR API.",
  //       variant: "destructive",
  //     });
  //   } finally {
  //     setIsExtracting(false);
  //   }
  // };

  const extractFromBackend = async () => {
    if (!uploadedFile) {
      toast({
        title: "Upload Required",
        description: "Please upload a receipt image first.",
        variant: "destructive",
      });
      return;
    }

    setIsExtracting(true);

    const formData = new FormData();
    formData.append("receipt", uploadedFile);  // ✅ This is correct

    try {
      const res = await axios.post("http://127.0.0.1:8000/extract/", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const data = res.data;

      if (res.status === 200) {
        const formatted = {
          company: data["Company Name"] || '',
          date: data["Date"] || '',
          amount: data["Total Amount"] || '',
          items: (data.Items || []).map(item => ({
            name: item.Item,
            price: item.Price
          })),
        };

        setExtractedData(formatted);
        setEditableData(formatted);

        toast({
          title: "Extraction Success",
          description: "Receipt data extracted."
        });

      } else {
        toast({
          title: "Extraction Failed",
          description: data.error || "Try another receipt.",
          variant: "destructive"
        });
      }

    } catch (err) {
      console.error("OCR API error:", err);
      toast({
        title: "Server Error",
        description: "Could not connect to OCR API.",
        variant: "destructive"
      });
    } finally {
      setIsExtracting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setEditableData((prev) => ({ ...prev, [field]: value }));
  };

  const handleItemChange = (index, field, value) => {
    setEditableData((prev) => ({
      ...prev,
      items: prev.items.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleAddToReport = () => {
    if (!editableData.company || !editableData.amount || !editableData.date) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    onAddToReport(editableData);
    toast({ title: "Saved!", description: "Added to report." });
  };

  const totalAmount = editableData.items.reduce((sum, item) => sum + parseFloat(item.price || 0), 0);

  return (
    <div className="space-y-6">
      <div className="relative">
        <img
          src={previewUrl}
          alt="Receipt preview"
          className="w-full max-w-md mx-auto rounded-lg border shadow-lg"
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="absolute top-2 right-2 bg-white/80 hover:bg-white text-slate-600 hover:text-red-500"
        >
          <FaTimes className="h-4 w-4" />
        </Button>
      </div>

      {!extractedData && !isExtracting && (
        <div className="text-center">
          <Button
            onClick={extractFromBackend}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white"
          >
            <FaRobot className="mr-2 h-4 w-4" />
            Extract Data with OCR
          </Button>
        </div>
      )}

      {isExtracting && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border text-center"
        >
          <div className="animate-spin text-blue-600 dark:text-blue-400 mb-2">
            <FaRobot className="h-8 w-8" />
          </div>
          <p className="text-sm text-blue-600 dark:text-blue-300">Extracting data...</p>
        </motion.div>
      )}

      <AnimatePresence>
        {extractedData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <Card className="bg-emerald-50 dark:bg-emerald-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-800 dark:text-emerald-200">
                  <FaCheckCircle className="h-5 w-5" />
                  Extracted Receipt Data
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Company Name</Label>
                  <Input value={editableData.company} onChange={(e) => handleInputChange('company', e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Input type="date" value={editableData.date} onChange={(e) => handleInputChange('date', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Total Amount</Label>
                    <Input type="number" value={editableData.amount} onChange={(e) => handleInputChange('amount', e.target.value)} />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Extracted Items</Label>
                  {editableData.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <Input value={item.name} onChange={(e) => handleItemChange(idx, 'name', e.target.value)} placeholder="Item" />
                      <Input type="number" value={item.price} onChange={(e) => handleItemChange(idx, 'price', e.target.value)} className="w-24" />
                    </div>
                  ))}
                  <p className="text-right text-sm">Calculated Total: ₹{totalAmount.toFixed(2)}</p>
                </div>

                <div className="text-right pt-4">
                  <Button onClick={handleAddToReport} className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
                    <FaPlus className="mr-2" /> Add to Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OCRExtraction;
