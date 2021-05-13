export async function getStaticProps() {
  const data = await fetch('http://localhost:3001/api/products');
  const products = await data.json();
  return {
    props: {
      products,
    },
  };
}

export default function Index({ products }) {
  return (
    <main>
      <h1>Webshop</h1>
      {products.map((product) => (
        <div key={product._id}>
          <p>{product.name}</p>
          <p>{product.price}</p>
        </div>
      ))}
    </main>
  );
}
