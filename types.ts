
export type Language = 'ar' | 'tr';

export interface LocalizedString {
  ar: string;
  tr: string;
}

export interface Product {
  id: number;
  name: LocalizedString;
  description: LocalizedString;
  price: number;
  category: LocalizedString;
  imageUrl: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface DeliveryOption {
  area: LocalizedString;
  fee: number;
}

export interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  updateCartQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  cartTotal: number;
  isAuthenticated: boolean;
  login: (user: string, pass: string) => boolean;
  logout: () => void;
}
