import { useParams, Link, useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";
import GridPostList from "../Components/GridPostList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllPosts, getMyPosts, loadUser } from "../redux/Actions/User";
import { multiFormatDateString } from "../utils";
import axios from "axios";
import { deletePost, likePost, updatePost } from "../redux/Actions/Post";
import { VscChromeClose } from "react-icons/vsc";
import authHeader from "../authHeader";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const PostDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user?.user);
    const { loading, posts } = useSelector((state) => state.allPosts);

    const [post, setPost] = useState({});
    const [captionToggle, setCaptionToggle] = useState(false);
    const [captionValue, setCaptionValue] = useState("");
    const [location, setLocation] = useState("");
    const [tags, setTags] = useState("");
    const [loadingUpdate, setLoadingUpdate] = useState(false); // State for loading while updating
    const [liked, setLiked] = useState(false);
    const [likesUser, setLikesUser] = useState(false);
    const [commentValue, setCommentValue] = useState("");
    const [commentToggle, setCommentToggle] = useState(false);









    // Fetching post details
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`${BASE_URL}/api/v1/postDetail/${id}`, authHeader());
                setPost(data?.post);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [id]);

    useEffect(() => {
        if (post) {
            setCaptionValue(post.caption);
            setLocation(post.location);
            setTags(post.tags);
        }
    }, [post]);

    // Fetch all posts
    useEffect(() => {
        dispatch(getAllPosts());
    }, [dispatch]);

    // Update post handler
    const updateCaptionHandler = async (e) => {
        e.preventDefault();
        setLoadingUpdate(true);
        try {
            await dispatch(updatePost(captionValue, location, tags, post?._id));
            setCaptionToggle(false);
            dispatch(getMyPosts()); // Fetch updated posts
            dispatch(loadUser());   // Reload user data if necessary
            // Optimistically update the post on UI
            setPost((prevPost) => ({
                ...prevPost,
                caption: captionValue,
                location: location,
                tags: tags,
            }));
        } catch (error) {
            console.error("Error updating post:", error);
        } finally {
            setLoadingUpdate(false);
        }
    };

    const deleteMyPost = async (id) => {
        await dispatch(deletePost(id));
        navigate(-1);
    };

    // Get random 3 posts
    const getRandomPosts = (posts) => {
        if (posts?.length > 0) {
            const shuffledPosts = [...posts].sort(() => 0.5 - Math.random());
            return shuffledPosts.slice(0, 3);
        }
        return [];
    };

    const randomPosts = getRandomPosts(posts);

    return (
        <div className="post_details-container">
            <div className="hidden md:flex max-w-5xl w-full">
                <button onClick={() => navigate(-1)} variant="ghost" className="shad-button_ghost">
                    <img src={"/assets/icons/back.svg"} alt="back" width={24} height={24} />
                    <p className="small-medium lg:base-medium">Back</p>
                </button>
            </div>

            {loading || !post ? (
                <Loader />
            ) : (
                <div className="post_details-card">
                    <img src={post.image?.url} alt="creator" className="post_details-img" />

                    <div className="post_details-info">
                        <div className="flex-between w-full">
                            <Link to={`/profile/${post.owner?._id}`} className="flex items-center gap-3">
                                <img
                                    src={post.owner?.avatar?.url || "/assets/icons/profile-placeholder.svg"}
                                    alt="creator"
                                    className="w-8 h-8 lg:w-12 lg:h-12 rounded-full"
                                />
                                <div className="flex gap-1 flex-col">
                                    <p className="base-medium lg:body-bold text-light-1">{post.owner?.name}</p>
                                    <div className="flex-center gap-2 text-light-3">
                                        <p className="subtle-semibold lg:small-regular">
                                            {multiFormatDateString(post.createdAt)}
                                        </p>
                                        •
                                        <p className="subtle-semibold lg:small-regular">{post?.location}</p>
                                    </div>
                                </div>
                            </Link>

                            <div className="flex-center gap-4">
                                {user._id === post.owner?._id && (
                                    <>
                                        <img
                                            src={"/assets/icons/edit.svg"}
                                            alt="edit"
                                            width={24}
                                            height={24}
                                            onClick={() => setCaptionToggle(!captionToggle)}
                                            className=" cursor-pointer"
                                        />
                                        <button onClick={() => deleteMyPost(post._id)} className="post_details-delete_btn cursor-pointer">
                                            <img src={"/assets/icons/delete.svg"} alt="delete" width={24} height={24} />
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>

                        <hr className="border w-full border-dark-4/80" />

                        <div className="flex flex-col flex-1 w-full small-medium lg:base-regular">
                            <p>{post.caption}</p>
                            <ul className="flex gap-1 mt-2">
                                {post.tags?.split(",").map((tag, index) => (
                                    <li key={`${tag}${index}`} className="text-light-3 small-regular">#{tag}</li>
                                ))}
                            </ul>
                        </div>


                    </div>
                </div>
            )}

            <div className="w-full max-w-5xl">
                <hr className="border w-full border-dark-4/80" />
                <h3 className="body-bold md:h3-bold w-full my-10">More Related Posts</h3>
                {loading ? <Loader /> : <GridPostList posts={randomPosts} />}
            </div>

            {/* Update Caption Modal */}
            {captionToggle && (
                <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center">
                    <div className="flex gap-4 flex-col bg-gray-800 rounded-lg p-6 w-full max-w-xs sm:max-w-sm md:max-w-md relative">
                        <div className="flex justify-between h-fit">
                            <h3 className="text-lg md:text-xl font-bold mb-4 text-gray-200">Update Post</h3>
                            <button className="text-gray-200 text-base h-fit" onClick={() => setCaptionToggle(!captionToggle)}>
                                <VscChromeClose />
                            </button>
                        </div>

                        <form onSubmit={updateCaptionHandler} className="space-y-3">
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 text-gray-500 rounded-md text-sm md:text-base"
                                value={captionValue}
                                onChange={(e) => setCaptionValue(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 text-gray-500 rounded-md text-sm md:text-base"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 text-gray-500 rounded-md text-sm md:text-base"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                required
                            />
                            <button
                                type="submit"
                                className="w-full bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600 transition-all"
                            >
                                {loadingUpdate ? "Updating.." : "Update"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostDetails;
