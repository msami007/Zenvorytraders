import React, { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_BASE = "https://zenvorytradersllc.com/api";

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();

  // Fetch all products and select random ones
  const fetchFeaturedProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/fetch_all.php`, {
        cache: "no-store",
      });
      
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      
      const data = await res.json();

      if (Array.isArray(data) && data.length > 0) {
        // Shuffle array and take first 10 products randomly
        const shuffled = [...data].sort(() => 0.5 - Math.random());
        const randomProducts = shuffled.slice(0, 10);
        setFeaturedProducts(randomProducts);
      } else {
        setFeaturedProducts([]);
      }
    } catch (err) {
      console.error("Error fetching featured products:", err);
      // Fallback: Try fetching by category if main API fails
      try {
        const fallbackRes = await fetch(`${API_BASE}/fetch_by_category.php?category=featured`, {
          cache: "no-store",
        });
        const fallbackData = await fallbackRes.json();
        if (Array.isArray(fallbackData)) {
          const shuffled = [...fallbackData].sort(() => 0.5 - Math.random());
          setFeaturedProducts(shuffled.slice(0, 10));
        }
      } catch (fallbackErr) {
        console.error("Fallback fetch also failed:", fallbackErr);
        setFeaturedProducts([]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  // Build full image URL
  const buildFullImageUrl = (img) => {
    if (!img) return "/placeholder.png";
    return img.startsWith("http") ? img : `${API_BASE.replace("/api", "")}/${img}`;
  };

  // Quantity input handler
  const handleQuantityChange = (sku, value) => {
    setQuantities((prev) => ({ ...prev, [sku]: value }));
  };

  // Add to cart handler
  const handleAddToCart = async (product) => {
    const quantity = parseInt(quantities[product.sku] || 1, 10);
    try {
      const key = 'local_cart';
      const raw = localStorage.getItem(key);
      const cart = Array.isArray(JSON.parse(raw || '[]')) ? JSON.parse(raw || '[]') : [];
      const price = product.price_200_500 || product.price || 0;
      const img = buildFullImageUrl(product.image_url || product.image_main);
      const existing = cart.find((i) => i.sku === product.sku);
      if (existing) {
        existing.quantity = (existing.quantity || 0) + quantity;
        window.dispatchEvent(new CustomEvent('cart-notification', { detail: { message: `${product.name} quantity updated in cart`, type: 'success' } }));
      } else {
        cart.push({ sku: product.sku, id: product.id || product.product_id || null, name: product.name, price, quantity, image: img });
        window.dispatchEvent(new CustomEvent('cart-notification', { detail: { message: `${product.name} added to cart`, type: 'success' } }));
      }
      localStorage.setItem(key, JSON.stringify(cart));
    } catch (err) {
      console.error('Error updating local cart', err);
      window.dispatchEvent(new CustomEvent('cart-notification', { detail: { message: `Failed to update cart`, type: 'error' } }));
    }
  };

  // Navigate to product details
  const handleProductClick = (sku) => {
    navigate(`/product/${sku}`);
  };

  if (loading) {
    return (
      <section className="w-full py-16 bg-white">
        <div className="max-w-[1500px] mx-auto px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center text-[#367588] mb-8">
            Featured Products
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center border border-gray-200 rounded-2xl p-3 sm:p-4 bg-white h-auto md:h-[400px] w-full animate-pulse"
              >
                <div className="w-full h-40 md:h-48 bg-gray-300 rounded-lg mb-5"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
                <div className="h-6 bg-gray-300 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-[1500px] mx-auto px-8">
        {/* Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center text-[#367588] mb-8">
          Featured Products
        </h2>

        {/* Success/Error Message */}
        {message && (
          <div
            className={`text-center p-4 mb-8 rounded-xl max-w-md mx-auto ${
              message.startsWith("✅")
                ? "bg-green-100 text-green-700 border border-green-200"
                : "bg-red-100 text-red-700 border border-red-200"
            }`}
          >
            {message}
          </div>
        )}

        {/* Refresh Button */}
        <div className="text-center mb-8">
          <button
            onClick={fetchFeaturedProducts}
            className="bg-[#367588] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#092b56] transform hover:-translate-y-1 transition-all duration-200 shadow-lg flex items-center gap-2 mx-auto"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Show New Products
          </button>
        </div>

        {/* Product Grid */}
        {featuredProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-2xl text-gray-600 mb-4">No products found</p>
              <button
                onClick={fetchFeaturedProducts}
                className="bg-[#367588] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#092b56] transition-colors"
              >
              Try Again
            </button>
          </div>
        ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {featuredProducts.map((product) => (
              <div
                key={product.sku}
                className="group relative flex flex-col items-center text-center border border-gray-200 rounded-2xl p-3 sm:p-4 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 bg-white h-auto md:h-[400px] w-full"
              >
                {/* Image */}
                <div
                  className="relative w-full h-36 md:h-48 flex items-center justify-center mb-5 overflow-hidden cursor-pointer"
                  onClick={() => handleProductClick(product.sku)}
                >
                  <img
                    src={buildFullImageUrl(product.image_url || product.image_main)}
                    alt={product.name}
                    className="max-w-full h-auto max-h-28 md:max-h-40 object-contain transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src = "/placeholder.png";
                    }}
                  />

                  {/* Hover overlay removed: add-to-cart handled via quantity + Add button */}
                </div>

                {/* Product Info */}
                <h3 
                  className="text-base font-semibold mb-2 text-gray-800 line-clamp-2 cursor-pointer hover:text-[#367588] transition-colors"
                  onClick={() => handleProductClick(product.sku)}
                >
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 mb-2">SKU: {product.sku}</p>

                {/* Ratings - Fallback to random if not in API */}
                <div className="flex items-center justify-center gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={`text-yellow-400 ${
                        i < (product.rating || Math.floor(Math.random() * 2) + 3) ? "opacity-100" : "opacity-30"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                  <span className="text-sm text-gray-500 ml-1">
                    ({product.reviews || Math.floor(Math.random() * 100) + 20})
                  </span>
                </div>

                {/* Price - Use available price fields */}
                <p className="text-lg font-semibold text-gray-800 mb-3">
                  ${product.price_200_500 || product.price || product.price_500plus || "N/A"}
                </p>

                {/* Quantity and Add to Cart */}
                <div className="flex items-center gap-2 mt-auto">
                  <input
                    type="number"
                    min="1"
                    value={quantities[product.sku] || 1}
                    onChange={(e) => handleQuantityChange(product.sku, e.target.value)}
                    className="w-12 text-center border border-gray-300 rounded-md p-1 focus:ring-1 focus:ring-[#367588] text-sm"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                    className="bg-[#367588] text-white px-3 py-1 rounded-lg text-sm font-semibold hover:bg-[#2c5d6a] transition-colors flex items-center gap-1"
                  >
                    <ShoppingCart size={16} />
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;