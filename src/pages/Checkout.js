function Checkout() {
  return (
    <div className="min-h-screen bg-black text-white px-10 py-24">
      <h1 className="text-5xl font-bold mb-10">
        Checkout
      </h1>

      <div className="bg-[#111] p-8 rounded-3xl max-w-xl">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 mb-4 rounded bg-black border border-gray-700"
        />

        <input
          type="text"
          placeholder="Address"
          className="w-full p-3 mb-4 rounded bg-black border border-gray-700"
        />

        <input
          type="text"
          placeholder="Phone Number"
          className="w-full p-3 mb-4 rounded bg-black border border-gray-700"
        />

        <button className="bg-white text-black px-8 py-3 rounded-full">
          Place Order
        </button>
      </div>
    </div>
  );
}

export default Checkout;