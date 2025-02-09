"use client"
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';
import { addToCart } from "../slices/cartSlice"
import { useDispatch } from "react-redux";


export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [products, setProducts] = useState([]);
  const [offers, setOffers] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      setIsLoading(true); // Start loading
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/products/featured`);
        if (!response.ok) {
          const { error } = await response.json();
          setError(error);
          console.log(error);
          setIsLoading(false); // Stop loading
          return;
        }
        const data = await response.json();
        setProducts(data); // Update products state
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products');
      } finally {
        setIsLoading(false); // Stop loading
      }
    };
    const fetchOffers = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/products/offers`, { credentials: 'include' })
        if (!response.ok) {
          const { error } = await response.json()
          return toast.error(error)
        }
        const data = await response.json()
        setOffers(data)
      } catch (error) {
        toast.error(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFeaturedProducts();
    fetchOffers()
  }, [])

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
    <div>
      {/* Hero Section */}
      <section className="bg-blue-600 text-white text-center py-12">
        <h1 className="text-4xl font-bold">Welcome To Our Store</h1>
        <p className="mt-4 text-xl">Amazing offers and products await you</p>
        <Link href="/products" className="mt-6 inline-block bg-yellow-500 text-black py-2 px-6 rounded-lg">
          Shop Now
        </Link>
      </section>

      {/* Featured Products Section */}
      <section className="py-12 min-h-[50vh] bg-black text-white">
        <h2 className="text-3xl font-semibold text-center">Featured Products</h2>
        {isLoading ? (
          <Spinner loading={isLoading} message="wait a second..." />
        ) : error ? (
          <p className="text-center text-xl text-red-500">{error}</p>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 px-6">
            {products.map((product) => (
              <Link key={product._id} href={`/products/${product._id}`} className="border p-4 rounded-lg shadow-lg">
                <h4 className='text-emerald-500 mb-2 font-bold'>Featured!</h4>
                <div className="w-full h-48 bg-gray-300">
                  <img src={product.images[0].url} alt={product.name} className='' />
                </div>
                <h3 className="mt-4 text-xl font-semibold">{product.name}</h3>
                <p className="text-gray-300">${product.price}</p>
                <small className="text-red-400 block mt-3">
                  only {product.quantity} remaining!
                </small>
                <button
                  className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg"
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddToCart(
                      product._id,
                      product.name,
                      product.price,
                      product.quantity,
                      product.images
                    );
                  }}
                >
                  Add to Cart
                </button>
              </Link>
            ))}
          </div>
        ) : (
          <div className='mt-10'>
            <h2 className='text-xl font-bold text-center text-red-500'>There are no featured products at this time!</h2>
          </div>
        )}
      </section>

      {/* Special Offers Section */}
      <section className="bg-gray-200 py-12 text-center text-black">
        <h2 className="text-3xl font-semibold">Special Offers</h2>
        <p className="mt-4 text-xl">Don't miss out on these limited-time deals!</p>
        <div className="">
          {
            isLoading ? (
              <Spinner loading={isLoading} message='loading offers..' color='black' />
            ) : offers.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 px-6">
                {offers.map((offer) => (
                  <div key={offer._id} className="border p-4 rounded-lg shadow-lg">
                    <h4 className='text-emerald-500 mb-2 font-bold'>{offer.title}</h4>
                    <h3 className="mt-4 text-xl font-semibold">Get up to {offer.discountPercentage}% discount!</h3>
                    <p className="text-gray-500">This offer ends on {new Date(offer.endDate).toLocaleString()}.</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className='mt-10'>
                <h2 className='text-xl font-bold text-center text-red-500'>There are no offers at this time!</h2>
              </div>
            )
          }
        </div>
      </section>
    </div>
  );
}
