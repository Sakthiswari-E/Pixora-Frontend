function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-black text-white">

      <p className="uppercase tracking-[6px] text-gray-400 mb-6">
        Creative Studio & Gift Shop
      </p>

      <h1 className="text-5xl md:text-7xl font-black leading-tight max-w-5xl">
        Creative Gifts.
        <br />
        Stunning Designs.
        <br />
        Professional Editing.
      </h1>

      <p className="mt-8 text-gray-400 text-lg max-w-2xl leading-8">
        Pixora Digital creates premium gifts, cinematic edits,
        modern branding, and professional creative services.
      </p>

      <div className="flex gap-5 mt-10 flex-wrap justify-center">

        <a
          href="#services"
          className="
          border
          border-white
          px-8
          py-4
          rounded-full
          hover:bg-white
          hover:text-black
          transition
          "
        >
          Explore Services
        </a>

        <a
          href="#contact"
          className="
          bg-white
          text-black
          px-8
          py-4
          rounded-full
          hover:bg-gray-200
          transition
          "
        >
          Contact Us
        </a>

      </div>

    </section>
  );
}

export default Hero;