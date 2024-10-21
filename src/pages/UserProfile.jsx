import React, { useEffect, useState } from "react";
import { VscChromeClose } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, Route, Routes, useLocation, useParams } from "react-router-dom";
import {
  followAndUnfollowUser,
  getUserPosts,
  getUserProfile,
  loadUser,
} from "../redux/Actions/User";
import Loader from "../Components/Loader";
import GridPostList from "../Components/GridPostList";
import FollowDialog from "../Components/FollowDialog";

const StatBlock = ({ value, label, onClick }) => (
  <div className="flex-center gap-2 cursor-pointer " onClick={onClick}>
    <p className="small-semibold lg:body-bold text-primary-500">{value}</p>
    <p className="small-medium lg:base-medium text-light-2">{label}</p>
  </div>
);

const UserProfile = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const {
    user,
    loading: userLoading,
    error: userError,
  } = useSelector((state) => state?.userProfile);


  const { user: me } = useSelector((state) => state.user);
  const { loading, error, posts } = useSelector((state) => state.userPosts);
  const {
    error: followError,
    message,
    loading: followLoading,
  } = useSelector((state) => state.like);

  const params = useParams();
  const [followersToggle, setFollowersToggle] = useState(false);
  const [followingToggle, setFollowingToggle] = useState(false);
  const [following, setFollowing] = useState(false);
  const [myProfile, setMyProfile] = useState(false);

  const followHandler = async () => {
    setFollowing(!following);
    await dispatch(followAndUnfollowUser(user._id));
    dispatch(getUserProfile(params.id));

  };

  useEffect(() => {
    dispatch(getUserPosts(params.id));
    dispatch(getUserProfile(params.id));
    dispatch(loadUser())
  }, [dispatch, params.id]);

  useEffect(() => {
    if (me._id === params.id) {
      setMyProfile(true);
    }
    if (user) {
      user.followers.forEach((item) => {
        if (item._id === me._id) {
          setFollowing(true);
        } else {
          setFollowing(false);
        }
      });
    }
  }, [user, me._id, params.id]);




  return loading === true || userLoading === true ? (
    <Loader />
  ) : (


    <div className="profile-container">

      <div className="profile-inner_container">
        <div className="flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7">
          <img
            src={
              user?.avatar?.url || "/assets/icons/profile-placeholder.svg"
            }
            alt="profile"
            className="w-28 h-28 lg:h-36 lg:w-36 rounded-full object-cover"
          />
          <div className="flex flex-col flex-1 justify-between md:mt-2">
            <div className="flex flex-col w-full">
              <h1 className="text-center xl:text-left h3-bold md:h1-semibold w-full">
                {user?.name}
              </h1>
              <p className="small-regular md:body-medium text-light-3 text-center xl:text-left">
                @{user?.nameId}
              </p>
            </div>

            <div className="flex gap-8 mt-10 items-center justify-center xl:justify-start flex-wrap z-20">
              <StatBlock value={user?.posts?.length} label="Posts" />
              <StatBlock value={user?.followers?.length} label="Followers" onClick={() => setFollowersToggle(!followersToggle)} />
              <StatBlock value={user?.following?.length} label="Following" onClick={() => setFollowingToggle(!followingToggle)} />
            </div>

            <p className="small-medium md:base-medium text-center xl:text-left mt-7 max-w-screen-sm">
              {user?.tag || "Software Engineer"}
            </p>
          </div>

          <div className="flex justify-center items-center">
            {myProfile ? null : (
              <button type="button" className={`shad-button_primary px-4 py-2 cursor-pointer ${following ? "bg-primary-500" : "bg-primary-500"
                }`}
                onClick={followHandler}
                disabled={followLoading}
              >
                {following ? "Unfollow" : "Follow"}
              </button>
            )
            }

          </div>

        </div>
      </div>

      <div className="flex max-w-5xl w-full">
        <Link
          to={`/profile/${user?._id}`}
          className={`profile-tab rounded-l-lg ${pathname === `/profile/${user?._id}` && "!bg-dark-3"
            }`}>
          <img
            src={"/assets/icons/posts.svg"}
            alt="posts"
            width={20}
            height={20}
          />
          Posts
        </Link>
        <Link
          to={`/profile/${user?._id}`}
          className={`profile-tab rounded-r-lg ${pathname === `/profile/${user?._id}/liked-posts` && "!bg-dark-3"
            }`}>
          <img
            src={"/assets/icons/like.svg"}
            alt="like"
            width={20}
            height={20}
          />
          Liked Posts
        </Link>
      </div>

      <Routes>
        <Route
          index
          element={<GridPostList posts={posts} showUser={false} />}
        />
      </Routes>
      <Outlet />



      <FollowDialog
        followToggle={followersToggle}
        setFollowToggle={setFollowersToggle}
        followData={user?.followers}
        followers={true}
      />


      <FollowDialog
        followToggle={followingToggle}
        setFollowToggle={setFollowingToggle}
        followData={user?.following}
        followers={false}
      />
    </div>
  );
};

export default UserProfile;
