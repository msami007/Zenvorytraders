import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "https://zenvorytradersllc.com/api";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingItems, setUpdatingItems] = useState(new Set());

  const userId = localStorage.getItem("user_id");
  const navigate = useNavigate();

  const loadCart = () => {
    try {
      setLoading(true);
      const raw = localStorage.getItem('local_cart');
      let items = [];
      try {
        items = JSON.parse(raw || '[]');
        if (!Array.isArray(items)) items = [];
      } catch (e) {
        items = [];
      }

      const normalized = items.map((it, idx) => ({
        cart_id: `local-${it.sku || idx}`,  // Always use local- prefix
        sku: it.sku,
        name: it.name,
        price: Number(it.price) || 0,
        quantity: Number(it.quantity) || 1,
        image_url: it.image || it.image_url || '',
        isLocal: true,
      }));
      setCartItems(normalized);
      setError("");
    } catch (err) {
      console.error('Error reading local cart', err);
      setCartItems([]);
      setError('Failed to load local cart');
    } finally {
      setLoading(false);
    }
  };

  // Load cart on mount and when storage changes
  useEffect(() => {
    loadCart();
    const handleStorageChange = (e) => {
      if (e.key === 'local_cart') {
        loadCart();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch(`${API_BASE}/fetch_cart.php?user_id=${userId}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch cart data: ${response.status}`);
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        setCartItems(data);
      } else {
        console.warn("Cart data is not an array:", data);
        setCartItems([]);
        if (data.error) {
          setError(data.error);
        }
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      setError("Failed to load cart items");
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (cart_id, newQuantity) => {
    if (newQuantity < 1) return;
    // if logged in, call server; otherwise update local cart in localStorage
    if (userId) {
      try {
        setUpdatingItems(prev => new Set(prev).add(cart_id));

        const response = await fetch(`${API_BASE}/update_cart.php`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userId,
            cart_id: cart_id,
            quantity: newQuantity
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to update quantity");
        }

        const result = await response.json();

        if (result.success) {
          setCartItems(prevItems =>
            prevItems.map(item =>
              item.cart_id === cart_id ? { ...item, quantity: newQuantity } : item
            )
          );
        } else {
          throw new Error(result.error || "Failed to update quantity");
        }
      } catch (error) {
        console.error("Error updating quantity:", error);
        setError("Failed to update quantity");
        // Refresh cart to sync with server
        fetchCart();
      } finally {
        setUpdatingItems(prev => {
          const newSet = new Set(prev);
          newSet.delete(cart_id);
          return newSet;
        });
      }
    } else {
      // local cart update
      try {
        const raw = localStorage.getItem('local_cart');
        const cart = Array.isArray(JSON.parse(raw || '[]')) ? JSON.parse(raw || '[]') : [];
        const idx = cart.findIndex(i => (i.cart_id && i.cart_id === cart_id) || i.sku === cart_id || (`local-${i.sku}`) === cart_id);
        if (idx !== -1) {
          cart[idx].quantity = newQuantity;
          localStorage.setItem('local_cart', JSON.stringify(cart));
          setCartItems(prev => prev.map(item => (item.cart_id === cart_id ? { ...item, quantity: newQuantity } : item)));
          window.dispatchEvent(new CustomEvent('cart-notification', { 
            detail: { 
              message: `Updated quantity of ${cart[idx].name}`, 
              type: 'success' 
            } 
          }));
        }
      } catch (err) {
        console.error('Error updating local cart', err);
        setError('Failed to update cart');
      }
    }
  };

  const removeItem = async (cart_id) => {
    if (userId) {
      try {
        setUpdatingItems(prev => new Set(prev).add(cart_id));

        const response = await fetch(`${API_BASE}/remove_from_cart.php`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userId,
            cart_id: cart_id
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to remove item");
        }

        const result = await response.json();

        if (result.success) {
          setCartItems(prevItems => prevItems.filter(item => item.cart_id !== cart_id));
        } else {
          throw new Error(result.error || "Failed to remove item");
        }
      } catch (error) {
        console.error("Error removing item:", error);
        setError("Failed to remove item");
        fetchCart();
      } finally {
        setUpdatingItems(prev => {
          const newSet = new Set(prev);
          newSet.delete(cart_id);
          return newSet;
        });
      }
    } else {
      // remove from local cart
      try {
        const raw = localStorage.getItem('local_cart');
        if (!raw) {
          throw new Error('Cart not found');
        }

        let cart = JSON.parse(raw);
        if (!Array.isArray(cart)) cart = [];

        // Find the item to remove by matching against its SKU
        const originalItem = cartItems.find(item => item.cart_id === cart_id);
        if (!originalItem) {
          throw new Error('Item not found in cart view');
        }

        const itemIdx = cart.findIndex(i => i.sku === originalItem.sku);
        if (itemIdx === -1) {
          throw new Error('Item not found in local cart');
        }

        const itemToRemove = cart[itemIdx];
        
        // Remove the item
        cart.splice(itemIdx, 1);
        localStorage.setItem('local_cart', JSON.stringify(cart));
        
        // Update UI
        setCartItems(prev => prev.filter(item => item.sku !== originalItem.sku));

        // Show notification
        window.dispatchEvent(new CustomEvent('cart-notification', {
          detail: {
            message: `Removed ${itemToRemove.name} from cart`,
            type: 'success'
          }
        }));
      } catch (err) {
        console.error('Error removing from local cart', err);
        setError('Failed to remove item');
      }
    }
  };

  const handleQuantityChange = (cart_id, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(cart_id, newQuantity);
  };

  const handleIncrement = (cart_id, currentQuantity) => {
    handleQuantityChange(cart_id, currentQuantity + 1);
  };

  const handleDecrement = (cart_id, currentQuantity) => {
    if (currentQuantity > 1) {
      handleQuantityChange(cart_id, currentQuantity - 1);
    }
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + (Number(item.price) || 0) * (Number(item.quantity) || 0),
    0
  );

  const totalItems = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-600 text-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          Loading your cart...
        </div>
      </div>
    );
  }

  if (!userId) {
    // when not logged in we still show the local cart (handled in effect)
    // fallthrough to render below
  }

  if (error && cartItems.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">{error}</p>
          <button 
            onClick={fetchCart}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-600 text-lg">
        Your cart is empty.
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Your Shopping Cart</h1>
        <p className="text-gray-600 mb-6">{totalItems} {totalItems === 1 ? 'item' : 'items'} in cart</p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
            <button 
              onClick={() => setError("")}
              className="float-right font-bold"
            >
              ×
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.cart_id}
                className="flex flex-col md:flex-row items-center justify-between bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition border"
              >
                <div className="flex items-center space-x-4 flex-1">
                  <img
                    src={item.image_url && item.image_url.startsWith('http') ? item.image_url : `https://zenvorytradersllc.com${item.image_url}`}
                    alt={item.name}
                    className="w-20 h-20 md:w-24 md:h-24 object-contain rounded-md border"
                    onError={(e) => {
                      e.target.src = 'https://zenvorytradersllc.com/images/products/placeholder.png';
                    }}
                  />
                  <div className="flex-1">
                    <h2 className="font-medium text-lg text-gray-800">{item.name}</h2>
                    <p className="text-gray-500 text-sm">SKU: {item.sku}</p>
                    <p className="text-gray-700 font-semibold mt-1">${item.price.toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 mt-4 md:mt-0">
                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleDecrement(item.cart_id, item.quantity)}
                      disabled={updatingItems.has(item.cart_id) || item.quantity <= 1}
                      className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      −
                    </button>
                    
                    <div className="relative">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.cart_id, Number(e.target.value))}
                        disabled={updatingItems.has(item.cart_id)}
                        className="border border-gray-300 rounded-md w-16 text-center p-2 disabled:opacity-50"
                      />
                      {updatingItems.has(item.cart_id) && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => handleIncrement(item.cart_id, item.quantity)}
                      disabled={updatingItems.has(item.cart_id)}
                      className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right min-w-20">
                    <p className="text-gray-800 font-medium text-lg">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  <button
                    onClick={() => removeItem(item.cart_id)}
                    disabled={updatingItems.has(item.cart_id)}
                    className="text-red-600 hover:text-red-800 p-2 disabled:opacity-50"
                    title="Remove item"
                  >
                    {updatingItems.has(item.cart_id) ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-sm border sticky top-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-semibold text-gray-800">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button 
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={cartItems.length === 0 || updatingItems.size > 0}
                onClick={() => {
                  // prefer full user object if present, fallback to user_id
                  const user = localStorage.getItem('user');
                  const uid = user ? JSON.parse(user).id || JSON.parse(user).user_id || null : (localStorage.getItem('user_id') || null);
                  if (!user && !uid) {
                    // notify and redirect to login; preserve intended page in query
                    window.dispatchEvent(new CustomEvent('cart-notification', { detail: { message: 'Please log in to proceed to checkout', type: 'error' } }));
                    navigate(`/login?redirect=${encodeURIComponent('/checkout')}`);
                    return;
                  }
                  // user logged in -> proceed to checkout
                  navigate('/checkout');
                }}
              >
                {updatingItems.size > 0 ? 'Updating...' : 'Proceed to Checkout'}
              </button>

              <p className="text-xs text-gray-500 text-center mt-3">
                You won't be charged until the next step
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;