import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, CartesianGrid,
  PieChart, Pie, Cell
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA66CC', '#FF4444'];

function StatsPanel({
  total, max, min, precioTotal, discountPercentage, productosMas20,
  promedioPrecio, promedioRating, cantidadStockMayor50, cantidadRatingMayor45,
  porCategoria, datosStock
}) {

  return (
    <div className="bg-gray-300 card p-4 rounded-lg shadow-md mt-4 w-full max-w-5xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Estadísticas Generales</h2>
      <ul className="mb-4 space-y-1">
        {/* Calculos sobre todos los productos*/}
        <li>Total de productos: {total}</li>
        <li>Precio máximo: ${max}</li>
        <li>Precio mínimo: ${min}</li>
        <li>Precio total acumulado: ${precioTotal}</li>
        <li>Promedio de precio: ${promedioPrecio}</li>
        <li>Promedio de descuento: {discountPercentage}%</li>
        <li>Promedio de rating general: {promedioRating}</li>
        <li>Productos con título largo (&gt; 20 caracteres): {productosMas20}</li>
        <li>Productos con stock &gt; 50: {cantidadStockMayor50}</li>
        <li>Productos con rating &gt; 4.5: {cantidadRatingMayor45}</li>
      </ul>

      <h3 className="text-lg font-semibold mb-2">Estadísticas por Categoría</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(porCategoria ?? []).map(cat => (
          <div key={cat.categoria} className="p-3 rounded shadow bg-white">
            <h4 className="font-bold">{cat.categoria}</h4>
            {/* Calculos sobre categoria */}
            <p>Cantidad de productos: {cat.cantidad}</p>
            <p>Precio promedio: ${cat.promedioPrecio}</p>
            <p>Rating promedio: {cat.promedioRating}</p>
            <p>Producto más caro: {cat.max.title} (${cat.max.price})</p>
            <p>Producto más barato: {cat.min.title} (${cat.min.price})</p>
          </div>
        ))}
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        {/* Gráfico de barras */}
        <div className="bg-white p-4 rounded shadow">
          <h4 className="font-semibold mb-2">Cantidad por Categoría</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={porCategoria}>
              <XAxis dataKey="categoria" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="cantidad" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie chart */}
        <div className="bg-white p-4 rounded shadow col-span-full md:col-span-1">
          <h4 className="font-semibold mb-2">Proporción según Stock</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={datosStock}
                dataKey="valor"
                nameKey="tipo"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {(datosStock ?? []).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default StatsPanel;
