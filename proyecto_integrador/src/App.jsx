import './App.css'
import { useEffect, useState, useRef } from 'react'
import axios from "axios"
import ProductList from "./componentes/ProductList/"
import StatsPanel from "./componentes/StatsPanel"

function App() {
  //estados
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [show, setShow] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [page, setPage] = useState(1);
  const [format, setFormat]=useState('')
  //ref
  const containerRef = useRef(null);

  const limit=20;
  useEffect(() => {
    axios.get(`https://dummyjson.com/products?limit=${limit}&skip=${(page-1)*limit}`)
      .then((res) => setProducts(res.data.products));
  }, [page]);

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  const totalProducts = filteredProducts.length;
  const maxProduct = Math.max(...filteredProducts.map((p) => p.price));
  const minProduct = Math.min(...filteredProducts.map((p) => p.price));
  const productosMas20 = filteredProducts.filter((p) => p.title.length > 20).length;
  const precioTotal = products.reduce((acc, p) => acc + p.price, 0);
  const discountPercentage = (products.reduce((acc, p) => acc + p.discountPercentage, 0) / totalProducts).toFixed(2);


  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    containerRef.current.classList.toggle("dark-mode");
  };

  return (
    <div ref={containerRef} >
      <h1 className="text-3xl font-bold mb-4 text-center">Productos</h1>

      <div>Pagina {page}</div>
      <br />

      <button className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-2xl shadow-md transition duration-300 ease-in-out"
        onClick={toggleDarkMode}>Modo {darkMode ? "Oscuro" : "Claro"}
      </button>

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
      <div className="flex justify-center mt-6">Pagina {page}</div>
        <br />
      <div className="flex justify-center mt-6">
        
        <button className='px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-2xl shadow-md transition duration-300 ease-in-out'
          disabled={page === 1}
          onClick={() => {
            setPage(page - 1)
          }}>
          Anterior
        </button>
        <button className='px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-2xl shadow-md transition duration-300 ease-in-out'
          disabled={filteredProducts.length<limit}
          onClick={() => {
            setPage(page + 1)
          }}>
          Siguiente
        </button>
      </div>
      <div className="flex justify-center mt-6">
        <button className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-2xl shadow-md transition duration-300 ease-in-out"
          onClick={() => setShow(!show)}>
          {show ? "Ocultar estadísticas" : "Mostrar estadísticas"}
        </button>
      </div>

      {show && (
        <StatsPanel
          total={totalProducts}
          productosMas20={productosMas20}
          precioTotal={precioTotal}
          max={maxProduct}
          min={minProduct}
          discountPercentage={discountPercentage}
        />
      )}
    </div>
  );
}

export default App;



