import { useContext } from 'react';
import CartContext from './CartContext';

function ProductItem({ itemId, itemName, price }) {
  const { addToCart } = useContext(CartContext);

  const handleAdd = () => {
    addToCart({
      id: itemId,
      name: itemName,
      price: price,
    });
  };

  return (
    <div>
      <h2>{itemName}</h2>
      <p>Price: ${price}</p>

      <button onClick={handleAdd}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductItem;