"use client"

import { useState } from "react"
import { toast } from "react-toastify"
import ManageProducts from '../../components/ManageProducts'
import ManageUsers from '../../components/ManageUsers'
import ManageOffers from "../../components/ManageOffers"
import ManageOrders from '../../components/ManageOrders'

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState("manageProducts")
  const [selectedFiles, setSelectedFiles] = useState([])

  const [productName, setProductName] = useState("")
  const [productDescription, setProductDescription] = useState("")
  const [productCategory, setProductCategory] = useState("electronics")
  const [productPrice, setProductPrice] = useState(0)
  const [productQuantity, setProductQuantity] = useState(0)

  const categories = ["electronics", "clothing", "home appliances", "books", "toys"]

  const handleFileChange = (event) => {
    const files = event.target.files
    if (files) {
      setSelectedFiles((prevFiles) => [...prevFiles, ...Array.from(files)])
    }
  }

  const handleRemoveFile = (index) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
  }



  const renderContent = () => {
    switch (activeTab) {
      case "manageProducts":
        return (
          <div>
            <ManageProducts />
          </div>
        )
      case "manageUsers":
        return (
          <div>
            <ManageUsers />
          </div>
        )

      case "manageOrders":
        return (
          <div>
            <ManageOrders />
          </div>
        )
      case "manageOffers":
        return (
          <div>
            <ManageOffers />
          </div>
        )
      default:
        return <p>Select a section from the sidebar.</p>
    }
  }

  return (
    <div className="flex min-h-screen overflow-y-auto">
      {/* Sidebar */}
      <aside className="w-1/4 bg-gray-800 text-white p-4 space-y-4 min-h-screen">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <nav className="space-y-2">
          <button
            className={`block w-full text-left px-4 py-2 rounded ${activeTab === "manageProducts" ? "bg-gray-600" : "hover:bg-gray-700"
              }`}
            onClick={() => setActiveTab("manageProducts")}
          >
            Manage Products
          </button>
          <button
            className={`block w-full text-left px-4 py-2 rounded ${activeTab === "manageUsers" ? "bg-gray-600" : "hover:bg-gray-700"
              }`}
            onClick={() => setActiveTab("manageUsers")}
          >
            Manage Users
          </button>
          <button
            className={`block w-full text-left px-4 py-2 rounded ${activeTab === "manageOrders" ? "bg-gray-600" : "hover:bg-gray-700"
              }`}
            onClick={() => setActiveTab("manageOrders")}
          >
            Manage Orders
          </button>
          <button
            className={`block w-full text-left px-4 py-2 rounded ${activeTab === "manageOffers" ? "bg-gray-600" : "hover:bg-gray-700"
              }`}
            onClick={() => setActiveTab("manageOffers")}
          >
            Manage Offers
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="w-3/4 p-6 bg-gray-100 overflow-y-auto">{renderContent()}</main>
    </div>
  )
}

export default DashboardPage
