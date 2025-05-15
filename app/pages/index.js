"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProducts, deleteProduct } from "../utils/api";
import ProductCard from "../components/ProductCard";
import { Toaster, toast } from "react-hot-toast";
import Modal from "../components/DeleteModel";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [showExpiringSoon, setShowExpiringSoon] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");
  const router = useRouter();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await getProducts();
      setProducts(res.data);
      setError(false);
    } catch (err) {
      setError(true);
      toast.error("Error fetching products");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    router.push(`/pages/edit/${id}`);
  };

  const handleDeleteConfirmation = (id) => {
    setProductToDelete(id);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (productToDelete) {
      try {
        await deleteProduct(productToDelete);
        setTimeout(() => {
          toast.success("Product deleted successfully!");
        }, 1000);

        fetchProducts();
      } catch (error) {
        console.error("Delete error:", error);
      } finally {
        setIsModalOpen(false);
        setProductToDelete(null);
      }
    }
  };
  const handleSortClick = () => {
  setLoading(true);
  setTimeout(() => {
    toggleSortOrder();
    setLoading(false);
  }, 2000);
};

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const sortedProducts = [...products].sort((a, b) => {
    const dateA = new Date(a.expDate);
    const dateB = new Date(b.expDate);
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  const filteredProducts = sortedProducts.filter((product) => {
    if (!showExpiringSoon) return true;
    const today = new Date();
    const expiry = new Date(product.expDate);
    const diffInDays = (expiry - today) / (1000 * 60 * 60 * 24);
    return diffInDays <= 7;
  });

  return (
    <div className="p-6 bg-gradient-to-br from-gray-100 to-blue-100 min-h-screen">

      <Toaster position="top-right" reverseOrder={false} />

      <div className="mb-8 bg-white rounded-xl shadow-xl p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 text-center sm:text-left">
          📦 Inventory Dashboard
        </h1>
        <button
          onClick={() => router.push("/pages/add")}
          className="bg-blue-600 text-white text-sm hidden lg:block sm:text-base px-4 py-3 sm:px-6 sm:py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 transform hover:scale-105 w-full sm:w-auto"
        >
          ➕ Add Product
        </button>
      </div>


      <button
        onClick={() => router.push("/pages/add")}
        className="bg-blue-600 text-white text-sm sm:text-base px-4 py-3 sm:px-6 sm:py-3 lg:hidden rounded-lg shadow-md hover:bg-blue-700 transition duration-300 transform hover:scale-105 w-full sm:w-auto"
      >
        ➕ Add Product
      </button>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 mt-3 bg-white shadow-md rounded-xl p-4">
  <div className="flex items-center space-x-4">

    
  <button
    onClick={handleSortClick}
    className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-lg font-semibold shadow hover:from-blue-600 hover:to-blue-800 transition duration-300"
  >
    Sort by Expiry: {sortOrder === "asc" ? "⬆ Ascending" : "⬇ Descending"}
  </button>


    <label className="flex items-center space-x-2 text-gray-700 font-medium">
      <input
        type="checkbox"
        checked={showExpiringSoon}
        onChange={() => setShowExpiringSoon(!showExpiringSoon)}
        className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-0 focus:outline-none"
      />
      <span>Expiring in 7 Days</span>
    </label>
  </div>
</div>


      {loading ? (
        <div className="text-center mt-10">
          <div className="animate-spin border-t-4 border-blue-500 w-12 h-12 rounded-full mx-auto mb-4"></div>
          <p className="text-lg text-gray-700">Loading products...</p>
        </div>
      ) : error ? (
        <div className="text-center text-red-600 mb-10">
          <p className="text-xl font-semibold">Failed to load products.</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center mt-20">
          <p className="text-xl text-gray-700 font-medium mb-4">
            No matching products found.
          </p>
          <button
            onClick={() => router.push("/pages/add")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-110"
          >
            Add your first product
          </button>
        </div>
      ) : (
        <div className="w-full flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl w-full px-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={() => handleEdit(product.id)}
                onDelete={() => handleDeleteConfirmation(product.id)}
                className="hover:shadow-xl transition transform hover:scale-105"
              />
            ))}
          </div>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
