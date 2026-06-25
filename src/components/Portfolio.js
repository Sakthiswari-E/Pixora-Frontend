import { useState } from "react";

function Portfolio() {
  const [preview, setPreview] = useState(null);
  const projects = [
    {
      title: "Wedding Invitation Design",
      media: "/assets/photo-editing/photoediting4.jpg",
      type: "image",
    },
    {
      title: "Event Banner Design",
      media: "/assets/invitation and banners/image2.jpg",
      type: "image",
    },
    {
      title: "Brand Promotion Video",
      media: "/assets/video-editing/video4.mp4",
      type: "video",
    },
  ];

  return (
    <section
      id="portfolio"
      className="py-24 px-6 md:px-20 bg- black border-t border-white/10"
    >
      <div className="text-center mb-16">

        <p className="text-gray-500 uppercase tracking-[6px] mb-4">
          Portfolio
        </p>

        <h2 className="text-4xl font-bold">
          Our Creative Works
        </h2>

      </div>

      {/* Project Showcase */}
      {/* Project Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-40">

        {projects.map((project, index) => (
          <div
            key={index}
            className="
      bg-[#111]
      rounded-3xl
      overflow-hidden
      border
      border-white/10
      hover:border-fuchsia-500
      transition-all
      duration-300
      hover:-translate-y-2
      "
          >

            <div className="h-72 bg-black flex items-center justify-center overflow-hidden">

              {project.type === "image" ? (

                <img
                  src={project.media}
                  alt={project.title}
                  onClick={() =>
                    setPreview({
                      type: "image",
                      src: project.media,
                    })
                  }
                  className="
            w-full
            h-full
            object-cover
            cursor-zoom-in
            hover:scale-110
            transition
            duration-500
            "
                />

              ) : (

                <video
                  muted
                  playsInline
                  preload="metadata"
                  onClick={() =>
                    setPreview({
                      type: "video",
                      src: project.media,
                    })
                  }
                  className="
            w-full
            h-full
            object-cover
            cursor-pointer
            "
                >
                  <source src={project.media} type="video/mp4" />
                </video>

              )}

            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold">
                {project.title}
              </h3>
            </div>

          </div>
        ))}

      </div>

      {/* Owner Portfolio */}
      <div
        className="
        max-w-4xl
        mx-auto
        bg-[#111]
        border
        border-white/10
        rounded-3xl
        p-10
        text-center
        border-t 
        border-white/10
        "
      >

        <h3 className="text-3xl font-bold mb-4">
          Meet The Creator
        </h3>

        <p className="text-gray-400 mb-8">
          Explore the personal portfolio of our
          creative designer and founder.
        </p>

        <a
          href="https://kudiyarasuk.my.canva.site/kudiyarasu-portfolio"
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-block
            bg-[#111111]
            border
            border-white/10
            rounded-2xl
            px-8
            py-6
            hover:border-white
            hover:-translate-y-2
            transition-all
            duration-300
            "
        >
          View Owner Portfolio
        </a>

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

          <button
            onClick={() => setPreview(null)}
            className="
      absolute
      top-5
      right-5
      text-5xl
      text-white
      hover:text-fuchsia-400
      "
          >
            ✕
          </button>

          {preview.type === "image" ? (

            <img
              src={preview.src}
              alt=""
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
  );
}

export default Portfolio;