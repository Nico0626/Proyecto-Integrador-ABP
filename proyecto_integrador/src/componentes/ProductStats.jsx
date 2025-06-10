// logica de calculos estadisticos
import { useMemo } from 'react';

export default function ProductStats(products, filteredProducts) {
  return useMemo(() => {
    const totalProducts = filteredProducts.length;
    const maxProduct = Math.max(...filteredProducts.map(p => p.price));
    const minProduct = Math.min(...filteredProducts.map(p => p.price));
    const productosMas20 = filteredProducts.filter(p => p.title.length > 20).length;
    const precioTotal = products.reduce((acc, p) => acc + p.price, 0);
    const discountPercentage = totalProducts > 0
      ? (products.reduce((acc, p) => acc + p.discountPercentage, 0) / totalProducts).toFixed(2)
      : 0;

    const categorys = [...new Set(filteredProducts.map(p => p.category))];
    const productosPorCategoria = categorys.map(cat => {
      const items = filteredProducts.filter(p => p.category === cat);
      const precios = items.map(p => p.price);
      const ratings = items.map(p => p.rating);
      return {
        categoria: cat,
        cantidad: items.length,
        promedioPrecio: (precios.reduce((a, b) => a + b, 0) / precios.length).toFixed(2),
        promedioRating: (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(2),
        max: items.reduce((prev, curr) => (curr.price > prev.price ? curr : prev)),
        min: items.reduce((prev, curr) => (curr.price < prev.price ? curr : prev)),
      };
    });

    const promedioPrecioTotal = totalProducts > 0
      ? (filteredProducts.reduce((acc, prod) => acc + prod.price, 0) / totalProducts).toFixed(2)
      : 0;

    const promedioRatingGeneral = totalProducts > 0
      ? (filteredProducts.reduce((acc, prod) => acc + prod.rating, 0) / totalProducts).toFixed(2)
      : 0;

    const cantidadStockMayor50 = filteredProducts.filter(p => p.stock > 50).length;
    const cantidadRatingMayor45 = filteredProducts.filter(p => p.rating > 4.5).length;

    return {
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
      cantidadRatingMayor45,
    };
  }, [products, filteredProducts]);
}
