"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";

export default function EditProduct() {
    const { id } = useParams();
    const router = useRouter();
    const [product, setProduct] = useState(null);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [isSavingProduct, setIsSavingProduct] = useState(false);
    const [offers, setOffers] = useState([])

    const categories = ["electronics", "clothing", "home appliances", "books", "toys"];

    useEffect(() => {
        if (!id) return;

        async function fetchProduct() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/products/${id}`);
                const data = await res.json();
                if (!res.ok) {
                    return toast.error(data.error);
                }
                setProduct(data);
            } catch (err) {
                toast.error(err.message);
                router.push("/products");
            }
        }
        async function fetchOffers() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/products/offers`);
                if (!res.ok) {
                    const { error } = await res.json()
                    return toast.error(error);
                }
                const data = await res.json();
                setOffers(data);
            } catch (err) {
                toast.error("Error fetching offers");
            }
        }
        fetchOffers()
        fetchProduct()
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!product?.name?.trim()) return toast.error("Product name is required.");
        if (!product?.category?.trim()) return toast.error("Product category is required.");
        if (product?.price <= 0) return toast.error("Product price must be greater than zero.");
        if (product?.quantity < 0) return toast.error("Product quantity cannot be negative.");
        // if (selectedFiles.length === 0) return toast.error("Please select at least one image.");

        const formData = new FormData();
        formData.append("name", product.name.trim());
        formData.append("description", product.description.trim());
        formData.append("price", product.price);
        formData.append("quantity", product.quantity);
        formData.append("category", product.category.trim());
        formData.append("isFeatured", product.isFeatured || false)
        formData.append("offers", product.offers)

        try {
            setIsSavingProduct(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/products/editproduct/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(product),
                credentials: "include",
            });

            if (response.ok) {
                toast.success("Product updated successfully!");
                router.push("/products");
            } else {
                const { error } = await response.json();
                toast.error(error);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsSavingProduct(false);
        }
    };

    if (!product) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="max-w-3xl mx-auto bg-white p-6 shadow-lg rounded-lg my-10 text-black">
            <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Product Name</label>
                    <input
                        type="text"
                        name="name"
                        className="w-full mt-1 p-2 border rounded"
                        placeholder="Enter product name"
                        value={product.name || ""}
                        required
                        onChange={(e) => setProduct({ ...product, name: e.target.value})}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Product Category</label>
                    <select
                        name="category"
                        className="w-full mt-1 p-2 border rounded"
                        value={product.category || ""}
                        onChange={(e) => setProduct({ ...product, category: e.target.value })}
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
                        name="description"
                        className="w-full mt-1 p-2 border rounded"
                        rows={6}
                        placeholder="Enter product description"
                        required
                        minLength={20}
                        value={product.description || ""}
                        onChange={(e) => setProduct({ ...product, description: e.target.value })}
                    ></textarea>
                </div>
                <div>
                    <label className="block text-sm font-medium">Price (USD)</label>
                    <input
                        type="number"
                        name="price"
                        className="w-full mt-1 p-2 border rounded"
                        placeholder="Enter product price"
                        value={product.price || ""}
                        onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) })}
                        required
                        min={1}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Quantity</label>
                    <input
                        type="number"
                        name="quantity"
                        className="w-full mt-1 p-2 border rounded"
                        placeholder="Enter product quantity"
                        value={product.quantity || ""}
                        required
                        min={1}
                        onChange={(e) => setProduct({ ...product, quantity: parseFloat(e.target.value) })}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Select Offer</label>
                    <select
                        className="w-full mt-1 p-2 border rounded"
                        value={product.offers}
                        onChange={(e) => setProduct({ ...product, offers: e.target.value })}
                    >
                        <option value="">No Offer</option>
                        {offers.map((offer) => (
                            <option key={offer._id} value={offer._id}>
                                {offer.title} - {offer.discountPercentage}%
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium">Featured Product</label>
                    <input
                        type="checkbox"
                        name="isFeatured"
                        checked={product.isFeatured || false}
                        onChange={(e) => setProduct({ ...product, isFeatured: e.target.checked })}
                    />
                </div>
                <button
                    type="submit"
                    className={`w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 ${isSavingProduct && 'opacity-50'}`}
                    disabled={isSavingProduct}
                >
                    {isSavingProduct ? "Updating..." : "Update Product"}
                </button>
            </form>
        </div>
    );
}
