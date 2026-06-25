function Orders() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 px-6">

      <h1 className="text-4xl font-bold mb-10">
        My Orders
      </h1>

      <div className="bg-[#111] p-8 rounded-2xl border border-white/10">

        <p className="text-gray-400">
          No orders yet.
        </p>

      </div>

    </div>
  );
}

export default Orders;