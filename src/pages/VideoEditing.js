import { useState, useEffect } from "react";
import API from "../api/axios";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import ProductSkeleton from "../components/ProductSkeleton";

function VideoEditing() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await API.get("/products/category/video-editing");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleBuyNow = (product) => {
    const MEDIA_BASE = window.location.origin;

    let mediaUrl = "";

    if (product.video) {
      mediaUrl = `${MEDIA_BASE}${product.video}`;
    } else if (product.images?.length > 0) {
      mediaUrl = `${MEDIA_BASE}${product.images[0]}`;
    }

    const message = `
Hello Pixora 👋

I am interested in:

 Product: ${product.name}
 Category: ${product.category}
 Price: ₹${product.price}

 Preview:
${mediaUrl}

Please share more details.
`;

    window.open(
      `https://wa.me/916383009739?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };


  const services = [
    "Instagram Reels",
    "YouTube Videos",
    "Wedding Highlights",
    "Travel Videos",
    "Gaming Montages",
    "Corporate Videos",
  ];
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
Hello PIXORA 

 Video Editing Request

 Name: ${formData.name}
 Email: ${formData.email}

 Requirement:
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

      {/* Hero */}
      <section className="pt-32 pb-16 text-center">
        <p className="uppercase tracking-[6px] text-gray-500 mb-4">
          Pixora Digital
        </p>

        <h1 className="text-5xl md:text-7xl font-black mb-4">
          Professional Video Editing
        </h1>

        <p className="text-gray-400 max-w-2xl mx-auto">
          Transform your raw footage into stunning visual stories.
        </p>
      </section>

      {/* Search */}
      <div className="max-w-6xl mx-auto px-6 mb-14">
        <input
          type="text"
          placeholder="🔍 Search Video Services..."
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
          outline-none
          transition-all
          duration-500
          "
        />
      </div>

      {/* Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-14">
          Editing Services
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gradient-to-b from-[#151515] to-[#0d0d0d] border border-white/10 rounded-2xl md:rounded-3xl px-3 py-6 sm:px-4 sm:py-7 md:p-8 text-center min-h-[110px] sm:min-h-[125px] md:min-h-[150px] flex items-center justify-center hover:border-fuchsia-500/50 hover:bg-fuchsia-500/5 hover:-translate-y-1 transition-all duration-300 shadow-lg"
            >
              <div>
                {/* <div className="text-fuchsia-400 text-xs sm:text-sm font-bold mb-2 opacity-70">
                  0{index + 1}
                </div> */}

                <h3 className="text-sm sm:text-sm md:text-xl font-semibold leading-snug">
                  {service}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Video */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 md:pb-20">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {[...Array(3)].map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">

            {filteredProducts.map((product) => (

              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                className="group bg-gradient-to-b from-[#111] to-[#1b1b1b] rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 hover:border-fuchsia-500/40 shadow-lg hover:shadow-fuchsia-500/20 transition-all duration-500"
              >

                {/* Video */}
                <div className="bg-black w-full aspect-video overflow-hidden">
                  <video
                    controls
                    src={product.images?.[0]}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="p-4 sm:p-5 md:p-8">

                  <span className="bg-fuchsia-500 px-3 py-1 rounded-full text-[10px] sm:text-xs md:text-sm w-fit inline-block mb-3 md:mb-4">
                    Featured Project
                  </span>

                  <h2 className="text-lg sm:text-xl md:text-3xl font-black mb-3 leading-tight">
                    {product.name}
                  </h2>

                  <div className="flex items-center gap-2 text-yellow-400 text-sm md:text-base mb-3 md:mb-4">
                    <FaStar />
                    {product.rating}
                  </div>

                  <p className="text-gray-400 text-sm md:text-base mb-4 md:mb-6 line-clamp-2">
                    {product.description}
                  </p>

                  <p className="line-through text-gray-500 text-sm">
                    ₹{product.originalPrice}
                  </p>

                  <p className="text-2xl sm:text-3xl md:text-5xl font-black mb-4 md:mb-6 bg-gradient-to-r from-pink-400 via-fuchsia-500 to-violet-600 bg-clip-text text-transparent">
                    ₹{product.price}
                  </p>

                  <button
                    onClick={() => handleBuyNow(product)}
                    className="w-full bg-gradient-to-r from-pink-400 via-fuchsia-500 to-violet-600 py-3 md:py-4 rounded-xl text-sm md:text-base font-bold hover:scale-[1.02] transition-all duration-500"
                  >
                    Get Similar Edit
                  </button>

                </div>

              </motion.div>

            ))}

          </div>
        )}
      </section>

      <section className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">
          Submit Editing Request
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

    </div >
  );
}

export default VideoEditing;