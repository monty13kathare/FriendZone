import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../redux/Actions/User";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.like);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  return (
    <div className=" w-full min-h-screen flex justify-center items-center">
      <form
        className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-sm w-full"
        onSubmit={submitHandler}
      >
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-900 dark:text-white">
          FriendZone
        </h2>

        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            required
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Token"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
