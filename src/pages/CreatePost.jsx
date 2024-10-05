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

        const postData = { caption, location, tags, image };

        try {
            // Dispatch the createNewPost action and wait for it to complete
            await dispatch(createNewPost(postData));

            // If successful, dispatch loadUser to update user state
            dispatch(loadUser());
            navigate("/");

        } catch (error) {
            console.error("Failed to create post:", error);
        }
    };




    return (
        <div className="w-full min-h-screen bg-black text-white flex justify-center items-center px-4">
            <div className="w-full max-w-lg">
                <h2 className="text-3xl font-bold mb-6 text-center">Create Post</h2>
                <form onSubmit={submitHandler} className="space-y-6">

                    {/* Caption Input */}
                    <div>
                        <label htmlFor="caption" className="block text-sm font-medium mb-2">Caption</label>
                        <textarea
                            id="caption"
                            className={`w-full p-3 rounded-md bg-gray-800 border  focus:ring focus:ring-blue-500 focus:border-blue-500`}
                            rows={4}
                            onChange={handleCaptionChange}
                        />
                    </div>

                    {/* Image Upload using react-dropzone */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Add Photos</label>
                        <div
                            {...getRootProps({
                                className: "border-2 border-dashed border-gray-500 p-4 flex flex-col items-center justify-center text-gray-400 rounded-lg cursor-pointer",
                            })}
                        >
                            <input {...getInputProps()} />
                            {isDragActive ? (
                                <p className="text-green-500">Drop the image here...</p>
                            ) : image ? (
                                <img
                                    src={image}
                                    alt="Preview"
                                    className="w-32 h-32 object-cover rounded-md mb-4"
                                />
                            ) : (
                                <>
                                    <i className="fas fa-image text-4xl mb-4"></i>
                                    <p>Drag & Drop image here or click to select</p>
                                    <button
                                        type="button"
                                        className="bg-blue-600 text-white px-4 py-2 mt-4 rounded-md"
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
                            className="bg-blue-600 text-white px-4 py-2 rounded-md"
                        >
                            Create Post
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreatePost;
