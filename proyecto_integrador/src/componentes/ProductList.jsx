import Card from "./Card";

function ProductList({ products }) {
  if (products.length === 0) {
    return <div className="text-red-600 mt-4">No se encontraron productos</div>;
  }

  return (
    <div className="flex flex-wrap -m-1">
      {products.map((p) => (
        <Card key={p.id} title={p.title} price={p.price} image={p.thumbnail} />
      ))}
    </div>
  );
}

export default ProductList;
