import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Trash2, Download, Shield, FileText, AlertTriangle, X, Eye, EyeOff, Settings as SettingsIcon } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';

const trackAnalytics = (eventName, eventData = {}) => {
    if (window.gtag) {
        window.gtag('event', eventName, eventData);
    }
};

const Settings = () => {
    const { user, logout } = useUser();
    const navigate = useNavigate();
    const api_url = import.meta.env.VITE_BACKENDURL;

    // Change password state
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [changingPassword, setChangingPassword] = useState(false);

    // Delete account state
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteConfirmText, setDeleteConfirmText] = useState('');
    const [deleting, setDeleting] = useState(false);

    // Export data state
    const [exporting, setExporting] = useState(false);

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (!oldPassword || !newPassword) {
            toast.error('Both fields are required');
            return;
        }
        if (oldPassword === newPassword) {
            toast.error('New password must be different');
            return;
        }
        if (newPassword.length < 8) {
            toast.error('New password must be at least 8 characters');
            return;
        }
        setChangingPassword(true);
        try {
            await axios.put(`${api_url}/user/change-password`, { oldPassword, newPassword }, { withCredentials: true });
            toast.success('Password changed successfully');
            trackAnalytics('password_changed');
            setOldPassword('');
            setNewPassword('');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to change password');
        } finally {
            setChangingPassword(false);
        }
    };

    const handleDeleteAccount = async () => {
        if (deleteConfirmText !== 'DELETE') return;
        setDeleting(true);
        try {
            await axios.delete(`${api_url}/user/delete-account`, { withCredentials: true });
            toast.success('Account deleted successfully');
            trackAnalytics('account_deleted');
            await logout();
            navigate('/');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to delete account');
        } finally {
            setDeleting(false);
            setShowDeleteModal(false);
        }
    };

    const handleExportData = async () => {
        setExporting(true);
        try {
            const response = await axios.get(`${api_url}/user/export-data`, {
                withCredentials: true,
                responseType: 'blob'
            });
            
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `apexmoney-export-${new Date().toISOString().split('T')[0]}.json`);
            document.body.appendChild(link);
            link.click();
            link.parentChild.removeChild(link);
            
            toast.success('Data exported successfully');
            trackAnalytics('data_exported');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to export data');
        } finally {
            setExporting(false);
        }
    };

    const isGoogleUser = user?.authProvider === 'google';

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-6">
                <Toaster position="top-center" />

                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3"
                >
                    <SettingsIcon className="w-8 h-8 text-indigo-600" />
                    <h1 className="text-4xl font-bold text-gray-800">Settings</h1>
                </motion.div>

                {/* Account Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
                >
                    <h2 className="text-lg font-bold text-gray-700 mb-4">Account Information</h2>
                    <div className="space-y-3">
                        <div>
                            <label className="text-sm font-medium text-gray-500">Name</label>
                            <p className="text-gray-800 font-semibold mt-1">{user?.name}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500">Email</label>
                            <p className="text-gray-800 font-semibold mt-1">{user?.email}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500">Subscription</label>
                            <p className="mt-1">
                                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                                    user?.subscriptionTier === 'free' ? 'bg-gray-100 text-gray-700' :
                                    user?.subscriptionTier === 'pro' ? 'bg-indigo-100 text-indigo-700' :
                                    user?.subscriptionTier === 'ai_pro' ? 'bg-purple-100 text-purple-700' :
                                    'bg-emerald-100 text-emerald-700'
                                }`}>
                                    {user?.subscriptionTier?.toUpperCase()}
                                </span>
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Change Password */}
                {!isGoogleUser && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
                    >
                        <h2 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
                            <Lock className="w-5 h-5 text-indigo-600" /> Change Password
                        </h2>
                        <form onSubmit={handleChangePassword} className="space-y-4">
                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-600 mb-1">Current Password</label>
                                <div className="relative">
                                    <input
                                        type={showOld ? 'text' : 'password'}
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                        className="w-full p-3 pr-10 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                        placeholder="Enter current password"
                                    />
                                    <button type="button" onClick={() => setShowOld(!showOld)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                        {showOld ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>
                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-600 mb-1">New Password</label>
                                <div className="relative">
                                    <input
                                        type={showNew ? 'text' : 'password'}
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="w-full p-3 pr-10 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                        placeholder="Enter new password (min 8 chars)"
                                    />
                                    <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                        {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={changingPassword}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition disabled:opacity-50"
                            >
                                {changingPassword ? 'Updating...' : 'Update Password'}
                            </button>
                        </form>
                    </motion.div>
                )}

                {/* Export Data */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
                >
                    <h2 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
                        <Download className="w-5 h-5 text-emerald-600" /> Export Your Data
                    </h2>
                    <p className="text-sm text-gray-600 mb-4">
                        Download all your financial data in JSON format. Includes expenses, income, goals, subscriptions, and AI insights.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button
                            onClick={handleExportData}
                            disabled={exporting}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-5 rounded-xl transition disabled:opacity-50"
                        >
                            {exporting ? 'Exporting...' : 'Export as JSON'}
                        </button>
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-5 rounded-xl transition"
                        >
                            PDF/Excel Export
                        </button>
                    </div>
                </motion.div>

                {/* Legal Links */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
                >
                    <h2 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-blue-600" /> Legal & Privacy
                    </h2>
                    <div className="space-y-3">
                        <Link
                            to="/privacy-policy"
                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition text-gray-700 font-medium"
                        >
                            <Shield className="w-5 h-5 text-indigo-500" />
                            <span>Privacy Policy</span>
                            <X className="w-4 h-4 ml-auto text-gray-400" />
                        </Link>
                        <Link
                            to="/terms-of-service"
                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition text-gray-700 font-medium"
                        >
                            <FileText className="w-5 h-5 text-indigo-500" />
                            <span>Terms of Service</span>
                            <X className="w-4 h-4 ml-auto text-gray-400" />
                        </Link>
                    </div>
                </motion.div>

                {/* Delete Account */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="bg-red-50 rounded-2xl border border-red-200 p-6"
                >
                    <h2 className="text-lg font-bold text-red-700 mb-3 flex items-center gap-2">
                        <Trash2 className="w-5 h-5" /> Delete Account
                    </h2>
                    <p className="text-sm text-red-600 mb-4">
                        Permanently delete your account and all associated data. This action <strong>cannot be undone</strong>.
                    </p>
                    <button
                        onClick={() => setShowDeleteModal(true)}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-5 rounded-xl transition"
                    >
                        Delete My Account
                    </button>
                </motion.div>

                {/* Delete Confirmation Modal */}
                <AnimatePresence>
                    {showDeleteModal && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                            onClick={() => setShowDeleteModal(false)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                onClick={(e) => e.stopPropagation()}
                                className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2 text-red-600">
                                        <AlertTriangle className="w-6 h-6" />
                                        <h3 className="text-xl font-bold">Delete Account</h3>
                                    </div>
                                    <button onClick={() => setShowDeleteModal(false)} className="text-gray-400 hover:text-gray-600">
                                        <X size={20} />
                                    </button>
                                </div>

                                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
                                    <p className="text-sm text-red-700 font-medium mb-2">⚠️ This action is permanent and irreversible!</p>
                                    <p className="text-sm text-red-600">All your data will be permanently deleted:</p>
                                    <ul className="text-sm text-red-600 mt-2 space-y-1 ml-4 list-disc">
                                        <li>All expenses and income records</li>
                                        <li>Financial goals and progress</li>
                                        <li>Subscriptions tracking</li>
                                        <li>AI insights and analytics</li>
                                        <li>Your account and profile</li>
                                    </ul>
                                </div>

                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Type <strong className="text-red-600">DELETE</strong> to confirm:
                                </label>
                                <input
                                    type="text"
                                    value={deleteConfirmText}
                                    onChange={(e) => setDeleteConfirmText(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent mb-4"
                                    placeholder="Type DELETE"
                                />

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setShowDeleteModal(false)}
                                        className="flex-1 py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleDeleteAccount}
                                        disabled={deleteConfirmText !== 'DELETE' || deleting}
                                        className="flex-1 py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {deleting ? 'Deleting...' : 'Permanently Delete'}
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Settings;

            {/* Change Password */}
            {!isGoogleUser && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
                >
                    <h2 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
                        <Lock className="w-5 h-5 text-indigo-600" /> Change Password
                    </h2>
                    <form onSubmit={handleChangePassword} className="space-y-4">
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-600 mb-1">Current Password</label>
                            <div className="relative">
                                <input
                                    type={showOld ? 'text' : 'password'}
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    className="w-full p-3 pr-10 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                    placeholder="Enter current password"
                                />
                                <button type="button" onClick={() => setShowOld(!showOld)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                    {showOld ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-600 mb-1">New Password</label>
                            <div className="relative">
                                <input
                                    type={showNew ? 'text' : 'password'}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full p-3 pr-10 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                    placeholder="Enter new password (min 6 chars)"
                                />
                                <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                    {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={changingPassword}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition disabled:opacity-50"
                        >
                            {changingPassword ? 'Changing...' : 'Update Password'}
                        </button>
                    </form>
                </motion.div>
            )}

            {/* Export Data */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
            >
                <h2 className="text-lg font-bold text-gray-700 mb-3 flex items-center gap-2">
                    <Download className="w-5 h-5 text-emerald-600" /> Export Your Data
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                    Download all your financial data as PDF, Excel, or CSV from the Export Reports tab.
                </p>
                <button
                    onClick={() => navigate('/dashboard')}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 px-5 rounded-xl transition"
                >
                    Go to Export Reports
                </button>
            </motion.div>

            {/* Legal Links */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
            >
                <h2 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" /> Legal
                </h2>
                <div className="space-y-3">
                    <Link
                        to="/privacy-policy"
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition text-gray-700 font-medium"
                    >
                        <Shield className="w-5 h-5 text-indigo-500" />
                        Privacy Policy
                    </Link>
                    <Link
                        to="/terms-of-service"
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition text-gray-700 font-medium"
                    >
                        <FileText className="w-5 h-5 text-indigo-500" />
                        Terms of Service
                    </Link>
                </div>
            </motion.div>

            {/* Delete Account */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-red-50 rounded-2xl border border-red-200 p-6"
            >
                <h2 className="text-lg font-bold text-red-700 mb-2 flex items-center gap-2">
                    <Trash2 className="w-5 h-5" /> Delete Account
                </h2>
                <p className="text-sm text-red-600 mb-4">
                    Permanently delete your account and all associated data including expenses, income, goals, subscriptions, and AI insights. This action <strong>cannot be undone</strong>.
                </p>
                <button
                    onClick={() => setShowDeleteModal(true)}
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 px-5 rounded-xl transition"
                >
                    Delete My Account
                </button>
            </motion.div>

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {showDeleteModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                        onClick={() => setShowDeleteModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2 text-red-600">
                                    <AlertTriangle className="w-6 h-6" />
                                    <h3 className="text-xl font-bold">Delete Account</h3>
                                </div>
                                <button onClick={() => setShowDeleteModal(false)} className="text-gray-400 hover:text-gray-600">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
                                <p className="text-sm text-red-700 font-medium mb-2">⚠️ This action is permanent and irreversible!</p>
                                <p className="text-sm text-red-600">All your data will be permanently deleted:</p>
                                <ul className="text-sm text-red-600 mt-2 space-y-1 ml-4 list-disc">
                                    <li>All expenses and income records</li>
                                    <li>Financial goals and progress</li>
                                    <li>Subscriptions tracking</li>
                                    <li>AI insights and analytics</li>
                                    <li>Your account and profile</li>
                                </ul>
                            </div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Type <strong className="text-red-600">DELETE</strong> to confirm:
                            </label>
                            <input
                                type="text"
                                value={deleteConfirmText}
                                onChange={(e) => setDeleteConfirmText(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent mb-4"
                                placeholder="Type DELETE"
                            />

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="flex-1 py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDeleteAccount}
                                    disabled={deleteConfirmText !== 'DELETE' || deleting}
                                    className="flex-1 py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {deleting ? 'Deleting...' : 'Permanently Delete'}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Settings;
