import { useState } from "react";

function EditProfile() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedUser = {
      ...user,
      name,
      email,
    };

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

    alert("Profile Updated");
  };

  return (
    <div className="min-h-screen bg-black text-white pt-32 px-6">

      <div className="max-w-xl mx-auto bg-[#111] p-8 rounded-3xl">

        <h1 className="text-3xl font-bold mb-8">
          Edit Profile
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <input
            type="text"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full p-4 bg-black border border-white/10 rounded-xl"
          />

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full p-4 bg-black border border-white/10 rounded-xl"
          />

          <button
            type="submit"
            className="
            w-full
            py-4
            rounded-xl
            bg-gradient-to-r
            from-pink-400
            via-fuchsia-500
            to-violet-600
            "
          >
            Save Changes
          </button>

        </form>

      </div>

    </div>
  );
}

export default EditProfile;