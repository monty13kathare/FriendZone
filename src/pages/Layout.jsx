// Layout.js
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import Sidebar from "../Components/SideBar";

const Layout = () => {
    return (
        <div className="w-full min-h-screen flex">

            {/* Main content area */}
            <div className="flex-1 flex flex-col">
                <Header className="w-full" />
                <main className="w-full flex h-[calc(100vh-200px)] overflow-y-auto">
                    <div className="w-96 hidden lg:flex ">
                        <Sidebar />
                    </div>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
