
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function Footer() {
    const context = useContext(AppContext);
    if (!context) return null;
    const { language } = context;

    const translations = {
        addressTitle: { ar: 'العنوان', tr: 'Adres' },
        address: { ar: 'الريحانية - اشارة الريمار - جانب محمصة الهلال', tr: 'Reyhanlı - Rimar Kavşağı - Hilal Kuruyemiş Yanı' },
        phonesTitle: { ar: 'للتواصل والطلبات', tr: 'İletişim ve Sipariş' },
        rights: { ar: '© 2024 مطعم الذهبي. جميع الحقوق محفوظة.', tr: '© 2024 Altın Restoran. Tüm hakları saklıdır.' }
    };
    
    return (
        <footer className="bg-brand-dark text-gray-300 py-8">
            <div className="container mx-auto px-4 text-center">
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-xl font-bold text-brand-gold mb-2">{translations.addressTitle[language]}</h3>
                        <p>{translations.address[language]}</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-brand-gold mb-2">{translations.phonesTitle[language]}</h3>
                        <p className="tracking-widest">0536 782 0025</p>
                        <p className="tracking-widest">0536 782 0026</p>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-700 pt-6">
                    <p className="text-sm">{translations.rights[language]}</p>
                </div>
            </div>
        </footer>
    );
}
