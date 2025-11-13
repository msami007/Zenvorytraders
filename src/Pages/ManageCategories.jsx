import React, { useState, useEffect } from 'react';

export default function ManageCategories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const initialForm = {
        id: null,
        name: ''
    };
    const [formData, setFormData] = useState(initialForm);

    // Fetch categories on mount
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch('https://mejistify.com/api/fetch_all_categories_admin.php');
            const data = await response.json();
            if (Array.isArray(data)) {
                setCategories(data);
            } else {
                setCategories([]);
                setError('No categories found');
            }
        } catch (err) {
            setError('Failed to fetch categories');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const endpoint = formData.id 
                ? 'https://mejistify.com/api/update_category.php'
                : 'https://mejistify.com/api/add_category.php';

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (data.success) {
                setShowAddModal(false);
                fetchCategories(); // Refresh list
                setFormData(initialForm);
            } else {
                setError(data.error || 'Failed to save category');
            }
        } catch (err) {
            setError('Network error while saving category');
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this category? This cannot be undone if the category is not in use.')) return;

        try {
            const response = await fetch('https://mejistify.com/api/delete_category.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id })
            });

            const data = await response.json();
            if (data.success) {
                fetchCategories(); // Refresh list
            } else {
                setError(data.error || 'Failed to delete category');
            }
        } catch (err) {
            setError('Network error while deleting category');
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">Manage Categories</h1>
                        <p className="mt-1 text-sm text-gray-600">Add, edit, or remove product categories</p>
                    </div>
                    <button
                        onClick={() => { setFormData(initialForm); setShowAddModal(true); }}
                        className="bg-[#0b3d91] text-white px-4 py-2 rounded-md hover:bg-gray-800"
                    >
                        Add New Category
                    </button>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
                        {error}
                    </div>
                )}

                {/* Categories Table */}
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {loading ? (
                                <tr>
                                    <td colSpan="3" className="px-6 py-4 text-center">Loading...</td>
                                </tr>
                            ) : categories.length === 0 ? (
                                <tr>
                                    <td colSpan="3" className="px-6 py-4 text-center">No categories found</td>
                                </tr>
                            ) : (
                                categories.map((category) => (
                                    <tr key={category.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {category.name}
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button
                                                onClick={() => handleDelete(category.id)}
                                                className="text-red-600 hover:text-red-900 mr-4"
                                            >
                                                Delete
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setFormData({
                                                        id: category.id,
                                                        name: category.name || '',
                                                        description: category.description || ''
                                                    });
                                                    setShowAddModal(true);
                                                }}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add/Edit Category Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium">
                                {formData.id ? 'Edit Category' : 'Add New Category'}
                            </h3>
                            <button
                                onClick={() => { setShowAddModal(false); setFormData(initialForm); }}
                                className="text-gray-400 hover:text-gray-500"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0b3d91] focus:ring-[#0b3d91] sm:text-sm"
                                    required
                                />
                            </div>

                            <div className="flex justify-end gap-4 mt-5">
                                <button
                                    type="button"
                                    onClick={() => { setShowAddModal(false); setFormData(initialForm); }}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm font-medium text-white bg-[#0b3d91] hover:bg-gray-800 rounded-md"
                                >
                                    {formData.id ? 'Update Category' : 'Add Category'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}