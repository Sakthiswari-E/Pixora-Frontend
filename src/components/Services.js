import { Link } from "react-router-dom";

const services = [
  {
    title: "Custom Gifts",
    description: "Personalized gifts for special occasions.",
    path: "/gifts",
  },
  {
    title: "Video Editing",
    description: "Professional reels and cinematic edits.",
    path: "/video-editing",
  },
  {
    title: "Graphic Designing",
    description: "Creative posters, logos, and branding.",
    path: "/graphic-design",
  },
  {
    title: "Photo Editing",
    description: "Retouching and premium enhancements.",
    path: "/photo-editing",
  },
];

function Services() {
  return (
    <section id="services" className="py-24 px-6 md:px-20 border-t border-white/10">
      <div className="text-center mb-16">
        <p className="text-gray-500 uppercase tracking-[6px] mb-4">
          Services
        </p>

        <h2 className="text-4xl font-bold">
          What We Offer
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service, index) => (
          <Link
            key={index}
            to={service.path}
            className="bg-[#111111] border border-white/10 rounded-3xl p-8 hover:border-white hover:-translate-y-2 transition duration-300 block"
          >
            <h3 className="text-2xl font-semibold mb-4">
              {service.title}
            </h3>

            <p className="text-gray-400 leading-7 mb-6">
              {service.description}
            </p>

            <span className="text-white font-medium">
              View Details →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Services;