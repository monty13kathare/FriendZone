import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteCommentOnPost } from "../redux/Actions/Post";
import { getAllPosts, getFollowingPosts, getMyPosts } from "../redux/Actions/User";
import { VscTrash } from "react-icons/vsc";

const CommentCard = ({
  userId,
  name,
  avatar,
  comment,
  commentId,
  postId,
  isAccount,
}) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const deleteCommentHandle = async () => {
    await dispatch(deleteCommentOnPost(postId, commentId));

    dispatch(getAllPosts());

    // if (isAccount) {
    //   dispatch(getMyPosts());
    // } else {
    //   dispatch(getFollowingPosts());
    // }
  };

  return (
    <div className="flex justify-between items-start p-2">
      {/* Comment Section */}
      <div className="flex gap-3 items-start flex-wrap">
        {/* User Avatar */}
        <Link to={`/user/${userId}`}>
          <img
            src={avatar}
            alt={name}
            className="w-10 h-10 rounded-full border-2 border-gray-300"
          />
        </Link>

        {/* Comment Content */}
        <div className="flex flex-col bg-gray-100 p-3 rounded-lg max-w-lg">
          <Link to={`/user/${userId}`} className="font-semibold text-sm text-gray-900 hover:underline">
            {name}
          </Link>
          <p className="text-gray-700 text-sm">{comment}</p>
        </div>
      </div>

      {/* Delete Icon (Visible to post owner or comment owner) */}
      {(isAccount || userId === user._id) && (
        <button
          onClick={deleteCommentHandle}
          className="text-gray-500 hover:text-red-500 transition-all"
        >
          <VscTrash size={20} className="hover:text-rose-500" />
        </button>
      )}
    </div>
  );
};

export default CommentCard;
