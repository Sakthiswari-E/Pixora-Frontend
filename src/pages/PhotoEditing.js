import { useState, useEffect } from "react";
import API from "../api/axios";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import ProductSkeleton from "../components/ProductSkeleton";

function PhotoEditing() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [currentImages, setCurrentImages] = useState({});
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const services = [
    "Background Removal",
    "Photo Retouching",
    "Color Grading",
    "Wedding Album Editing",
    "Skin Smoothing",
    "Product Photo Enhancement",
  ];

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await API.get("/products/category/photo-editing");
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

 Photo Editing Request

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
          Photo Editing Services
        </h1>

        <p className="text-gray-400 max-w-2xl mx-auto">
          Professional photo editing, album design,
          retouching and premium enhancements.
        </p>
      </section>

      {/* Search */}
      <div className="max-w-6xl mx-auto px-6 mb-14">
        <input
          type="text"
          placeholder="🔍 Search Editing Services..."
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

      {/* Products */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {[...Array(8)].map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
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
                className="group bg-gradient-to-b from-[#111] to-[#1b1b1b] rounded-xl md:rounded-3xl overflow-hidden border border-white/10 hover:border-fuchsia-500/40 shadow-lg hover:shadow-fuchsia-500/20 transition-all duration-500"
              >

                {/* Image Section */}
                <div className="relative overflow-hidden h-44 sm:h-52 md:h-60 lg:h-72">

                  <img
                    loading="lazy"
                    src={product.images?.[currentImages[product._id] || 0]}
                    alt={product.name}
                    onClick={() =>
                      setPreview({
                        type: "image",
                        src: product.images?.[currentImages[product._id] || 0],
                      })
                    }
                    className="
                  w-full
                  h-full
                  object-cover
                  transition-all
                  duration-700
                  group-hover:scale-110
                  cursor-zoom-in
                "
                  />

                  {/* Multiple Images */}
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

                </div>

                {/* Content */}
                <div className="p-3 sm:p-4 md:p-5">

                  <div className="flex justify-between items-start mb-3">

                    <h3 className="text-sm sm:text-base md:text-lg font-bold leading-tight">
                      {product.name}
                    </h3>

                    <div className="flex items-center gap-0.5 text-yellow-400 text-[9px] sm:text-xs md:text-base">
                      <FaStar className="text-[8px] sm:text-[10px] md:text-base" />
                      <span>{product.rating}</span>
                    </div>

                  </div>

                  <p className="text-gray-400 text-xs sm:text-sm md:text-sm mb-3 md:mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="mb-6">

                    <p className="line-through text-gray-500 text-sm">
                      ₹{product.originalPrice}
                    </p>

                    <p
                      className="text-xl sm:text-2xl md:text-3xl font-black bg-gradient-to-r from-pink-400 via-fuchsia-500 to-violet-600 bg-clip-text text-transparent"
                    >
                      ₹{product.price} {product.priceLabel || ""}
                    </p>

                  </div>

                  <button
                    onClick={() => handleBuyNow(product)}
                    className="w-full bg-gradient-to-r from-pink-400 via-fuchsia-500 to-violet-600 text-white py-2 md:py-3 rounded-lg md:rounded-xl text-[9px] sm:text-[10px] md:text-base font-bold transition-all duration-500 hover:scale-105 hover:brightness-125 shadow-lg shadow-fuchsia-500/30"
                  >
                    <span className="md:hidden">Order</span>
                    <span className="hidden md:inline">Order Editing</span>
                  </button>

                </div>

              </motion.div>

            ))}

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
              text-3xl
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

export default PhotoEditing;