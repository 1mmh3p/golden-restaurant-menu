
import React, { useState, useContext, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const context = useContext(AppContext);

  if (!context) return null;
  const { language, login } = context;

  const translations = {
    title: { ar: 'تسجيل دخول المدير', tr: 'Yönetici Girişi' },
    username: { ar: 'اسم المستخدم', tr: 'Kullanıcı Adı' },
    password: { ar: 'كلمة المرور', tr: 'Şifre' },
    login: { ar: 'دخول', tr: 'Giriş Yap' },
    error: { ar: 'اسم المستخدم او كلمة المرور خاطئة', tr: 'Geçersiz kullanıcı adı veya şifre' }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate('/dashboard');
    } else {
      setError(translations.error[language]);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-xl">
        <h1 className="text-2xl font-bold text-center mb-6">{translations.title[language]}</h1>
        {error && <p className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
            {translations.username[language]}
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
            {translations.password[language]}
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-brand-dark text-white font-bold py-2 px-4 rounded-md hover:bg-brand-gold hover:text-brand-dark transition-colors"
        >
          {translations.login[language]}
        </button>
      </form>
    </div>
  );
}
