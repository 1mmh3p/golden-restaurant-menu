
import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const CartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);


export default function Header() {
  const context = useContext(AppContext);
  if (!context) return null;

  const { language, setLanguage, cart, isAuthenticated } = context;
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  const translations = {
    title: { ar: 'مطعم الذهبي', tr: 'Altın Restoran' },
    home: { ar: 'الرئيسية', tr: 'Anasayfa' },
    dashboard: { ar: 'لوحة التحكم', tr: 'Kontrol Paneli' },
  };

  const activeLinkStyle = {
    color: '#D4AF37',
    textDecoration: 'underline',
  };

  return (
    <header className="bg-brand-dark text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-brand-gold">
          {translations.title[language]}
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
           <NavLink to="/" style={({ isActive }) => isActive ? activeLinkStyle : undefined } className="hover:text-brand-gold transition-colors">
            {translations.home[language]}
          </NavLink>
          {isAuthenticated && (
            <NavLink to="/dashboard" style={({ isActive }) => isActive ? activeLinkStyle : undefined } className="hover:text-brand-gold transition-colors">
              {translations.dashboard[language]}
            </NavLink>
          )}
        </nav>

        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setLanguage(language === 'ar' ? 'tr' : 'ar')}
            className="text-sm font-semibold hover:text-brand-gold transition-colors px-3 py-1 border border-gray-500 rounded-md"
          >
            {language === 'ar' ? 'TR' : 'AR'}
          </button>

          <Link to="/cart" className="relative hover:text-brand-gold transition-colors">
            <CartIcon />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-brand-gold text-brand-dark text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                {cartItemCount}
              </span>
            )}
          </Link>
          
          <Link to={isAuthenticated ? "/dashboard" : "/admin"} className="hover:text-brand-gold transition-colors">
            <UserIcon />
          </Link>
        </div>
      </div>
    </header>
  );
}
