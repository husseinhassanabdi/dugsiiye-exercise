// import Counter from "../components/Counter";

export default async function ProductsPage() {
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();

  console.log(data);

  return (
    <div>
      <h1 className="text-xl font-bold">Products</h1>
      <ul>
        {data.products.slice(0, 5).map((product: { id: number; title: string }) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
}

