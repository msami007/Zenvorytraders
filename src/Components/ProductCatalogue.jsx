import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "https://zenvorytradersllc.com/api"; // ✅ your backend API base

const ProductCatalogue = () => {
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  // Fetch products
  const fetchProducts = async (category = "") => {
    try {
      setLoading(true);
      const url = category
        ? `${API_BASE}/fetch_by_category.php?category=${encodeURIComponent(category)}`
        : `${API_BASE}/fetch_all.php`;

      const res = await fetch(url, { cache: "no-store" });
      const data = await res.json();

      if (Array.isArray(data)) setProducts(data);
      else setProducts([]);
    } catch (err) {
      console.error("Error fetching products:", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();

    // Auto-refresh when tab regains focus
    const onFocus = () => fetchProducts();
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  // Parse price (removes $ if present)
  const parsePrice = (priceStr) =>
    typeof priceStr === "string"
      ? parseFloat(priceStr.replace("$", ""))
      : parseFloat(priceStr);

  // Sorting logic
  const sortedProducts = useMemo(() => {
    let sorted = [...products];
    if (sortOption === "rating") {
      sorted.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === "highToLow") {
      sorted.sort(
        (a, b) => parsePrice(b.price_200_500) - parsePrice(a.price_200_500)
      );
    } else if (sortOption === "lowToHigh") {
      sorted.sort(
        (a, b) => parsePrice(a.price_200_500) - parsePrice(b.price_200_500)
      );
    }
    return sorted;
  }, [sortOption, products]);

  // Filter by search
  const filteredProducts = sortedProducts.filter((product) =>
    product.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Quantity input handler
  const handleQuantityChange = (sku, value) => {
    setQuantities((prev) => ({ ...prev, [sku]: value }));
  };

  // ✅ ADD TO CART HANDLER
  const handleAddToCart = async (product) => {
    const quantity = parseInt(quantities[product.sku] || 1, 10);
    try {
      const key = 'local_cart';
      const raw = localStorage.getItem(key);
      const cart = Array.isArray(JSON.parse(raw || '[]')) ? JSON.parse(raw || '[]') : [];
      const price = product.price_200_500 || product.price || 0;
      const img = product.image_url
        ? (product.image_url.startsWith('http') ? product.image_url : `${API_BASE.replace('/api','')}/${product.image_url}`)
        : '/placeholder.png';
      const existing = cart.find((i) => i.sku === product.sku);
      if (existing) {
        existing.quantity = (existing.quantity || 0) + quantity;
        window.dispatchEvent(new CustomEvent('cart-notification', { detail: { message: `${product.name} quantity updated in cart`, type: 'success' } }));
      } else {
        cart.push({ sku: product.sku, id: product.id || null, name: product.name, price, quantity, image: img });
        window.dispatchEvent(new CustomEvent('cart-notification', { detail: { message: `${product.name} added to cart`, type: 'success' } }));
      }
      localStorage.setItem(key, JSON.stringify(cart));
    } catch (err) {
      console.error('Error updating local cart', err);
      window.dispatchEvent(new CustomEvent('cart-notification', { detail: { message: `Failed to update cart`, type: 'error' } }));
    }
  };

  return (
    <div className="w-full bg-white p-6 md:p-10 justify-center mx-auto my-8 rounded-lg shadow-md max-w-7xl">
      <h1 className="text-2xl md:text-3xl font-semibold mb-4">Product Catalogue</h1>

      {/* ✅ Success / Error message */}
      {message && (
        <div
          className={`text-center p-3 mb-4 rounded ${
            message.startsWith("✅")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      {/* Sort + Search */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-2">
          <label className="text-gray-700 font-medium">Sort by:</label>
          <select
            onChange={(e) => setSortOption(e.target.value)}
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[#0b3d91]"
          >
            <option value="">Default</option>
            <option value="rating">By Rating</option>
            <option value="highToLow">Price: High to Low</option>
            <option value="lowToHigh">Price: Low to High</option>
          </select>
        </div>

        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search with Product Name only"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-[#0b3d91]"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
            />
          </svg>
        </div>
      </div>

      {/* Loading / Empty states */}
      {loading ? (
        <p className="text-center py-10 text-gray-600">Loading products...</p>
      ) : filteredProducts.length === 0 ? (
        <p className="text-center py-10 text-gray-600">No products found.</p>
      ) : (
        <>
          {/* Table Header (hidden on small screens) */}
          <div className="hidden md:grid grid-cols-12 font-semibold text-gray-700 border-b py-3">
            <div className="col-span-2">SKU</div>
            <div className="col-span-2">IMAGE</div>
            <div className="col-span-3">NAME</div>
            <div className="col-span-1 text-center">PRICE</div>
            <div className="col-span-2 text-center">QUANTITY</div>
            <div className="col-span-2 text-center">ACTION</div>
          </div>

          {/* Table Rows */}
          {filteredProducts.map((product) => (
            <div
              key={product.sku}
              className="grid grid-cols-1 md:grid-cols-12 items-start md:items-center border-b py-4 hover:bg-gray-50 transition gap-3"
            >
              <div className="md:col-span-2 text-gray-600">
                <div className="text-sm md:hidden text-gray-500">SKU</div>
                <div>{product.sku}</div>
              </div>

              {/* Image */}
              <div
                className="md:col-span-2 cursor-pointer flex items-center justify-start md:justify-center"
                onClick={() => navigate(`/product/${product.sku}`)}
              >
                <img
                  src={
                    product.image_url
                      ? product.image_url.startsWith("http")
                        ? product.image_url
                        : `${API_BASE.replace("/api", "")}/${product.image_url}`
                      : "/placeholder.png"
                  }
                  alt={product.name}
                  className="w-20 h-20 md:w-16 md:h-16 object-contain mx-auto hover:scale-105 transition-transform"
                />
              </div>

              {/* Name */}
              <div
                className="md:col-span-3 text-gray-800 cursor-pointer hover:text-[#0b3d91]"
                onClick={() => navigate(`/product/${product.sku}`)}
              >
                <div className="text-sm md:hidden text-gray-500">Name</div>
                <div className="font-medium">{product.name}</div>
              </div>

              <div className="md:col-span-1 text-left md:text-center font-semibold">
                <div className="text-sm md:hidden text-gray-500">Price</div>
                <div>${product.price_200_500}</div>
              </div>

              <div className="md:col-span-2 text-left md:text-center">
                <div className="text-sm md:hidden text-gray-500">Quantity</div>
                <input
                  type="number"
                  min="1"
                  value={quantities[product.sku] || 1}
                  onChange={(e) =>
                    handleQuantityChange(product.sku, e.target.value)
                  }
                  className="w-24 md:w-16 text-center border border-gray-300 rounded-md p-1 focus:ring-1 focus:ring-[#0b3d91]"
                />
              </div>

              <div className="md:col-span-2 text-left md:text-center">
                <div className="text-sm md:hidden text-gray-500">Action</div>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="mt-1 md:mt-0 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ProductCatalogue;
