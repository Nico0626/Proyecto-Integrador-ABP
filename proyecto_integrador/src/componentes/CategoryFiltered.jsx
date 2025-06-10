import { useState, useMemo } from 'react';

export default function categoryFilter(products, search) {
  const [category, setCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
      .filter((p) => (category ? p.category === category : true))
      .sort((a, b) => {
        if (sortOrder === 'price-asc') return a.price - b.price;
        if (sortOrder === 'price-desc') return b.price - a.price;
        if (sortOrder === 'rating-asc') return a.rating - b.rating;
        if (sortOrder === 'rating-desc') return b.rating - a.rating;
        return 0;
      });
  }, [products, search, category, sortOrder]);

  return {
    filteredProducts,
    category,
    setCategory,
    sortOrder,
    setSortOrder,
  };
}
