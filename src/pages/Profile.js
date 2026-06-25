import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      navigate("/login");
      return;
    }

    setUser(JSON.parse(storedUser));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-32 px-6">

      <div className="max-w-3xl mx-auto">

        <div className="bg-[#111] rounded-3xl p-10 border border-white/10">

          {/* Avatar */}
          <div className="flex flex-col items-center">

            <div
              className="
              w-28
              h-28
              rounded-full
              bg-gradient-to-r
              from-pink-400
              via-fuchsia-500
              to-violet-600
              text-white
              flex
              items-center
              justify-center
              text-5xl
              font-black
              shadow-lg
              shadow-fuchsia-500/30
              "
            >
              {user.name?.charAt(0).toUpperCase()}
            </div>

            <h1 className="text-3xl font-bold">
              {user.name}
            </h1>

            <p className="text-gray-400 mt-2">
              {user.email}
            </p>

          </div>

          {/* Details */}
          <div className="mt-10 space-y-4">

            <div className="bg-black p-4 rounded-xl border border-white/10">
              <span className="text-gray-400">Name</span>
              <h3 className="text-lg">{user.name}</h3>
            </div>

            <div className="bg-black p-4 rounded-xl border border-white/10">
              <span className="text-gray-400">Email</span>
              <h3 className="text-lg">{user.email}</h3>
            </div>

            <div className="bg-black p-4 rounded-xl border border-white/10">
              <span className="text-gray-400">Role</span>
              <h3 className="text-lg capitalize">
                {user.role}
              </h3>
            </div>

          </div>

          {/* Actions */}
          <div className="grid md:grid-cols-4 gap-4 mt-10">

            <button
              onClick={() => navigate("/cart")}
              className="
            inline-block
            bg-[#111111]
            border
            border-white/10
            rounded-2xl
            py-3
            hover:border-white
            hover:-translate-y-2
            transition-all
            duration-300
              "
            >
              My Cart
            </button>

            <button
              onClick={() => navigate("/orders")}
              className="           
                    inline-block
                    bg-[#111111]
                    border
                    border-white/10
                    rounded-2xl
                    py-3
                    hover:border-white
                    hover:-translate-y-2
                    transition-all
                    duration-300"
            >
              My Orders
            </button>

            <button
              onClick={() => navigate("/edit-profile")}
              className="
            inline-block
            bg-[#111111]
            border
            border-white/10
            rounded-2xl
            py-3
            hover:border-white
            hover:-translate-y-2
            transition-all
            duration-300
              "
            >
              Edit Profile
            </button>
            <button
              onClick={() => navigate("/change-password")}
              className="
            inline-block
            bg-[#111111]
            border
            border-white/10
            rounded-2xl
            py-3
            hover:border-white
            hover:-translate-y-2
            transition-all
            duration-300
              "
            >
              Change Password
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600 py-3 rounded-xl align-center font-semibold"
            >
              Logout
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;