export default function ProductCard({ product, onEdit, onDelete }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-lg transition-transform transform hover:scale-105 flex flex-col items-center w-full max-w-xs">
      <img
        src={product.imgUrl || "https://via.placeholder.com/150"}
        alt={product.name}
        className="w-32 h-32 object-cover rounded-lg shadow-md"
      />
      <h2 className="text-xl font-semibold mt-4 text-gray-800">{product.name}</h2>
      <p className="text-sm text-gray-600 mt-1">🛒 Quantity: <span className="font-medium text-gray-700">{product.quantity}</span></p>
      <p className="text-sm text-gray-500 mt-1">⏳ Expiry: <span className="font-medium text-red-500">{product.expDate}</span></p>
      
      <div className="flex gap-4 mt-4">
        <button 
          onClick={() => onEdit(product.id)} 
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-all"
        >
          ✏ Edit
        </button>
        <button 
          onClick={() => onDelete(product.id)} 
          className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition-all"
        >
          🗑 Delete
        </button>
      </div>
    </div>
  );
}
