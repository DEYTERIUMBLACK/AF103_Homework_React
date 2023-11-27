// App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import AdminPage from './pages/AdminPage';
import AdminNavbar from './components/AdminNavbar';
import DashboardPage from './pages/DashboardPage';
import CategoriesPage from './pages/CategoriesPage';
import AddPage from './pages/AddPage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import './App.css';
import Footer from './components/Footer';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/admin/*"
          element={
            <>
              <AdminNavbar />
              <Routes>
                <Route index element={<AdminPage />} />
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="categories" element={<CategoriesPage />} />
                <Route path="add" element={<AddPage />} />
              </Routes>
            </>
          }
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Footer/>
    </>
  );
};

export default App;
