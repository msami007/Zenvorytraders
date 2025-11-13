import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_BASE = "https://mejistify.com/api";

const buildFullImageUrl = (img) => {
  if (!img) return "/placeholder.png";
  return img.startsWith("http") ? img : `${API_BASE.replace("/api", "")}/${img}`;
};

const ProductDetails = () => {
  const { sku } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("description");

  const userId = localStorage.getItem("user_id");

  const fetchProduct = async (skuParam) => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/fetch_product_by_sku.php?sku=${encodeURIComponent(skuParam)}`, {
        cache: "no-store",
      });

      // Inspect content-type to avoid crashing on non-JSON responses
      const contentType = res.headers.get('content-type') || '';
      let data = null;
      if (contentType.includes('application/json')) {
        try {
          data = await res.json();
        } catch (err) {
          console.error('Failed to parse JSON from product endpoint:', err);
          const text = await res.text();
          console.error('Response text:', text);
        }
      } else {
        // If not JSON, capture text for debugging
        const text = await res.text();
        console.error('Non-JSON response from product endpoint:', text);
      }

      // Normalize possible response shapes:
      // - { sku: ... }
      // - { product: { ... } }
      // - [ { ... } ]
      let productData = null;
      if (Array.isArray(data)) {
        productData = data[0];
      } else if (data && data.product) {
        productData = data.product;
      } else {
        productData = data;
      }

      if (productData && (productData.sku || productData.id)) {
        setProduct(productData);
        setMainImage(buildFullImageUrl(productData.image_main || productData.image_url || (productData.images && productData.images[0])));
      } else {
        setProduct(null);
      }
    } catch (err) {
      console.error("Error fetching product:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // scroll to top whenever product page opens or SKU changes
    try {
      window.scrollTo({ top: 0, behavior: 'auto' });
    } catch (e) {
      // older browsers fallback
      window.scrollTo(0, 0);
    }

    if (sku) fetchProduct(sku);
  }, [sku]);

  const handleAddToCart = async () => {
    try {
      const key = 'local_cart';
      const raw = localStorage.getItem(key);
      const cart = Array.isArray(JSON.parse(raw || '[]')) ? JSON.parse(raw || '[]') : [];
      const price = product.price_200_500 || product.price || 0;
      const img = buildFullImageUrl(product.image_main || product.image_url);
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate("/")}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const allImages = [
    product.image_main,
    product.image_1,
    product.image_2,
    product.image_3,
    product.image_4,
    product.image_url
  ].filter(Boolean).filter((img, index, self) => self.indexOf(img) === index);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <button 
                onClick={() => navigate("/")}
                className="text-gray-500 hover:text-gray-700 transition"
              >
                Home
              </button>
            </li>
            <li className="flex items-center">
              <span className="text-gray-400 mx-2">›</span>
              <span className="text-gray-500">Products</span>
            </li>
            <li className="flex items-center">
              <span className="text-gray-400 mx-2">›</span>
              <span className="text-gray-900 font-medium truncate max-w-32">{product.name}</span>
            </li>
          </ol>
        </nav>

        {/* Main Product Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-8">
            {/* Image Gallery */}
            <div className="space-y-6">
              {/* Main Image */}
              <div className="bg-gray-100 rounded-2xl p-8 flex items-center justify-center h-96">
                <img
                  src={mainImage}
                  alt={product.name}
                  className="max-h-80 object-contain transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Thumbnail Gallery */}
              {allImages.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {allImages.map((img, idx) => (
                    <img
                      key={idx}
                      src={buildFullImageUrl(img)}
                      alt={`${product.name} view ${idx + 1}`}
                      onClick={() => setMainImage(buildFullImageUrl(img))}
                      className={`w-20 h-20 object-cover rounded-xl cursor-pointer border-2 transition-all duration-200 hover:border-orange-400 ${
                        mainImage === buildFullImageUrl(img)
                          ? "border-orange-500 shadow-md"
                          : "border-gray-200"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2 leading-tight">
                  {product.name}
                </h1>
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                    In Stock
                  </span>
                  <span className="text-gray-500 text-sm">SKU: {product.sku}</span>
                </div>
              </div>

              {/* Pricing */}
              <div className="space-y-3">
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl font-bold text-[#000000]">
                    ${product.price_200_500}
                  </span>
                  <span className="text-gray-500 text-lg">per unit</span>
                </div>
                <p className="text-gray-600">200–500 units (5% discount applied)</p>
              </div>

              {/* Discount Tiers */}
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-100">
                <h3 className="font-semibold text-gray-900 mb-3">Bulk Pricing Tiers</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-white rounded-lg p-4 text-center border">
                    <div className="text-sm text-gray-600">200-500 Units</div>
                    <div className="text-xl font-bold text-[#000000]">${product.price_200_500}</div>
                    <div className="text-green-600 text-sm">5% OFF</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center border">
                    <div className="text-sm text-gray-600">501+ Units</div>
                    <div className="text-xl font-bold text-[#000000]">${product.price_500plus}</div>
                    <div className="text-green-600 text-sm">10% OFF</div>
                  </div>
                </div>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-4">
                  <label className="text-gray-700 font-semibold text-lg">Quantity:</label>
                  <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-3 bg-gray-100 hover:bg-gray-200 transition"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-20 text-center py-3 border-0 focus:ring-0 focus:outline-none text-lg"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-3 bg-gray-100 hover:bg-gray-200 transition"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:from-orange-600 hover:to-amber-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    🛒 Add to Cart
                  </button>
                </div>

                {message && (
                  <div className={`p-4 rounded-xl text-center font-semibold ${
                    message.includes("✅") 
                      ? "bg-green-100 text-green-800 border border-green-200" 
                      : "bg-red-100 text-red-800 border border-red-200"
                  }`}>
                    {message}
                  </div>
                )}
              </div>

              {/* Quick Features */}
              <div className="grid grid-cols-2 gap-4 pt-6">
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="text-2xl">🚚</span>
                  <span className="text-sm">Free Shipping</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="text-2xl">🔒</span>
                  <span className="text-sm">Secure Payment</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="text-2xl">↩️</span>
                  <span className="text-sm">30-Day Return</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="text-2xl">📞</span>
                  <span className="text-sm">24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Tab Headers */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-8">
              {[
                { id: "description", label: "Product Description" },
                { id: "specifications", label: "Specifications" },
                { id: "shipping", label: "Shipping Info" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 font-medium text-lg border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? "border-orange-500 text-orange-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === "description" && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900">About This Product</h3>
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                  {/* Prefer server-provided description fields. Fall back to a friendly message. */}
                  {product.description || product.long_description ? (
                    <div
                      dangerouslySetInnerHTML={{ __html: product.description || product.long_description }}
                    />
                  ) : (
                    <p className="text-lg text-gray-700">No product description available.</p>
                  )}

                  {/* If backend provides a features/bullets array, render it. Otherwise skip. */}
                  {Array.isArray(product.features) && product.features.length > 0 ? (
                    <ul className="list-disc pl-6 space-y-2">
                      {product.features.map((f, idx) => (
                        <li key={idx}>{f}</li>
                      ))}
                    </ul>
                  ) : product.bullets && Array.isArray(product.bullets) && product.bullets.length > 0 ? (
                    <ul className="list-disc pl-6 space-y-2">
                      {product.bullets.map((b, idx) => (
                        <li key={idx}>{b}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>
            )}

            {activeTab === "specifications" && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900">Technical Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Basic Info</h4>
                    <dl className="space-y-3">
                      <div>
                        <dt className="text-sm text-gray-500">Brand</dt>
                        <dd className="font-medium">{product.brand || "N/A"}</dd>
                      </div>
                      <div>
                        <dt className="text-sm text-gray-500">Item Weight</dt>
                        <dd className="font-medium">{product.item_weight || "N/A"}</dd>
                      </div>
                      <div>
                        <dt className="text-sm text-gray-500">Dimensions</dt>
                        <dd className="font-medium">{product.dimensions || "N/A"}</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Part Numbers</h4>
                    <dl className="space-y-3">
                      <div>
                        <dt className="text-sm text-gray-500">Manufacturer Part #</dt>
                        <dd className="font-medium">{product.manufacturer_part || "N/A"}</dd>
                      </div>
                      <div>
                        <dt className="text-sm text-gray-500">OEM Part #</dt>
                        <dd className="font-medium">{product.oem_part || "N/A"}</dd>
                      </div>
                      <div>
                        <dt className="text-sm text-gray-500">SKU</dt>
                        <dd className="font-medium">{product.sku}</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Additional Info</h4>
                    <dl className="space-y-3">
                      <div>
                        <dt className="text-sm text-gray-500">Date Available</dt>
                        <dd className="font-medium">{product.date_available || "N/A"}</dd>
                      </div>
                      <div>
                        <dt className="text-sm text-gray-500">Category</dt>
                        <dd className="font-medium">{product.category || "N/A"}</dd>
                      </div>
                      <div>
                        <dt className="text-sm text-gray-500">Warranty</dt>
                        <dd className="font-medium">1 Year Limited</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "shipping" && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900">Shipping & Returns</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg text-gray-900">Shipping Information</h4>
                    <div className="prose text-gray-700">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Standard shipping: 3-5 business days</li>
                        <li>Express shipping: 1-2 business days</li>
                        <li>Free shipping on orders over $500</li>
                        <li>International shipping available</li>
                      </ul>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg text-gray-900">Return Policy</h4>
                    <div className="prose text-gray-700">
                      <p>
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>30-day money-back guarantee</li>
                        <li>Free returns for defective items</li>
                        <li>Original packaging required</li>
                        <li>Contact support for return authorization</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;