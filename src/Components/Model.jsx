import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteMyProfile, logoutUser } from '../redux/Actions/User';
import { FiLock, FiTrash2, FiLogOut } from 'react-icons/fi'; // Icon library
import { Link, useNavigate } from 'react-router-dom';
import { VscChromeClose } from 'react-icons/vsc';

const Modal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    if (!isOpen) return null;

    const handleDeleteProfile = () => {
        dispatch(deleteMyProfile());
        navigate("/register");
        onClose(); // Close modal after deletion
    };

    const handleLogout = () => {
        dispatch(logoutUser());
        localStorage.removeItem("token");
        navigate("/login");
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
            <div className="bg-white text-gray-900 rounded-lg shadow-lg p-6 w-full max-w-sm sm:max-w-md lg:max-w-lg mx-4 sm:mx-auto">
                <div className="flex justify-between h-fit">
                    <h3 className="text-lg md:text-xl font-bold mb-4 text-gray-900">Settings</h3>
                    <button className="text-gray-900 text-base h-fit" onClick={onClose}>
                        <VscChromeClose />
                    </button>
                </div>

                <ul className="space-y-4">



                    <li className="flex items-center justify-between">
                        <button
                            onClick={handleDeleteProfile}
                            className="flex items-center text-gray-900 hover:text-red-800  transition"
                        >
                            <FiTrash2 className="mr-3 text-lg" />
                            <span className="text-lg">Delete My Profile</span>
                        </button>
                    </li>
                    <li className="flex items-center justify-between">
                        <Link to={`/update/password`}
                            className="flex items-center text-gray-900 hover:text-blue-600 transition"
                        >
                            <FiLock className="mr-3 text-lg" />
                            <span className="text-lg">Update Password</span>
                        </Link>
                    </li>
                    <li className="flex items-center justify-between">
                        <button
                            onClick={handleLogout}
                            className="flex items-center text-gray-900 hover:text-red-800  transition"
                        >
                            <FiTrash2 className="mr-3 text-lg" />
                            <span className="text-lg">Logout</span>
                        </button>
                    </li>
                </ul>


            </div>
        </div>
    );
};

export default Modal;
