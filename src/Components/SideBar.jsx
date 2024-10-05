// Sidebar.js
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Sidebar = () => {
    const user = useSelector((state) => state.user?.user);
    return (
        <div className="flex flex-col gap-6 text-white h-screen w-full p-4 border-r">
            <div className="flex gap-4 p-4 bg-gray-500 rounded">
                <img src={user?.avatar?.url} alt="img" className="w-14 h-14 rounded-full" />
                <div className="flex flex-col items-center justify-center">
                    <h2 className="text-base font-bold">{user?.name}</h2>
                    <p>{user?.nameId}</p>
                </div>
            </div>
            <nav>
                <ul className="space-y-4 flex flex-col gap-6">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/account">People</Link>
                    </li>
                    <li>
                        <Link to="/newpost">Create Post</Link>
                    </li>
                    <li>
                        <Link to="/friends">Friends</Link>
                    </li>
                    <li>
                        <Link to="/update/profile">Update Profile</Link>
                    </li>
                    <li>
                        <Link to="/update/password">Update Password</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
