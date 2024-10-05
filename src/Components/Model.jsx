import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteMyProfile, logoutUser } from '../redux/Actions/User';
import { FiLock, FiTrash2, FiLogOut } from 'react-icons/fi'; // Icon library
import { Link } from 'react-router-dom';

const Modal = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();

    if (!isOpen) return null;

    const handleDeleteProfile = () => {
        dispatch(deleteMyProfile());
        onClose(); // Close modal after deletion
    };

    const handleLogout = () => {
        dispatch(logoutUser());
        onClose(); // Close modal after logout
    };

    // Handle click outside the modal to close
    const handleClickOutside = (e) => {
        if (e.target.id === 'modal-overlay') {
            onClose();
        }
    };

    return (
        <div
            id="modal-overlay"
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={handleClickOutside} // Close modal if clicked outside
        >
            <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg shadow-lg p-6 w-full max-w-sm sm:max-w-md lg:max-w-lg mx-4 sm:mx-auto">
                <h2 className="text-2xl font-semibold mb-4 text-center">Settings</h2>

                <ul className="space-y-4">
                    <li className="flex items-center justify-between">
                        <Link to={`/forgot/password`}
                            className="flex items-center text-gray-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                        >
                            <FiLock className="mr-3 text-lg" />
                            <span className="text-lg">Forgot Password</span>
                        </Link>
                    </li>
                    <li className="flex items-center justify-between">
                        <Link to={`/password/reset/:token`}
                            className="flex items-center text-gray-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                        >
                            <FiLock className="mr-3 text-lg" />
                            <span className="text-lg">Reset Password</span>
                        </Link>
                    </li>
                    <li className="flex items-center justify-between">
                        <Link to={`/update/password`}
                            className="flex items-center text-gray-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                        >
                            <FiLock className="mr-3 text-lg" />
                            <span className="text-lg">Update Password</span>
                        </Link>
                    </li>
                    <li className="flex items-center justify-between">
                        <button
                            onClick={handleDeleteProfile}
                            className="flex items-center text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-500 transition"
                        >
                            <FiTrash2 className="mr-3 text-lg" />
                            <span className="text-lg">Delete My Profile</span>
                        </button>
                    </li>
                </ul>

                <div className="flex justify-between mt-6 space-x-2">
                    <button
                        onClick={onClose}
                        className="w-full sm:w-auto px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleLogout}
                        className="w-full sm:w-auto px-4 py-2 bg-red-500 rounded-lg text-white hover:bg-red-600 transition flex items-center justify-center"
                    >
                        <FiLogOut className="mr-2 text-lg" />
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
