import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { Signup } from '../components/Signup';
import Home from '../components/Home';
import { AddExpenseForm } from '../components/AddExpenseForm';
import { AddIncomeForm } from '../components/AddIncomeForm';
import Dashboard from '../components/Dashboard';
import Settings from '../components/Settings';
import Testimonials from "../pages/Testimonials"
import About from '../pages/About';
import Features from '../HomePage_Components/Features';
import PremiumFeatures from '../pages/PremiumFeatures';
import Subscribe from '../pages/Subscribe';
import PlanDetails from '../pages/PlanDetails';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import TermsOfService from '../pages/TermsOfService';
import ProtectedRoute from './ProtectedRoute';

function AppRoute() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/premium" element={<PremiumFeatures />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/signup/login" element={<Signup />} />
        <Route path="/plans" element={<PlanDetails />} />
        <Route path="/signup" element={<Subscribe />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
      </Route>
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/expense" element={<ProtectedRoute><AddExpenseForm /></ProtectedRoute>} />
      <Route path="/income" element={<ProtectedRoute><AddIncomeForm /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
    </Routes>
  );
}

export default AppRoute;