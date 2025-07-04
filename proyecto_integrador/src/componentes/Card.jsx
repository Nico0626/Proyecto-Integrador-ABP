//Card de talwin para los productos
function Card({ title, price, image }) {
  return (
    <div className="p-6 md:w-1/6">
      <div className="h-full card border border-gray-200 dark:border-gray-600 rounded-2xl overflow-hidden shadow hover:shadow-lg">
        <img className="mt-6 px-6 py-3 object-cover object-center" src={image} alt={title}/>
        <div className="p-4">
          <h2 className="text-lg font-bold mb-2">{title}</h2>
          <p className="text-gray-700 text-base">${price}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
