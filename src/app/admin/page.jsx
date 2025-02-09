"use client"

import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "../../slices/authSlice"
import { useRouter } from "next/navigation"
import ManageProducts from '../../components/ManageProducts'
import ManageUsers from '../../components/ManageUsers'
import ManageOffers from "../../components/ManageOffers"
import ManageOrders from '../../components/ManageOrders'
import NewsletterForm from '../../components/sendNewsletter'
import { IoMenu, IoClose } from "react-icons/io5" 

const DashboardPage = () => {
  const dispatch = useDispatch()
  const { user, status } = useSelector((state) => state.auth)
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("manageProducts")
  const [isSidebarOpen, setSidebarOpen] = useState(false) 

  useEffect(() => {
    if (status !== "loading" && (!user || !user.isAdmin)) {
      dispatch(logout())
      router.push("/unauthorized")
    }
  }, [user, status, router])

  const renderContent = () => {
    switch (activeTab) {
      case "manageProducts":
        return <ManageProducts />
      case "manageUsers":
        return <ManageUsers />
      case "manageOrders":
        return <ManageOrders />
      case "manageOffers":
        return <ManageOffers />
      case "otherSettings": 
        return <NewsletterForm />
      default:
        return <p>Select a section from the sidebar.</p>
    }
  }

  return (
    <div className="flex min-h-screen relative">
      <aside
        className={`bg-gray-800 text-white p-4 sm:space-y-4 transition-transform duration-300 ease-in-out sm:static sm:w-[15%] sm:translate-x-0 ${
          isSidebarOpen ? "fixed top-0 left-0 h-screen w-3/4 z-50 translate-x-0" : "fixed -translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center sm:hidden">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          {/* Close button (only on mobile) */}
          <button onClick={() => setSidebarOpen(false)} className="text-white text-3xl">
            <IoClose />
          </button>
        </div>

        <nav className="space-y-2 mt-4">
          <button
            className={`block w-full text-left px-4 py-2 rounded ${
              activeTab === "manageProducts" ? "bg-gray-600" : "hover:bg-gray-700"
            }`}
            onClick={() => {
              setActiveTab("manageProducts")
              setSidebarOpen(false)
            }}
          >
            Manage Products
          </button>
          <button
            className={`block w-full text-left px-4 py-2 rounded ${
              activeTab === "manageUsers" ? "bg-gray-600" : "hover:bg-gray-700"
            }`}
            onClick={() => {
              setActiveTab("manageUsers")
              setSidebarOpen(false)
            }}
          >
            Manage Users
          </button>
          <button
            className={`block w-full text-left px-4 py-2 rounded ${
              activeTab === "manageOrders" ? "bg-gray-600" : "hover:bg-gray-700"
            }`}
            onClick={() => {
              setActiveTab("manageOrders")
              setSidebarOpen(false)
            }}
          >
            Manage Orders
          </button>
          <button
            className={`block w-full text-left px-4 py-2 rounded ${
              activeTab === "manageOffers" ? "bg-gray-600" : "hover:bg-gray-700"
            }`}
            onClick={() => {
              setActiveTab("manageOffers")
              setSidebarOpen(false)
            }}
          >
            Manage Offers
          </button>
          <button
            className={`block w-full text-left px-4 py-2 rounded ${
              activeTab === "otherSettings" ? "bg-gray-600" : "hover:bg-gray-700"
            }`}
            onClick={() => {
              setActiveTab("otherSettings")
              setSidebarOpen(false)
            }}
          >
            Other Settings
          </button>
        </nav>
      </aside>

      {/* Mobile Menu Button */}
      {!isSidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="sm:hidden absolute top-0 py-3 left-4 bg-gray-800 text-white p-2 rounded-md z-50 text-2xl w-full"
        >
          <IoMenu />
        </button>
      )}

      {/* Main Content */}
      <main className="flex-1 py-6 bg-gray-100 overflow-y-auto w-full sm:w-3/4 pt-10 sm:pt-0">
        {renderContent()}
      </main>
    </div>
  )
}

export default DashboardPage
