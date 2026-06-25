import { useState } from "react";

function ChangePassword() {
  const [oldPassword, setOldPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(
      "Password change API will be connected later."
    );
  };

  return (
    <div className="min-h-screen bg-black text-white pt-32 px-6">

      <div className="max-w-xl mx-auto bg-[#111] p-8 rounded-3xl">

        <h1 className="text-3xl font-bold mb-8">
          Change Password
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="password"
            placeholder="Current Password"
            value={oldPassword}
            onChange={(e) =>
              setOldPassword(e.target.value)
            }
            className="w-full p-4 bg-black border border-white/10 rounded-xl"
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(e.target.value)
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
            Update Password
          </button>

        </form>

      </div>

    </div>
  );
}

export default ChangePassword;