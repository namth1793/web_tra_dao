import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('tradao_cart') || '[]'); }
    catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('tradao_cart', JSON.stringify(cart));
  }, [cart]);

  function addToCart(product, qty = 1) {
    setCart(prev => {
      const ex = prev.find(i => i.id === product.id);
      if (ex) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i);
      return [...prev, {
        id: product.id,
        name: product.name,
        price: product.price,
        original_price: product.original_price,
        image_url: product.image_url,
        qty,
      }];
    });
  }

  function removeFromCart(id) {
    setCart(prev => prev.filter(i => i.id !== id));
  }

  function updateQty(id, qty) {
    if (qty < 1) { removeFromCart(id); return; }
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  }

  function clearCart() { setCart([]); }

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
