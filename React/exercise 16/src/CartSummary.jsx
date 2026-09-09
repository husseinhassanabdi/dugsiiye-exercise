import { useContext } from 'react';
import CartContext from './CartContext';

function CartSummary() {
  const {
    cartItems,
    removeFromCart,
    totalPrice,
  } = useContext(CartContext);

  return (
    <div>
      <h2>Cart Summary</h2>

      <p>Total Items: {cartItems.length}</p>

      <ul>
        {cartItems.map((item, index) => (
          <li key={`${item.id}-${index}`}>
            {item.name} - ${item.price}

            <button
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <h3>
        Total Price: ${totalPrice.toFixed(2)}
      </h3>

      {cartItems.length > 0 && (
        <button onClick={() => alert('Checkout successful!')}>
          Checkout
        </button>
      )}
    </div>
  );
}

export default CartSummary;