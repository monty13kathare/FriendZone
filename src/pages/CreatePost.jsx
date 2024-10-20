import React, { useState } from "react";
import { useDropzone } from 'react-dropzone'
import { createNewPost } from "../redux/Actions/Post";
import { loadUser } from "../redux/Actions/User";
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";



const CreatePost = () => {
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState("");
    const [location, setLocation] = useState("");
    const [tags, setTags] = useState("");
    const [loading, setLoading] = useState(false);


    const dispatch = useDispatch();


    const handleCaptionChange = (e) => {
        setCaption(e.target.value)
    }
    const handleLocationChange = (e) => {
        setLocation(e.target.value)
    }
    const handleTagChange = (e) => {
        setTags(e.target.value)
    }



    // Dropzone hook for drag-and-drop file upload
    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
            if (reader.readyState === 2) {
                setImage(reader.result); // Set image preview when loaded
            }
        };
        if (file) {
            reader.readAsDataURL(file); // Read image file as data URL
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: "image/*",
        multiple: false, // Only allow one image
    });




    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        const postData = { caption, location, tags, image };

        try {
            await dispatch(createNewPost(postData));

            // If successful, dispatch loadUser to update user state
            dispatch(loadUser());
            navigate("/");

        } catch (error) {
            console.error("Failed to create post:", error);
        } finally {
            setLoading(false);
        }
    };




    return (
        <div className="w-full h-full overflow-y-scroll bg-black text-white flex flex-col justify-center items-center px-4 ">
            <div className="w-full custom-height max-w-lg py-6  justify-center">
                <h2 className="text-3xl font-bold text-center">Create Post</h2>
                <form onSubmit={submitHandler} className="flex flex-col gap-6 py-6">

                    {/* Caption Input */}
                    <div>
                        <label htmlFor="caption" className="block text-sm font-medium mb-2">Caption</label>
                        <textarea
                            id="caption"
                            className={`w-full p-3 rounded-md bg-gray-800 border border-gray-600  focus:ring focus:ring-blue-500 focus:border-blue-500`}
                            rows={2}
                            onChange={handleCaptionChange}
                        />
                    </div>

                    {/* Image Upload using react-dropzone */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Add Photos</label>
                        <div
                            {...getRootProps({
                                className: "w-full h-fit border-2 border-dashed border-gray-500 p-4 flex flex-col items-center justify-center text-gray-400 rounded-lg cursor-pointer",
                            })}
                        >
                            <input {...getInputProps()} />
                            {isDragActive ? (
                                <p className="text-green-500">Drop the image here...</p>
                            ) : image ? (
                                <img
                                    src={image}
                                    alt="Preview"
                                    className="w-full h-fit object-cover rounded-md"
                                />
                            ) : (
                                <>
                                    <i className="fas fa-image text-4xl mb-4"></i>
                                    <p className="text-center">Drag & Drop image here or click to select</p>
                                    <button
                                        type="button"
                                        className="bg-primary-500 text-white px-4 py-2 mt-4 rounded-md"
                                    >
                                        Select from computer
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Location Input */}
                    <div>
                        <label htmlFor="location" className="block text-sm font-medium mb-2">Add Location</label>
                        <input
                            id="location"
                            type="text"
                            className="w-full p-3 rounded-md bg-gray-800 border border-gray-600 focus:ring focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter a location"
                            onChange={handleLocationChange}
                        />
                    </div>

                    {/* Tags Input */}
                    <div>
                        <label htmlFor="tags" className="block text-sm font-medium mb-2">Add Tags (comma-separated)</label>
                        <input
                            id="tags"
                            type="text"
                            className="w-full p-3 rounded-md bg-gray-800 border border-gray-600 focus:ring focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Art, Expression, Learn"
                            onChange={handleTagChange}
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-between">
                        <button
                            type="button"
                            className="bg-gray-600 text-white px-4 py-2 rounded-md"
                            onClick={() => navigate("/")}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-primary-500 text-white px-4 py-2 rounded-md"
                        >
                            {loading ? (
                                <>
                                    <svg
                                        className="animate-spin h-5 w-5 mr-3 text-white inline-block"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v8H4z"
                                        ></path>
                                    </svg>
                                    Posting...
                                </>
                            ) : (
                                "Create Post"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreatePost;
