import React from 'react';

function Filters({ search, setSearch, category, setCategory, sortOrder, setSortOrder }) {
    return (
        <div className="flex gap-4 items-center">
            <select onChange={e => setCategory(e.target.value)} value={category}>
                <option value="">Todas las categorías</option>
                <option value="home-decoration">Decoración del hogar</option>
                <option value="beauty">Bellesa</option>
                <option value="fragrances">Fragancias</option>
                <option value="laptops">Laptops</option>
                <option value="smartphones">Celulares</option>
                <option value="mobile-accessories">Accesorios para celular</option>
                <option value="motorcycle">Motos</option>
                <option value="sports-accessories">Deporte</option>
            </select>

            <select onChange={e => setSortOrder(e.target.value)} value={sortOrder}>
                <option value="">Ordenar por</option>
                <option value="price-asc">Precio ↑</option>
                <option value="price-desc">Precio ↓</option>
                <option value="rating-asc">Rating ↑</option>
                <option value="rating-desc">Rating ↓</option>
            </select>
        </div>
    );
}

export default Filters;
