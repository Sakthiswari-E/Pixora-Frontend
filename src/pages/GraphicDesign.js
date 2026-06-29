import { useState, useEffect } from "react";
import API from "../api/axios";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";



const services = [
  "Logo Design",
  "Poster Design",
  "Banner Design",
  "Social Media Posts",
  "Business Cards",
  "Invitation Cards",
];
function GraphicDesign() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [preview, setPreview] = useState(null);
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");

      const graphicProducts = res.data.filter(
        (item) =>
          item.category === "graphic-design"
      );

      setProducts(graphicProducts);
    } catch (error) {
      console.log(error);
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

    const productLink = `${MEDIA_BASE}/product/${product._id}`;

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

 Graphic design Request

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
          Graphic Design Services
        </h1>

        <p className="text-gray-400 max-w-2xl mx-auto">
          Professional designs that elevate your brand.
        </p>
      </section>

      {/* Search */}
      <div className="max-w-6xl mx-auto px-6 mb-14">
        <input
          type="text"
          placeholder="🔍 Search Designs..."
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

      <section className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-4xl font-bold text-center mb-14">
          Our Services
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-[#111111] border border-white/10 rounded-3xl p-8 text-center hover:border-white transition"
            >
              <h3 className="text-xl font-semibold">
                {service}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* Design Portfolio */}
      <section className="max-w-5xl mx-auto px-6 pb-24 lg:grid-cols-3">

        <div className="space-y-12">

          {filteredProducts.map((product) => (

            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.01 }}
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
              <div className="grid lg:grid-cols-2 gap-6">

                {/* Left Side Preview */}
                <div className="bg-black flex items-center justify-center p-4">

                  {product.images?.[0]?.match(/\.(mp4|webm|ogg)$/i) ? (
                    <video
                      controls
                      onClick={() =>
                        setPreview({
                          type: "video",
                          src: product.images[0],
                        })
                      }
                      className="
                      w-full
                      h-[600px]
                      object-contain
                      rounded-2xl
                      cursor-pointer
                      "
                    >
                      <source
                        src={product.images[0]}
                        type="video/mp4"
                      />
                    </video>

                  ) : (

                    <img
                      src={product.images[0]}
                      alt={product.name}
                      onClick={() =>
                        setPreview({
                          type: "image",
                          src: `${product.images[0]}`
                        })
                      }
                      className="
                      w-full
                      h-[500px]
                      object-contain
                      rounded-2xl
                      cursor-zoom-in
                      hover:scale-[1.02]
                      transition
                      "
                    />

                  )}

                </div>

                {/* Right Side Details */}
                <div className="p-10 flex flex-col justify-center">

                  <span
                    className="
                      bg-fuchsia-500
                      px-4
                      py-2
                      rounded-full
                      text-sm
                      w-fit
                      mb-6
                      "
                  >
                    {product.category}
                  </span>

                  <h2 className="text-4xl font-black mb-4">
                    {product.name}
                  </h2>

                  <div className="flex items-center gap-2 text-yellow-300 mb-4">
                    <FaStar />
                    {product.rating}
                  </div>

                  <p className="text-gray-300 text-lg mb-8">
                    {product.description}
                  </p>

                  {/* Banner Sizes */}
                  {product.bannerSizes?.length > 0 && (
                    <div className="mb-8">

                      <h4 className="text-xl font-bold mb-4">
                        Banner Sizes & Prices
                      </h4>

                      <div className="space-y-3">

                        {product.bannerSizes.map((item, index) => (
                          <div
                            key={index}
                            className="
                            flex
                            justify-between
                            items-center
                            bg-black
                            border
                            border-fuchsia-500/20
                            rounded-2xl
                            px-5
                            py-4
                            hover:border-fuchsia-500/40
                            transition
                            "
                          >
                            <span className="font-medium">
                              {item.size}
                            </span>

                            <span className="text-fuchsia-400 font-bold text-lg">
                              ₹{item.price}
                            </span>
                          </div>
                        ))}

                      </div>

                    </div>
                  )}

                  <button
                    onClick={() => handleBuyNow(product)}
                    className="
                      w-full
                      py-5
                      rounded-2xl
                      font-bold
                      text-lg
                      bg-gradient-to-r
                      from-pink-400
                      via-fuchsia-500
                      to-violet-600
                      hover:scale-105
                      transition-all
                      duration-500
                      shadow-lg
                      shadow-fuchsia-500/30
                      "
                  >
                    Buy
                  </button>

                </div>

              </div>
            </motion.div>

          ))}
        </div>

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
    </div>
  );
}

export default GraphicDesign;