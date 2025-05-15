"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {Toaster,toast} from "react-hot-toast";

export default function AddProduct() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    imgUrl: "",
    quantity: "",
    expDate: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.quantity || !form.expDate) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      await axios.post("https://67f7183e42d6c71cca6403bd.mockapi.io/v1/api/products", {
        ...form,
        quantity: Number(form.quantity),
      });
      toast.success("Added Product");
      router.push("/");
    } catch (err) {
      setError("Failed to add product. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center p-6">
        <Toaster position="top-right" reverseOrder={false} />
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">Add New Product</h1>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Product Name *</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Apple iPhone 14"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">Image URL</label>
            <input
              type="text"
              name="imgUrl"
              value={form.imgUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.png"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">Quantity *</label>
            <input
              type="number"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              placeholder="e.g. 25"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">Expiry Date *</label>
            <input
              type="date"
              name="expDate"
              value={form.expDate}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-md"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}
