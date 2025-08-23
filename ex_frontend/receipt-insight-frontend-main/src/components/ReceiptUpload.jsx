
// import { useState, useRef } from 'react';
// import { Button } from '@/components/ui/button';
// import { Card } from '@/components/ui/card';
// import { Upload, X, Image as ImageIcon, FileText } from 'lucide-react';

// const ReceiptUpload = ({ onFileUpload }) => {
//   const [uploadedFile, setUploadedFile] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const fileInputRef = useRef(null);

//   const handleFileSelect = (file) => {
//     if (file && file.type.startsWith('image/')) {
//       setUploadedFile(file);
      
//       // Create preview URL
//       const url = URL.createObjectURL(file);
//       setPreviewUrl(url);
      
//       onFileUpload(file);
//     }
//   };

//   const handleFileInputChange = (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       handleFileSelect(file);
//     }
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//     setIsDragging(true);
//   };

//   const handleDragLeave = (e) => {
//     e.preventDefault();
//     setIsDragging(false);
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     setIsDragging(false);
    
//     const file = e.dataTransfer.files[0];
//     if (file) {
//       handleFileSelect(file);
//     }
//   };

//   const removeFile = () => {
//     setUploadedFile(null);
//     if (previewUrl) {
//       URL.revokeObjectURL(previewUrl);
//       setPreviewUrl(null);
//     }
//     onFileUpload(null);
    
//     // Reset file input
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//   };

//   const openFileDialog = () => {
//     fileInputRef.current?.click();
//   };

//   return (
//     <div className="space-y-4">
//       {!uploadedFile ? (
//         <Card
//           className={`border-2 border-dashed transition-all duration-200 cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 ${
//             isDragging ? 'border-blue-400 bg-blue-50/50' : 'border-gray-300'
//           }`}
//           onDragOver={handleDragOver}
//           onDragLeave={handleDragLeave}
//           onDrop={handleDrop}
//           onClick={openFileDialog}
//         >
//           <div className="p-8 text-center">
//             <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
//             <h3 className="text-lg font-medium text-gray-900 mb-2">
//               Upload Receipt
//             </h3>
//             <p className="text-gray-600 mb-4">
//               Drag and drop your receipt image here, or click to browse
//             </p>
//             <Button variant="outline" type="button" className="mx-auto">
//               <ImageIcon className="mr-2 h-4 w-4" />
//               Choose File
//             </Button>
//             <p className="text-xs text-gray-500 mt-2">
//               PNG, JPG, JPEG up to 10MB
//             </p>
//           </div>
//         </Card>
//       ) : (
//         <Card className="p-4">
//           <div className="flex items-start space-x-4">
//             {previewUrl ? (
//               <div className="flex-shrink-0">
//                 <img
//                   src={previewUrl}
//                   alt="Receipt preview"
//                   className="w-20 h-20 object-cover rounded-lg border"
//                 />
//               </div>
//             ) : (
//               <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
//                 <FileText className="h-8 w-8 text-gray-400" />
//               </div>
//             )}
            
//             <div className="flex-1 min-w-0">
//               <p className="text-sm font-medium text-gray-900 truncate">
//                 {uploadedFile.name}
//               </p>
//               <p className="text-sm text-gray-500">
//                 {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
//               </p>
//               <div className="mt-2">
//                 <div className="w-full bg-gray-200 rounded-full h-2">
//                   <div className="bg-green-500 h-2 rounded-full w-full transition-all duration-300"></div>
//                 </div>
//                 <p className="text-xs text-green-600 mt-1">Upload complete</p>
//               </div>
//             </div>
            
//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={removeFile}
//               className="text-gray-400 hover:text-red-500"
//             >
//               <X className="h-4 w-4" />
//             </Button>
//           </div>
//         </Card>
//       )}

//       <input
//         ref={fileInputRef}
//         type="file"
//         accept="image/*"
//         onChange={handleFileInputChange}
//         className="hidden"
//       />
//     </div>
//   );
// };

// export default ReceiptUpload;
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Upload, X, Image as ImageIcon, FileText, Loader2 } from 'lucide-react';
import axios from 'axios';
import OCRExtraction from './OCRExtraction'; // 🟢 Make sure you have this to show extracted result

const ReceiptUpload = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [extractedData, setExtractedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      setUploadedFile(file);

      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      extractReceiptData(file); // 🔥 OCR trigger
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    setExtractedData(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const extractReceiptData = async (file) => {
    setLoading(true);
    setExtractedData(null);

    const formData = new FormData();
    formData.append('receipt', uploadedFile);

    try {
      const res = await axios.post('http://localhost:8000/extract/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setExtractedData(res.data);
    } catch (err) {
      console.error('🛑 Error extracting receipt:', err);
      alert('Failed to extract receipt details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {!uploadedFile ? (
        <Card
          className={`border-2 border-dashed transition-all duration-200 cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 ${
            isDragging ? 'border-blue-400 bg-blue-50/50' : 'border-gray-300'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={openFileDialog}
        >
          <div className="p-8 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Upload Receipt
            </h3>
            <p className="text-gray-600 mb-4">
              Drag and drop your receipt image here, or click to browse
            </p>
            <Button variant="outline" type="button" className="mx-auto">
              <ImageIcon className="mr-2 h-4 w-4" />
              Choose File
            </Button>
            <p className="text-xs text-gray-500 mt-2">
              PNG, JPG, JPEG up to 10MB
            </p>
          </div>
        </Card>
      ) : (
        <Card className="p-4">
          <div className="flex items-start space-x-4">
            {previewUrl ? (
              <div className="flex-shrink-0">
                <img
                  src={previewUrl}
                  alt="Receipt preview"
                  className="w-20 h-20 object-cover rounded-lg border"
                />
              </div>
            ) : (
              <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                <FileText className="h-8 w-8 text-gray-400" />
              </div>
            )}

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {uploadedFile.name}
              </p>
              <p className="text-sm text-gray-500">
                {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full w-full transition-all duration-300"></div>
                </div>
                <p className="text-xs text-green-600 mt-1">
                  {loading ? 'Extracting data...' : 'Upload complete'}
                </p>
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={removeFile}
              className="text-gray-400 hover:text-red-500"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      )}

      {loading && (
        <div className="flex items-center justify-center space-x-2">
          <Loader2 className="animate-spin h-5 w-5 text-gray-600" />
          <span className="text-gray-700">Analyzing receipt...</span>
        </div>
      )}

      {extractedData && <OCRExtraction data={extractedData} />}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
      />
    </div>
  );
};

export default ReceiptUpload;
