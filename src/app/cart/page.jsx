"use client"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import {removeFromCart, incrementQuantity, decrementQuantity } from "../../slices/cartSlice"
import Link from "next/link"
import Spinner from "../../components/Spinner"

const CartPage = () => {
  const cart = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const [isHydrated, setIsHydrated] = useState(false)
  useEffect(() => {
    setIsHydrated(true)
    console.log(cart)
  }, [])

  if(!isHydrated){
    return (
      <div className="flex items-center justify-center min-h-[65vh]"><Spinner loading={!isHydrated} message="Loading Cart..."/></div>
    )
  }

  return (
    <div className="container mx-auto p-6 min-h-[80vh] bg-black text-white">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      {isHydrated && cart.cartItems?.length === 0 ? (
        <div className="text-center mt-10">
          <p className="text-lg">Your cart is currently empty.</p>
          <Link href="/products" className="text-blue-600 underline mt-4">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6 md:row-span-2">
            {cart.cartItems?.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white shadow-md rounded-lg p-4 flex-col sm:flex-row gap-3 sm:gap-1"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.images[0].url}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <div>
                    <h2 className="text-lg font-semibold text-black">{item.name}</h2>
                    <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => dispatch(decrementQuantity(item.id))}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-black"
                  >
                    -
                  </button>
                  <span className="text-black">{item.quantity}</span>
                  <button
                    onClick={() => dispatch(incrementQuantity(item.id))}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-black"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 text-black md:row-span-1">
            <h2 className="text-xl font-semibold mb-4">Cart Summary</h2>
            <div className="space-y-2 mb-5">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${cart.totalPrice?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Items</span>
                <span>{cart.totalQuantity}</span>
              </div>
            </div>
            <Link
              className="mt-6 w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
              href={'/checkout'}
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartPage
