import {
  FaGem,
  FaPaintBrush,
  FaRocket,
  FaRupeeSign,
  FaThumbsUp,
} from "react-icons/fa";

function WhyChooseUs() {
  const features = [
    {
      icon: <FaGem />,
      title: "Premium Quality",
      description: "Crafted with attention to every detail.",
    },
    {
      icon: <FaPaintBrush />,
      title: "Creative Designs",
      description: "Unique concepts tailored for you.",
    },
    {
      icon: <FaRocket />,
      title: "Fast Delivery",
      description: "Quick turnaround without compromise.",
    },
    {
      icon: <FaRupeeSign />,
      title: "Affordable Pricing",
      description: "Premium services at fair prices.",
    },
    {
      icon: <FaThumbsUp />,
      title: "Customer Satisfaction",
      description: "Your happiness is our priority.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-24 border-t border-white/10">

      <h2 className="text-4xl font-black text-center mb-16">
        Why Choose Us
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">

        {features.map((item, index) => (
          <div
            key={index}
            className="
            bg-[#111111]
            border
            border-white/10
            rounded-3xl
            p-6
            text-center
            hover:border-white
            hover:-translate-y-2
            transition-all
            duration-300
            "
          >
            <div className="text-5xl mb-4 flex justify-center">
              {item.icon}
            </div>

            <h3 className="font-bold text-lg mb-2">
              {item.title}
            </h3>

            <p className="text-gray-400 text-sm">
              {item.description}
            </p>
          </div>
        ))}

      </div>

    </section>
  );
}

export default WhyChooseUs;