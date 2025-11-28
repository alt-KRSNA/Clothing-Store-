import useSWR from 'swr';

const fetcher = (url) => fetch(url).then(r => r.json());

export default function Home() {
  const { data, error } = useSWR('/api/products', fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Clothing Store</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {data.map(product => (
          <div key={product.id} style={{ border: '1px solid #ddd', padding: '10px' }}>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>₹{product.price}</p>
            <p>Stock: {product.stock}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
