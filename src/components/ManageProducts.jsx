"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux"
import { logout } from "../slices/authSlice"
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { MoonLoader } from 'react-spinners'

const ManageProducts = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState();
    const [editProduct, setEditProduct] = useState(null);
    const [selectedFiles, setSelectedFiles] = useState([]); // Store selected files
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [isAddingProduct, setIsAddingProduct] = useState(false)
    const [isProductsLoading, setIsProductsLoading] = useState(true)

    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productCategory, setProductCategory] = useState("electronics"); // Default category
    const [productPrice, setProductPrice] = useState(0);
    const [productQuantity, setProductQuantity] = useState(0);

    const categories = ["electronics", "clothing", "home appliances", "books", "toys"];


    const handleFileChange = (event) => {
        const files = event.target.files;
        if (files) {
            setSelectedFiles((prevFiles) => [...prevFiles, ...Array.from(files)]);
        }
    };

    const handleRemoveFile = (index) => {
        setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!productName.trim()) {
            toast.error("Product name is required.");
            return;
        }
        if (!productCategory.trim()) {
            toast.error("Product category is required.");
            return;
        }
        if (productPrice <= 0) {
            toast.error("Product price must be greater than zero.");
            return;
        }
        if (productQuantity < 0) {
            toast.error("Product quantity cannot be negative.");
            return;
        }
        if (selectedFiles.length === 0) {
            toast.error("Please select at least one image.");
            return;
        }

        const formData = new FormData();
        formData.append("name", productName.trim());
        formData.append("description", productDescription.trim());
        formData.append("price", productPrice.toString());
        formData.append("quantity", productQuantity.toString());
        formData.append("category", productCategory.trim());
        selectedFiles.forEach((file) => {
            formData.append("images", file);
        });

        try {
            setIsAddingProduct(true)
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/products/addproduct`, {
                method: "POST",
                body: formData,
                credentials: "include",
            });
            if (!response.ok) {
                const { error } = await response.json()
                if (response.status === 403) {
                    dispatch(logout())
                    router.replace('/auth/login')
                    toast.error(error)
                    return
                }
                toast.error(error)
                return
            }
            const data = await response.json();
            toast.success("Product added successfully!");
            setSelectedFiles([]);
            setProductName("");
            setProductDescription("");
            setProductPrice(0);
            setProductQuantity(0);
            setProductCategory("electronics");
        } catch (error) {
            toast.error("An error occurred while uploading product details.");
        } finally {
            setIsAddingProduct(false)
        }
    };

    // Fetch products
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setIsProductsLoading(true)
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/products`);
            if (!response.ok) return toast.error('something went wrong')
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsProductsLoading(false)
        }
    };

    // Handle edit product
    const handleEditProduct = async () => {
        try {
            const response = await fetch(`http://localhost:5000/products/${editProduct.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editProduct),
            });
            if (!response.ok) {
                const { error } = await response.json()
                if (response.status === 403) {
                    dispatch(logout())
                    router.replace('/auth/login')
                    toast.error(error)
                    return
                }
                toast.error(error)
                return
            }
            const data = await response.json();
            setProducts(products.map((p) => (p.id === editProduct.id ? data : p)));
            setEditProduct(null);
        } catch (error) {
            console.error("Error editing product:", error);
        }
    };


    const handleEdit = (id) => {
        console.log(id)
        router.push(`/products/edit/${id}`)
    }

    // Handle delete product
    const handleDeleteProduct = async (id) => {
        if (confirm("delete this product? it will be deleted permanently and this cant be undone!")) {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/products/deleteproduct/${id}`, { method: "DELETE", credentials: 'include' });
                if (!response.ok) {
                    const { error } = await response.json()
                    if (response.status === 403) {
                        dispatch(logout())
                        router.replace('/auth/login')
                        toast.error(error)
                        return
                    }
                    toast.error(error)
                    return
                }
                toast.success('product deleted')
                setProducts(products.filter((p) => p._id !== id));
            } catch (error) {
                toast.error(error.message);
            }
        }
    };



    return (
        <div className="container mx-auto p-6 text-black">
            <h1 className="text-2xl font-bold mb-6">Manage Products</h1>

            {/* Product List */}
            <div>
                <h2 className="text-xl font-bold mb-2">Product List</h2>
                {
                    isProductsLoading ? (
                        <div className={`flex flex-col items-center justify-center min-h-[60vh]`}>
                            <MoonLoader color="#36d7b7" size={60} margin={5} />
                            <p className="mt-4 text-lg font-medium text-black">Loading Products</p>
                        </div>
                    ) : (
                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border border-gray-300 px-4 py-2">Name</th>
                                    <th className="border border-gray-300 px-4 py-2">Price</th>
                                    <th className="border border-gray-300 px-4 py-2">Stock</th>
                                    <th className="border border-gray-300 px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product._id}>
                                        <td className="border border-gray-300 px-4 py-2">{product.name}</td>
                                        <td className="border border-gray-300 px-4 py-2">{product.price}</td>
                                        <td className="border border-gray-300 px-4 py-2">{product.quantity}</td>
                                        <td className="border border-gray-300 px-4 py-2 grid grid-cols-[repeat(auto-fit,minmax(50px,1fr))] gap-2">
                                            <button
                                                onClick={() => handleEdit(product._id)}
                                                className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 mr-2"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteProduct(product._id)}
                                                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )
                }
            </div>

            {/* Edit Product */}
            {editProduct && (
                <div className="mt-6">
                    <h2 className="text-xl font-bold mb-2">Edit Product</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input
                            type="text"
                            placeholder="Name"
                            value={editProduct.name}
                            onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                            className="border p-2 rounded"
                        />
                        <input
                            type="number"
                            placeholder="Price"
                            value={editProduct.price}
                            onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
                            className="border p-2 rounded"
                        />
                        <input
                            type="number"
                            placeholder="Stock"
                            value={editProduct.quantity}
                            onChange={(e) => setEditProduct({ ...editProduct, stock: e.target.value })}
                            className="border p-2 rounded"
                        />
                        <button
                            onClick={handleEditProduct}
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            )}

            <button
                onClick={() => setShowAddProduct(!showAddProduct)}
                className="p-3 text-white rounded-md my-10 bg-yellow-500"
            >
                {showAddProduct ? "Hide Add Product" : "Add a Product"}
            </button>

            {showAddProduct && (
                <div className="text-black">
                    <h2 className="text-xl font-bold mb-4">Add a Product</h2>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium">Product Name</label>
                            <input
                                type="text"
                                className="w-full mt-1 p-2 border rounded"
                                placeholder="Enter product name"
                                value={productName}
                                required
                                onChange={(e) => setProductName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Product Category</label>
                            <select
                                className="w-full mt-1 p-2 border rounded"
                                value={productCategory}
                                onChange={(e) => setProductCategory(e.target.value)}
                                required
                            >
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Description</label>
                            <textarea
                                className="w-full mt-1 p-2 border rounded"
                                rows={6}
                                placeholder="Enter product description"
                                required
                                minLength={20}
                                value={productDescription}
                                onChange={(e) => setProductDescription(e.target.value)}
                            ></textarea>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Price (USD)</label>
                            <input
                                type="number"
                                className="w-full mt-1 p-2 border rounded"
                                placeholder="Enter product price"
                                value={productPrice}
                                onChange={(e) => setProductPrice(parseFloat(e.target.value))}
                                required
                                min={1}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Quantity</label>
                            <input
                                type="number"
                                className="w-full mt-1 p-2 border rounded"
                                placeholder="Enter product quantity"
                                value={productQuantity}
                                required
                                min={1}
                                onChange={(e) => setProductQuantity(parseFloat(e.target.value))}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Product Images</label>
                            <input
                                type="file"
                                className="w-full mt-1 p-2 border rounded"
                                accept="image/*"
                                required
                                multiple
                                onChange={handleFileChange}
                            />
                        </div>
                        {selectedFiles.length > 0 && (
                            <div className="mt-4">
                                <h3 className="font-medium mb-2">Selected Images:</h3>
                                <ul>
                                    {selectedFiles.map((file, index) => (
                                        <li key={index} className="flex justify-between items-center">
                                            <span>{file.name}</span>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveFile(index)}
                                                className="text-red-500 text-sm underline"
                                            >
                                                Remove
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <button className={`mt-4 px-4 py-2 bg-blue-500 text-white rounded w-full md:w-auto ${isAddingProduct && 'opacity-50'}`} disabled={isAddingProduct}>
                            {isAddingProduct ? 'Adding Product...' : 'Add Product'}
                        </button>
                    </form>
                </div>
            )}
        </div>


    );

};

export default ManageProducts;
