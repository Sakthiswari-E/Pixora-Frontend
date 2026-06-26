import { useEffect, useState } from "react";
import API from "../api/axios";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await API.get("/cart");
      setCartItems(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = async (id) => {
    try {
      await API.delete(`/cart/${id}`);

      setCartItems(
        cartItems.filter((item) => item._id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuyNow = (product) => {
    const message = `
Hello Pixora 👋

I would like to order:

📦 Product: ${product.name}
📏 Size: ${product.size}
💰 Price: ₹${product.price}
📦 Quantity: ${product.quantity || 1}

Please provide more details.
`;

    window.open(
      `https://wa.me/916383009739?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-black text-white pt-32 px-6">

      <h1 className="text-4xl font-bold mb-10">
        My Cart
      </h1>

      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="
              group
              bg-gradient-to-b
              from-[#111]
              to-[#1b1b1b]
              rounded-3xl
              overflow-hidden
              border
              border-white/10
              hover:border-fuchsia-500/40
              shadow-xl
              hover:shadow-fuchsia-500/20
              transition-all
              duration-500
              max-w-sm
              "
            >
              <img
                src={item.product?.images[0]}
                alt={item.product?.name}
                className="
                w-full
                h-72
                object-cover
                transition-all
                duration-700
                group-hover:scale-105
                "
              />

              <div className="p-5">

                <div className="flex justify-between items-start mb-3">

                  <h3 className="text-2xl font-bold">
                    {item.product?.name}
                  </h3>

                  <span className="text-yellow-400 font-bold">
                    ⭐ {item.product?.rating}
                  </span>

                </div>

                <div className="flex justify-between items-center mb-3">

                  <span className="text-gray-400">
                    {item.product?.category}
                  </span>

                  <span className="text-gray-300">
                    {item.product?.size}
                  </span>

                </div>

                <div className="flex justify-between items-center mb-4">

                  <div>

                    <p className="text-gray-500 line-through text-sm">
                      ₹{item.product?.originalPrice}
                    </p>

                    <p
                      className="
                      text-4xl
                      font-black
                      bg-gradient-to-r
                      from-pink-400
                      via-fuchsia-500
                      to-violet-600
                      bg-clip-text
                      text-transparent
                      "
                    >
                      ₹{item.product?.price}
                    </p>

                  </div>

                  <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs">
                    In Stock
                  </div>

                </div>

                <p className="text-gray-300 mb-4">
                  Quantity: {item.quantity}
                </p>

                <div className="flex gap-3">

                  <button
                    onClick={() => removeItem(item._id)}
                    className="
                    flex-1
                    border
                    border-red-500
                    text-red-400
                    py-3
                    rounded-xl
                    font-semibold
                    hover:bg-red-500
                    hover:text-white
                    transition-all
                    "
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => handleBuyNow(item.product)}
                    className="
                    flex-1
                    bg-gradient-to-r
                    from-pink-400
                    via-fuchsia-500
                    to-violet-600
                    text-white
                    py-3
                    rounded-xl
                    font-bold
                    transition-all
                    duration-500
                    hover:scale-105
                    hover:brightness-125
                    shadow-lg
                    shadow-fuchsia-500/30
                    "
                  >
                    Buy Now
                  </button>

                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cart;