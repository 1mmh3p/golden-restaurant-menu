
import React, { useState, FormEvent, useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { Product } from '../types';

interface ProductFormProps {
    product: Product | null;
    onSave: (product: Product) => void;
    onCancel: () => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({ product, onSave, onCancel }) => {
    const context = useContext(AppContext);
    const [formData, setFormData] = useState<Omit<Product, 'id' | 'imageUrl'>>({
        name: { ar: '', tr: '' },
        description: { ar: '', tr: '' },
        price: 0,
        category: { ar: '', tr: '' },
    });
    const [currentId, setCurrentId] = useState<number | null>(null);

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name,
                description: product.description,
                price: product.price,
                category: product.category,
            });
            setCurrentId(product.id);
        } else {
            setFormData({
                name: { ar: '', tr: '' },
                description: { ar: '', tr: '' },
                price: 0,
                category: { ar: '', tr: '' },
            });
            setCurrentId(null);
        }
    }, [product]);

    if (!context) return null;
    const { language } = context;

    const translations = {
        addProduct: { ar: 'إضافة منتج جديد', tr: 'Yeni Ürün Ekle' },
        editProduct: { ar: 'تعديل المنتج', tr: 'Ürünü Düzenle' },
        nameAr: { ar: 'الاسم (عربي)', tr: 'Ad (Arapça)' },
        nameTr: { ar: 'الاسم (تركي)', tr: 'Ad (Türkçe)' },
        descAr: { ar: 'الوصف (عربي)', tr: 'Açıklama (Arapça)' },
        descTr: { ar: 'الوصف (تركي)', tr: 'Açıklama (Türkçe)' },
        categoryAr: { ar: 'الفئة (عربي)', tr: 'Kategori (Arapça)' },
        categoryTr: { ar: 'الفئة (تركي)', tr: 'Kategori (Türkçe)' },
        price: { ar: 'السعر', tr: 'Fiyat' },
        save: { ar: 'حفظ', tr: 'Kaydet' },
        cancel: { ar: 'إلغاء', tr: 'İptal' },
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [field, lang] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [field]: { ...(prev as any)[field], [lang]: value }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: name === 'price' ? parseFloat(value) : value,
            }));
        }
    };
    
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const productToSave: Product = {
            ...formData,
            id: currentId || Date.now(),
            imageUrl: product?.imageUrl || `https://picsum.photos/400/300?random=${Date.now()}`
        };
        onSave(productToSave);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-lg max-h-screen overflow-y-auto">
                <h2 className="text-2xl font-bold mb-6">{product ? translations.editProduct[language] : translations.addProduct[language]}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block font-bold">{translations.nameAr[language]}</label>
                            <input type="text" name="name.ar" value={formData.name.ar} onChange={handleChange} className="w-full p-2 border rounded" required />
                        </div>
                        <div>
                            <label className="block font-bold">{translations.nameTr[language]}</label>
                            <input type="text" name="name.tr" value={formData.name.tr} onChange={handleChange} className="w-full p-2 border rounded" required />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block font-bold">{translations.categoryAr[language]}</label>
                            <input type="text" name="category.ar" value={formData.category.ar} onChange={handleChange} className="w-full p-2 border rounded" required />
                        </div>
                        <div>
                            <label className="block font-bold">{translations.categoryTr[language]}</label>
                            <input type="text" name="category.tr" value={formData.category.tr} onChange={handleChange} className="w-full p-2 border rounded" required />
                        </div>
                    </div>
                    <div className="mb-4">
                         <label className="block font-bold">{translations.price[language]}</label>
                         <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full p-2 border rounded" step="0.01" required />
                    </div>
                    <div className="mb-4">
                        <label className="block font-bold">{translations.descAr[language]}</label>
                        <textarea name="description.ar" value={formData.description.ar} onChange={handleChange} className="w-full p-2 border rounded" rows={2}></textarea>
                    </div>
                     <div className="mb-4">
                        <label className="block font-bold">{translations.descTr[language]}</label>
                        <textarea name="description.tr" value={formData.description.tr} onChange={handleChange} className="w-full p-2 border rounded" rows={2}></textarea>
                    </div>
                    <div className="flex justify-end space-x-4 rtl:space-x-reverse">
                        <button type="button" onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded">{translations.cancel[language]}</button>
                        <button type="submit" className="bg-brand-dark text-white px-4 py-2 rounded">{translations.save[language]}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
