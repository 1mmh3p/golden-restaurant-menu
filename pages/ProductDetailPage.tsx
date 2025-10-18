
import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Product } from '../types';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const context = useContext(AppContext);
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (context && id) {
      const foundProduct = context.products.find(p => p.id === parseInt(id));
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        navigate('/');
      }
    }
  }, [id, context, navigate]);

  if (!context || !product) {
    return <div className="text-center py-10">Loading...</div>;
  }
  
  const { language, addToCart } = context;

  const translations = {
    addToCart: { ar: 'أضف للسلة', tr: 'Sepete Ekle' },
    quantity: { ar: 'الكمية', tr: 'Miktar' },
    backToMenu: { ar: 'العودة للقائمة', tr: 'Menüye Geri Dön' },
    currency: { ar: 'ل.ت', tr: 'TL' }
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-lg shadow-xl max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img src={product.imageUrl} alt={product.name[language]} className="w-full h-auto object-cover rounded-lg shadow-md" />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-brand-dark">{product.name[language]}</h1>
          <p className="text-gray-600 mt-4 text-lg">{product.description[language]}</p>
          <p className="text-3xl font-bold text-brand-gold my-6">{product.price.toFixed(2)} {translations.currency[language]}</p>
          
          <div className="flex items-center space-x-4 mb-6">
            <label htmlFor="quantity" className="font-bold text-lg">{translations.quantity[language]}:</label>
            <div className="flex items-center border rounded-md">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-4 py-2 text-xl font-bold">-</button>
              <input 
                type="number" 
                id="quantity" 
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 text-center text-lg font-bold border-l border-r"
              />
              <button onClick={() => setQuantity(q => q + 1)} className="px-4 py-2 text-xl font-bold">+</button>
            </div>
          </div>
          
          <button 
            onClick={handleAddToCart}
            className="w-full bg-brand-dark text-white py-3 rounded-lg text-lg font-bold hover:bg-brand-gold hover:text-brand-dark transition-colors"
          >
            {translations.addToCart[language]}
          </button>
          
          <button 
            onClick={() => navigate('/')}
            className="w-full mt-4 text-brand-dark py-3 rounded-lg text-lg font-bold hover:bg-gray-200 transition-colors"
          >
            {translations.backToMenu[language]}
          </button>
        </div>
      </div>
    </div>
  );
}
