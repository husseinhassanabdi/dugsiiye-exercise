// export default function ProductsPage() {
//   return (
//     <div>
//       <h1>Products</h1>
//       <p>Visit the home page for a live product list.</p>
//     </div>
//   );
// }


interface Product {
  id: number;
  title: string;
}

export default async function ProductsPage() {
  const response = await fetch("https://dummyjson.com/products");

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: { products: Product[] } = await response.json();

  return (
    <main>
      <h1>Products</h1>

      <ul>
        {data.products.slice(0, 5).map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </main>
  );
}
  