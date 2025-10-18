
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { AppContext } from '../context/AppContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const context = useContext(AppContext);
  if (!context) return null;
  const { language, addToCart } = context;

  const translations = {
    addToCart: { ar: 'أضف للسلة', tr: 'Sepete Ekle' },
    currency: { ar: 'ل.ت', tr: 'TL' }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 flex flex-col">
      <Link to={`/product/${product.id}`} className="block">
        <img src={product.imageUrl} alt={product.name[language]} className="w-full h-48 object-cover" />
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-brand-dark">{product.name[language]}</h3>
        <p className="text-gray-600 text-sm mt-1 flex-grow">{product.description[language]}</p>
        <div className="mt-4 flex justify-between items-center">
          <p className="text-xl font-bold text-brand-gold">{product.price.toFixed(2)} {translations.currency[language]}</p>
          <button 
            onClick={() => addToCart(product, 1)}
            className="bg-brand-dark text-white px-4 py-2 rounded-md hover:bg-brand-gold hover:text-brand-dark transition-colors"
          >
            {translations.addToCart[language]}
          </button>
        </div>
      </div>
    </div>
  );
};
