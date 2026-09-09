import { useState } from 'react';
import CartContext from './CartContext';
import ProductItem from './ProductItem';
import CartSummary from './CartSummary';

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price,
    0
  );

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    totalPrice,
  };

  return (
    <CartContext.Provider value={value}>
      <h1>My Shopping Store</h1>

      <ProductItem
        itemId={1}
        itemName="Laptop"
        price={899.99}
      />

      <ProductItem
        itemId={2}
        itemName="Headphones"
        price={79.99}
      />

      <ProductItem
        itemId={3}
        itemName="Keyboard"
        price={49.99}
      />

      <CartSummary />
    </CartContext.Provider>
  );
}

export default App;