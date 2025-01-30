const CheckoutPage = () => {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-4xl font-bold text-center">Checkout</h1>
        <form className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border rounded"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full mt-1 p-2 border rounded"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Address</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border rounded"
              placeholder="Enter your address"
            />
          </div>
          <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded w-full md:w-auto">
            Place Order
          </button>
        </form>
      </div>
    );
  };
  
  export default CheckoutPage;
  