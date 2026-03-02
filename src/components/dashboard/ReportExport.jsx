import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileDown, Calendar, FileText, TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const ReportExport = ({ expenses = [], incomes = [], user }) => {
    const [dateRange, setDateRange] = useState({ from: '', to: '' });
    const [generating, setGenerating] = useState(false);

    const filterByDate = (items) => {
        if (!dateRange.from && !dateRange.to) return items;
        return items.filter((item) => {
            const d = new Date(item.date);
            if (dateRange.from && d < new Date(dateRange.from)) return false;
            if (dateRange.to && d > new Date(dateRange.to)) return false;
            return true;
        });
    };

    const filteredExpenses = filterByDate(expenses);
    const filteredIncomes = filterByDate(incomes);
    const totalIncome = filteredIncomes.reduce((s, i) => s + (i.amount || 0), 0);
    const totalExpense = filteredExpenses.reduce((s, e) => s + (e.amount || 0), 0);
    const netSavings = totalIncome - totalExpense;

    // Category breakdown
    const categoryBreakdown = {};
    filteredExpenses.forEach((e) => {
        categoryBreakdown[e.category] = (categoryBreakdown[e.category] || 0) + e.amount;
    });

    const generatePDF = () => {
        setGenerating(true);
        try {
            const doc = new jsPDF();
            const pageWidth = doc.internal.pageSize.getWidth();

            // Header
            doc.setFillColor(79, 70, 229);
            doc.rect(0, 0, pageWidth, 40, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(22);
            doc.setFont('helvetica', 'bold');
            doc.text('ApexMoney Financial Report', 14, 18);
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.text(`Generated for: ${user?.name || user?.email || 'User'}`, 14, 28);
            const rangeText = dateRange.from || dateRange.to
                ? `Period: ${dateRange.from || 'Start'} to ${dateRange.to || 'Present'}`
                : 'Period: All Time';
            doc.text(rangeText, 14, 34);
            doc.text(`Generated on: ${new Date().toLocaleDateString('en-IN')}`, pageWidth - 14, 34, { align: 'right' });

            // Summary Section
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.text('Financial Summary', 14, 52);

            doc.setFontSize(11);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(34, 197, 94);
            doc.text(`Total Income: ₹${totalIncome.toLocaleString()}`, 14, 62);
            doc.setTextColor(239, 68, 68);
            doc.text(`Total Expense: ₹${totalExpense.toLocaleString()}`, 14, 70);
            doc.setTextColor(netSavings >= 0 ? 34 : 239, netSavings >= 0 ? 197 : 68, netSavings >= 0 ? 94 : 68);
            doc.text(`Net Savings: ₹${netSavings.toLocaleString()}`, 14, 78);

            // Category Breakdown
            if (Object.keys(categoryBreakdown).length > 0) {
                doc.setTextColor(0, 0, 0);
                doc.setFontSize(14);
                doc.setFont('helvetica', 'bold');
                doc.text('Expense by Category', 14, 94);

                autoTable(doc, {
                    startY: 100,
                    head: [['Category', 'Amount (₹)', '% of Total']],
                    body: Object.entries(categoryBreakdown)
                        .sort((a, b) => b[1] - a[1])
                        .map(([cat, amt]) => [
                            cat,
                            `₹${amt.toLocaleString()}`,
                            `${totalExpense > 0 ? ((amt / totalExpense) * 100).toFixed(1) : 0}%`,
                        ]),
                    theme: 'striped',
                    headStyles: { fillColor: [79, 70, 229], fontSize: 10 },
                    bodyStyles: { fontSize: 9 },
                    alternateRowStyles: { fillColor: [245, 243, 255] },
                });
            }

            // Income Table
            if (filteredIncomes.length > 0) {
                const incomeY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 14 : 120;
                doc.setTextColor(0, 0, 0);
                doc.setFontSize(14);
                doc.setFont('helvetica', 'bold');
                doc.text('Income Details', 14, incomeY);

                autoTable(doc, {
                    startY: incomeY + 6,
                    head: [['Date', 'Source', 'Amount (₹)', 'Notes']],
                    body: filteredIncomes.map((i) => [
                        new Date(i.date).toLocaleDateString('en-IN'),
                        i.source || i.category || '-',
                        `₹${i.amount.toLocaleString()}`,
                        i.notes || '-',
                    ]),
                    theme: 'striped',
                    headStyles: { fillColor: [34, 197, 94], fontSize: 10 },
                    bodyStyles: { fontSize: 9 },
                    alternateRowStyles: { fillColor: [240, 253, 244] },
                });
            }

            // Expense Table
            if (filteredExpenses.length > 0) {
                const expenseY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 14 : 120;
                doc.setTextColor(0, 0, 0);
                doc.setFontSize(14);
                doc.setFont('helvetica', 'bold');
                doc.text('Expense Details', 14, expenseY);

                autoTable(doc, {
                    startY: expenseY + 6,
                    head: [['Date', 'Category', 'Amount (₹)', 'Notes']],
                    body: filteredExpenses.map((e) => [
                        new Date(e.date).toLocaleDateString('en-IN'),
                        e.category || '-',
                        `₹${e.amount.toLocaleString()}`,
                        e.notes || '-',
                    ]),
                    theme: 'striped',
                    headStyles: { fillColor: [239, 68, 68], fontSize: 10 },
                    bodyStyles: { fontSize: 9 },
                    alternateRowStyles: { fillColor: [254, 242, 242] },
                });
            }

            // Footer
            const pageCount = doc.internal.getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                doc.setPage(i);
                doc.setFontSize(8);
                doc.setTextColor(150);
                doc.text(`Page ${i} of ${pageCount} — ApexMoney`, pageWidth / 2, doc.internal.pageSize.getHeight() - 10, { align: 'center' });
            }

            doc.save(`ApexMoney_Report_${new Date().toISOString().slice(0, 10)}.pdf`);
        } finally {
            setGenerating(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
    };
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: 'spring' } },
    };

    return (
        <motion.div
            className="bg-slate-50 p-4 sm:p-6 rounded-2xl min-h-screen"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-gray-800 mb-6">
                📊 Export Financial Reports
            </motion.h2>

            {/* Stats Cards */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-white rounded-2xl shadow-lg p-5 flex items-center gap-4">
                    <div className="p-3 rounded-full bg-green-100"><TrendingUp className="w-6 h-6 text-green-600" /></div>
                    <div>
                        <p className="text-sm text-gray-500">Total Income</p>
                        <h3 className="text-2xl font-bold text-gray-800">₹{totalIncome.toLocaleString()}</h3>
                    </div>
                </div>
                <div className="bg-white rounded-2xl shadow-lg p-5 flex items-center gap-4">
                    <div className="p-3 rounded-full bg-red-100"><TrendingDown className="w-6 h-6 text-red-600" /></div>
                    <div>
                        <p className="text-sm text-gray-500">Total Expenses</p>
                        <h3 className="text-2xl font-bold text-gray-800">₹{totalExpense.toLocaleString()}</h3>
                    </div>
                </div>
                <div className="bg-white rounded-2xl shadow-lg p-5 flex items-center gap-4">
                    <div className="p-3 rounded-full bg-indigo-100"><Wallet className="w-6 h-6 text-indigo-600" /></div>
                    <div>
                        <p className="text-sm text-gray-500">Net Savings</p>
                        <h3 className={`text-2xl font-bold ${netSavings >= 0 ? 'text-green-600' : 'text-red-600'}`}>₹{netSavings.toLocaleString()}</h3>
                    </div>
                </div>
            </motion.div>

            {/* Controls */}
            <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                <h3 className="text-xl font-bold text-gray-700 mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-indigo-600" /> Date Range Filter
                </h3>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-600 mb-1">From</label>
                        <input
                            type="date"
                            value={dateRange.from}
                            onChange={(e) => setDateRange((p) => ({ ...p, from: e.target.value }))}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-600 mb-1">To</label>
                        <input
                            type="date"
                            value={dateRange.to}
                            onChange={(e) => setDateRange((p) => ({ ...p, to: e.target.value }))}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition"
                        />
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <motion.button
                        onClick={generatePDF}
                        disabled={generating}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <FileDown size={20} />
                        {generating ? 'Generating...' : 'Download PDF Report'}
                    </motion.button>
                    {dateRange.from || dateRange.to ? (
                        <button
                            onClick={() => setDateRange({ from: '', to: '' })}
                            className="text-sm text-gray-500 hover:text-indigo-600 underline underline-offset-4 transition-colors"
                        >
                            Clear date filter
                        </button>
                    ) : null}
                </div>
            </motion.div>

            {/* Preview */}
            <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-700 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-indigo-600" /> Report Preview
                </h3>
                <div className="text-sm text-gray-600 space-y-2">
                    <p>📈 <strong>{filteredIncomes.length}</strong> income records totaling <strong className="text-green-600">₹{totalIncome.toLocaleString()}</strong></p>
                    <p>📉 <strong>{filteredExpenses.length}</strong> expense records totaling <strong className="text-red-600">₹{totalExpense.toLocaleString()}</strong></p>
                    {Object.keys(categoryBreakdown).length > 0 && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                            <p className="font-semibold text-gray-700 mb-2">Expense Categories:</p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                {Object.entries(categoryBreakdown)
                                    .sort((a, b) => b[1] - a[1])
                                    .map(([cat, amt]) => (
                                        <div key={cat} className="flex justify-between bg-gray-50 rounded-lg px-3 py-2">
                                            <span>{cat}</span>
                                            <span className="font-semibold">₹{amt.toLocaleString()}</span>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ReportExport;
