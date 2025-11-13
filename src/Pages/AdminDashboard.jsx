import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
    const [admin, setAdmin] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const adminToken = localStorage.getItem('admin_token');
        if (!adminToken) {
            navigate('/ap-admin');
            return;
        }
        try {
            const adminData = JSON.parse(adminToken);
            setAdmin(adminData);
        } catch (err) {
            console.error('Error parsing admin data:', err);
            navigate('/ap-admin');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('admin_token');
        navigate('/ap-admin');
    };

    if (!admin) return null;

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Top Navigation */}
            <nav className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <img
                                className="h-8 w-auto"
                                src="/logo.jpg"
                                alt="Mejistify Traders Admin"
                            />
                            <span className="ml-4 text-lg font-semibold text-gray-900">
                                Admin Dashboard
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-gray-600">Welcome, {admin.name}</span>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Secondary Navigation */}
            <div className="bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-start h-12 space-x-6">
                        <a href="/ap-admin/dashboard" 
                           className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                            Dashboard
                        </a>
                        <a href="/ap-admin/products" 
                           className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                            Products
                        </a>
                        <a href="/ap-admin/categories" 
                           className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                            Categories
                        </a>
                    </div>
                </div>
            </div>

            {/* Dashboard Content */}
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {/* Stats Overview */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">
                                            Total Orders
                                        </dt>
                                        <dd className="text-lg font-medium text-gray-900">
                                            0
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">
                                            Total Revenue
                                        </dt>
                                        <dd className="text-lg font-medium text-gray-900">
                                            $0.00
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                    </svg>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">
                                            Products
                                        </dt>
                                        <dd className="text-lg font-medium text-gray-900">
                                            0
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 bg-red-500 rounded-md p-3">
                                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">
                                            Customers
                                        </dt>
                                        <dd className="text-lg font-medium text-gray-900">
                                            0
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-8">
                    <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        <button 
                            onClick={() => navigate('/ap-admin/products')}
                            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-left"
                        >
                            <h3 className="text-gray-900 font-medium">Manage Products</h3>
                            <p className="mt-2 text-sm text-gray-500">Add, edit, or remove products from inventory</p>
                        </button>

                        <button className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-left">
                            <h3 className="text-gray-900 font-medium">View Orders</h3>
                            <p className="mt-2 text-sm text-gray-500">Manage and process customer orders</p>
                        </button>

                        <button 
                            onClick={() => navigate('/ap-admin/categories')}
                            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-left"
                        >
                            <h3 className="text-gray-900 font-medium">Manage Categories</h3>
                            <p className="mt-2 text-sm text-gray-500">Add or edit product categories</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}