import { useState, useEffect } from "react";
import API from "../api/axios";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import ProductSkeleton from "../components/ProductSkeleton";


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
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const res = await API.get(
          "/products/category/graphic-design"
        );

        setProducts(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

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

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-14">
          Graphic Design Services
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

      {/* Design Portfolio */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">

        {loading ? (

          <div className="grid grid-cols-1 gap-6 md:gap-8">
            {[...Array(3)].map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>

        ) : (

          <div className="space-y-8 md:space-y-12">

            {filteredProducts.map((product) => (

              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.01 }}
                className="bg-[#111] rounded-2xl md:rounded-3xl overflow-hidden border border-fuchsia-500/20 hover:border-fuchsia-500/40 transition-all duration-500"
              >

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

                  {/* Preview */}
                  <div className="bg-black flex items-center justify-center p-3 sm:p-5 md:p-6">

                    {product.images?.[0]?.match(/\.(mp4|webm|ogg)$/i) ? (

                      <video
                        controls
                        onClick={() =>
                          setPreview({
                            type: "video",
                            src: product.images[0],
                          })
                        }
                        className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-contain rounded-xl md:rounded-2xl cursor-pointer"
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
                            src: product.images[0],
                          })
                        }
                        className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-contain rounded-xl md:rounded-2xl cursor-zoom-in hover:scale-[1.02] transition"
                      />

                    )}

                  </div>

                  {/* Details */}
                  <div className="p-5 sm:p-7 md:p-10 flex flex-col justify-center">

                    <span className="bg-fuchsia-500 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm w-fit mb-4 md:mb-6">
                      {product.category}
                    </span>

                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-3 md:mb-4 leading-tight">
                      {product.name}
                    </h2>

                    <div className="flex items-center gap-2 text-yellow-300 text-sm md:text-base mb-3 md:mb-4">
                      <FaStar />
                      {product.rating}
                    </div>

                    <p className="text-gray-300 text-sm sm:text-base md:text-lg mb-5 md:mb-8">
                      {product.description}
                    </p>

                    {/* Banner Sizes */}
                    {product.bannerSizes?.length > 0 && (

                      <div className="mb-5 md:mb-8">

                        <h4 className="text-base sm:text-lg md:text-xl font-bold mb-3 md:mb-4">
                          Banner Sizes & Prices
                        </h4>

                        <div className="space-y-2 md:space-y-3">

                          {product.bannerSizes.map((item, index) => (

                            <div
                              key={index}
                              className="flex justify-between items-center bg-black border border-fuchsia-500/20 rounded-xl md:rounded-2xl px-3 py-3 md:px-5 md:py-4 hover:border-fuchsia-500/40 transition"
                            >

                              <span className="text-xs sm:text-sm md:text-base font-medium">
                                {item.size}
                              </span>

                              <span className="text-fuchsia-400 font-bold text-sm sm:text-base md:text-lg">
                                ₹{item.price}
                              </span>

                            </div>

                          ))}

                        </div>

                      </div>

                    )}

                    <button
                      onClick={() => handleBuyNow(product)}
                      className="w-full py-3 md:py-5 rounded-xl md:rounded-2xl font-bold text-sm md:text-lg bg-gradient-to-r from-pink-400 via-fuchsia-500 to-violet-600 hover:scale-[1.02] transition-all duration-500 shadow-lg shadow-fuchsia-500/30"
                    >
                      Buy
                    </button>

                  </div>

                </div>

              </motion.div>

            ))}

          </div>

        )}

        {/* Preview Modal */}
        {preview && (

          <div
            onClick={() => setPreview(null)}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 md:p-6"
          >

            <button
              onClick={() => setPreview(null)}
              className="absolute top-4 right-4 md:top-6 md:right-6 text-4xl md:text-5xl text-white hover:text-fuchsia-400 z-50"
            >
              ✕
            </button>

            {preview.type === "image" ? (

              <img
                src={preview.src}
                alt="Preview"
                onClick={(e) => e.stopPropagation()}
                className="max-w-[95vw] max-h-[90vh] object-contain rounded-2xl md:rounded-3xl"
              />

            ) : (

              <video
                controls
                autoPlay
                onClick={(e) => e.stopPropagation()}
                className="max-w-[95vw] max-h-[90vh] rounded-2xl md:rounded-3xl"
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