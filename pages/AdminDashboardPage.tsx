
import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Product } from '../types';
import { ProductForm } from '../components/ProductForm';

export default function AdminDashboardPage() {
    const context = useContext(AppContext);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    if (!context) return null;
    const { products, setProducts, language, logout } = context;

    const translations = {
        dashboard: { ar: 'لوحة تحكم المدير', tr: 'Yönetici Paneli' },
        welcome: { ar: 'أهلاً بك أيها المدير', tr: 'Hoş geldiniz, Yönetici' },
        totalProducts: { ar: 'مجموع المنتجات', tr: 'Toplam Ürün' },
        addNew: { ar: 'إضافة منتج جديد', tr: 'Yeni Ürün Ekle' },
        logout: { ar: 'تسجيل الخروج', tr: 'Çıkış Yap' },
        name: { ar: 'الاسم', tr: 'Ad' },
        category: { ar: 'الفئة', tr: 'Kategori' },
        price: { ar: 'السعر', tr: 'Fiyat' },
        actions: { ar: 'إجراءات', tr: 'Eylemler' },
        edit: { ar: 'تعديل', tr: 'Düzenle' },
        delete: { ar: 'حذف', tr: 'Sil' },
        confirmDelete: { ar: 'هل أنت متأكد من حذف هذا المنتج؟', tr: 'Bu ürünü silmek istediğinizden emin misiniz?' },
        currency: { ar: 'ل.ت', tr: 'TL' }
    };
    
    const handleAdd = () => {
        setEditingProduct(null);
        setIsFormOpen(true);
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setIsFormOpen(true);
    };

    const handleDelete = (productId: number) => {
        if(window.confirm(translations.confirmDelete[language])) {
            setProducts(products.filter(p => p.id !== productId));
        }
    };

    const handleFormSave = (product: Product) => {
        if(editingProduct) {
            setProducts(products.map(p => p.id === product.id ? product : p));
        } else {
            const newProduct = {...product, id: Date.now()};
            setProducts([...products, newProduct]);
        }
        setIsFormOpen(false);
        setEditingProduct(null);
    };

    return (
        <div className="bg-white p-6 md:p-10 rounded-lg shadow-xl">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">{translations.dashboard[language]}</h1>
                    <p className="text-gray-600">{translations.welcome[language]}</p>
                </div>
                <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">{translations.logout[language]}</button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-100 p-6 rounded-lg text-center">
                    <h2 className="text-xl font-bold">{translations.totalProducts[language]}</h2>
                    <p className="text-4xl font-extrabold text-brand-gold">{products.length}</p>
                </div>
                <div className="bg-gray-100 p-6 rounded-lg flex items-center justify-center">
                    <button onClick={handleAdd} className="bg-brand-dark text-white font-bold py-3 px-6 rounded hover:bg-brand-gold hover:text-brand-dark transition-colors">{translations.addNew[language]}</button>
                </div>
            </div>

            {isFormOpen && (
                <ProductForm 
                    product={editingProduct} 
                    onSave={handleFormSave} 
                    onCancel={() => setIsFormOpen(false)}
                />
            )}

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b-2">
                            <th className="p-3">{translations.name[language]}</th>
                            <th className="p-3">{translations.category[language]}</th>
                            <th className="p-3">{translations.price[language]}</th>
                            <th className="p-3 text-center">{translations.actions[language]}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(p => (
                            <tr key={p.id} className="border-b hover:bg-gray-50">
                                <td className="p-3 font-semibold">{p.name[language]}</td>
                                <td className="p-3">{p.category[language]}</td>
                                <td className="p-3">{p.price.toFixed(2)} {translations.currency[language]}</td>
                                <td className="p-3 text-center space-x-2 rtl:space-x-reverse">
                                    <button onClick={() => handleEdit(p)} className="bg-blue-500 text-white px-3 py-1 rounded text-sm">{translations.edit[language]}</button>
                                    <button onClick={() => handleDelete(p.id)} className="bg-red-500 text-white px-3 py-1 rounded text-sm">{translations.delete[language]}</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
