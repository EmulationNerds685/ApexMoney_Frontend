import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FileDown, Calendar, FileText, TrendingUp, TrendingDown, Wallet, FileSpreadsheet, Table2 } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { convertCurrency } from '../../utils/currencyConversion';

const ReportExport = ({ expenses = [], incomes = [], user, userCurrency = 'INR' }) => {
    const currencySymbols = { INR: '₹', USD: '$', EUR: '€', GBP: '£', JPY: '¥', AUD: 'A$', CAD: 'C$', SGD: 'S$', AED: 'د.إ', CHF: 'Fr' };
    const getSymbol = (currency) => currencySymbols[currency] || '₹';
    const sym = getSymbol(userCurrency);
    const [dateRange, setDateRange] = useState({ from: '', to: '' });
    const [generating, setGenerating] = useState(false);
    const [activeExport, setActiveExport] = useState(null);

    const filterByDate = (items) => {
        if (!dateRange.from && !dateRange.to) return items;
        return items.filter((item) => {
            const d = new Date(item.date);
            if (dateRange.from && d < new Date(dateRange.from)) return false;
            if (dateRange.to && d > new Date(dateRange.to)) return false;
            return true;
        });
    };

    // Quick date presets
    const setQuickRange = (preset) => {
        const today = new Date();
        const to = today.toISOString().slice(0, 10);
        let from;
        switch (preset) {
            case 'week': from = new Date(today.setDate(today.getDate() - 7)).toISOString().slice(0, 10); break;
            case 'month': from = new Date(today.setMonth(today.getMonth() - 1)).toISOString().slice(0, 10); break;
            case '3months': from = new Date(today.setMonth(today.getMonth() - 3)).toISOString().slice(0, 10); break;
            case 'year': from = new Date(today.setFullYear(today.getFullYear() - 1)).toISOString().slice(0, 10); break;
            default: from = '';
        }
        setDateRange({ from, to: new Date().toISOString().slice(0, 10) });
    };

    const totalIncome = filteredIncomes.reduce((s, i) => s + convertCurrency(i.amount || 0, i.currency || 'INR', userCurrency), 0);
    const totalExpense = filteredExpenses.reduce((s, e) => s + convertCurrency(e.amount || 0, e.currency || 'INR', userCurrency), 0);
    const netSavings = totalIncome - totalExpense;
    const savingsRate = totalIncome > 0 ? ((netSavings / totalIncome) * 100).toFixed(1) : 0;

    const categoryBreakdown = useMemo(() => {
        const cats = {};
        filteredExpenses.forEach((e) => {
            cats[e.category] = (cats[e.category] || 0) + convertCurrency(e.amount || 0, e.currency || 'INR', userCurrency);
        });
        return Object.entries(cats).sort((a, b) => b[1] - a[1]);
    }, [filteredExpenses, userCurrency]);

    const incomeBreakdown = useMemo(() => {
        const cats = {};
        filteredIncomes.forEach((i) => {
            cats[i.source || i.category] = (cats[i.source || i.category] || 0) + convertCurrency(i.amount || 0, i.currency || 'INR', userCurrency);
        });
        return Object.entries(cats).sort((a, b) => b[1] - a[1]);
    }, [filteredIncomes, userCurrency]);

    // Category colors for PDF
    const categoryColors = {
        Food: [255, 146, 43], Travel: [59, 130, 246], Shopping: [168, 85, 247],
        Bills: [239, 68, 68], Health: [16, 185, 129], Entertainment: [236, 72, 153],
        Other: [107, 114, 128], Salary: [34, 197, 94], Freelance: [14, 165, 233],
        Investments: [245, 158, 11], Business: [99, 102, 241], Gifts: [244, 114, 182]
    };

    const generatePDF = () => {
        setGenerating(true);
        setActiveExport('pdf');
        try {
            const doc = new jsPDF();
            const W = doc.internal.pageSize.getWidth();
            const H = doc.internal.pageSize.getHeight();

            // === COVER PAGE ===
            // Full gradient header
            doc.setFillColor(30, 27, 75);
            doc.rect(0, 0, W, H, 'F');

            // Accent stripe
            doc.setFillColor(99, 102, 241);
            doc.rect(0, 0, W, 6, 'F');

            // Logo area
            doc.setFillColor(99, 102, 241);
            doc.roundedRect(14, 30, 50, 12, 3, 3, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(11);
            doc.setFont('helvetica', 'bold');
            doc.text('APEXMONEY', 24, 38);

            // Title
            doc.setFontSize(32);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(255, 255, 255);
            doc.text('Financial Report', 14, 70);

            doc.setFontSize(14);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(165, 165, 195);
            const rangeText = dateRange.from || dateRange.to
                ? `${dateRange.from || 'Start'} to ${dateRange.to || 'Present'}`
                : 'All Time Period';
            doc.text(rangeText, 14, 82);

            // User info
            doc.setDrawColor(99, 102, 241);
            doc.setLineWidth(0.5);
            doc.line(14, 100, W - 14, 100);

            doc.setFontSize(11);
            doc.setTextColor(165, 165, 195);
            doc.text(`Prepared for: ${user?.name || user?.email || 'User'}`, 14, 115);
            doc.text(`Generated: ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}`, 14, 125);

            // Summary boxes on cover
            const boxY = 150;
            const boxW = (W - 42) / 3;

            // Income box
            doc.setFillColor(16, 185, 129);
            doc.roundedRect(14, boxY, boxW, 35, 3, 3, 'F');
            doc.setFontSize(9);
            doc.setTextColor(200, 255, 230);
            doc.text('TOTAL INCOME', 14 + boxW / 2, boxY + 12, { align: 'center' });
            doc.setFontSize(16);
            doc.setTextColor(255, 255, 255);
            doc.setFont('helvetica', 'bold');
            doc.text(`${sym}${totalIncome.toLocaleString(undefined, { maximumFractionDigits: 2 })}`, 14 + boxW / 2, boxY + 26, { align: 'center' });

            // Expense box
            doc.setFillColor(239, 68, 68);
            doc.roundedRect(14 + boxW + 7, boxY, boxW, 35, 3, 3, 'F');
            doc.setFontSize(9);
            doc.setTextColor(255, 200, 200);
            doc.text('TOTAL EXPENSES', 14 + boxW + 7 + boxW / 2, boxY + 12, { align: 'center' });
            doc.setFontSize(16);
            doc.setTextColor(255, 255, 255);
            doc.text(`${sym}${totalExpense.toLocaleString(undefined, { maximumFractionDigits: 2 })}`, 14 + boxW + 7 + boxW / 2, boxY + 26, { align: 'center' });

            // Savings box
            doc.setFillColor(99, 102, 241);
            doc.roundedRect(14 + (boxW + 7) * 2, boxY, boxW, 35, 3, 3, 'F');
            doc.setFontSize(9);
            doc.setTextColor(200, 200, 255);
            doc.text('NET SAVINGS', 14 + (boxW + 7) * 2 + boxW / 2, boxY + 12, { align: 'center' });
            doc.setFontSize(16);
            doc.setTextColor(255, 255, 255);
            doc.text(`${sym}${netSavings.toLocaleString(undefined, { maximumFractionDigits: 2 })}`, 14 + (boxW + 7) * 2 + boxW / 2, boxY + 26, { align: 'center' });

            // Savings rate
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(11);
            doc.setTextColor(165, 165, 195);
            doc.text(`Savings Rate: ${savingsRate}%`, 14, boxY + 55);

            // Transaction count
            doc.text(`${filteredIncomes.length} income records • ${filteredExpenses.length} expense records`, 14, boxY + 65);

            // === PAGE 2: CATEGORY BREAKDOWN ===
            doc.addPage();
            doc.setFillColor(255, 255, 255);
            doc.rect(0, 0, W, H, 'F');

            // Header bar
            doc.setFillColor(30, 27, 75);
            doc.rect(0, 0, W, 20, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(10);
            doc.setFont('helvetica', 'bold');
            doc.text('APEXMONEY FINANCIAL REPORT', 14, 13);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(8);
            doc.text(rangeText, W - 14, 13, { align: 'right' });

            // Category breakdown with visual bars
            if (categoryBreakdown.length > 0) {
                doc.setTextColor(30, 27, 75);
                doc.setFontSize(16);
                doc.setFont('helvetica', 'bold');
                doc.text('Expense Breakdown by Category', 14, 38);

                let y = 48;
                categoryBreakdown.forEach(([cat, amt]) => {
                    const pct = totalExpense > 0 ? (amt / totalExpense) * 100 : 0;
                    const barWidth = Math.max(2, (pct / 100) * (W - 80));
                    const color = categoryColors[cat] || [107, 114, 128];

                    doc.setFontSize(9);
                    doc.setFont('helvetica', 'bold');
                    doc.setTextColor(50, 50, 50);
                    doc.text(cat, 14, y);

                    // Bar background
                    doc.setFillColor(240, 240, 245);
                    doc.roundedRect(14, y + 2, W - 80, 6, 2, 2, 'F');

                    // Bar fill
                    doc.setFillColor(...color);
                    doc.roundedRect(14, y + 2, barWidth, 6, 2, 2, 'F');

                    // Amount & percentage
                    doc.setFont('helvetica', 'normal');
                    doc.setTextColor(100, 100, 100);
                    doc.text(`${sym}${amt.toLocaleString(undefined, { maximumFractionDigits: 2 })} (${pct.toFixed(1)}%)`, W - 14, y, { align: 'right' });

                    y += 18;
                });

                // Category table
                autoTable(doc, {
                    startY: y + 5,
                    head: [['Category', `Amount (${sym})`, '% of Total', 'Transactions']],
                    body: categoryBreakdown.map(([cat, amt]) => {
                        const count = filteredExpenses.filter(e => e.category === cat).length;
                        return [cat, `${sym}${amt.toLocaleString(undefined, { maximumFractionDigits: 2 })}`, `${totalExpense > 0 ? ((amt / totalExpense) * 100).toFixed(1) : 0}%`, count];
                    }),
                    theme: 'grid',
                    headStyles: { fillColor: [30, 27, 75], fontSize: 9, fontStyle: 'bold' },
                    bodyStyles: { fontSize: 8 },
                    alternateRowStyles: { fillColor: [248, 247, 255] },
                    columnStyles: { 1: { halign: 'right' }, 2: { halign: 'center' }, 3: { halign: 'center' } },
                });
            }

            // === INCOME TABLE ===
            if (filteredIncomes.length > 0) {
                const incomeY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 16 : 120;
                if (incomeY > H - 60) doc.addPage();
                const startY = incomeY > H - 60 ? 30 : incomeY;

                doc.setTextColor(30, 27, 75);
                doc.setFontSize(14);
                doc.setFont('helvetica', 'bold');
                doc.text('Income Details', 14, startY);

                autoTable(doc, {
                    startY: startY + 6,
                    head: [['#', 'Date', 'Source', `Amount (${sym})`, 'Tags', 'Notes']],
                    body: filteredIncomes.map((i, idx) => [
                        idx + 1,
                        new Date(i.date).toLocaleDateString('en-IN'),
                        i.source || i.category || '-',
                        `${sym}${convertCurrency(i.amount || 0, i.currency || 'INR', userCurrency).toLocaleString(undefined, { maximumFractionDigits: 2 })}`,
                        (i.tags || []).join(', ') || '-',
                        (i.notes || '-').substring(0, 40),
                    ]),
                    theme: 'grid',
                    headStyles: { fillColor: [16, 185, 129], fontSize: 9 },
                    bodyStyles: { fontSize: 8 },
                    alternateRowStyles: { fillColor: [240, 253, 244] },
                    columnStyles: { 0: { cellWidth: 10, halign: 'center' }, 3: { halign: 'right' } },
                });
            }

            // === EXPENSE TABLE ===
            if (filteredExpenses.length > 0) {
                const expenseY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 16 : 120;
                if (expenseY > H - 60) doc.addPage();
                const startY = expenseY > H - 60 ? 30 : expenseY;

                doc.setTextColor(30, 27, 75);
                doc.setFontSize(14);
                doc.setFont('helvetica', 'bold');
                doc.text('Expense Details', 14, startY);

                autoTable(doc, {
                    startY: startY + 6,
                    head: [['#', 'Date', 'Category', `Amount (${sym})`, 'Tags', 'Notes']],
                    body: filteredExpenses.map((e, idx) => [
                        idx + 1,
                        new Date(e.date).toLocaleDateString('en-IN'),
                        e.category || '-',
                        `${sym}${convertCurrency(e.amount || 0, e.currency || 'INR', userCurrency).toLocaleString(undefined, { maximumFractionDigits: 2 })}`,
                        (e.tags || []).join(', ') || '-',
                        (e.notes || '-').substring(0, 40),
                    ]),
                    theme: 'grid',
                    headStyles: { fillColor: [239, 68, 68], fontSize: 9 },
                    bodyStyles: { fontSize: 8 },
                    alternateRowStyles: { fillColor: [254, 242, 242] },
                    columnStyles: { 0: { cellWidth: 10, halign: 'center' }, 3: { halign: 'right' } },
                });
            }

            // Footer on all pages
            const pageCount = doc.internal.getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                doc.setPage(i);
                doc.setFontSize(7);
                doc.setTextColor(150);
                doc.text(`Page ${i} of ${pageCount}`, W / 2, H - 8, { align: 'center' });
                doc.text('Generated by ApexMoney • Your Smart Budget Tracker', W / 2, H - 4, { align: 'center' });
            }

            doc.save(`ApexMoney_Report_${new Date().toISOString().slice(0, 10)}.pdf`);
        } finally {
            setGenerating(false);
            setActiveExport(null);
        }
    };

    // Excel export
    const generateExcel = () => {
        setGenerating(true);
        setActiveExport('excel');
        try {
            const wb = XLSX.utils.book_new();

            // Summary sheet
            const summaryData = [
                ['ApexMoney Financial Report'],
                [`Generated: ${new Date().toLocaleDateString('en-IN')}`],
                [`Period: ${dateRange.from || 'Start'} to ${dateRange.to || 'Present'}`],
                [],
                ['Financial Summary'],
                ['Total Income', totalIncome],
                ['Total Expenses', totalExpense],
                ['Net Savings', netSavings],
                ['Savings Rate', `${savingsRate}%`],
                [],
                ['Expense by Category', 'Amount', '% of Total'],
                ...categoryBreakdown.map(([cat, amt]) => [cat, amt, `${totalExpense > 0 ? ((amt / totalExpense) * 100).toFixed(1) : 0}%`]),
            ];
            const summaryWs = XLSX.utils.aoa_to_sheet(summaryData);
            summaryWs['!cols'] = [{ wch: 25 }, { wch: 15 }, { wch: 12 }];
            XLSX.utils.book_append_sheet(wb, summaryWs, 'Summary');

            // Income sheet
            if (filteredIncomes.length > 0) {
                const incomeData = filteredIncomes.map(i => ({
                    Date: new Date(i.date).toLocaleDateString('en-IN'),
                    Source: i.source || i.category || '-',
                    Amount: `${sym}${convertCurrency(i.amount || 0, i.currency || 'INR', userCurrency).toLocaleString(undefined, { maximumFractionDigits: 2 })}`,
                    Tags: (i.tags || []).join(', '),
                    Notes: i.notes || '-',
                }));
                const incomeWs = XLSX.utils.json_to_sheet(incomeData);
                incomeWs['!cols'] = [{ wch: 14 }, { wch: 15 }, { wch: 12 }, { wch: 20 }, { wch: 30 }];
                XLSX.utils.book_append_sheet(wb, incomeWs, 'Income');
            }

            // Expense sheet
            if (filteredExpenses.length > 0) {
                const expenseData = filteredExpenses.map(e => ({
                    Date: new Date(e.date).toLocaleDateString('en-IN'),
                    Category: e.category || '-',
                    Amount: `${sym}${convertCurrency(e.amount || 0, e.currency || 'INR', userCurrency).toLocaleString(undefined, { maximumFractionDigits: 2 })}`,
                    Tags: (e.tags || []).join(', '),
                    Notes: e.notes || '-',
                }));
                const expenseWs = XLSX.utils.json_to_sheet(expenseData);
                expenseWs['!cols'] = [{ wch: 14 }, { wch: 15 }, { wch: 12 }, { wch: 20 }, { wch: 30 }];
                XLSX.utils.book_append_sheet(wb, expenseWs, 'Expenses');
            }

            XLSX.writeFile(wb, `ApexMoney_Report_${new Date().toISOString().slice(0, 10)}.xlsx`);
        } finally {
            setGenerating(false);
            setActiveExport(null);
        }
    };

    // CSV export
    const generateCSV = () => {
        setGenerating(true);
        setActiveExport('csv');
        try {
            const allTransactions = [
                ...filteredIncomes.map(i => ({ Type: 'Income', Date: i.date, Category: i.source || i.category, Amount: `${sym}${convertCurrency(i.amount || 0, i.currency || 'INR', userCurrency).toLocaleString(undefined, { maximumFractionDigits: 2 })}`, Tags: (i.tags || []).join('; '), Notes: i.notes || '' })),
                ...filteredExpenses.map(e => ({ Type: 'Expense', Date: e.date, Category: e.category, Amount: `${sym}${convertCurrency(e.amount || 0, e.currency || 'INR', userCurrency).toLocaleString(undefined, { maximumFractionDigits: 2 })}`, Tags: (e.tags || []).join('; '), Notes: e.notes || '' })),
            ].sort((a, b) => new Date(b.Date) - new Date(a.Date));

            const ws = XLSX.utils.json_to_sheet(allTransactions);
            const csv = XLSX.utils.sheet_to_csv(ws);
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `ApexMoney_Transactions_${new Date().toISOString().slice(0, 10)}.csv`;
            link.click();
            URL.revokeObjectURL(url);
        } finally {
            setGenerating(false);
            setActiveExport(null);
        }
    };

    const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };
    const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: 'spring' } } };

    return (
        <motion.div className="bg-slate-50 p-4 sm:p-6 rounded-2xl" variants={containerVariants} initial="hidden" animate="visible">
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-gray-800 mb-6">📊 Export Financial Reports</motion.h2>

            {/* Stats Cards */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {[
                    { label: 'Income', value: totalIncome, icon: TrendingUp, color: 'green', bg: 'bg-green-50', ring: 'ring-green-200' },
                    { label: 'Expenses', value: totalExpense, icon: TrendingDown, color: 'red', bg: 'bg-red-50', ring: 'ring-red-200' },
                    { label: 'Savings', value: netSavings, icon: Wallet, color: netSavings >= 0 ? 'indigo' : 'red', bg: 'bg-indigo-50', ring: 'ring-indigo-200' },
                    { label: 'Save Rate', value: savingsRate, icon: TrendingUp, color: savingsRate >= 20 ? 'emerald' : 'orange', bg: 'bg-emerald-50', ring: 'ring-emerald-200', suffix: '%' },
                ].map(({ label, value, icon: Icon, color, bg, ring, suffix }) => (
                    <div key={label} className={`${bg} rounded-xl p-4 ring-1 ${ring}`}>
                        <div className="flex items-center gap-2 mb-1">
                            <Icon size={16} className={`text-${color}-600`} />
                            <span className="text-xs font-medium text-gray-500">{label}</span>
                        </div>
                        <p className={`text-xl font-bold text-${color}-600`}>
                            {suffix ? value : `₹${Number(value).toLocaleString()}`}{suffix || ''}
                        </p>
                    </div>
                ))}
            </motion.div>

            {/* Date Range Controls */}
            <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-6">
                <h3 className="text-lg font-bold text-gray-700 mb-3 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-indigo-600" /> Date Range
                </h3>

                {/* Quick Presets */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {[
                        { label: 'Last 7 days', key: 'week' },
                        { label: 'Last Month', key: 'month' },
                        { label: 'Last 3 Months', key: '3months' },
                        { label: 'Last Year', key: 'year' },
                    ].map(({ label, key }) => (
                        <button key={key} onClick={() => setQuickRange(key)} className="px-3 py-1.5 text-xs font-medium bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition">
                            {label}
                        </button>
                    ))}
                    {(dateRange.from || dateRange.to) && (
                        <button onClick={() => setDateRange({ from: '', to: '' })} className="px-3 py-1.5 text-xs font-medium text-red-500 hover:text-red-700 transition">
                            Clear
                        </button>
                    )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1">
                        <label className="block text-xs font-medium text-gray-500 mb-1">From</label>
                        <input type="date" value={dateRange.from} onChange={(e) => setDateRange((p) => ({ ...p, from: e.target.value }))} className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm transition" />
                    </div>
                    <div className="flex-1">
                        <label className="block text-xs font-medium text-gray-500 mb-1">To</label>
                        <input type="date" value={dateRange.to} onChange={(e) => setDateRange((p) => ({ ...p, to: e.target.value }))} className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm transition" />
                    </div>
                </div>
            </motion.div>

            {/* Export Buttons */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                <motion.button onClick={generatePDF} disabled={generating} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-4 rounded-xl font-semibold shadow-lg disabled:opacity-50 transition-all">
                    <FileDown size={20} />
                    <div className="text-left">
                        <div className="text-sm">{activeExport === 'pdf' ? 'Generating...' : 'Download PDF'}</div>
                        <div className="text-[10px] opacity-75">Premium styled report</div>
                    </div>
                </motion.button>

                <motion.button onClick={generateExcel} disabled={generating} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-6 py-4 rounded-xl font-semibold shadow-lg disabled:opacity-50 transition-all">
                    <FileSpreadsheet size={20} />
                    <div className="text-left">
                        <div className="text-sm">{activeExport === 'excel' ? 'Generating...' : 'Download Excel'}</div>
                        <div className="text-[10px] opacity-75">Multi-sheet workbook</div>
                    </div>
                </motion.button>

                <motion.button onClick={generateCSV} disabled={generating} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-3 bg-gradient-to-r from-gray-600 to-slate-600 hover:from-gray-700 hover:to-slate-700 text-white px-6 py-4 rounded-xl font-semibold shadow-lg disabled:opacity-50 transition-all">
                    <Table2 size={20} />
                    <div className="text-left">
                        <div className="text-sm">{activeExport === 'csv' ? 'Generating...' : 'Download CSV'}</div>
                        <div className="text-[10px] opacity-75">All transactions</div>
                    </div>
                </motion.button>
            </motion.div>

            {/* Visual Preview */}
            <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-indigo-600" /> Report Preview
                </h3>

                <div className="text-sm text-gray-600 space-y-2 mb-4">
                    <p>📈 <strong>{filteredIncomes.length}</strong> income records → <strong className="text-green-600">₹{totalIncome.toLocaleString()}</strong></p>
                    <p>📉 <strong>{filteredExpenses.length}</strong> expense records → <strong className="text-red-600">₹{totalExpense.toLocaleString()}</strong></p>
                </div>

                {/* Visual Category Bars */}
                {categoryBreakdown.length > 0 && (
                    <div className="space-y-3 pt-4 border-t border-gray-100">
                        <p className="text-sm font-semibold text-gray-700">Expense Categories</p>
                        {categoryBreakdown.map(([cat, amt]) => {
                            const pct = totalExpense > 0 ? (amt / totalExpense) * 100 : 0;
                            return (
                                <div key={cat} className="space-y-1">
                                    <div className="flex justify-between text-xs">
                                        <span className="font-medium text-gray-600">{cat}</span>
                                        <span className="text-gray-500">₹{amt.toLocaleString()} ({pct.toFixed(1)}%)</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                                        <motion.div
                                            className="h-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${pct}%` }}
                                            transition={{ duration: 0.8, ease: 'easeOut' }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Income Sources */}
                {incomeBreakdown.length > 0 && (
                    <div className="space-y-3 pt-4 mt-4 border-t border-gray-100">
                        <p className="text-sm font-semibold text-gray-700">Income Sources</p>
                        {incomeBreakdown.map(([src, amt]) => {
                            const pct = totalIncome > 0 ? (amt / totalIncome) * 100 : 0;
                            return (
                                <div key={src} className="space-y-1">
                                    <div className="flex justify-between text-xs">
                                        <span className="font-medium text-gray-600">{src}</span>
                                        <span className="text-gray-500">₹{amt.toLocaleString()} ({pct.toFixed(1)}%)</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                                        <motion.div
                                            className="h-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-green-500"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${pct}%` }}
                                            transition={{ duration: 0.8, ease: 'easeOut' }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
};

export default ReportExport;
