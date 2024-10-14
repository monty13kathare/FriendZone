import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegEdit } from 'react-icons/fa';
import { loadUser, updateProfile } from "../redux/Actions/User";
import Loader from '../Components/Loader';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.user);
  const { loading: updateLoading, error: updateError, message } = useSelector((state) => state.like);

  const [name, setName] = useState(user.name);
  const [nameId, setNameId] = useState(user.nameId);
  const [email, setEmail] = useState(user.email);
  const [tag, setTag] = useState(user.tag);
  const [avatar, setAvatar] = useState("");
  const [avatarPrev, setAvatarPrev] = useState(user.avatar.url);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatarPrev(Reader.result);
        setAvatar(Reader.result);
      }
    };
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(updateProfile(name, nameId, tag, avatar));
    dispatch(loadUser());
  };

  useEffect(() => {
    if (error) {
      dispatch({ type: "clearErrors" });
    }
    if (updateError) {
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, updateError, message]);

  if (loading) return <Loader />;

  return (
    <div className="w-full text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 flex items-center">
          <FaRegEdit className="mr-2" />
          Edit Profile
        </h1>

        <form onSubmit={submitHandler} className="space-y-6">
          <div className="flex flex-col items-center mb-6">
            <img
              src={avatarPrev}
              alt={name}
              className="w-24 h-24 rounded-full object-cover mb-2"
            />
            <label className="cursor-pointer text-blue-500">
              Change profile photo
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          </div>

          <div>
            <label className="block mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full shad-input rounded p-2"
              placeholder="Name"
              required
            />
          </div>

          <div>
            <label className="block mb-2">Username</label>
            <input
              type="text"
              value={nameId}
              onChange={(e) => setNameId(e.target.value)}
              className="w-full shad-input rounded p-2"
              placeholder="@username"
              required
            />
          </div>

          <div>
            <label className="block mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full shad-input rounded p-2"
              placeholder="Email"
              required
            />
          </div>

          <div>
            <label className="block mb-2">Bio</label>
            <textarea
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="w-full shad-input rounded p-2"
              placeholder="Bio"
            // required
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-dark-4  rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={updateLoading}
              className="px-4 py-2 bg-primary-500  whitespace-nowrap rounded disabled:opacity-50"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;