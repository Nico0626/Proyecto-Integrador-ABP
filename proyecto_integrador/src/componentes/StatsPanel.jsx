function StatsPanel({ total, max, min, discountPercentage,productosMas20,precioTotal}) {
  return (
    <div className="bg-gray-300 p-4 rounded-lg shadow-md mt-4 w-full max-w-sm mx-auto">
      <h2 className="text-xl font-semibold mb-2">Estadísticas</h2>
      <p>Hay {total} productos</p>
      <p>Precio máximo: ${max}</p>
      <p>Precio mínimo: ${min}</p>
      <p>Precio total acumulado: ${precioTotal}</p>
      <p>Promedio de descuento: {discountPercentage}%</p>
      <p>Productos con título largo (&gt; 20 caracteres): {productosMas20}</p>
    </div>
  );
}

export default StatsPanel;
