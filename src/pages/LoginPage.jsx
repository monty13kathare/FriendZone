import React from 'react';
import loginImg from "../images/Login.png";
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/Actions/User';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

// Define validation schema using zod
const loginSchema = z.object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);

    console.log('user data ', user)

    // Initialize react-hook-form with zod validation
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (values) => {

        try {
            const response = await axios.post(`/login`, values);
            if (response.data) {
                localStorage.setItem("token", JSON.stringify({ token: response.data.token }));
                navigate("/");
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };






    // const SignInByGoogle = useGoogleLogin({
    //     onSuccess: async (tokenResponse) => {
    //         try {
    //             const userInfoResponse = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
    //                 headers: {
    //                     Authorization: `Bearer ${tokenResponse.access_token}`,
    //                 },
    //             });

    //             if (userInfoResponse?.data) {
    //                 const userInfo = await axios.post(`${BASE_URL}auth/social-login`, {
    //                     email: userInfoResponse.data.email,
    //                     firstName: userInfoResponse.data.given_name,
    //                     lastName: userInfoResponse.data.family_name,
    //                     profilePic: userInfoResponse.data.picture,
    //                 });
    //                 dispatch(userData(userInfo?.data));
    //                 localStorage.setItem("token", JSON.stringify({ token: userInfo?.data?.token }));
    //                 navigate("/")
    //                 console.log('Login Success', userInfoResponse?.data)
    //             }
    //         } catch (error) {
    //             console.error('Failed to fetch user info:', error);
    //         }
    //     },
    //     onError: error => {
    //         console.error('Login Failed:', error);
    //     },
    // });



    return (
        <div className="w-full flex items-center justify-center bg-indigo-800">
            <div className="flex flex-col lg:flex-row w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Left Section */}
                <div className="w-full lg:w-1/2 p-8 bg-gray-50">
                    <h2 className="text-2xl font-semibold text-gray-800 text-center lg:text-left">LOGIN</h2>

                    <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label className="block text-sm text-gray-600">Email</label>
                            <input
                                className={`w-full px-4 py-2 text-sm text-gray-500 border rounded-lg focus:outline-none focus:border-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                type="email"
                                placeholder="Enter email"
                                {...register('email')}
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm text-gray-600">Password</label>
                            <input
                                className={`w-full px-4 py-2 text-sm text-gray-500 border rounded-lg focus:outline-none focus:border-blue-500 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                                type="password"
                                placeholder="Enter password"
                                {...register('password')}
                            />
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                        </div>

                        <div className="flex items-center justify-between mb-4">
                            <label className="flex items-center text-sm text-gray-500">
                                <input className="mr-2" type="checkbox" />
                                Remember me
                            </label>
                            <a href="/forgot/password" className="text-sm text-blue-500 hover:underline">
                                Forgot password?
                            </a>
                        </div>

                        <button
                            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none"
                            type="submit"
                        >
                            Log in
                        </button>

                        <div className="flex items-center justify-center mt-4">
                            <span className="border-b w-1/3 lg:w-1/4"></span>
                            <span className="text-xs text-center text-gray-500 px-3">OR</span>
                            <span className="border-b w-1/3 lg:w-1/4"></span>
                        </div>

                        <button className=" w-full flex justify-center items-center gap-4 p-2 mt-4 border border-gray-300 rounded-md">
                            <i className="fab fa-google"></i>
                            <p className="text-base font-medium text-gray-700">Login with Google</p>
                        </button>
                    </form>

                    <p className="mt-4 text-sm text-center text-gray-600">
                        Don't have an account?{' '}
                        <a href="/register" className="text-blue-500 hover:underline">
                            Create one now
                        </a>
                    </p>
                </div>

                {/* Right Section */}
                <div className="hidden lg:flex w-full lg:w-1/2 bg-gray-300 flex-col justify-center items-center text-white">
                    <img src={loginImg} alt="loginImg" className="w-full h-fit mb-4" />
                </div>
            </div>
        </div>
    );
};

export default Login;
