import React, { useState } from 'react';
import loginImg from "../images/Login.png";
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/Actions/User';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const loginSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");  // State to store error message

    // Use react-hook-form
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const loginHandler = async (data) => {
        setLoading(true);  // Start loading
        setError("");  // Reset error state
        try {
            // Dispatch the login action, assuming it returns a promise
            await dispatch(loginUser(data.email, data.password));
            navigate("/");
        } catch (err) {
            // Catch any error from login and set error message
            setError(err.response?.data?.message || "Login failed. Please check your email or password.");
        } finally {
            setLoading(false);  // Stop loading
        }
    };

    return (
        <div className="w-full flex items-center justify-center bg-primary-500">
            <div className="flex flex-col lg:flex-row w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden mx-4">
                {/* Left Section */}
                <div className="w-full lg:w-1/2 p-8 bg-gray-50">
                    <h2 className="text-2xl font-semibold text-gray-800 text-center lg:text-left">LOGIN</h2>

                    {/* Display error message */}
                    {error && (
                        <div className="bg-rose-100 text-rose-700 px-4 py-2 rounded-md mb-4 text-center">
                            {error} fggkdhdj
                        </div>
                    )}

                    <form className="mt-8" onSubmit={handleSubmit(loginHandler)}>
                        <div className="mb-4">
                            <label className="block text-sm text-gray-600">Email</label>
                            <input
                                className={`w-full px-4 py-2 text-sm text-gray-500 border rounded-lg focus:outline-none focus:border-primary-500 ${errors.email ? 'border-rose-500' : ''
                                    }`}
                                type="email"
                                placeholder="Enter email"
                                {...register('email')}
                            />
                            {errors.email && <p className="text-rose-500 text-xs mt-1">{errors.email.message}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm text-gray-600">Password</label>
                            <input
                                className={`w-full px-4 py-2 text-sm text-gray-500 border rounded-lg focus:outline-none focus:border-primary-500 ${errors.password ? 'border-rose-500' : ''
                                    }`}
                                type="password"
                                placeholder="Enter password"
                                {...register('password')}
                            />
                            {errors.password && <p className="text-rose-500 text-xs mt-1">{errors.password.message}</p>}
                        </div>

                        <div className="flex items-center justify-between mb-4">
                            <label className="flex items-center text-sm text-gray-500">
                                <input className="mr-2" type="checkbox" />
                                Remember me
                            </label>
                            <a href="/forgot/password" className="text-sm text-primary-500 hover:underline">
                                Forgot password?
                            </a>
                        </div>

                        <button
                            className="w-full px-4 py-2 text-white bg-primary-500 rounded-lg hover:bg-primary-600 focus:outline-none"
                            type="submit"
                            disabled={loading} // Disable button when loading
                        >
                            {loading ? 'Logging in...' : 'Log in'}
                        </button>

                        <div className="flex items-center justify-center mt-4">
                            <span className="border-b w-1/3 lg:w-1/4"></span>
                            <span className="text-xs text-center text-gray-500 px-3">OR</span>
                            <span className="border-b w-1/3 lg:w-1/4"></span>
                        </div>

                        <button className="w-full flex justify-center items-center gap-4 p-2 mt-4 border border-gray-300 rounded-md" disabled>
                            <i className="fab fa-google"></i>
                            <p className="text-base font-medium text-gray-700">Login with Google</p>
                        </button>
                    </form>

                    <p className="mt-4 text-sm text-center text-gray-600">
                        Don't have an account?{' '}
                        <a href="/register" className="text-primary-500 hover:underline">
                            Create Now
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
