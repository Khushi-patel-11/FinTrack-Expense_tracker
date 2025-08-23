
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';

// export const exportToPDF = (expenses, title = 'Expense Report') => {
//   const doc = new jsPDF();
//   const currentDate = new Date().toLocaleDateString();

//   // Add title
//   doc.setFontSize(20);
//   doc.text(title, 20, 20);

//   // Add date
//   doc.setFontSize(12);
//   doc.text(`Generated on: ${currentDate}`, 20, 35);

//   // Prepare table data
//   const tableData = expenses.map(expense => [
//     expense.company || 'N/A',
//     `₹${expense.amount.toFixed(2)}`,
//     new Date(expense.date).toLocaleDateString(),
//     expense.category || 'N/A',
//     expense.description || 'N/A'
//   ]);

//   // Add table
//   doc.autoTable({
//     head: [['Company', 'Amount', 'Date', 'Category', 'Description']],
//     body: tableData,
//     startY: 45,
//     theme: 'grid',
//     headStyles: { fillColor: [99, 102, 241] },
//     styles: { fontSize: 10 }
//   });

//   // Calculate totals
//   const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
//   const finalY = doc.lastAutoTable.finalY + 10;

//   doc.setFontSize(14);
//   doc.text(`Total Expenses: ₹${total.toFixed(2)}`, 20, finalY);

//   // Save with current date
//   const fileName = `expense-report-${new Date().toISOString().split('T')[0]}.pdf`;
//   doc.save(fileName);
// };

// export const exportToCSV = (expenses, filename = 'expenses') => {
//   const headers = ['Company', 'Amount', 'Date', 'Category', 'Description'];

//   const csvContent = [
//     headers.join(','),
//     ...expenses.map(expense => [
//       `"${expense.company || 'N/A'}"`,
//       expense.amount.toFixed(2),
//       expense.date,
//       `"${expense.category || 'N/A'}"`,
//       `"${expense.description || 'N/A'}"`
//     ].join(','))
//   ].join('\n');

//   const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//   const link = document.createElement('a');
//   const url = URL.createObjectURL(blob);

//   link.setAttribute('href', url);
//   link.setAttribute('download', `${filename}-${new Date().toISOString().split('T')[0]}.csv`);
//   link.style.visibility = 'hidden';

//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// };


// export const exportToPDF = (expenses, title = 'Expense Report') => {
//   // ✅ Step 1: Format data first
//   const formatted = expenses.map(e => ({
//     company: e.company,
//     amount: e.total_amount ?? e.amount ?? 0,
//     date: e.date,
//     category: e.category,
//     description: e.description
//   }));

//   const doc = new jsPDF();
//   const currentDate = new Date().toLocaleDateString();

//   // Add title
//   doc.setFontSize(20);
//   doc.text(title, 20, 20);

//   // Add date
//   doc.setFontSize(12);
//   doc.text(`Generated on: ${currentDate}`, 20, 35);

//   // Prepare table data
//   const tableData = formatted.map(expense => [
//     expense.company || 'N/A',
//     `₹${Number(expense.amount).toFixed(2)}`,
//     new Date(expense.date).toLocaleDateString(),
//     expense.category || 'N/A',
//     expense.description || 'N/A'
//   ]);

//   // Add table
//   doc.autoTable({
//     head: [['Company', 'Amount', 'Date', 'Category', 'Description']],
//     body: tableData,
//     startY: 45,
//     theme: 'grid',
//     headStyles: { fillColor: [99, 102, 241] },
//     styles: { fontSize: 10 }
//   });

//   // Calculate totals
//   const total = formatted.reduce((sum, expense) => sum + Number(expense.amount), 0);
//   const finalY = doc.lastAutoTable.finalY + 10;

//   doc.setFontSize(14);
//   doc.text(`Total Expenses: ₹${total.toFixed(2)}`, 20, finalY);

//   // Save with current date
//   const fileName = `expense-report-${new Date().toISOString().split('T')[0]}.pdf`;
//   doc.save(fileName);
// };

// export const exportToCSV = (expenses, filename = 'expenses') => {
//   // ✅ Step 1: Format data first
//   const formatted = expenses.map(e => ({
//     company: e.company,
//     amount: e.total_amount ?? e.amount ?? 0,
//     date: e.date,
//     category: e.category,
//     description: e.description
//   }));

//   const headers = ['Company', 'Amount', 'Date', 'Category', 'Description'];

//   const csvContent = [
//     headers.join(','),
//     ...formatted.map(expense => [
//       `"${expense.company || 'N/A'}"`,
//       expense.amount.toFixed(2),
//       expense.date,
//       `"${expense.category || 'N/A'}"`,
//       `"${expense.description || 'N/A'}"`
//     ].join(','))
//   ].join('\n');

//   const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//   const link = document.createElement('a');
//   const url = URL.createObjectURL(blob);

//   link.setAttribute('href', url);
//   link.setAttribute('download', `${filename}-${new Date().toISOString().split('T')[0]}.csv`);
//   link.style.visibility = 'hidden';

//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// };

// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';
// export const exportToPDF = (expenses, title = 'Expense Report') => {
//   const doc = new jsPDF();

//   const currentDate = new Date().toLocaleDateString();

//   // Add title
//   doc.setFontSize(20);
//   doc.text(title, 20, 20);

//   // Add date
//   doc.setFontSize(12);
//   doc.text(`Generated on: ${currentDate}`, 20, 35);

//   // Prepare table data
//   const tableData = expenses.map(expense => [
//     expense.company || 'N/A',
//     `₹${expense.amount.toFixed(2)}`,
//     new Date(expense.date).toLocaleDateString(),
//     expense.category || 'N/A',
//     expense.description || 'N/A'
//   ]);

//   // ✅ Call the function directly
//   autoTable(doc, {
//     head: [['Company', 'Amount', 'Date', 'Category', 'Description']],
//     body: tableData,
//     startY: 45,
//     theme: 'grid',
//     headStyles: { fillColor: [99, 102, 241] },
//     styles: { fontSize: 10 }
//   });

//   // Calculate totals
//   const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
//   const finalY = doc.lastAutoTable.finalY + 10;

//   doc.setFontSize(14);
//   doc.text(`Total Expenses: ₹${total.toFixed(2)}`, 20, finalY);

//   // Save with current date
//   const fileName = `expense-report-${new Date().toISOString().split('T')[0]}.pdf`;
//   doc.save(fileName);
// };


// export const exportToPDF = (expenses, title = 'Expense Report') => {
//   const doc = new jsPDF();
//   const currentDate = new Date().toLocaleDateString();

//   doc.setFontSize(20);
//   doc.text(title, 20, 20);

//   doc.setFontSize(12);
//   doc.text(`Generated on: ${currentDate}`, 20, 35);

// const tableData = expenses.map(expense => [
//   expense.company || 'N/A',
//   `₹${expense.amount.toFixed(2)}`,
//   new Date(expense.date).toLocaleDateString(),
//   expense.category || 'N/A',
//   expense.description || 'N/A'
// ]);

// const tableData = expenses.map(expense => [
//   expense.company || 'N/A',
//   `₹${((expense.amount ?? expense.total_amount ?? 0).toFixed(2))}`,
//   expense.date ? new Date(expense.date).toLocaleDateString() : 'N/A',
//   expense.category || 'N/A',
//   expense.description || 'N/A'
// ]);

//   const tableData = expenses.map(expense => [
//     expense.company || 'N/A',
//     `₹${Number(expense.amount ?? expense.total_amount ?? 0).toFixed(2)}`,
//     expense.date ? new Date(expense.date).toLocaleDateString() : 'N/A',
//     expense.category || 'N/A',
//     expense.description || 'N/A'
//   ]);


//   autoTable(doc, {
//     head: [['Company', 'Amount', 'Date', 'Category', 'Description']],
//     body: tableData,
//     startY: 45,
//     theme: 'grid',
//     headStyles: { fillColor: [99, 102, 241] },
//     styles: { fontSize: 10 }
//   });

//   // const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
//   const total = expenses.reduce(
//     (sum, expense) => sum + Number(expense.amount ?? expense.total_amount ?? 0),
//     0
//   );

//   const finalY = doc.lastAutoTable.finalY + 10;

//   doc.setFontSize(14);
//   doc.text(`Total Expenses: ₹${total.toFixed(2)}`, 20, finalY);

//   const fileName = `expense-report-${new Date().toISOString().split('T')[0]}.pdf`;
//   doc.save(fileName);
// };
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';

// export const exportToPDF = (expenses, title = 'Expense Report') => {
//   const doc = new jsPDF();
//   const currentDate = new Date().toLocaleDateString();

//   // Title
//   doc.setFontSize(18);
//   doc.text(title, 20, 20);

//   // Date
//   doc.setFontSize(12);
//   doc.text(`Generated on: ${currentDate}`, 20, 35);

//   // Prepare only required columns (Company, Amount, Date)
//   const tableData = expenses.map(expense => [
//     expense.company || 'N/A',
//     `₹${Number(expense.amount ?? expense.total_amount ?? 0).toFixed(2)}`,
//     expense.date ? new Date(expense.date).toLocaleDateString() : 'N/A'
//   ]);

//   // Table
//   doc.autoTable({
//     head: [['Company', 'Amount', 'Date']],
//     body: tableData,
//     startY: 45,
//     theme: 'grid',
//     headStyles: { fillColor: [99, 102, 241], halign: 'center', fontSize: 12 },
//     styles: { fontSize: 11, cellPadding: 3, halign: 'center' }, // Smaller font
//     columnStyles: {
//       0: { halign: 'left' }, // Company
//       1: { halign: 'right' }, // Amount
//       2: { halign: 'center' } // Date
//     }
//   });

  // // Total calculation
  // const total = expenses.reduce(
  //   (sum, expense) => sum + Number(expense.amount ?? expense.total_amount ?? 0),
  //   0
  // );
  // const finalY = doc.lastAutoTable.finalY + 10;

  // doc.setFontSize(14);
  // doc.text(`Total Expenses: ₹${total.toFixed(2)}`, 20, finalY);

  // // Save PDF
  // const fileName = `expense-report-${new Date().toISOString().split('T')[0]}.pdf`;
  // doc.save(fileName);
// };


// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable'; // ✅ attach plugin

// export const exportToPDF = (expenses, title = 'Expense Report') => {
//   const doc = new jsPDF();

//   autoTable(doc, {  // ✅ this ensures table is rendered in ESM/Vite
//     head: [['Company', 'Amount', 'Date']],
//     body: expenses.map(expense => [
//       expense.company || 'N/A',
//       `₹${Number(expense.amount ?? expense.total_amount ?? 0).toFixed(2)}`,
//       new Date(expense.date).toLocaleDateString()
//     ]),
//     startY: 45,
//     styles: { fontSize: 10 }
//   });

//   doc.save('expenses.pdf');
// };

// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';

// export const exportToPDF = (expenses) => {
//   const doc = new jsPDF();

//   // Title
//   doc.setFontSize(18);
//   doc.text('Expense Report', 14, 15);

//   // Generated Date
//   doc.setFontSize(11);
//   doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 25);

//   // Table (without Category & Description)
//   autoTable(doc, {
//     head: [['Company', 'Amount ', 'Date']],
//     body: expenses.map(expense => [
//       expense.company || 'N/A',
//       `${Number(expense.amount ?? expense.total_amount ?? 0).toFixed(2)}`,
//       new Date(expense.date).toLocaleDateString()
//     ]),
//     startY: 35,
//     styles: { fontSize: 10 },
//     headStyles: { fillColor: [66, 133, 244] } // blue header
//   });

//   // Save PDF
//   doc.save('expenses.pdf');
// };

// export const exportToCSV = (expenses, filename = 'expenses') => {
//   const headers = ['Company', 'Amount', 'Date', 'Category', 'Description'];

//   const csvContent = [
//     headers.join(','),
//     ...expenses.map(expense => [
//       `"${expense.company || 'N/A'}"`,
//       // expense.amount.toFixed(2),
//       Number(expense.amount ?? expense.total_amount ?? 0).toFixed(2),
//       expense.date,
//       `"${expense.category || 'N/A'}"`,
//       `"${expense.description || 'N/A'}"`
//     ].join(','))
//   ].join('\n');

//   const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//   const link = document.createElement('a');
//   const url = URL.createObjectURL(blob);

//   link.setAttribute('href', url);
//   link.setAttribute('download', `${filename}-${new Date().toISOString().split('T')[0]}.csv`);
//   link.style.visibility = 'hidden';

//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// };

// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';

// const formatExpenses = (expenses) =>
//   expenses.map(e => ({
//     company: e.company || 'N/A',
//     amount: Number(e.amount ?? e.total_amount ?? 0),
//     date: e.date ? new Date(e.date).toLocaleDateString() : 'N/A',
//     category: e.category || 'N/A',
//     description: e.description || 'N/A'
//   }));

// export const exportToPDF = (expenses, title = 'Expense Report') => {
//   const data = formatExpenses(expenses);
//   const doc = new jsPDF();

//   doc.setFontSize(18);
//   doc.text(title, 14, 15);

//   doc.setFontSize(11);
//   doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 25);

//   autoTable(doc, {
//     head: [['Company', 'Amount (₹)', 'Date']],
//     body: data.map(e => [e.company, `₹${e.amount.toFixed(2)}`, e.date]),
//     startY: 35,
//     styles: { fontSize: 10 },
//     headStyles: { fillColor: [66, 133, 244] }
//   });

//   doc.save('expenses.pdf');
// };

// export const exportToCSV = (expenses, filename = 'expenses') => {
//   const data = formatExpenses(expenses);
//   const headers = ['Company', 'Amount', 'Date', 'Category', 'Description'];

//   const csvContent = [
//     headers.join(','),
//     ...data.map(e => [
//       `"${e.company}"`,
//       e.amount.toFixed(2),
//       e.date,
//       `"${e.category}"`,
//       `"${e.description}"`
//     ].join(','))
//   ].join('\n');

//   const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//   const link = document.createElement('a');
//   link.href = URL.createObjectURL(blob);
//   link.download = `${filename}-${new Date().toISOString().split('T')[0]}.csv`;
//   link.click();
// };


import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// ✅ Common function to format data safely
const formatExpenses = (expenses) =>
  expenses.map(e => ({
    company: e.company || 'N/A',
    amount: Number(e.amount ?? e.total_amount ?? 0),
    date: e.date ? new Date(e.date).toLocaleDateString() : 'N/A'
  }));

// 📄 Export to PDF (only Company, Amount, Date)
export const exportToPDF = (expenses, title = 'Expense Report') => {
  const data = formatExpenses(expenses);
  const doc = new jsPDF();

  // Title
  doc.setFontSize(18);
  doc.text(title, 14, 15);

  // Date
  doc.setFontSize(11);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 25);

  // Table
  autoTable(doc, {
    head: [['Company', 'Amount ', 'Date']],
    body: data.map(e => [e.company, `${e.amount.toFixed(2)}`, e.date]),
    startY: 35,
    styles: { fontSize: 10 },
    headStyles: { fillColor: [66, 133, 244] }
  });

  // Save
  doc.save('expenses.pdf');
};

// 📄 Export to CSV (only Company, Amount, Date)
export const exportToCSV = (expenses, filename = 'expenses') => {
  const data = formatExpenses(expenses);
  const headers = ['Company', 'Amount', 'Date'];

  const csvContent = [
    headers.join(','),
    ...data.map(e => [
      `"${e.company}"`,
      e.amount.toFixed(2),
      e.date
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}-${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
};
