import React, { useState, useCallback } from "react";
import { useDropzone } from 'react-dropzone';
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const EditPost = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { postData } = location.state || {};

    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState(postData?.caption || "");
    const [location1, setLocation1] = useState(postData?.location || "");
    const [tags, setTags] = useState(postData?.tags || "");

    // Dropzone hook for drag-and-drop file upload
    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles && acceptedFiles[0]) {
            setImage(acceptedFiles[0]); // Set file object
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: "image/*",
        multiple: false, // Only allow one image
    });

    // Handle form submission to update post
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("caption", caption);
        formData.append("tags", tags);
        formData.append("location", location1);

        if (image) {
            formData.append("image", image); // Add the image file object
        }

        try {
            const { data } = await axios.put(`${BASE_URL}/post/update/${postData?._id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",  // For file uploads
                },
            });

            console.log('Post updated successfully:', data);
            navigate("/"); // Navigate to home after successful update
        } catch (error) {
            console.error("Error updating post:", error);
            alert(error.response?.data?.message || "Failed to update post.");
        }
    };

    return (
        <div className="w-full min-h-screen bg-black text-white flex justify-center items-center px-4">
            <div className="w-full max-w-lg">
                <h2 className="text-3xl font-bold mb-6 text-center">Edit Post</h2>
                <form onSubmit={handleUpdateSubmit} className="space-y-6">

                    {/* Caption Input */}
                    <div>
                        <label htmlFor="caption" className="block text-sm font-medium mb-2">Caption</label>
                        <textarea
                            id="caption"
                            className="w-full p-3 rounded-md bg-gray-800 border border-gray-600 focus:ring focus:ring-blue-500 focus:border-blue-500"
                            rows={4}
                            onChange={(e) => setCaption(e.target.value)}
                            value={caption}
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
                                    src={URL.createObjectURL(image)} // Show image preview
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
                            onChange={(e) => setLocation1(e.target.value)}
                            value={location1}
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
                            onChange={(e) => setTags(e.target.value)}
                            value={tags}
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
                            Update Post
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditPost;
