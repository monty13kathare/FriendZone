import React, { useState } from 'react';
import signUpImg from "../images/signUp.png";
import dummy from "../images/user.jpg";
import { useDispatch } from 'react-redux';
import { registerUser } from '../redux/Actions/User';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

// Zod schema for validation
const schema = z.object({
    name: z.string().min(1, 'Name is required'),
    nameId: z.string().min(1, 'Username is required'),
    email: z.string().email('Invalid email address').nonempty('Email is required'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

const SignUp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [avatar, setAvatar] = useState(null);
    const [avatarError, setAvatarError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });

    // Handle image change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const Reader = new FileReader();
        Reader.readAsDataURL(file);
        Reader.onload = () => {
            if (Reader.readyState === 2) {
                setAvatar(Reader.result);
                setAvatarError('');
            }
        };
    };

    // Form submission handler
    const onSubmit = async (data) => {
        if (!avatar) {
            setAvatarError('Please upload an avatar image.');
            return;
        }
        const formData = { ...data, avatar };
        setLoading(true);
        try {

            await dispatch(registerUser(formData));
            navigate("/");
        } catch (error) {
            console.error('Registration failed:', error);
        } finally {
            setLoading(false);  // Stop loading
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };



    return (
        <div className="w-full flex items-center justify-center bg-primary-500">
            <div className="flex flex-col lg:flex-row w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden mx-4">
                {/* Left Section */}
                <div className="w-full lg:w-1/2 p-8 bg-gray-50">
                    <h2 className="text-2xl font-semibold text-gray-800 text-center lg:text-left">Sign Up</h2>

                    <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
                        <div className="w-full flex justify-center items-center">
                            <div className="relative w-24 h-24 flex items-center justify-center">
                                <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                                    {avatar ? (
                                        <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <img src={dummy} alt="Profile" className="w-full h-full object-cover" />
                                    )}
                                </div>
                                {/* Add Icon */}
                                <div className="absolute bottom-0 right-0 w-8 h-8 bg-gray-200 border-2 border-white rounded-full flex items-center justify-center cursor-pointer">
                                    <label htmlFor="fileInput" className="cursor-pointer">
                                        <div className="w-4 h-4 rounded-full relative">
                                            <div className="absolute inset-0 flex items-center justify-center text-gray-700 font-bold text-lg">+</div>
                                        </div>
                                    </label>
                                    <input
                                        id="fileInput"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageChange}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Avatar Error */}
                        {avatarError && (
                            <p className="text-rose-500 text-sm mt-2 text-center">{avatarError}</p>
                        )}

                        <div className="mb-4">
                            <label className="block text-sm text-gray-600">Name</label>
                            <input
                                {...register('name')}
                                className={`w-full px-4 py-2 text-sm text-gray-500 border rounded-lg focus:outline-none focus:border-primary-500 ${errors.name ? 'border-red-500' : ''}`}
                                type="text"
                                placeholder="Enter Name"
                            />
                            {errors.name && <p className="text-rose-500 text-xs mt-1">{errors.name.message}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm text-gray-600">Username</label>
                            <input
                                {...register('nameId')}
                                className={`w-full px-4 py-2 text-sm text-gray-500 border rounded-lg focus:outline-none focus:border-primary-500 ${errors.nameId ? 'border-red-500' : ''}`}
                                type="text"
                                placeholder="Enter Username"
                            />
                            {errors.nameId && <p className="text-rose-500 text-xs mt-1">{errors.nameId.message}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm text-gray-600">Email</label>
                            <input
                                {...register('email')}
                                className={`w-full px-4 py-2 text-sm text-gray-500 border rounded-lg focus:outline-none focus:border-primary-500 ${errors.email ? 'border-red-500' : ''}`}
                                type="email"
                                placeholder="Enter Email"
                            />
                            {errors.email && <p className="text-rose-500 text-xs mt-1">{errors.email.message}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm text-gray-600">Password</label>
                            <div className="relative w-full">
                                <input
                                    className={`w-full px-4 py-2 text-sm text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.password ? 'border-rose-500 focus:ring-rose-500' : 'border-gray-300'
                                        }`}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter password"
                                    {...register('password')}
                                />
                                <span
                                    className="absolute right-3 top-[60%] transform -translate-y-1/2 cursor-pointer text-gray-600"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? (
                                        <i className="material-symbols-outlined">visibility</i>
                                    ) : (
                                        <i className="material-symbols-outlined">visibility_off</i>
                                    )}
                                </span>
                                {errors.password && (
                                    <p className="text-rose-500 text-xs mt-1">{errors.password.message}</p>
                                )}
                            </div>
                            {errors.password && <p className="text-rose-500 text-xs mt-1">{errors.password.message}</p>}
                        </div>

                        <button
                            className="w-full px-4 py-2 text-white bg-primary-500 rounded-lg hover:bg-primary-600 focus:outline-none"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'Signing Up...' : 'Sign Up'}
                        </button>
                    </form>

                    <p className="mt-4 text-sm text-center text-gray-600">
                        Already have an account?{' '}
                        <a href="/login" className="text-primary-500 hover:underline">
                            Login Now
                        </a>
                    </p>
                </div>

                {/* Right Section */}
                <div className="hidden lg:flex w-full lg:w-1/2 bg-gray-300 flex-col justify-center items-center text-white">
                    <img
                        src={signUpImg}
                        alt="signUpImg"
                        className="w-full h-fit mb-4"
                    />
                </div>
            </div>
        </div>
    );
};

export default SignUp;
