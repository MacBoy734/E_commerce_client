"use client"
import Link from "next/link";
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../slices/authSlice'
import { useRouter } from 'next/navigation'
import { CiUser } from "react-icons/ci";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { GiShoppingCart } from "react-icons/gi";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const { user, isAuthenticated } = useSelector((state) => state.auth)
  const {cartItems} = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const [accountDropdown, setAccountDropdown] = useState(false);
  const [helpDropdown, setHelpDropdown] = useState(false);

  const router = useRouter()

  // Refs to track the dropdowns
  const accountRef = useRef(null);
  const helpRef = useRef(null);

  // Function to close dropdowns when clicking outside
  const handleClickOutside = (e) => {
    if (accountRef.current && !accountRef.current.contains(e.target)) {
      setAccountDropdown(false);
    }
    if (helpRef.current && !helpRef.current.contains(e.target)) {
      setHelpDropdown(false);
    }
  };

  useEffect(() => {
    // Add event listener for clicks outside
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // LOG OUT FUNCTION
  const handleLogOut = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/logout`, { credentials: 'include' })
    dispatch(logout())
    return router.push('/auth/login')
  }

  return (
    <nav className="bg-blue-600 text-white p-4">
      <section className="flex items-center justify-around gap-3">
        <Link href="/" className="text-white text-2xl">Store</Link>
        <div className="flex space-x-1 w-[50%]">
          <input
            type="text"
            className="p-2 text-lg rounded-md w-[90%] pr-3 text-black"
            placeholder="Search Anything..."
          />
          <button className="p-2 text-lg text-white bg-black rounded-md">
            Search
          </button>
        </div>
        {/* Account Dropdown */}
        <div className="relative cursor-pointer" ref={accountRef}>
          <div className="flex items-center space-x-1" onClick={() => setAccountDropdown(!accountDropdown)}>
            <CiUser className="size-6" />
            <h4 className="text-md">Account</h4>
            <RiArrowDropDownLine className="size-6" />
          </div>
          {accountDropdown && (
            <div className="absolute left-0 mt-2 bg-white text-black shadow-md rounded-md w-40 cursor-pointer">
              {isAuthenticated ? (
                <ul className="py-2">
                  <li className="px-4 py-2 hover:bg-gray-200"><Link href="/auth/profile">Profile</Link></li>
                  <li className="px-4 py-2 hover:bg-gray-200"><Link href="/users/orders">Orders</Link></li>
                  {
                    user.isAdmin && (
                      <li className="px-4 py-2 hover:bg-gray-200"><Link href="/admin">dashboard</Link></li>
                    )
                  }
                  <li className="px-4 py-2 hover:bg-gray-200"><button onClick={handleLogOut}>Logout</button></li>
                </ul>
              ) : (
                <ul className="py-2">
                  <li className="px-4 py-2 hover:bg-gray-200"><Link href="/auth/login">Login</Link></li>
                  <li className="px-4 py-2 hover:bg-gray-200"><Link href="/auth/register">Register</Link></li>
                </ul>
              )}

            </div>
          )}
        </div>
        {/* Help Dropdown */}
        <div className="relative" ref={helpRef}>
          <div className="flex items-center space-x-1 cursor-pointer" onClick={() => setHelpDropdown(!helpDropdown)}>
            <IoIosHelpCircleOutline className="size-6" />
            <h4 className="text-md">Help</h4>
            <RiArrowDropDownLine className="size-6" />
          </div>
          {helpDropdown && (
            <div className="absolute left-0 mt-2 bg-white text-black shadow-md rounded-md w-40 cursor-pointer">
              <ul className="py-2">
                <li className="px-4 py-2 hover:bg-gray-200">FAQ</li>
                <li className="px-4 py-2 hover:bg-gray-200">Contact Support</li>
              </ul>
            </div>
          )}
        </div>
        {/* Cart Icon */}
        <div>
          <Link href="/cart" className="flex items-center space-x-1">
            <GiShoppingCart className="size-6" />
            <h4 className="text-md">Cart <sup className={`text-red-600 text-lg font-normal ${cartItems <= 0 && 'hidden'}`}>{cartItems.length}</sup></h4>
          </Link>
        </div>
      </section>
    </nav>
  );
}
