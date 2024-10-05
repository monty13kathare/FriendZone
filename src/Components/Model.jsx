import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteMyProfile, logoutUser } from '../redux/Actions/User';
import { FiLock, FiTrash2, FiLogOut } from 'react-icons/fi'; // Icon library

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
            <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg shadow-lg p-6 md:p-8 w-full max-w-sm sm:max-w-md md:max-w-lg mx-4 sm:mx-auto">
                <h2 className="text-xl font-semibold mb-6 text-center">Settings</h2>

                <ul className="space-y-6">
                    <li className="flex items-center justify-between">
                        <button
                            onClick={() => alert('Forgot Password functionality')}
                            className="flex items-center text-blue-500 dark:text-blue-400 hover:underline transition duration-150 ease-in-out"
                        >
                            <FiLock className="mr-2" /> Forgot Password
                        </button>
                    </li>
                    <li className="flex items-center justify-between">
                        <button
                            onClick={() => alert('Reset Password functionality')}
                            className="flex items-center text-blue-500 dark:text-blue-400 hover:underline transition duration-150 ease-in-out"
                        >
                            <FiLock className="mr-2" /> Reset Password
                        </button>
                    </li>
                    <li className="flex items-center justify-between">
                        <button
                            onClick={handleDeleteProfile}
                            className="flex items-center text-red-500 hover:underline transition duration-150 ease-in-out"
                        >
                            <FiTrash2 className="mr-2" /> Delete My Profile
                        </button>
                    </li>
                </ul>

                <div className="flex justify-between mt-8 space-x-2">
                    <button
                        onClick={onClose}
                        className="w-full sm:w-auto px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-150 ease-in-out"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleLogout}
                        className="w-full sm:w-auto px-4 py-2 bg-red-500 rounded-lg text-white hover:bg-red-600 transition duration-150 ease-in-out flex items-center justify-center"
                    >
                        <FiLogOut className="mr-2" /> Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
