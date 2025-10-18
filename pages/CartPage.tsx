
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { deliveryOptions } from '../data/menuData';

export default function CartPage() {
  const context = useContext(AppContext);
  const [deliveryFee, setDeliveryFee] = useState(0);

  if (!context) return null;
  const { language, cart, updateCartQuantity, removeFromCart, cartTotal } = context;

  const translations = {
    yourCart: { ar: 'سلة مشترياتك', tr: 'Alışveriş Sepetiniz' },
    emptyCart: { ar: 'سلتك فارغة حالياً.', tr: 'Sepetiniz şu an boş.' },
    browseMenu: { ar: 'تصفح القائمة', tr: 'Menüye Göz At' },
    product: { ar: 'المنتج', tr: 'Ürün' },
    price: { ar: 'السعر', tr: 'Fiyat' },
    quantity: { ar: 'الكمية', tr: 'Miktar' },
    total: { ar: 'المجموع', tr: 'Toplam' },
    subtotal: { ar: 'المجموع الفرعي', tr: 'Ara Toplam' },
    deliveryArea: { ar: 'اختر منطقة التوصيل', tr: 'Teslimat Bölgesini Seçin' },
    deliveryFee: { ar: 'رسوم التوصيل', tr: 'Teslimat Ücreti' },
    grandTotal: { ar: 'المجموع الكلي', tr: 'Genel Toplam' },
    orderViaWhatsapp: { ar: 'اطلب عبر الواتساب', tr: 'WhatsApp ile Sipariş Ver' },
    currency: { ar: 'ل.ت', tr: 'TL' },
    remove: { ar: 'إزالة', tr: 'Kaldır' },
    whatsappWelcome: { ar: 'مرحباً مطعم الذهبي، أرغب في طلب ما يلي:', tr: 'Merhaba Altın Restoran, aşağıdaki siparişi vermek istiyorum:' },
    whatsappAddressPrompt: { ar: 'العنوان: [يرجى كتابة العنوان هنا]', tr: 'Adres: [Lütfen adresinizi buraya yazın]' }
  };
  
  const handleOrder = () => {
    const phone = '905367820025';
    const itemsText = cart.map(item => 
        `- ${item.quantity}x ${item.name[language]} (${item.price} ${translations.currency[language]}) = ${item.quantity * item.price} ${translations.currency[language]}`
    ).join('\n');

    const message = `
${translations.whatsappWelcome[language]}

${itemsText}

${translations.subtotal[language]}: ${cartTotal.toFixed(2)} ${translations.currency[language]}
${translations.deliveryFee[language]}: ${deliveryFee.toFixed(2)} ${translations.currency[language]}
*${translations.grandTotal[language]}: ${(cartTotal + deliveryFee).toFixed(2)} ${translations.currency[language]}*

${translations.whatsappAddressPrompt[language]}
    `;

    const encodedMessage = encodeURIComponent(message.trim());
    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank');
  };

  if (cart.length === 0) {
    return (
      <div className="text-center bg-white p-10 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold mb-4">{translations.yourCart[language]}</h1>
        <p className="text-gray-600 text-lg mb-6">{translations.emptyCart[language]}</p>
        <Link to="/" className="bg-brand-dark text-white px-8 py-3 rounded-md text-lg font-bold hover:bg-brand-gold hover:text-brand-dark transition-colors">
          {translations.browseMenu[language]}
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 md:p-10 rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold text-center mb-8">{translations.yourCart[language]}</h1>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="p-4">{translations.product[language]}</th>
              <th className="p-4 text-center">{translations.price[language]}</th>
              <th className="p-4 text-center">{translations.quantity[language]}</th>
              <th className="p-4 text-right">{translations.total[language]}</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {cart.map(item => (
              <tr key={item.id} className="border-b">
                <td className="p-4 font-bold">{item.name[language]}</td>
                <td className="p-4 text-center">{item.price.toFixed(2)} {translations.currency[language]}</td>
                <td className="p-4">
                  <div className="flex justify-center items-center">
                    <button onClick={() => updateCartQuantity(item.id, item.quantity - 1)} className="px-2 font-bold">-</button>
                    <span className="w-10 text-center">{item.quantity}</span>
                    <button onClick={() => updateCartQuantity(item.id, item.quantity + 1)} className="px-2 font-bold">+</button>
                  </div>
                </td>
                <td className="p-4 text-right font-bold">{(item.price * item.quantity).toFixed(2)} {translations.currency[language]}</td>
                <td className="p-4 text-center">
                  <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 text-sm">
                    {translations.remove[language]}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-8 grid md:grid-cols-2 gap-8 items-start">
        <div>
            <label htmlFor="delivery" className="block font-bold mb-2">{translations.deliveryArea[language]}</label>
            <select 
                id="delivery" 
                className="w-full p-2 border rounded-md"
                onChange={(e) => setDeliveryFee(parseFloat(e.target.value))}
            >
                <option value="0">--</option>
                {deliveryOptions.map(option => (
                    <option key={option.area[language]} value={option.fee}>{option.area[language]} (+{option.fee} {translations.currency[language]})</option>
                ))}
            </select>
        </div>
        
        <div className="text-right">
            <p className="text-lg">{translations.subtotal[language]}: <span className="font-bold">{cartTotal.toFixed(2)} {translations.currency[language]}</span></p>
            <p className="text-lg">{translations.deliveryFee[language]}: <span className="font-bold">{deliveryFee.toFixed(2)} {translations.currency[language]}</span></p>
            <p className="text-2xl font-bold mt-2 text-brand-gold">{translations.grandTotal[language]}: <span className="text-brand-dark">{(cartTotal + deliveryFee).toFixed(2)} {translations.currency[language]}</span></p>
        </div>
      </div>

      <div className="mt-8 text-center">
        <button 
          onClick={handleOrder}
          className="w-full md:w-auto bg-green-500 text-white px-10 py-4 rounded-lg text-xl font-bold hover:bg-green-600 transition-colors"
        >
          {translations.orderViaWhatsapp[language]}
        </button>
      </div>
    </div>
  );
}
