// pages/checkout.js
"use client"
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { useRouter } from "next/navigation";
import { logout } from "../../slices/authSlice"
import Spinner from "../../components/Spinner"
import { toast } from "react-toastify";

const CheckoutPage = () => {
  const cart = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const { user, status, isAuthenticated } = useSelector((state) => state.auth)
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    paymentMethod: "Credit Card"
  });
  const [isHydrated, setIsHydrated] = useState(false)
   useEffect(() => {
      if (status !== "loading" && !isAuthenticated ) {
        toast.error('you need to be logged in!')
        router.push("/auth/login")
      }
    }, [user, status, router])
  useEffect(() => {
    setIsHydrated(true)
    setFormData((prevData) => ({
      ...prevData,
      userId: user?._id || "",
      items: cart?.cartItems || [],
    }))
  }, [cart.cartItems, user])
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true)
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/products/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: 'include'
      })
        if (!response.ok) {
          const { error } = await response.json()
          if(response.status === 403){
            dispatch(logout())
            router.replace('/auth/login')
            toast.error(error)
            return
          }
          toast.error(error)
          return
        }
      setFormData({
        name: "",
        email: "",
        address: "",
        city: "",
        postalCode: "",
        paymentMethod: "Credit Card"
      })
      router.push('/')
      toast.success('order completed!')
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsSubmitting(false)
    }
  };

  if (!isHydrated) {
    return (
      <div className="flex items-center justify-center min-h-[65vh]"><Spinner loading={!isHydrated} message="Loading..." color="black" /></div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Checkout
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Personal Information */}
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Shipping Address */}
          <div className="mb-6">
            <label
              htmlFor="address"
              className="block text-gray-700 font-medium mb-2"
            >
              Shipping Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="city"
              className="block text-gray-700 font-medium mb-2"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="postalCode"
              className="block text-gray-700 font-medium mb-2"
            >
              Postal Code
            </label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Order Summary */}
          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Order Summary</h2>
            {cart.cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4"
              >
                <h2 className="text-lg text-black">{item.name} - ({item.quantity})</h2>

                <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
              </div>
            ))}
            <div className="flex items-center justify-between p-4">
              <p className="text-lg text-black">Shipping</p>
              <p className="text-sm text-gray-600">$5.00</p>
            </div>
            <div className="flex justify-between font-bold text-black p-4">
              <p>Total</p>
              <p>==</p>
              <p>${cart.totalPrice}</p>
            </div>
          </div>

          {/* Payment Method */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Payment Method
            </label>
            <select
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            >
              <option value="creditCard">Credit Card</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isSubmitting && 'opacity-50'}`}
            >
              {isSubmitting ? 'Saving order...' : 'Complete Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
