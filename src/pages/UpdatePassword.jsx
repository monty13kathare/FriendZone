import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../redux/Actions/User";

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const dispatch = useDispatch();

  const { error, loading, message } = useSelector((state) => state.like);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updatePassword(oldPassword, newPassword));
  };



  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <form
        className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 max-w-sm w-full"
        onSubmit={submitHandler}
      >
        <h2 className="text-3xl font-semibold text-center mb-6 text-white">
          Update Password
        </h2>

        <div className="mb-4">
          <input
            type="password"
            placeholder="Old Password"
            required
            className="w-full p-3 border border-gray-700 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            placeholder="New Password"
            required
            className="w-full p-3 border border-gray-700 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-all disabled:bg-primary-300"
          disabled={loading}
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default UpdatePassword;
