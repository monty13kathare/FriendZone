import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../redux/Actions/User";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();


  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      await dispatch(updatePassword(oldPassword, newPassword));
      navigate(-1); // Navigate back on success
    } catch (error) {
      console.error("Failed to update password:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };



  return (
    <div className="w-full h-full flex items-center justify-center">
      <form
        className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 max-w-[600px] w-full flex flex-col gap-4"
        onSubmit={submitHandler}
      >
        <h2 className="text-3xl font-semibold text-center mb-2 text-white">
          Update Password
        </h2>

        <div className="">
          <input
            type="password"
            placeholder="Old Password"
            required
            className="w-full p-3 border border-gray-700 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>

        <div className="">
          <input
            type="password"
            placeholder="New Password"
            required
            className="w-full p-3 border border-gray-700 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div className="flex  flex-col-reverse md:flex-row gap-4">
          <button
            className="w-full p-3 bg-gray-400 text-white font-semibold rounded-lg hover:bg-gray-500 transition-all disabled:bg-primary-300"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full p-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-all disabled:bg-primary-300"
            disabled={loading}
          >
            {loading ? "Updating..." : "Change Password"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePassword;
