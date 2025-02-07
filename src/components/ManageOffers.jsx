"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux"
import { logout } from "../slices/authSlice"
import { HashLoader, PulseLoader } from "react-spinners";

export default function ManageOffers() {
  const dispatch = useDispatch()
  const router = useRouter()
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState("");
  const [editOffer, setEditOffer] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [offerTitle, setOfferTitle] = useState('')
  const [discountPercentage, setDiscountPercentage] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [isAddingOffer, setIsAddingOffer] = useState(false)
  const [currentId, setCurrentId] = useState('')


  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/products/offers`, { credentials: 'include' })
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
        const data = await response.json()
        setOffers(data)
      } catch (error) {
        toast.error(error.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchOffers()
  }, [])

  // Filter offers based on search
  const filteredOffers = offers.filter((offer) =>
    offer.title.toLowerCase().includes(search.toLowerCase())
  );

  // Add new offer
  const handleAddOffer = async () => {
    if (!discountPercentage || !offerTitle || !startDate || !endDate) {
      return toast.error('fill in all fields!')
    }
    try {
      setIsAddingOffer(true)
      const offer = {
        offerTitle,
        discountPercentage,
        startDate,
        endDate
      }
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/products/addOffer`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(offer),
        credentials: 'include',
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
      const data = await response.json()
      setOffers(prevState => [...prevState, data])
      setOfferTitle('')
      setStartDate('')
      setEndDate('')
      setDiscountPercentage('')
      toast.success('offer added')
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsAddingOffer(false)
    }
  };

  // Handle editing an offer
  const handleEditOffer = (offer) => {
    setStartDate(offer.startDate)
    setEndDate(offer.endDate)
    setOfferTitle(offer.title)
    setDiscountPercentage(offer.discountPercentage)
    setCurrentId(offer._id)
    setIsEditModalOpen(true);
  };

  // Save edited offer
  const handleSaveEdit = async() => {
    if (!discountPercentage || !offerTitle || !startDate || !endDate) {
      return toast.error('fill in all fields!')
    }
    try {
      setIsAddingOffer(true)
      const offer = {
        offerTitle,
        discountPercentage,
        startDate,
        endDate
      }
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/products/editOffer/${currentId}`, {
        method: 'PATCH',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(offer),
        credentials: 'include',
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
      const data = await response.json()
      setOffers(offers.map((offer) => (offer._id === data._id ? data : offer)));
      setOfferTitle('')
      setStartDate('')
      setEndDate('')
      setDiscountPercentage('')
      setEditOffer(null);
      toast.success('offer updated')
      setIsEditModalOpen(false);
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsAddingOffer(false)
    }
  };

  const handleCloseModal = () => {
    setOfferTitle('')
    setStartDate('')
    setEndDate('')
    setDiscountPercentage('')
    setEditOffer(null);
    setIsEditModalOpen(false);
    setIsAddModalOpen(false);
  }

  // Delete offer
  const handleDeleteOffer = async (id) => {
    if (confirm('delete this offer?')) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/products/deleteOffer/${id}`, { method: 'DELETE', credentials: 'include' })
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
        setOffers(offers.filter(offer => offer._id !== id))
        toast.success('offer deleted')
      } catch (error) {
        toast.error(error.message)
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg text-black">
      <h2 className="text-2xl font-bold mb-4">Manage Offers</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search offers..."
        className="w-full p-2 border border-gray-300 rounded mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Add Offer Button */}
      <button
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => setIsAddModalOpen(true)}
      >
        + Add Offer
      </button>

      {/* Offers Table */}
      {
        isLoading ? (
          <div className={`flex flex-col items-center justify-center min-h-[60vh]`}>
            <PulseLoader color="#36d7b7" size={30} margin={5} />
            <p className="mt-4 text-lg font-medium text-black">Loading Offers...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-md">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-3 text-left">Title</th>
                  <th className="p-3 text-left">Discount</th>
                  <th className="p-3 text-left">End Date</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOffers.length > 0 ? (
                  filteredOffers.map((offer) => (
                    <tr key={offer._id} className="border-b">
                      <td className="p-3">{offer.title}</td>
                      <td className="p-3">{offer.discountPercentage}</td>
                      <td className="p-3">{offer.endDate}</td>
                      <td className="p-3 flex space-x-2">
                        <button
                          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                          onClick={() => handleEditOffer(offer)}
                        >
                          Edit
                        </button>
                        <button
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                          onClick={() => handleDeleteOffer(offer._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="p-3 text-center text-gray-500" colSpan="4">
                      No offers found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )
      }

      {/* ADD OFFER MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-semibold mb-2">Add New Offer</h3>
            <div className="space-y-3">
              <label htmlFor="title" className="mt-3 text-lg">offer Title</label>
              <input type="text" required id="title" name="title" placeholder="Offer Title" className="w-full p-2 border border-gray-300 rounded" value={offerTitle} onChange={(e) => setOfferTitle(e.target.value)} />
              <label htmlFor="discount" className="mt-3 text-lg">Discount Percentage(%)</label>
              <input type="number" required id="discount" placeholder="discount percentage" min="1" max={100} name="discountPercentage" className="w-full p-2 border border-gray-300 rounded" value={discountPercentage} onChange={(e) => setDiscountPercentage(e.target.value)} />
              <label htmlFor="startDate" className="mt-3 text-lg">Start Date</label>
              <input type="date" required id="startDate" name="startDate" className="w-full p-2 border border-gray-300 rounded" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              <label htmlFor="endDate" className="mt-3 text-lg">End Date</label>
              <input type="date" required id="endDate" name="endDate" className="w-full p-2 border border-gray-300 rounded" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
            <div className="flex justify-end mt-4 space-x-2">
              <button className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500" onClick={handleCloseModal}>Cancel</button>
              <button className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ${isAddingOffer && 'opacity-50'}`} onClick={handleAddOffer} disabled={isAddingOffer}>{isAddingOffer ? 'saving offer...' : 'Add Offer'}</button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT OFFER MODAL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-semibold mb-2">Edit Offer</h3>
            <div className="space-y-3">
              <label htmlFor="title" className="mt-3 text-lg">offer Title</label>
              <input type="text" required id="title" name="title" placeholder="Offer Title" className="w-full p-2 border border-gray-300 rounded" value={offerTitle} onChange={(e) => setOfferTitle(e.target.value)} />
              <label htmlFor="discount" className="mt-3 text-lg">Discount Percentage(%)</label>
              <input type="number" required id="discount" placeholder="discount percentage" min="1" max={100} name="discountPercentage" className="w-full p-2 border border-gray-300 rounded" value={discountPercentage} onChange={(e) => setDiscountPercentage(e.target.value)} />
              <label htmlFor="startDate" className="mt-3 text-lg">Start Date</label>
              <input type="date" required id="startDate" name="startDate" className="w-full p-2 border border-gray-300 rounded" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              <label htmlFor="endDate" className="mt-3 text-lg">End Date</label>
              <input type="date" required id="endDate" name="endDate" className="w-full p-2 border border-gray-300 rounded" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
            <div className="flex justify-end mt-4 space-x-2">
              <button className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500" onClick={handleCloseModal}>Cancel</button>
              <button className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ${isAddingOffer && 'opacity-50'}`} onClick={handleSaveEdit} disabled={isAddingOffer}>{isAddingOffer ? 'saving offer...' : 'Save Offer'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}