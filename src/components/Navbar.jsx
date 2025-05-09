"use client"
import Link from "next/link";
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../slices/authSlice'
import { useRouter } from 'next/navigation'
import { CiUser } from "react-icons/ci";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoIosHelpCircleOutline, IoIosMenu, IoMdClose } from "react-icons/io";
import { GiShoppingCart } from "react-icons/gi";
import { useState, useEffect, useRef } from "react";
import { BiSearch } from "react-icons/bi";


export default function Navbar() {
  const { user, isAuthenticated } = useSelector((state) => state.auth)
  const { cartItems } = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const [accountDropdown, setAccountDropdown] = useState(false);
  const [helpDropdown, setHelpDropdown] = useState(false);
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const router = useRouter()


  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

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
      <section>
        <div className="fit:flex hidden items-center justify-around gap-3">
          <Link href="/" className="text-white text-2xl">Store</Link>
          <form className="flex space-x-1 w-[50%]" onSubmit={handleSearch}>
            <input
              type="text"
              className="p-2 text-lg rounded-md w-[90%] pr-3 text-black"
              placeholder="Search Anything..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="p-2 text-lg text-white bg-black rounded-md" type="submit">
              Search
            </button>
          </form>
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
                    <li className="px-4 py-2 hover:bg-gray-200"><Link href="/users/profile">Profile</Link></li>
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
                  <li className="px-4 py-2 hover:bg-gray-200"><Link href="/help/FAQS">FAQS</Link></li>
                  <li className="px-4 py-2 hover:bg-gray-200"><Link href="/help/contactsupport">Contact Support</Link></li>
                </ul>
              </div>
            )}
          </div>
          {/* Cart Icon */}
          <div>
            <Link href="/cart" className="flex items-center space-x-1">
              <GiShoppingCart className="size-6" />
              <h4 className="text-md">Cart <sup className={`text-red-600 text-lg font-normal`}>{cartItems?.length || 0}</sup></h4>
            </Link>
          </div>
        </div>
        {/* Mobile Search Icon */}
        <div className="fit:hidden flex items-center justify-between space-x-3 px-3">
          <Link href="/" className="text-white text-2xl">Store</Link>
          <div className="flex gap-5 items-center">
            <button onClick={() => setSearchOpen(!searchOpen)}>
              <BiSearch className="text-2xl" />
            </button>

            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <IoMdClose className="text-2xl font-bold size-6 text-white" /> : <IoIosMenu className="text-2xl font-bold size-6 text-white" />}
            </button>
          </div>
        </div>
      </section>
      {/* Mobile Search Bar */}
      {searchOpen && (
        <div className="fit:hidden flex flex-col items-center space-y-2 mt-3 bg-blue-700 p-3 rounded-md shadow-lg">
          <form className="flex space-x-1 w-full" onSubmit={handleSearch}>
            <input
              type="text"
              className="p-2 text-lg rounded-md w-full text-black"
              placeholder="Search Anything..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              className="p-2 text-lg text-white bg-black rounded-md"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      )}

      {/* Mobile Menu (Only visible when menuOpen is true) */}
      {menuOpen && (
        <div className="fit:hidden flex flex-col items-center space-y-4 mt-4 bg-blue-700 p-4 rounded-md shadow-lg">

          <div>
            {isAuthenticated ? (
              <ul className="py-2">
                <li className="px-4 py-2"> <Link href="/users/profile" onClick={() => setMenuOpen(false)}>Profile</Link></li>
                <li className="px-4 py-2"><Link href="/users/orders" onClick={() => setMenuOpen(false)} >Orders</Link></li>
                {
                  user.isAdmin && (
                    <li className="px-4 py-2"><Link href="/admin">dashboard</Link></li>
                  )
                }
                <li className="px-4 py-2"><Link href="/cart" onClick={() => setMenuOpen(false)}>Cart ({cartItems?.length || 0})</Link></li>
                <li className="px-4 py-2"><button onClick={handleLogOut}>Logout</button></li>
              </ul>
            ) : (
              <ul className="py-2">
                <li className="px-4 py-2"><Link href="/auth/login">Login</Link></li>
                <li className="px-4 py-2"><Link href="/auth/register">Register</Link></li>
                <li className="px-4 py-2"><Link href="/cart" onClick={() => setMenuOpen(false)}>Cart ({cartItems?.length || 0})</Link></li>
              </ul>
            )}

          </div>
        </div>
      )}
    </nav>
  );
}
