import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Search,
    User,
    Heart,
    Shuffle,
    ShoppingBag,
    Menu,
    X,
    LogOut,
    List
} from "lucide-react";

export default function Navbar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
    const [toasts, setToasts] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);
    const navigate = useNavigate();

    // ✅ Fetch categories + check login
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch("https://zenvorytradersllc.com/api/fetch_all_categories.php");
                const data = await res.json();
                if (Array.isArray(data)) setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();

        // ✅ Check login from localStorage
        const user = localStorage.getItem("user");
        if (user) {
            const parsedUser = JSON.parse(user);
            setUserName(parsedUser.full_name || parsedUser.name || "User");
            setIsLoggedIn(true);
        }
    }, []);

    // ✅ Re-check login state if changed in other components
    useEffect(() => {
        const handleStorageChange = () => {
            const user = localStorage.getItem("user");
            if (user) {
                const parsedUser = JSON.parse(user);
                setUserName(parsedUser.full_name || parsedUser.name || "User");
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }

            // Also update cart data when storage changes
            const cartData = localStorage.getItem('local_cart');
            if (cartData) {
                try {
                    const cart = JSON.parse(cartData);
                    const itemCount = cart.reduce((sum, item) => sum + (parseInt(item.quantity) || 0), 0);
                    const total = cart.reduce((sum, item) => sum + ((parseFloat(item.price) || 0) * (parseInt(item.quantity) || 0)), 0);
                    setCartCount(itemCount);
                    setCartTotal(total);
                } catch (err) {
                    console.error('Error parsing cart:', err);
                }
            } else {
                setCartCount(0);
                setCartTotal(0);
            }
        };

        // Initial load
        handleStorageChange();
        
        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    // Listen for global cart notifications to show toast in top-right
    useEffect(() => {
        const handler = (e) => {
            const { message = "", type = "success" } = e?.detail || {};
            const id = Date.now() + Math.random();
            setToasts((t) => [...t, { id, message, type }]);
            setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500);
            
            // Update cart count and total whenever cart is modified
            const cartData = localStorage.getItem('local_cart');
            if (cartData) {
                const cart = JSON.parse(cartData);
                setCartCount(cart.reduce((sum, item) => sum + (item.quantity || 0), 0));
                setCartTotal(cart.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 0)), 0));
            } else {
                setCartCount(0);
                setCartTotal(0);
            }
        };
        window.addEventListener("cart-notification", handler);
        return () => window.removeEventListener("cart-notification", handler);
    }, []);

    const handleCategoryClick = (category) => {
        setDropdownOpen(false);
        navigate(`/category/${encodeURIComponent(category)}`);
    };

    // ✅ Logout handler
    const handleLogout = () => {
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        setProfileOpen(false);
        navigate("/login");
    };

    return (
        <header className="w-full bg-white text-[#0b3d91] shadow-md">
            {/* Top Section - 3 Column Grid Layout */}
            <div className="grid grid-cols-3 items-center px-4 md:px-6 py-3 max-w-7xl mx-auto">
                {/* Left Section - Search */}
                <div className="flex items-center justify-start">
                    {/* Desktop search */}
                    <div className="hidden md:flex relative w-full max-w-xs">
                        <input
                            type="text"
                            placeholder="Search products"
                            className="w-full rounded-full py-2 px-3 pr-10 text-[#0b3d91] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0b3d91]"
                        />
                        <Search className="absolute right-3 top-2.5 text-gray-500" size={18} />
                    </div>

                    {/* Mobile - Hamburger */}
                    <button
                        onClick={() => setMobileMenuOpen(true)}
                        className="md:hidden p-2 rounded-md text-[#0b3d91] hover:bg-gray-100"
                        aria-label="Open menu"
                    >
                        <Menu size={22} />
                    </button>
                </div>

                {/* Center Section - Logo */}
                <div className="flex justify-center">
                    <a href="/">
                        <img
                            src="/logo.jpg"
                            alt="Logo"
                            className="h-12 md:h-16 w-auto object-contain"
                        />
                    </a>
                </div>

                {/* Right Section - Icons */}
                <div className="flex items-center justify-end gap-2">
                    {/* Mobile Search Icon */}
                    <button
                        onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                        className="md:hidden p-2 rounded-md text-[#0b3d91] hover:bg-gray-100"
                        aria-label="Toggle search"
                    >
                        <Search size={20} />
                    </button>

                    {/* Mobile Cart */}
                    <button
                        onClick={() => navigate('/cart')}
                        className="md:hidden relative p-2 rounded-md text-[#0b3d91] hover:bg-gray-100"
                        aria-label="Open cart"
                    >
                        <ShoppingBag size={20} />
                        {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 text-[10px] bg-[#0b3d91] text-white font-bold rounded-full w-4 h-4 flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </button>

                    {/* Desktop Icons */}
                    <div className="hidden md:flex items-center gap-3">
                        {/* User / Profile Section */}
                        {!isLoggedIn ? (
                            <>
                                <button
                                    onClick={() => navigate("/login")}
                                    className="flex items-center space-x-2 bg-[#0b3d91] text-white px-3 py-2 rounded-full hover:bg-gray-200 hover:text-[#0b3d91] transition"
                                >
                                    <User size={18} />
                                    <span className="text-sm font-medium">Login</span>
                                </button>
                                <button
                                    onClick={() => navigate("/signup")}
                                    className="flex items-center space-x-2 bg-[#0b3d91] text-white px-3 py-2 rounded-full hover:bg-gray-200 hover:text-[#0b3d91] transition"
                                >
                                    <User size={18} />
                                    <span className="text-sm font-medium">Register</span>
                                </button>
                            </>
                        ) : (
                            <div className="relative">
                                <button
                                    onClick={() => setProfileOpen(!profileOpen)}
                                    className="flex items-center space-x-2 bg-[#0b3d91] text-white px-3 py-2 rounded-full hover:bg-gray-200 hover:text-[#0b3d91] transition"
                                >
                                    <User size={18} />
                                    <span className="text-sm font-medium">{userName}</span>
                                </button>

                                {profileOpen && (
                                    <ul className="absolute right-0 mt-2 w-56 bg-white text-[#0b3d91] rounded-lg shadow-lg overflow-hidden z-50">
                                        <li
                                            onClick={() => {
                                                navigate("/profile");
                                                setProfileOpen(false);
                                            }}
                                            className="px-4 py-2 hover:bg-orange-100 cursor-pointer flex items-center gap-2"
                                        >
                                            <User size={18} /> Profile
                                        </li>
                                        <li
                                            onClick={() => {
                                                navigate("/orders");
                                                setProfileOpen(false);
                                            }}
                                            className="px-4 py-2 hover:bg-orange-100 cursor-pointer flex items-center gap-2"
                                        >
                                            <List size={18} /> Order History
                                        </li>
                                        <li
                                            onClick={handleLogout}
                                            className="px-4 py-2 hover:bg-red-100 cursor-pointer text-red-600 flex items-center gap-2"
                                        >
                                            <LogOut size={18} /> Logout
                                        </li>
                                    </ul>
                                )}
                            </div>
                        )}

                        {/* Cart */}
                        <button
                            onClick={() => navigate("/cart")}
                            className="relative flex items-center bg-[#0b3d91] text-white rounded-full px-3 py-2 hover:bg-gray-200 hover:text-[#0b3d91] transition"
                        >
                            <ShoppingBag size={18} />
                            <span className="ml-2 text-sm font-medium">${cartTotal.toFixed(2)}</span>
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 text-xs bg-white text-[#0b3d91] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile search input */}
            {mobileSearchOpen && (
                <div className="md:hidden px-4 pb-3">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search for products"
                            className="w-full rounded-full py-2 px-3 pr-12 text-[#0b3d91] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0b3d91]"
                        />
                        <Search className="absolute right-3 top-2.5 text-gray-500" size={18} />
                    </div>
                </div>
            )}

            {/* Bottom Menu */}
            <nav className="bg-[#0b3d91] border-t border-white/10">
                <ul className="hidden md:flex items-center justify-center space-x-10 px-6 py-4 text-lg font-semibold text-white max-w-7xl mx-auto">
                    {/* Browse Categories */}
                    <li className="relative">
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="flex items-center space-x-2 hover:text-orange-400 transition text-white"
                        >
                            <Menu size={18} />
                            <span>Browse Categories</span>
                            <span className="ml-1">▾</span>
                        </button>

                        {dropdownOpen && (
                            <ul className="absolute left-0 mt-2 w-64 bg-white text-[#0b3d91] rounded-lg shadow-lg overflow-hidden z-50">
                                {loading ? (
                                    <li className="px-4 py-2 text-gray-500">Loading...</li>
                                ) : categories.length > 0 ? (
                                    categories.map((cat, index) => (
                                        <li
                                            key={index}
                                            onClick={() => handleCategoryClick(cat)}
                                            className="px-4 py-2 hover:bg-orange-100 cursor-pointer"
                                        >
                                            {cat}
                                        </li>
                                    ))
                                ) : (
                                    <li className="px-4 py-2 text-gray-500">No categories found</li>
                                )}
                            </ul>
                        )}
                    </li>

                    {/* Navigation Links */}
                    <li><Link to="/" className="hover:text-orange-400">Home</Link></li>
                    <li><Link to="/shop" className="hover:text-orange-400">Shop</Link></li>
                    <li><Link to="/catalogue" className="hover:text-orange-400">Catalogue</Link></li>
                    <li><Link to="/contactus" className="hover:text-orange-400">Contact Us</Link></li>
                    <li><Link to="/aboutus" className="hover:text-orange-400">About Us</Link></li>
                </ul>
            </nav>

            {/* Mobile menu drawer */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-50 flex">
                    <div className="fixed inset-0 bg-black/40" onClick={() => setMobileMenuOpen(false)} />
                    <aside className="relative w-72 bg-white h-full shadow-lg p-4 overflow-auto">
                        <button
                            onClick={() => setMobileMenuOpen(false)}
                            className="absolute top-3 right-3 p-1 rounded hover:bg-gray-100"
                            aria-label="Close menu"
                        >
                            <X size={18} />
                        </button>

                        <div className="mt-6">
                            <nav className="flex flex-col gap-3">
                                <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium">Home</Link>
                                <Link to="/shop" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium">Shop</Link>
                                <Link to="/catalogue" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium">Catalogue</Link>
                                <Link to="/contactus" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium">Contact Us</Link>
                                <Link to="/aboutus" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium">About Us</Link>
                            </nav>

                            {/* Mobile auth/cart actions */}
                            <div className="mt-4 flex items-center gap-3">
                                {!isLoggedIn ? (
                                    <>
                                        <button onClick={() => { navigate('/login'); setMobileMenuOpen(false); }} className="flex-1 px-3 py-2 bg-[#0b3d91] text-white rounded">Login</button>
                                        <button onClick={() => { navigate('/signup'); setMobileMenuOpen(false); }} className="flex-1 px-3 py-2 bg-[#f9b233] text-[#0b3d91] rounded">Register</button>
                                    </>
                                ) : (
                                    <button onClick={() => { navigate('/profile'); setMobileMenuOpen(false); }} className="flex-1 px-3 py-2 bg-[#0b3d91] text-white rounded">Account</button>
                                )}
                            </div>

                            <div className="mt-6">
                                <h4 className="text-sm font-semibold text-gray-600 mb-2">Categories</h4>
                                <div className="flex flex-col">
                                    {loading ? (
                                        <span className="text-sm text-gray-500">Loading...</span>
                                    ) : categories.length > 0 ? (
                                        categories.map((cat, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => { handleCategoryClick(cat); setMobileMenuOpen(false); }}
                                                className="text-left py-2 hover:bg-gray-50 rounded px-2"
                                            >
                                                {cat}
                                            </button>
                                        ))
                                    ) : (
                                        <span className="text-sm text-gray-500">No categories found</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            )}

            {/* Toast container (top-right) */}
            <div className="fixed top-4 right-4 z-[60] flex flex-col items-end gap-2">
                {toasts.map((t) => (
                    <div key={t.id} className={`min-w-[220px] max-w-sm px-4 py-2 rounded-lg shadow-lg text-sm font-medium transform transition-all duration-200 ${t.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                        {t.message}
                    </div>
                ))}
            </div>
        </header>
    );
}