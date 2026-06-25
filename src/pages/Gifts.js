import { useState, useEffect } from "react";
import API from "../api/axios";
import { motion } from "framer-motion";
import { FaStar, FaShoppingCart } from "react-icons/fa";

function Gifts() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [currentImages, setCurrentImages] = useState({});
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      const Frames = res.data.filter(
        (item) =>
          item.category === "Frames" ||
          item.category === "gifts"
      );
      setProducts(Frames);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = async (productId) => {
    try {
      await API.post("/cart", {
        product: productId,
        quantity: 1,
      });

      alert("Added To Cart");
    } catch (error) {
      alert("Please Login First");
    }
  };
  const handleBuyNow = (product) => {
    const message = `
Hello PIXORA 

 Photo Editing Request

 Name: ${formData.name}
 Email: ${formData.email}

 Requirement:
${formData.requirement}

      Please provide more details.
     `;
    window.open(
      `https://wa.me/916383009739?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    requirement: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const message = `
Hello Pixora 👋

🎬 custom gift request

👤 Name: ${formData.name}
📧 Email: ${formData.email}

📝 Requirement:
${formData.requirement}

Please contact me regarding this project.
`;

    window.open(
      `https://wa.me/916383009739?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };


  return (
    <div className="bg-black text-white min-h-screen">

      {/* Hero Section */}
      <section className="pt-32 pb-12 text-center">
        <h1 className="text-5xl md:text-7xl font-black mb-4">
          Custom Gifts
        </h1>

        <p className="text-gray-400 max-w-2xl mx-auto">
          Personalized gifts crafted with creativity and love.
        </p>
      </section>

      {/* Search */}
      <div className="max-w-6xl mx-auto px-6 mb-14">
        <input
          type="text"
          placeholder="🔍 Search Gifts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
          w-full
          p-5
          rounded-2xl
          bg-[#111]
          border
          border-white/10
          text-white
          placeholder:text-gray-500

          focus:border-fuchsia-500
          focus:ring-4
          focus:ring-fuchsia-500/20

          hover:border-fuchsia-500/30

          shadow-xl
          shadow-black/50

          outline-none
          transition-all
          duration-500
          "
        />
      </div>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-24">

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">

          {filteredProducts.map((product, index) => (

            <motion.div
              key={product._id}
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              whileHover={{
                y: -12,
                scale: 1.03,
              }}
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
              transition
              "
            >

              {/* Product Image */}
              <div className="relative overflow-hidden h-72">

                {product.video ? (

                  <div
                    className="relative w-full h-full cursor-pointer"
                    onClick={() => setSelectedVideo(product.video)}
                  >
                    <img
                      src={product.images?.[0]}
                      alt={product.name}
                      onClick={() =>
                        setPreview({
                          type: "video",
                          src: `http://localhost:3000${product.images[0]}`
                        })
                      }
                      className="
                      w-full
                      h-full
                      object-cover
                      transition-all
                      duration-700
                      group-hover:scale-110
                      "
                    />

                    <div
                      className="
                      absolute
                      inset-0
                      flex
                      items-center
                      justify-center
                      bg-black/30
                      "
                    >
                      <div
                        className="
                        bg-white/20
                        backdrop-blur-md
                        px-5
                        py-3
                        rounded-full
                        text-white
                        font-bold
                        text-lg
                        "
                      >
                        ▶ Play Video
                      </div>
                    </div>
                  </div>

                ) : (

                  <>
                    <img
                      src={
                        product.images?.[
                        currentImages[product._id] || 0
                        ]
                      }
                      onClick={() =>
                        setPreview({
                          type: "image",
                          src: `http://localhost:3000${product.images[0]}`
                        })
                      }
                      alt={product.name}
                      className="
                      w-full
                      h-full
                      object-cover
                      transition-all
                      duration-700
                      group-hover:scale-110
                      "
                    />

                    {product.images?.length > 1 && (
                      <>
                        <button
                          onClick={() =>
                            setCurrentImages((prev) => ({
                              ...prev,
                              [product._id]:
                                (prev[product._id] || 0) === 0
                                  ? product.images.length - 1
                                  : (prev[product._id] || 0) - 1,
                            }))
                          }
                          className="
                          absolute
                          left-2
                          top-1/2
                          -translate-y-1/2
                          bg-black/60
                          px-3
                          py-2
                          rounded-full
                          text-white
                          "
                        >
                          ◀
                        </button>

                        <button
                          onClick={() =>
                            setCurrentImages((prev) => ({
                              ...prev,
                              [product._id]:
                                ((prev[product._id] || 0) + 1) %
                                product.images.length,
                            }))
                          }
                          className="
                          absolute
                          right-2
                          top-1/2
                          -translate-y-1/2
                          bg-black/60
                          px-3
                          py-2
                          rounded-full
                          text-white
                          "
                        >
                          ▶
                        </button>
                      </>
                    )}
                  </>
                )}
              </div>
              {/* Product Content */}
              <div className="p-5">

                {/* Name + Rating */}
                <div className="flex justify-between items-start mb-3">

                  <h3 className="text-lg font-bold leading-tight">
                    {product.name}
                  </h3>

                  <div className="flex items-center gap-1 text-yellow-400">
                    <FaStar />
                    <span>{product.rating}</span>
                  </div>

                </div>

                {/* Size */}
                <div className="flex justify-between items-center mb-4">

                  <span className="text-gray-400">
                    Size
                  </span>

                  <span className="text-gray-300">
                    {product.size}
                  </span>

                </div>

                {/* Price Section */}
                <div className="flex justify-between items-center mb-6">

                  <div>

                    <p className="text-gray-500 line-through text-sm">
                      ₹{product.originalPrice}
                    </p>

                    <p
                      className="
                        text-3xl
                        font-bold
                        bg-gradient-to-r
                        from-pink-400
                        via-fuchsia-500
                        to-violet-600
                        bg-clip-text
                        text-transparent
                        "
                    >
                      ₹{product.price}
                    </p>

                  </div>

                  <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs">
                    In Stock
                  </div>

                </div>

                {/* Buttons */}
                <div className="flex gap-3">

                  <button
                    onClick={() => addToCart(product._id)}
                    className="
                    flex-1
                    flex
                    items-center
                    justify-center
                    gap-2
                    border
                    border-white/20
                    py-3
                    rounded-xl
                    hover:bg-white
                    hover:text-black
                    transition
                    "
                  >
                    <FaShoppingCart />
                    Cart
                  </button>

                  <button
                    onClick={() => handleBuyNow(product)}
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
                      hover:shadow-2xl
                      hover:shadow-fuchsia-500/60
                      border
                      border-pink-400/30
                      "
                  >
                    Buy Now
                  </button>

                </div>

              </div>

            </motion.div>

          ))}

        </div>
        {selectedVideo && (
          <div
            className="
                    fixed
                    inset-0
                    z-50
                    bg-black/95
                    flex
                    items-center
                    justify-center
                    "
          >
            <button
              onClick={() => setSelectedVideo(null)}
              className="
                      absolute
                      top-6
                      right-6
                      text-white
                      text-5xl
                      "
            >
              ✕
            </button>

            <video
              src={selectedVideo}
              controls
              autoPlay
              className="
                      max-w-[95vw]
                      max-h-[90vh]
                      rounded-2xl
                      "
            />
          </div>
        )}

        {preview && (
          <div
            onClick={() => setPreview(null)}
            className="
      fixed
      inset-0
      z-50
      bg-black/95
      flex
      items-center
      justify-center
      p-6
    "
          >
            {/* Close Button */}
            <button
              onClick={() => setPreview(null)}
              className="
        absolute
        top-6
        right-6
        text-white
        text-5xl
        hover:text-fuchsia-400
        z-50
      "
            >
              ✕
            </button>

            {preview.type === "image" ? (
              <img
                src={preview.src}
                alt="Preview"
                onClick={(e) => e.stopPropagation()}
                className="
          max-w-[95vw]
          max-h-[95vh]
          object-contain
          rounded-3xl
        "
              />
            ) : (
              <video
                controls
                autoPlay
                onClick={(e) => e.stopPropagation()}
                className="
          max-w-[95vw]
          max-h-[95vh]
          rounded-3xl
        "
              >
                <source src={preview.src} type="video/mp4" />
              </video>
            )}
          </div>
        )}

      </section>
      <section className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">
          Submit custom gift Request
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-4 bg-[#111111] border border-white/10 rounded-xl"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-4 bg-[#111111] border border-white/10 rounded-xl"
            required
          />

          <textarea
            rows="6"
            name="requirement"
            placeholder="Describe Your Editing Requirements"
            value={formData.requirement}
            onChange={handleChange}
            className="w-full p-4 bg-[#111111] border border-white/10 rounded-xl"
            required
          />

          <button
            type="submit"
            className="
            w-full
            bg-[#111111]
            border
            border-white/10
            rounded-2xl
            text-white
            py-4
            rounded-xl
            font-semibold
            hover:border-white
            hover:-translate-y-2
            transition-all
            duration-300
            "
          >
            Submit on WhatsApp
          </button>

        </form>
      </section>
    </div>
  );
}

export default Gifts;