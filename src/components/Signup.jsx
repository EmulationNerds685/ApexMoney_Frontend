import React, { useState, useMemo } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useUser } from "../context/UserContext";

/* ───────────────────────── SVG Icons ───────────────────────── */

const LogoIcon = () => (
    <svg className="w-12 h-12 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
    </svg>
);

const EyeIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
);

const EyeOffIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.596-3.856A9.956 9.956 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21m-6.59-3.176l-2.82-2.82" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
    </svg>
);

const GoogleIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
);

const LockIcon = () => (
    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
);

const MailIcon = () => (
    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

const UserIcon = () => (
    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const CheckCircleIcon = () => (
    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

/* ───────────────── Password Strength Helper ────────────────── */

const getPasswordStrength = (password) => {
    if (!password) return { level: 0, label: '', color: '' };
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 10) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) return { level: 1, label: 'Weak', color: '#ef4444' };
    if (score <= 3) return { level: 2, label: 'Medium', color: '#f59e0b' };
    return { level: 3, label: 'Strong', color: '#22c55e' };
};

const PasswordStrengthBar = ({ password }) => {
    const strength = useMemo(() => getPasswordStrength(password), [password]);
    if (!password) return null;

    return (
        <div className="mt-2 space-y-1">
            <div className="flex gap-1">
                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className="h-1.5 flex-1 rounded-full transition-all duration-300"
                        style={{
                            backgroundColor: i <= strength.level ? strength.color : '#e5e7eb',
                        }}
                    />
                ))}
            </div>
            <p className="text-xs font-medium transition-colors duration-300" style={{ color: strength.color }}>
                {strength.label}
            </p>
        </div>
    );
};

/* ───────────────── Password Input Component ────────────────── */

const PasswordInput = ({
    id,
    name,
    value,
    onChange,
    placeholder = "••••••••",
    disabled,
    showStrength,
    label,
    autoComplete = "new-password",
}) => {
    const [visible, setVisible] = useState(false);

    return (
        <div className="space-y-1">
            {label && (
                <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <LockIcon />
                </span>
                <input
                    type={visible ? "text" : "password"}
                    id={id}
                    name={name}
                    autoComplete={autoComplete}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                    required
                    disabled={disabled}
                />
                <button
                    type="button"
                    onClick={() => setVisible(!visible)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors duration-200"
                    disabled={disabled}
                    tabIndex={-1}
                    aria-label={visible ? "Hide password" : "Show password"}
                >
                    {visible ? <EyeOffIcon /> : <EyeIcon />}
                </button>
            </div>
            {showStrength && <PasswordStrengthBar password={value} />}
        </div>
    );
};

/* ──────────────────────── Main Component ───────────────────── */

const initialFormData = { name: '', email: '', password: '' };

export const Signup = () => {
    const navigate = useNavigate();
    const { login, signup } = useUser();

    const [isLoginView, setIsLoginView] = useState(true);
    const [formData, setFormData] = useState(initialFormData);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [resetStep, setResetStep] = useState('request'); // 'request' | 'verify' | 'newPassword'

    const handleToggleView = () => {
        setIsLoginView(!isLoginView);
        setIsForgotPassword(false);
        setResetStep('request');
        setOtp('');
        setNewPassword('');
        setFormData(initialFormData);
        setError('');
        setSuccess('');
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setSuccess('');
        setIsLoading(true);

        try {
            if (isForgotPassword) {
                if (resetStep === 'request') {
                    const API_URL = `${import.meta.env.VITE_BACKENDURL}/user/forgot-password`;
                    await axios.post(API_URL, { email: formData.email }, {
                        timeout: 90000,
                        withCredentials: true
                    });
                    setResetStep('verify');
                    setSuccess('OTP sent to your email! Check your inbox.');
                } else if (resetStep === 'verify') {
                    const API_URL = `${import.meta.env.VITE_BACKENDURL}/user/verify-otp`;
                    await axios.post(API_URL, { email: formData.email, otp }, {
                        timeout: 10000,
                        withCredentials: true
                    });
                    setResetStep('newPassword');
                    setSuccess('OTP verified! Now choose a new password.');
                } else {
                    const API_URL = `${import.meta.env.VITE_BACKENDURL}/user/reset-password`;
                    await axios.post(API_URL, {
                        email: formData.email,
                        otp,
                        newPassword,
                    }, {
                        timeout: 10000,
                        withCredentials: true
                    });
                    setSuccess('Password reset successfully! Please log in with your new password.');
                    setTimeout(() => {
                        setIsForgotPassword(false);
                        setResetStep('request');
                        setOtp('');
                        setNewPassword('');
                        setFormData(initialFormData);
                        setSuccess('');
                    }, 2500);
                }
            } else if (isLoginView) {
                const API_URL = `${import.meta.env.VITE_BACKENDURL}/user/login`;
                const response = await axios.post(API_URL, {
                    email: formData.email,
                    password: formData.password
                }, {
                    timeout: 15000,
                    withCredentials: true
                });
                login(response.data.User);
                navigate('/dashboard');
            } else {
                await signup({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                });
                navigate('/dashboard');
            }
        } catch (err) {
            console.error('Form submission error:', err);
            let errorMessage = 'An error occurred.';
            
            if (err.code === 'ECONNABORTED') {
                errorMessage = 'Request timed out. Please check your internet connection and try again.';
            } else if (err.message === 'Network Error') {
                errorMessage = 'Network error. Please check your internet connection.';
            } else if (err.response?.data?.message) {
                errorMessage = err.response.data.message;
            } else {
                errorMessage = err.message || 'An error occurred.';
            }
            
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleAuth = () => {
        window.location.href = `${import.meta.env.VITE_BACKENDURL}/auth/google`;
    };

    /* ─── Heading / subtitle helpers ──── */

    const heading = isForgotPassword
        ? 'Reset your password'
        : isLoginView
            ? 'Welcome back'
            : 'Create your account';

    const subtitle = isForgotPassword
        ? resetStep === 'request'
            ? 'Enter your email and we\'ll send you a one-time code.'
            : resetStep === 'verify'
                ? 'Enter the 6-digit OTP sent to your email.'
                : 'Choose a strong new password for your account.'
        : isLoginView
            ? 'Sign in to continue to ApexMoney'
            : 'Start your financial journey today';

    /* ─── Submit button text ──── */

    const submitText = isLoading
        ? 'Processing...'
        : isForgotPassword
            ? resetStep === 'request' ? 'Send OTP' : resetStep === 'verify' ? 'Verify OTP' : 'Reset Password'
            : isLoginView ? 'Sign In' : 'Create Account';

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-purple-100 flex items-center justify-center p-4 font-sans">

            {/* ── Card ── */}
            <div className="w-full max-w-md">
                <div
                    className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-500"
                    style={{ boxShadow: '0 20px 60px -12px rgba(139, 92, 246, 0.25)' }}
                >
                    <div className="p-8 space-y-6">

                        {/* ── Header ── */}
                        <div className="text-center space-y-3">
                            <div className="flex justify-center">
                                <div className="bg-purple-100 p-3 rounded-2xl">
                                    <LogoIcon />
                                </div>
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                                {heading}
                            </h1>
                            <p className="text-sm text-gray-500">
                                {subtitle}
                            </p>
                        </div>

                        {/* ── Success banner ── */}
                        {success && (
                            <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm p-3 rounded-xl animate-fade-in">
                                <CheckCircleIcon />
                                <span>{success}</span>
                            </div>
                        )}

                        {/* ── Error banner ── */}
                        {error && (
                            <p className="text-sm text-red-600 bg-red-50 border border-red-200 p-3 rounded-xl text-center animate-fade-in">
                                {error}
                            </p>
                        )}

                        {/* ── Google auth (not shown in forgot-password) ── */}
                        {!isForgotPassword && (
                            <div>
                                <button
                                    type="button"
                                    onClick={handleGoogleAuth}
                                    className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-xl py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-purple-500"
                                >
                                    <GoogleIcon />
                                    <span>Continue with Google</span>
                                </button>

                                {/* ── Divider ── */}
                                <div className="relative flex items-center justify-center my-6">
                                    <span className="h-px w-full bg-gray-200" />
                                    <span className="absolute bg-white px-3 text-xs text-gray-400 uppercase tracking-wider font-medium">
                                        or
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* ── Form ── */}
                        <form onSubmit={handleSubmit} className="space-y-4">

                            {/* Name (signup only) */}
                            {!isForgotPassword && !isLoginView && (
                                <div className="space-y-1">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                            <UserIcon />
                                        </span>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            autoComplete="off"
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                                            required
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Email (shown on all views except newPassword step) */}
                            {!(isForgotPassword && resetStep === 'newPassword') && (
                                <div className="space-y-1">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                            <MailIcon />
                                        </span>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            autoComplete="off"
                                            onChange={handleChange}
                                            placeholder="you@example.com"
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                                            required
                                            disabled={isLoading || (isForgotPassword && resetStep === 'verify')}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Password (login & signup) */}
                            {!isForgotPassword && (
                                <div>
                                    <PasswordInput
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        disabled={isLoading}
                                        label="Password"
                                        showStrength={!isLoginView}
                                    />

                                    {/* Forgot password link (login only) */}
                                    {isLoginView && (
                                        <div className="flex justify-end mt-1">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setIsForgotPassword(true);
                                                    setResetStep('request');
                                                    setError('');
                                                    setSuccess('');
                                                }}
                                                className="text-xs text-purple-600 hover:text-purple-800 font-medium hover:underline transition-colors duration-200"
                                            >
                                                Forgot password?
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Forgot-password step 2: OTP verification */}
                            {isForgotPassword && resetStep === 'verify' && (
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Verification Code
                                    </label>
                                    <input
                                        type="text"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        placeholder="Enter 6-digit OTP"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white text-center tracking-[0.3em] text-lg font-mono"
                                        disabled={isLoading}
                                        required
                                        maxLength={6}
                                    />
                                </div>
                            )}

                            {/* Forgot-password step 3: New password */}
                            {isForgotPassword && resetStep === 'newPassword' && (
                                <PasswordInput
                                    id="newPassword"
                                    name="newPassword"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Choose a new password"
                                    disabled={isLoading}
                                    label="New Password"
                                    showStrength={true}
                                />
                            )}

                            {/* Submit */}
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 px-4 rounded-xl hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-none"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        Processing...
                                    </span>
                                ) : submitText}
                            </button>

                            {!isForgotPassword && !isLoginView && (
                                <p className="text-xs text-center text-gray-400 mt-2">
                                    By creating an account, you agree to our{' '}
                                    <a href="/terms-of-service" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">Terms of Service</a>
                                    {' '}and{' '}
                                    <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">Privacy Policy</a>.
                                </p>
                            )}
                        </form>

                        {/* ── Toggle view / back link ── */}
                        <div className="text-center pt-2">
                            {!isForgotPassword ? (
                                <p className="text-sm text-gray-600">
                                    {isLoginView ? "Don't have an account?" : 'Already have an account?'}
                                    <button
                                        onClick={handleToggleView}
                                        className="ml-1 font-semibold text-purple-600 hover:text-purple-800 hover:underline focus:outline-none transition-colors duration-200"
                                    >
                                        {isLoginView ? 'Sign Up' : 'Sign In'}
                                    </button>
                                </p>
                            ) : (
                                <button
                                    onClick={() => {
                                        setIsForgotPassword(false);
                                        setResetStep('request');
                                        setOtp('');
                                        setNewPassword('');
                                        setError('');
                                        setSuccess('');
                                    }}
                                    className="text-sm font-semibold text-purple-600 hover:text-purple-800 hover:underline focus:outline-none transition-colors duration-200 inline-flex items-center gap-1"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    Back to sign in
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* ── Footer ── */}
                <div className="text-center text-xs text-gray-400 mt-6 space-y-1">
                    <p>© {new Date().getFullYear()} ApexMoney. All rights reserved.</p>
                    <p>
                        <a href="/privacy-policy" className="text-purple-500 hover:underline">Privacy Policy</a>
                        {' · '}
                        <a href="/terms-of-service" className="text-purple-500 hover:underline">Terms of Service</a>
                    </p>
                </div>
            </div>

            {/* ── Inline keyframe animation ── */}
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-8px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fadeIn 0.3s ease-out;
                }
            `}</style>
        </div>
    );
}