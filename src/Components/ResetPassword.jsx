import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { resetPassword } from "../redux/Actions/User";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const dispatch = useDispatch();
  const params = useParams();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(resetPassword(params.token, newPassword));
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <form
        className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 max-w-sm w-full"
        onSubmit={submitHandler}
      >
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-900 dark:text-white">
          FriendZone
        </h2>

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

        <div className="text-center mb-4">
          <Link to="/" className="text-primary-500  hover:underline">
            Login
          </Link>
        </div>

        <p className="text-center text-gray-500">Or</p>

        <div className="text-center mb-6">
          <Link
            to="/forgot/password"
            className="text-primary-500  hover:underline"
          >
            Request Another Token!
          </Link>
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-all"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
