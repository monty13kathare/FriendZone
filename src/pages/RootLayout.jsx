import { Outlet } from "react-router-dom"
import LeftSidebar from "../Components/LeftSidebar"
import Bottombar from "../Components/Bottombar"
import Topbar from "../Components/Topbar"

const RootLayout = () => {
    return (
        <div className="w-full md:flex">
            <Topbar />
            <LeftSidebar />
            <section className="flex w-full h-full">
                <Outlet />
            </section>
            <Bottombar />
        </div>
    )
}

export default RootLayout