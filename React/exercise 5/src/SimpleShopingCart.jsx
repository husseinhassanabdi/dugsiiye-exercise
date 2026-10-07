import { useState } from "react";



const SimpleShopingCart = () => {

   const [products, setProducts] = useState ([]);
   const [productName, setproductName] = useState ("");
   const [productPrice, setproductPrice] = useState ("");



    const handleAddProduct = () => {
        

        if (productName.trim() !== '' && productPrice.trim() !== '') {
            const newProduct = {
            id: Date.now(),
           name: productName.trim(),
           price:parseFloat(productPrice),
           quantity: 1,

            };

            setProducts([...products,newProduct])
            setproductName('')
            setproductPrice('')
           
        }
    };

 

const decreaseQuantity = (id) => {
  const updatedProducts = products.map((product) =>
    product.id === id && product.quantity > 1
      ? { ...product, quantity: product.quantity - 1 }
      : product
  );

  setProducts(updatedProducts);
};

const increaseQuantity = (id) => {
  const updatedProducts = products.map((product) =>
    product.id === id
      ? { ...product, quantity: product.quantity + 1 }
      : product
  );

  setProducts(updatedProducts);
};


  const removeProduct = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
  };

   
const totalPrice = products.reduce(
  (total, product) => total + product.price * product.quantity,
  0
);

    return (
      <div>
        <div>
            <h1>Simple Shopping Cart</h1>

            <h3>Add a product</h3>
            <input 
            type="text" 
            placeholder="Product Name"
            onChange={(e) => setproductName(e.target.value)}
            value={productName}
            />

            <input 
            type="number" 
            min="0"
            step="0.01"
            value={productPrice}
            onChange={(e) => setproductPrice(e.target.value)}
            placeholder="price" 
            />


            <button onClick={handleAddProduct}>Add to cart</button>

            <h3>Product in cart</h3>



            <ul>

            </ul>
        </div>

        {products.length > 0 ? (
        <div>
          <h3>Products in Cart</h3>
          <ul>
            {products.map((product) => (
              <li key={product.id}>
                <strong>{product.name}</strong> - ${product.price.toFixed(2)}
                <div>
                  Quantity:
                  <button onClick={() => decreaseQuantity(product.id)}>-</button>
                  {product.quantity}
                  <button onClick={() => increaseQuantity(product.id)}>+</button>
                </div>
                <button onClick={() => removeProduct(product.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <h4>Total Price: ${totalPrice.toFixed(2)}</h4>
        </div>
      ) : (
        <p>The cart is empty.</p>
      )}
      </div>
    );

};

export default SimpleShopingCart;