import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { deleteMyProfile, getMyPosts, logoutUser } from '../redux/Actions/User';
import GridPostList from '../Components/GridPostList';
import Modal from '../Components/Model';
import FollowDialog from '../Components/FollowDialog';

const StatBlock = ({ value, label, onClick }) => (
  <div className="flex-center gap-2 cursor-pointer " onClick={onClick}>
    <p className="small-semibold lg:body-bold text-primary-500">{value}</p>
    <p className="small-medium lg:base-medium text-light-2">{label}</p>
  </div>
);

const Account = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [isModalOpen, setModalOpen] = useState(false); // Modal state
  const { user, loading: userLoading } = useSelector((state) => state.user);
  const { loading, error, posts } = useSelector((state) => state.myPosts);

  const [followersToggle, setFollowersToggle] = useState(false);
  const [followingToggle, setFollowingToggle] = useState(false);

  useEffect(() => {
    dispatch(getMyPosts());
  }, [dispatch]);

  return (
    <div className="profile-container">

      <div className="profile-inner_container">
        <div className="flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7">
          <img
            src={
              user.avatar?.url || "/assets/icons/profile-placeholder.svg"
            }
            alt="profile"
            className="w-28 h-28 lg:h-36 lg:w-36 rounded-full"
          />
          <div className="flex flex-col flex-1 justify-between md:mt-2">
            <div className="flex flex-col w-full">
              <h1 className="text-center xl:text-left h3-bold md:h1-semibold w-full">
                {user.name}
              </h1>
              <p className="small-regular md:body-medium text-light-3 text-center xl:text-left">
                @{user.nameId}
              </p>
            </div>

            <div className="flex gap-8 mt-10 items-center justify-center xl:justify-start flex-wrap z-20">
              <StatBlock value={user?.posts?.length} label="Posts" />
              <StatBlock value={user.followers?.length} label="Followers" onClick={() => setFollowersToggle(!followersToggle)} />
              <StatBlock value={user.following?.length} label="Following" onClick={() => setFollowingToggle(!followingToggle)} />
            </div>

            <p className="small-medium md:base-medium text-center xl:text-left mt-7 max-w-screen-sm">
              {user?.tag || "Software Engineer"}
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <div className='flex gap-4 items-center'>
              <Link
                to={`/update/profile`}
                className={`h-12 bg-dark-4 px-5 text-light-1 flex-center gap-2 rounded-lg`}>
                <img
                  src={"/assets/icons/edit.svg"}
                  alt="edit"
                  width={20}
                  height={20}
                />
                <p className="flex whitespace-nowrap small-medium">
                  Edit Profile
                </p>
              </Link>
              <button className={`h-12 bg-dark-4 px-5 text-light-1 flex-center gap-2 rounded-lg`} onClick={() => setModalOpen(true)}>
                <img
                  src={"/assets/icons/setting.svg"}
                  alt="setting"
                  width={30}
                  height={30}
                />
                <p className="flex whitespace-nowrap small-medium">
                  Settings
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex max-w-5xl w-full">
        <div
          className={`profile-tab rounded-l-lg ${pathname === `/profile/${user._id}` && "!bg-dark-3"
            }`}>
          <img
            src={"/assets/icons/posts.svg"}
            alt="posts"
            width={20}
            height={20}
          />
          Posts
        </div>
        <div
          className={`profile-tab rounded-r-lg ${pathname === `/profile/${user._id}/liked-posts` && "!bg-dark-3"
            }`}>
          <img
            src={"/assets/icons/like.svg"}
            alt="like"
            width={20}
            height={20}
          />
          Liked Posts
        </div>
      </div>

      <Routes>
        <Route
          index
          element={<GridPostList posts={user?.posts} showUser={false} />}
        />
      </Routes>
      <Outlet />


      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
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

export default Account;