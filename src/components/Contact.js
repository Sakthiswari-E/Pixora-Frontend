function Contact() {
  return (
    <section
      id="contact"
      className="py-24 px-6 md:px-20 border-t border-white/10"
    >
      <div className="max-w-4xl mx-auto text-center">

        <p className="text-gray-500 uppercase tracking-[6px] mb-4">
          Contact
        </p>

        <h2 className="text-4xl font-bold mb-6">
          Let’s Create Something Amazing
        </h2>

        <p className="text-gray-400 mb-10">
          Reach out for gifts, editing services,
          branding, and creative projects.
        </p>

        <div className="flex flex-wrap justify-center gap-6">

          {/* WhatsApp */}
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=pixoradigitalstudio@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="
            bg-[#111111]
            border
            border-white/10
            rounded-2xl
            px-8
            py-6
            hover:border-green-500
            hover:text-green-400
            hover:-translate-y-2
            transition-all
            duration-300
            "
          >
            WhatsApp
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/pixora_digital_?igsh=bThiMnRmYXFjMnZu"
            target="_blank"
            rel="noopener noreferrer"
            className="
            bg-[#111111]
            border
            border-white/10
            rounded-2xl
            px-8
            py-6
            hover:border-fuchsia-500
            hover:text-fuchsia-400
            hover:-translate-y-2
            transition-all
            duration-300
            "
          >
            Instagram
          </a>

          {/* Email */}
          <a
            href="pixoradigitalstudio@gmail.com"
            className="
            bg-[#111111]
            border
            border-white/10
            rounded-2xl
            px-8
            py-6
            hover:border-red-500
            hover:text-red-400
            hover:-translate-y-2
            transition-all
            duration-300
            "
          >
            Email
          </a>

        </div>

      </div>
    </section>
  );
}

export default Contact;