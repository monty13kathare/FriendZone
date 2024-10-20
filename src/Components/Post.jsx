import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCommentOnPost, deletePost, likePost, updatePost } from "../redux/Actions/Post";
import { getAllPosts, getFollowingPosts, getMyPosts, loadUser } from "../redux/Actions/User";
import User from "./User";
import CommentCard from "./CommentCard";
import { VscChromeClose } from "react-icons/vsc";
import { multiFormatDateString } from "../utils";

const Post = ({
  postId,
  caption,
  postImage,
  likes = [],
  comments = [],
  ownerImage,
  ownerName,
  ownerId,
  location,
  tags,
  post,
  createdAt,
  isDelete = false,
  isAccount = false,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.user);

  const [liked, setLiked] = useState(false);
  const [likesUser, setLikesUser] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [commentToggle, setCommentToggle] = useState(false);

  const [following, setFollowing] = useState(false);
  const currentUserFollowing = useSelector((state) => state.user?.user?.following);





  const handleLike = async () => {
    setLiked(!liked);
    await dispatch(likePost(postId));
    dispatch(getAllPosts())
  };


  const handleRedirect = () => {
    if (postId && post)
      navigate(`/update/post/${postId}`, { state: { postData: post } });
  }

  const addCommentHandler = async (e) => {
    e.preventDefault();
    await dispatch(addCommentOnPost(postId, commentValue));
    setCommentValue("");
    dispatch(getAllPosts())
  };





  useEffect(() => {
    likes.forEach((item) => {
      if (item._id === user?._id) setLiked(true);
    });
  }, [likes, user?._id]);


  // Function to check if the current user is following the given creator
  const isFollowingUser = (creatorId) => {
    return currentUserFollowing?.some((item) => item._id === creatorId);
  };


  console.log('likes', likes)

  return (

    <div className="post-card">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <Link to={`/user/${ownerId}`}>
            <img
              src={ownerImage || '/assets/icons/profile-placeholder.svg'}
              alt="creator"
              className="rounded-full w-12 h-12 lg:h-12 object-cover"
            />
          </Link>

          <div className="flex flex-col">
            <p className="base-medium lg:body-bold text-light-1">
              {ownerName}
            </p>
            <div className="flex-center gap-2 text-light-3">
              <p className="subtle-semibold lg:small-regular">
                {multiFormatDateString(createdAt)}
              </p>
              -
              <p className="subtle-semibold lg:small-regular">
                {location}
              </p>
            </div>
          </div>
        </div>

        {/* <div
          onClick={handleRedirect}
          className={` cursor-pointer ${user?._id !== ownerId && 'hidden'}`}
        >
          <img src="/assets/icons/edit.svg" alt="edit" width={20} height={20} />
        </div> */}


      </div>
      <Link to={`/postDetail/${postId}`}>
        <div className="small-medium lg:base-medium py-5">
          <p>{caption}</p>
          <ul className="flex gap-1 mt-2 flex-wrap">
            {
              tags?.split(",")?.map((tag, index) => (
                <li key={`${tag}${index}`} className="text-light-3 small-regular">
                  #{tag}
                </li>
              ))
            }
          </ul>
        </div>
        <img
          src={postImage || "/assets/icons/profile-placeholder.svg"}
          alt="post image"
          className="post-card_img"
        />
      </Link>
      <div className="flex gap-4">
        <button onClick={handleLike} className="flex items-center gap-2">
          <img src={liked ? "/assets/icons/liked.svg" : "/assets/icons/like.svg"} />
        </button>
        <span onClick={() => setLikesUser(!likesUser)} className="cursor-pointer">{likes?.length}</span>
        <button onClick={() => setCommentToggle(!commentToggle)} className="flex gap-2 items-center">
          <img src="/assets/icons/comment.svg" className="w-5" /> <span>{comments?.length}</span>
        </button>

      </div>

      <div className="max-h-60 overflow-y-auto px-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 mt-4">
        {likes?.length > 0 ? (
          <div className="flex items-center cursor-pointer" onClick={() => setLikesUser(!likesUser)}>
            <div className="flex items-center space-x-[-0.5rem]"> {/* Negative margin for overlap */}
              {likes
                .filter(like => user?.following.some(f => f._id === like._id)) // Check if liked user is followed
                .slice(0, 3) // Take only the first 3 followed users who liked the post
                .map((like) => (
                  <div className="relative" key={like._id}>
                    <img
                      src={like.avatar.url}
                      alt={like.name}
                      className="w-6 h-6 rounded-full object-cover border-2 border-white" // White border for separation
                      style={{ zIndex: 1 }} // Ensure avatar is above overlapping backgrounds
                    />
                  </div>
                ))}
            </div>
            {/* Dynamic text for "liked by" section */}
            <p className="text-gray-500 ml-2"> {/* Adjusting left margin here */}
              Liked by {likes.filter(like => user?.following.some(f => f._id === like._id)).map(like => like.name).join(", ")} {likes.length > 1 && `and ${likes.length - 1} others`}
            </p>
          </div>
        ) : (
          <p className="text-center text-gray-500">No likes yet</p>
        )}
      </div>






      <div className="flex flex-col">
        <div className="flex gap-2">
          <span className="text-base font-medium text-gray-400">{ownerName}</span>
          <p className="text-base font-normal text-gray-500 line-clamp-1">{caption}</p>
        </div>
        <p onClick={() => setCommentToggle(!commentToggle)} className="cursor-pointer text-gray-400">
          View all comments
        </p>
      </div>

      {likesUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-100 rounded-lg w-full max-w-xs sm:max-w-sm md:max-w-md relative p-4 shadow-lg overflow-hidden">

            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-gray-700 hover:text-gray-900 transition-all"
              onClick={() => setLikesUser(!likesUser)}
            >
              <VscChromeClose size={24} />
            </button>

            {/* Header */}
            <h3 className="text-center text-lg font-semibold mb-4 text-gray-800">
              Likes
            </h3>

            {/* Likes List */}
            <div className="max-h-48 md:max-h-60 overflow-y-auto space-y-3 px-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {likes?.length > 0 ? (
                likes?.map((like) => {
                  const isFollowing = isFollowingUser(like?._id);
                  return (
                    <div
                      key={like._id}
                      className="flex items-center justify-between border-b py-2"
                    >
                      {/* User Info */}
                      <Link to={`/user/${like?._id}`} className="flex items-center gap-3">
                        <img
                          src={like.avatar.url}
                          alt={like.name}
                          className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover"
                        />
                        <p className="text-gray-700 font-medium">{like.name}</p>
                      </Link>

                      {/* Follow Button */}
                      <button className="text-blue-500 font-semibold hover:underline text-sm md:text-base">
                        {isFollowing ? "UnFollow" : "Follow"}
                      </button>
                    </div>
                  )
                })
              ) : (
                <p className="text-center text-gray-500 py-4">No likes yet</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Comments Modal */}
      {commentToggle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          {/* Modal Container */}
          <div className="bg-white rounded-lg w-full max-w-xs sm:max-w-sm md:max-w-md relative p-4 shadow-lg overflow-hidden">

            {/* Header Section */}
            <div className="flex justify-between items-center pb-4 border-b">
              <h3 className="text-lg md:text-xl font-bold text-gray-800">Comments</h3>
              <button
                className="text-gray-800 font-bold hover:text-red-500 transition-colors"
                onClick={() => setCommentToggle(!commentToggle)}
              >
                <VscChromeClose size={24} />
              </button>
            </div>

            {/* Comments Feed */}
            <div className="mt-4 space-y-4 overflow-y-auto max-h-64 md:max-h-60 px-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {comments?.length > 0 ? (
                comments?.map((item, index) => (
                  <CommentCard
                    key={index}
                    userId={item.user?._id}
                    name={item.user?.name}
                    avatar={item.user?.avatar?.url}
                    comment={item.comment}
                    commentId={item._id}
                    postId={postId}
                    isAccount={isAccount}
                  />
                ))
              ) : (
                <p className="text-center text-gray-500">No comments yet</p>
              )}
            </div>

            <form
              onSubmit={addCommentHandler}
              className="flex flex-col sm:flex-row items-center border-t md:pt-4 space-y-3 sm:space-y-0 sm:space-x-3"
            >
              <img
                src={user?.avatar?.url}
                alt="User"
                className=" md:h-10 md:w-10 md:flex hidden rounded-full border-2"
              />

              <input
                type="text"
                className="w-full sm:flex-grow p-2 border border-gray-300 rounded-full text-sm md:text-base text-gray-700 focus:outline-none focus:border-gray-400"
                placeholder="Add a comment..."
                value={commentValue}
                onChange={(e) => setCommentValue(e.target.value)}
                required
              />

              <button
                type="submit"
                className="bg-primary-500 text-white font-semibold text-sm md:text-base px-4 py-2 rounded-full hover:bg-primary-600 transition-all w-full sm:w-auto"
              >
                Send
              </button>
            </form>

          </div>
        </div>
      )}



    </div>

  );
};

export default Post;
