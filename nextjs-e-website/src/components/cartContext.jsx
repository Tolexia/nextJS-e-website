import { createContext, useContext, useEffect, useState } from 'react';
import { parseCartFromStorage } from '@/utils/cartImage';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(parseCartFromStorage());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items, hydrated]);

  function addItem(item, quantity) {
    const nb = Number(quantity) || 0;
    if (nb <= 0 || !item) {
      return;
    }
    setItems((prev) => [...prev, { ...item, nb }]);
    setCartOpen(true);
  }

  function removeItem(index) {
    setItems((prev) => prev.filter((_, i) => i !== Number(index)));
  }

  function clearCart() {
    setItems([]);
  }

  const itemCount = items.reduce((sum, item) => sum + (Number(item?.nb) || 0), 0);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        cartOpen,
        setCartOpen,
        addItem,
        removeItem,
        clearCart,
        hydrated,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
