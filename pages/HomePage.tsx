
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../types';

export default function HomePage() {
  const context = useContext(AppContext);
  if (!context) return null;
  const { products, language } = context;

  const groupedProducts = products.reduce((acc, product) => {
    const category = product.category[language];
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  const translations = {
    title: { ar: 'قائمة طعامنا الشهية', tr: 'Lezzetli Menümüz' },
    description: { ar: 'تصفح أصنافنا المتنوعة والمعدة بحب وشغف', tr: 'Sevgi ve tutkuyla hazırlanan çeşitli ürünlerimize göz atın' }
  };

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-brand-dark">{translations.title[language]}</h1>
        <p className="text-lg text-gray-600 mt-2">{translations.description[language]}</p>
      </div>

      {Object.entries(groupedProducts).map(([category, items]) => (
        <div key={category} className="mb-12">
          <h2 className="text-3xl font-bold text-brand-dark border-b-4 border-brand-gold pb-2 mb-6">
            {category}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
