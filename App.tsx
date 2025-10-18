
import React, { useContext, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppContext } from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const context = useContext(AppContext);
  if (!context) return null;
  return context.isAuthenticated ? <>{children}</> : <Navigate to="/admin" />;
};

export default function App() {
  const context = useContext(AppContext);

  useEffect(() => {
    if (context?.language === 'ar') {
      document.documentElement.lang = 'ar';
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.lang = 'tr';
      document.documentElement.dir = 'ltr';
    }
  }, [context?.language]);
  
  const fontClass = context?.language === 'ar' ? 'font-cairo' : 'font-sans';

  return (
    <div className={`bg-brand-light min-h-screen flex flex-col ${fontClass}`}>
      <HashRouter>
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/admin" element={<AdminLoginPage />} />
            <Route 
              path="/dashboard" 
              element={
                <PrivateRoute>
                  <AdminDashboardPage />
                </PrivateRoute>
              } 
            />
          </Routes>
        </main>
        <Footer />
      </HashRouter>
    </div>
  );
}
