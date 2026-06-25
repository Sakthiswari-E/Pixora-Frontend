import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-black/90 backdrop-blur-lg border-b border-white/10 z-50">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="/assets/logo/Silverlogo.png"
            alt="Pixora"
            className="
            h-12
            w-auto
            scale-150
            object-contain
            "
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">

          <a
            href="#services"
            className="text-gray-400 hover:text-white transition"
          >
            Services
          </a>

          <a
            href="#portfolio"
            className="text-gray-400 hover:text-white transition"
          >
            Portfolio
          </a>

          <a
            href="#about"
            className="text-gray-400 hover:text-white transition"
          >
            About
          </a>

          <a
            href="#contact"
            className="text-gray-400 hover:text-white transition"
          >
            Contact
          </a>

          {/* User / Login */}
          {user ? (
            <div className="relative group flex items-center gap-3 cursor-pointer">

              <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-bold">
                {user.name?.charAt(0).toUpperCase()}
              </div>

              <span className="text-gray-400 hover:text-white transition text-sm">
                {user.name}
              </span>

              {/* Dropdown */}
              <div className="absolute top-12 right-0 w-48 bg-[#111] border border-white/10 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">

                <Link
                  to="/profile"
                  className="block px-4 py-3 hover:bg-white hover:text-black rounded-t-xl"
                >
                  My Profile
                </Link>

                <Link
                  to="/cart"
                  className="block px-4 py-3 hover:bg-white hover:text-black"
                >
                  My Cart
                </Link>

                <Link
                  to="/orders"
                  className="block px-4 py-3 hover:bg-white hover:text-black"
                >
                  My Orders
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 text-red-400 hover:bg-red-500 hover:text-white rounded-b-xl"
                >
                  Logout
                </button>

              </div>

            </div>
          ) : (
            <Link
              to="/login"
              className="border border-white px-5 py-2 rounded-full hover:bg-white hover:text-black transition"
            >
              Login
            </Link>
          )}

        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

      </div>


      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#111111] border-t border-white/10">

          <div className="flex flex-col p-6 gap-5 text-white">

            <a
              href="#services"
              onClick={() => setMenuOpen(false)}
            >
              Services
            </a>

            <a
              href="#portfolio"
              onClick={() => setMenuOpen(false)}
            >
              Portfolio
            </a>

            <a
              href="#about"
              onClick={() => setMenuOpen(false)}
            >
              About
            </a>

            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </a>

            {/* Mobile User / Login */}
            {user ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                >
                  My Profile
                </Link>

                <Link
                  to="/cart"
                  onClick={() => setMenuOpen(false)}
                >
                  My Cart
                </Link>

                <Link
                  to="/orders"
                  onClick={() => setMenuOpen(false)}
                >
                  My Orders
                </Link>

                <button
                  onClick={handleLogout}
                  className="text-red-400 text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            )}

          </div>

        </div>
      )}
    </nav>
  );
}

export default Navbar;