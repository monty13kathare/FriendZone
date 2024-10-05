import { useParams, Link, useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";
import GridPostList from "../Components/GridPostList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllPosts, getPostById, getUserpost } from "../redux/Actions/User";
import { multiFormatDateString } from "../utils";
import axios from "axios";
import { deletePost } from "../redux/Actions/Post";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const PostDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const user = useSelector((state) => state.user?.user);
    const dispatch = useDispatch();
    const [post, setPost] = useState({})

    const { loading, posts, error } = useSelector((state) => state.allPosts);

    const deleteMyPost = async (id) => {
        await dispatch(deletePost(id));
        navigate(-1);
    };

    // Function to get random 3 posts
    const getRandomPosts = (posts) => {
        if (posts?.length > 0) {
            // Shuffle the array using sort and random function
            const shuffledPosts = [...posts].sort(() => 0.5 - Math.random());
            // Get the first 3 posts from the shuffled array
            return shuffledPosts.slice(0, 3);
        }
        return [];
    };

    const randomPosts = getRandomPosts(posts);

    useEffect(() => {
        dispatch(getAllPosts());
    }, [dispatch]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`${BASE_URL}/postDetail/${id}`);
                console.log("postDetail", data?.post);
                setPost(data?.post)
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [id]);




    return (
        <div className="post_details-container">
            <div className="hidden md:flex max-w-5xl w-full">
                <button
                    onClick={() => navigate(-1)}
                    variant="ghost"
                    className="shad-button_ghost">
                    <img
                        src={"/assets/icons/back.svg"}
                        alt="back"
                        width={24}
                        height={24}
                    />
                    <p className="small-medium lg:base-medium">Back</p>
                </button>
            </div>

            {loading || !post ? (
                <Loader />
            ) : (
                <div className="post_details-card">
                    <img
                        src={post.image?.url}
                        alt="creator"
                        className="post_details-img"
                    />

                    <div className="post_details-info">
                        <div className="flex-between w-full">
                            <Link
                                to={`/profile/${post.owner?._id}`}
                                className="flex items-center gap-3">
                                <img
                                    src={
                                        post.owner?.avatar?.url ||
                                        "/assets/icons/profile-placeholder.svg"
                                    }
                                    alt="creator"
                                    className="w-8 h-8 lg:w-12 lg:h-12 rounded-full"
                                />
                                <div className="flex gap-1 flex-col">
                                    <p className="base-medium lg:body-bold text-light-1">
                                        {post.owner?.name}
                                    </p>
                                    <div className="flex-center gap-2 text-light-3">
                                        <p className="subtle-semibold lg:small-regular ">
                                            {multiFormatDateString(post.createdAt)}
                                        </p>
                                        •
                                        <p className="subtle-semibold lg:small-regular">
                                            {post?.location}
                                        </p>
                                    </div>
                                </div>
                            </Link>

                            <div className="flex-center gap-4">
                                <Link
                                    to={`/update-post/${post._id}`}
                                >
                                    <img
                                        src={"/assets/icons/edit.svg"}
                                        alt="edit"
                                        width={24}
                                        height={24}
                                        className={`${user._id !== post.owner?._id ? "hidden" : "flex"}`}
                                    />
                                </Link>

                                <button
                                    onClick={() => deleteMyPost(post._id)}
                                    className={`post_details-delete_btn ${user._id !== post.owner?._id ? "hidden" : "flex"}`}>
                                    <img
                                        src={"/assets/icons/delete.svg"}
                                        alt="delete"
                                        width={24}
                                        height={24}
                                    />
                                </button>
                            </div>
                        </div>

                        <hr className="border w-full border-dark-4/80" />

                        <div className="flex flex-col flex-1 w-full small-medium lg:base-regular">
                            <p>{post.caption}</p>
                            <ul className="flex gap-1 mt-2">
                                {post.tags?.split(",").map((tag, index) => (
                                    <li
                                        key={`${tag}${index}`}
                                        className="text-light-3 small-regular">
                                        #{tag}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="w-full">
                            {/* <posttats post={post} userId={user.id} /> */}
                        </div>
                    </div>
                </div>
            )}

            <div className="w-full max-w-5xl">
                <hr className="border w-full border-dark-4/80" />

                <h3 className="body-bold md:h3-bold w-full my-10">
                    More Related post
                </h3>
                {loading || posts?.length === 0 ? (
                    <Loader />
                ) : (
                    <GridPostList posts={randomPosts} />
                )}
            </div>
        </div>
    );
};

export default PostDetails;
