"use client";
import { useEffect, useState } from "react";
import { addToCart } from "../../slices/cartSlice"
import { useDispatch } from "react-redux";
import Spinner from '../../components/Spinner'

const ProductsPage = () => {
  const [isLoading, setIsLoading] = useState(true); // Default to true to show "Loading..." initially
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true); // Start loading
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/products`);
        if (!response.ok) {
          const { error } = await response.json();
          setError(error);
          return;
        }
        const data = await response.json();
        setProducts(data); // Update products state
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products");
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (id, name, price, totalQuantity, images) => {
     const item = {
      id,
      name, 
      price,
      totalQuantity,
      quantity: 1,
      images
     }
    return dispatch(addToCart(item))
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Shop Our Products</h1>
      <section className="py-12 min-h-[50vh]">
        <h2 className="text-3xl font-semibold text-center">All Products</h2>
        {isLoading ? (
          <div>
            <Spinner loading={isLoading} message="Loading Products..." />
          </div>
        ) : error ? (
          <p className="text-center text-xl text-red-500">{error}</p>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 px-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="border p-4 rounded-lg shadow-lg"
              >
                <div className="w-full h-48 bg-gray-300 bg-cover bg-center">
                  {product.images && product.images[0] && product.images[0].url ? (
                    <img
                      src={product.images[0].url}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      No Image Available
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-semibold mt-4">{product.name}</h3>
                <p className="text-gray-500">${product.price}</p>
                <small className="text-red-400 block mt-3">only {product.quantity} remaining!</small>
                <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg" onClick={() => handleAddToCart(product._id, product.name, product.price, product.quantity, product.images)}>Add to Cart</button>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-10">
            <h2 className="text-xl font-bold text-center text-red-500">There are no products to show!</h2>
          </div>
        )}
      </section>
    </div>
  );
};

export default ProductsPage;
