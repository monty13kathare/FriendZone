import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import SignUp from "../pages/SignUp";
import UpdatePassword from "../pages/UpdatePassword";
import ForgotPassword from "../Components/ForgotPassword";
import ResetPassword from "../Components/ResetPassword";
import { loadUser } from "../redux/Actions/User";
import Login from "../pages/LoginPage";
import Home from "../pages/Home";
import CreatePost from "../pages/CreatePost";
import RootLayout from "../pages/RootLayout";
import Explore from "../pages/Explore";
import PostDetails from "../pages/PostDetail";
import AllUsers from "../pages/AllUsers";
import UpdateProfile from "../pages/UpdateProfile";
import UserProfile from "../pages/UserProfile";
import Account from "../pages/Account";
import EditPost from "../pages/EditPost";
import NotFoundPage from "../Components/NotFound";

function AppRoute() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadUser());
    }, [dispatch]);

    return (
        <Router>
            <Routes>

                {/* Routes with static layout (Header and Sidebar) */}
                <Route element={<RootLayout />}>
                    <Route index element={<Home />} />
                    <Route path="/profile/:id" element={<Account />} />
                    <Route path="/newpost" element={<CreatePost />} />
                    <Route path="/postDetail/:id" element={<PostDetails />} />


                    <Route path="/explore" element={<Explore />} />
                    <Route path="/friends" element={<AllUsers />} />
                    <Route path="/update/profile" element={<UpdateProfile />} />
                    <Route path="/update/password" element={<UpdatePassword />} />
                    <Route path="/user/:id" element={<UserProfile />} />
                    <Route path="/update/post/:id" element={<EditPost />} />

                </Route>

                {/* Non-auth routes without the layout */}
                <Route path="/register" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot/password" element={<ForgotPassword />} />
                <Route path="/password/reset/:token" element={<ResetPassword />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
}

export default AppRoute;
