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
import PrivateRoute from "./private-route";

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
                    {/* Protect routes that require authentication */}
                    <Route index element={<PrivateRoute><Home /></PrivateRoute>} />
                    <Route path="/profile/:id" element={<PrivateRoute><Account /></PrivateRoute>} />
                    <Route path="/newpost" element={<PrivateRoute><CreatePost /></PrivateRoute>} />
                    <Route path="/postDetail/:id" element={<PrivateRoute><PostDetails /></PrivateRoute>} />
                    <Route path="/explore" element={<PrivateRoute><Explore /></PrivateRoute>} />
                    <Route path="/friends" element={<PrivateRoute><AllUsers /></PrivateRoute>} />
                    <Route path="/update/profile" element={<PrivateRoute><UpdateProfile /></PrivateRoute>} />
                    <Route path="/update/password" element={<PrivateRoute><UpdatePassword /></PrivateRoute>} />
                    <Route path="/user/:id" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
                    <Route path="/update/post/:id" element={<PrivateRoute><EditPost /></PrivateRoute>} />
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
