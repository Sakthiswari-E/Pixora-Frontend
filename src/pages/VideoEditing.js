import { useState, useEffect } from "react";
import API from "../api/axios";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

function VideoEditing() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");

      const videoProducts = res.data.filter(
        (item) => item.category === "video-editing"
      );
      setProducts(videoProducts);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleBuyNow = (product) => {
    const message = `
Hello Pixora 👋

I am interested in:
   image: ${product.images[0]}
🎬 Service: ${product.name}
💰 Price: ₹${product.price}

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
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-14">
          Editing Services
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="
              bg-[#111]
              border
              border-white/10
              rounded-3xl
              p-8
              text-center
              hover:border-fuchsia-500
              transition
              "
            >
              <h3 className="text-xl font-semibold">
                {service}
              </h3>
            </div>
          ))}
        </div>
      </section>
      {/* Featured Video */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="space-y-12">
          {filteredProducts.map((product) => (

            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              className="
              bg-[#111]
              rounded-3xl
              overflow-hidden
              border
              border-fuchsia-500/20
              hover:border-fuchsia-500/40
              transition-all
              duration-500
              "
            >

              <div className="grid lg:grid-cols-5 ">

                {/* Video */}
                <div className="lg:col-span-4 bg-black flex justify-center items-center p-0">

                  <video
                    controls
                    src={product.images?.[0]}
                    className="
                  w-full
                  rounded-2xl
                  aspect-video
                  object-contain
                  "
                  />

                </div>

                {/* Details */}
                <div className="lg:col-span-1 p-8 flex flex-col justify-center">

                  <span
                    className="
                  bg-fuchsia-500
                  px-3
                  py-1
                  rounded-full
                  text-sm
                  w-fit
                  mb-4
                  "
                  >
                    Featured Project
                  </span>

                  <h2 className="text-4xl font-black mb-4">
                    {product.name}
                  </h2>

                  <div className="flex items-center gap-2 text-yellow-400 mb-4">
                    <FaStar />
                    {product.rating}
                  </div>

                  <p className="text-gray-400 mb-6">
                    {product.description}
                  </p>

                  <p className="line-through text-gray-500">
                    ₹{product.originalPrice}
                  </p>

                  <p
                    className="
                  text-5xl
                  font-black
                  mb-6
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

                  <button
                    onClick={() => handleBuyNow(product)}
                    className="
                  bg-gradient-to-r
                  from-pink-400
                  via-fuchsia-500
                  to-violet-600
                  py-4
                  rounded-xl
                  font-bold
                  hover:scale-105
                  transition-all
                  duration-500
                  "
                  >
                    Get Similar Edit
                  </button>

                </div>

              </div>

            </motion.div>

          ))}
        </div>
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