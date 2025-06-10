import './App.css'
import { useEffect, useState, useRef } from 'react'
import axios from "axios"
import ProductList from "./componentes/ProductList/"
import StatsPanel from "./componentes/StatsPanel"
import categoryFilter from './componentes/CategoryFiltered'
import Filters from "./componentes/SelectCategory"
import ProductStats from './componentes/ProductStats'
import {ExportButton} from './componentes/Export'

function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [show, setShow] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [page, setPage] = useState(1);
  const [format, setFormat] = useState('');
  const {filteredProducts, category, setCategory, sortOrder, setSortOrder} = categoryFilter(products, search);
  const containerRef = useRef(null);
  const limit = 20;

  useEffect(() => {
    axios.get(`https://dummyjson.com/products?limit=${limit}&skip=${(page - 1) * limit}`)
      .then((res) => setProducts(res.data.products));
  }, [page]);

  // Usamos hook para estadísticas
  const {
    totalProducts,
    maxProduct,
    minProduct,
    productosMas20,
    precioTotal,
    discountPercentage,
    productosPorCategoria,
    promedioPrecioTotal,
    promedioRatingGeneral,
    cantidadStockMayor50,
    cantidadRatingMayor45
  } = ProductStats(products, filteredProducts);


  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    containerRef.current.classList.toggle("dark-mode");
  };

  return (
    <div ref={containerRef} >
      <h1 className="text-3xl font-bold mb-4 text-center">Productos</h1>
      
      <button
        className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-2xl shadow-md transition duration-300 ease-in-out"
        onClick={toggleDarkMode}
      >
        Modo {darkMode ? "Oscuro" : "Claro"}
      </button>

      <Filters
        category={category}
        setCategory={setCategory}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Buscar producto"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded w-64"
        />
      </div>

      <ProductList products={filteredProducts} />
{/* Select de formato de desccarga*/}
      <select name="seleccion de formato de descarga" onChange={(e) => setFormat(e.target.value)} value={format}>
        <option value="">Seleccionar formato</option>
        <option value="json">JSON</option>
        <option value="excel">Excel</option>
      </select>
{/* Boton para exportar*/}
      <ExportButton data={filteredProducts} format={format} />


      <div className="flex justify-center mt-6">Pagina {page}</div>
      <br />
      {/* Botones de paginacion*/}
      <div className="flex justify-center mt-6">
        <button
          className='px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-2xl shadow-md transition duration-300 ease-in-out'
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Anterior
        </button>
        <button
          className='px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-2xl shadow-md transition duration-300 ease-in-out'
          disabled={filteredProducts.length < limit}
          onClick={() => setPage(page + 1)}
        >
          Siguiente
        </button>
      </div>
      <div className="flex justify-center mt-6">
        <button
          className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-2xl shadow-md transition duration-300 ease-in-out"
          onClick={() => setShow(!show)}
        >
          {show ? "Ocultar estadísticas" : "Mostrar estadísticas"}
        </button>
      </div>
{/* Calculos sobre todos los productos*/}
      {show && (
        <StatsPanel
          total={totalProducts}
          productosMas20={productosMas20}
          precioTotal={precioTotal}
          max={maxProduct}
          min={minProduct}
          discountPercentage={discountPercentage}
          promedioPrecio={promedioPrecioTotal}
          promedioRating={promedioRatingGeneral}
          cantidadStockMayor50={cantidadStockMayor50}
          cantidadRatingMayor45={cantidadRatingMayor45}
          porCategoria={productosPorCategoria}
        />
      )}
    </div>
  );
}

export default App;
