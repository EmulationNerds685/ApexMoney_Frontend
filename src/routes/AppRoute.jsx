import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { Signup } from '../components/Signup';
import Home from '../components/Home';
import { AddExpenseForm } from '../components/AddExpenseForm';
import { AddIncomeForm } from '../components/AddIncomeForm';
import Dashboard from '../components/Dashboard';
import Testimonials from "../pages/Testimonials"
import About from '../pages/About';
import Features from '../HomePage_Components/Features';
function AppRoute() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/testimonials" element={<Testimonials />} />
      <Route path="/about" element={<About />} />
      <Route path="/features" element={<Features />} />
      <Route path="/signup/login" element={<Signup />} />
      </Route>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/expense" element={<AddExpenseForm />} />
      <Route path="/income" element={<AddIncomeForm />} />
    </Routes>
  );
}

export default AppRoute;