import React, { useEffect, useState } from "react";
import FeaturedProducts from "../Components/FeaturedProducts";
import Reviews from "../Components/Reviews";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_BASE = "https://zenvorytradersllc.com/api";

const Home = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Health and Household");
  const [products, setProducts] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [quantities, setQuantities] = useState({});

  // ✅ Build full image URL
  const buildFullImageUrl = (img) => {
    if (!img || typeof img !== "string") return "/placeholder.png";

    const root = "https://zenvorytradersllc.com/";

    return img.startsWith("http")
      ? img
      : root + img.replace(/^\/+/, "");
  };

  // ✅ Navigate to product details
  const handleProductClick = (sku) => {
    navigate(`/product/${sku}`);
  };

  // ✅ Handle quantity change
  const handleQuantityChange = (sku, value) => {
    setQuantities((prev) => ({ ...prev, [sku]: value }));
  };

  // ✅ Add to cart
  const handleAddToCart = (product) => {
    const quantity = parseInt(quantities[product.sku] || 1, 10);
    try {
      const key = "local_cart";
      const raw = localStorage.getItem(key);
      const cart = Array.isArray(JSON.parse(raw || "[]"))
        ? JSON.parse(raw || "[]")
        : [];

      const price = product.price_200_500 || product.price || 0;
      const img = product.image_url;
      const existing = cart.find((i) => i.sku === product.sku);

      if (existing) {
        existing.quantity = (existing.quantity || 0) + quantity;
        window.dispatchEvent(
          new CustomEvent("cart-notification", {
            detail: {
              message: `${product.name} quantity updated in cart`,
              type: "success",
            },
          })
        );
      } else {
        cart.push({
          sku: product.sku,
          id: product.id || product.product_id || null,
          name: product.name,
          price,
          quantity,
          image: img,
        });
        window.dispatchEvent(
          new CustomEvent("cart-notification", {
            detail: {
              message: `${product.name} added to cart`,
              type: "success",
            },
          })
        );
      }

      localStorage.setItem(key, JSON.stringify(cart));
    } catch (err) {
      console.error("Error updating local cart", err);
      window.dispatchEvent(
        new CustomEvent("cart-notification", {
          detail: { message: `Failed to update cart`, type: "error" },
        })
      );
    }
  };

  // ✅ Fetch products for active category
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setCategoriesLoading(true);
        const url = `${API_BASE}/fetch_by_category.php?category=${encodeURIComponent(
          activeTab
        )}`;
        const res = await fetch(url, { cache: "no-store" });
        const data = await res.json();

        if (Array.isArray(data)) {
          console.log("Fetched category products:", data);
          const processed = data.map((p) => ({
            ...p,
            
            image_url: buildFullImageUrl(p.image_url),
            price_200_500: p.price_200_500 || p.price || "0.00",
            rating: p.rating || 4,
            reviews: p.reviews || Math.floor(Math.random() * 80) + 20,
          }));
          setProducts(processed);
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.error("Error fetching category products:", err);
        setProducts([]);
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchProducts();
  }, [activeTab]);

  return (
    <div>
      {/* Hero Section */}
      <div className="relative w-full h-[40vh] md:h-screen bg-center bg-cover flex items-center justify-center">
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: `url('/Home.jpg')` }}
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold mb-4">
            ZENVORY TRADERS
          </h1>
          <p className="text-xl sm:text-2xl text-gray-200">
            Global Trade Excellence
          </p>
        </div>
      </div>

      <FeaturedProducts />

      {/* Categories */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-6">
            BROWSE FEATURED CATEGORIES
          </h2>

          {/* Tabs */}
          <div className="flex items-center justify-center gap-8 text-gray-600 mb-8">
            {[
              "Health and Household",
              "Grocery and Gourmet Food",
              "Automotive",
            ].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`uppercase text-sm tracking-wide ${
                  activeTab === tab
                    ? "border-b-2 border-[#367588] pb-1 text-[#367588]"
                    : "text-gray-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Products */}
          {categoriesLoading ? (
            <div className="text-center py-10 text-gray-600">
              Loading products...
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              No products found for this category.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {/* {console.log(products)} */}
              {products.slice(0, 5).map((product, idx) => (
                <div
                  key={product.sku || idx}
                  className="group relative flex flex-col items-center text-center border border-gray-200 rounded-2xl p-3 sm:p-4 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 bg-white h-auto md:h-[400px] w-full"
                >
                  <div
                    className="relative w-full h-36 md:h-48 flex items-center justify-center mb-5 overflow-hidden cursor-pointer"
                    onClick={() => handleProductClick(product.sku)}
                  >
                    <img
                      src={product.image_url}
                      alt={product.name || "Product"}
                      className="max-w-full h-auto max-h-28 md:max-h-40 object-contain transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => (e.target.src = "/placeholder.png")}
                    />
                  </div>

                  <h3
                    className="text-base font-semibold mb-2 text-gray-800 line-clamp-2 hover:text-[#367588] cursor-pointer"
                    onClick={() => handleProductClick(product.sku)}
                  >
                    {product.name || "Product Name"}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">
                    SKU: {product.sku || "—"}
                  </p>

                  <div className="flex items-center justify-center gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={`text-yellow-400 ${
                          i < product.rating ? "opacity-100" : "opacity-30"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                    <span className="text-sm text-gray-500 ml-1">
                      ({product.reviews})
                    </span>
                  </div>

                  <p className="text-lg font-semibold text-gray-800 mb-3">
                    ${product.price_200_500}
                  </p>

                  <div className="flex items-center gap-2 mt-auto">
                    <input
                      type="number"
                      min="1"
                      value={quantities[product.sku] || 1}
                      onChange={(e) =>
                        handleQuantityChange(product.sku, e.target.value)
                      }
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

      <Reviews />
    </div>
  );
};

export default Home;
