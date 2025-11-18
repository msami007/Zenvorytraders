// src/pages/Category.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

const API_BASE = "https://zenvorytradersllc.com/api";

const buildFullImageUrl = (img) => {
  if (!img) return "/images/products/placeholder.png";
  if (img.startsWith("http")) return img;
  return `${API_BASE.replace("/api", "")}${img.startsWith("/") ? "" : "/"}${img}`;
};

const RatingStars = ({ rating = 0 }) => {
  const r = Math.round(Number(rating) || 0);
  return (
    <div className="flex items-center gap-1 text-yellow-400 text-sm mt-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < r ? "fill-current" : "opacity-30"}`}
          viewBox="0 0 20 20"
        >
          <path d="M10 1.5l2.6 5.27 5.8.84-4.2 4.09.99 5.78L10 14.77 4.81 17.48l.99-5.78L1.6 7.61l5.8-.84L10 1.5z" />
        </svg>
      ))}
    </div>
  );
};

const Category = () => {
  const { categoryName } = useParams(); // e.g. /category/Automotive
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(12);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        const url = `${API_BASE}/fetch_by_category.php?category=${encodeURIComponent(
          categoryName
        )}`;
        const res = await fetch(url);
        const data = await res.json();

        const processed = (data || []).map((p) => ({
          ...p,
          image_url: buildFullImageUrl(p.image_url),
          price_200_500: p.price_200_500 || p.price || "0.00",
          rating: p.rating || 0,
          reviews: p.reviews || 0,
        }));
        setProducts(processed);
      } catch (err) {
        console.error("Failed to load category:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, [categoryName]);

  // fetch available categories for the left select (mirror Footer/Navbar)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);
        const res = await fetch("https://zenvorytradersllc.com/api/fetch_all_categories.php");
        const data = await res.json();
        if (Array.isArray(data)) setCategories(data);
        else setCategories([]);
      } catch (err) {
        console.error('Error fetching categories for Category page:', err);
        setCategories([]);
      } finally {
        setCategoriesLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Handle quantity changes
  const handleQuantityChange = (sku, value) => {
    const newValue = Math.max(1, parseInt(value) || 1);
    setQuantities(prev => ({
      ...prev,
      [sku]: newValue
    }));
  };

  const handleAddToCart = (product) => {
    try {
      const key = 'local_cart';
      const raw = localStorage.getItem(key);
      const cart = Array.isArray(JSON.parse(raw || '[]')) ? JSON.parse(raw || '[]') : [];
      const price = product.price_200_500 || product.price || 0;
      const img = buildFullImageUrl(product.image_url || product.image_main);
      const quantity = parseInt(quantities[product.sku] || 1, 10);
      
      const existing = cart.find((i) => i.sku === product.sku);
      if (existing) {
        existing.quantity = (existing.quantity || 0) + quantity;
        window.dispatchEvent(new CustomEvent('cart-notification', { 
          detail: { 
            message: `${product.name} quantity updated in cart`, 
            type: 'success' 
          } 
        }));
      } else {
        cart.push({ 
          sku: product.sku, 
          id: product.id || product.product_id || null, 
          name: product.name, 
          price, 
          quantity, 
          image: img 
        });
        window.dispatchEvent(new CustomEvent('cart-notification', { 
          detail: { 
            message: `${product.name} added to cart`, 
            type: 'success' 
          } 
        }));
      }
      localStorage.setItem(key, JSON.stringify(cart));
    } catch (err) {
      console.error('Error updating local cart', err);
      window.dispatchEvent(new CustomEvent('cart-notification', { 
        detail: { 
          message: `Failed to update cart`, 
          type: 'error' 
        } 
      }));
    }
  };

  const filtered = products.filter(
    (p) =>
      Number(p.price_200_500) >= priceRange[0] &&
      Number(p.price_200_500) <= priceRange[1]
  );

  const displayed = filtered.slice(0, visibleCount);

  return (
    <div className="max-w-[1300px] mx-auto px-6 my-10 grid grid-cols-12 gap-8">
      {/* Left Sidebar Filters */}
      <div className="col-span-12 md:col-span-3 space-y-6">
        <div className="border p-5 rounded-md shadow-sm">
          <h3 className="font-semibold text-lg mb-3">PRODUCT CATEGORY</h3>
          <select
            className="border rounded-md px-3 py-2 w-full"
            value={categoryName}
            onChange={(e) => navigate(`/category/${e.target.value}`)}
          >
            {categoriesLoading ? (
              <option>Loading categories...</option>
            ) : categories && categories.length > 0 ? (
              categories.map((cat, idx) => (
                <option key={idx} value={cat}>{cat}</option>
              ))
            ) : (
              <option>No categories found</option>
            )}
          </select>
        </div>

        {/* Filter by Price */}
        <div className="border p-5 rounded-md shadow-sm">
          <h3 className="font-semibold text-lg mb-3">FILTER BY PRICE</h3>
          <div className="flex flex-col items-start gap-2">
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([0, Number(e.target.value)])
              }
              className="w-full accent-[#0b3d91]"
            />
            <div className="text-sm text-gray-700">
              Price: ${priceRange[0]} - ${priceRange[1]}
            </div>
            <button
              onClick={() => setVisibleCount(12)} // reset when filtering
              className="bg-[#0b3d91] text-white px-4 py-2 rounded hover:bg-[#092b56] mt-2"
            >
              Filter
            </button>
          </div>
        </div>
      </div>

      {/* Main Products Grid */}
      <div className="col-span-12 md:col-span-9">
        <h2 className="text-3xl font-bold mb-6">{categoryName}</h2>

        {loading ? (
          <div className="text-center py-20">Loading products...</div>
        ) : displayed.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayed.map((product) => (
                <div
                  key={product.sku}
                  className="group relative bg-white border rounded-lg p-4 shadow-sm hover:shadow-lg transition-all"
                >
                  <div 
                    className="h-40 flex items-center justify-center mb-3 cursor-pointer"
                    onClick={() => navigate(`/product/${product.sku}`)}
                  >
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="max-h-[140px] object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="text-xs text-gray-500 mb-1">
                    SKU: <span className="text-gray-700">{product.sku}</span>
                  </div>
                  <div 
                    className="text-sm font-medium text-gray-900 line-clamp-2 mb-1 cursor-pointer hover:text-[#0b3d91] transition-colors"
                    onClick={() => navigate(`/product/${product.sku}`)}
                  >
                    {product.name}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-semibold text-amber-600">
                      ${product.price_200_500}
                    </div>
                    <div className="text-right">
                      <RatingStars rating={product.rating} />
                      <div className="text-xs text-gray-400">
                        {product.reviews ?? 0} reviews
                      </div>
                    </div>
                  </div>

                  {/* Quantity and Add to cart */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      value={quantities[product.sku] || 1}
                      onChange={(e) => handleQuantityChange(product.sku, e.target.value)}
                      className="w-12 text-center border border-gray-300 rounded-md p-1 focus:ring-1 focus:ring-[#0b3d91] text-sm"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                      className="bg-orange-500 text-white px-3 py-1 rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors flex items-center gap-1"
                    >
                      <ShoppingCart size={16} />
                      Add
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Next Page Button */}
            {visibleCount < filtered.length && (
              <div className="text-center mt-10">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 12)}
                  className="px-6 py-2 bg-[#0b3d91] text-white rounded-lg hover:bg-[#092b56] transition-all"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 text-gray-600">
            No products found in this category.
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
