import React, { useCallback, useEffect } from 'react';
import { VscChromeClose } from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';

const FollowDialog = ({ followToggle, setFollowToggle, followData, followers }) => {
    const navigate = useNavigate();


    const redirectUserProfile = (id) => {
        navigate(`/user/${id}`);
        setFollowToggle(!followToggle)
    }

    // Handle click outside the modal to close
    const handleClickOutside = (e) => {
        if (e.target.id === 'modal-overlay') {
            setFollowToggle(!followToggle)
        }
    };


    return (
        <div
            id="modal-overlay"
            className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center ${followToggle ? 'block' : 'hidden'
                }`}
            onClick={handleClickOutside}
        >
            <div className="bg-white  rounded-lg max-w-md w-full mx-4 p-4 sm:p-6">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-lg font-semibold text-gray-900">{followers === true ? "Followers" : "Followings"}</h2>
                    <VscChromeClose
                        className="cursor-pointer text-gray-900"
                        onClick={() => setFollowToggle(!followToggle)}
                        size={24} // Close icon size
                    />
                </div>

                {/* List of Followers */}
                {followData?.length > 0 ? (
                    <div className="space-y-4">
                        {followData?.map((follower) => (
                            <div
                                key={follower._id}
                                className="flex items-center justify-between "
                            >
                                <div className='flex items-center space-x-4 cursor-pointer' onClick={() => redirectUserProfile(follower._id)} >
                                    <img
                                        src={follower.avatar.url}
                                        alt={follower.name}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />

                                    <div className="flex flex-col">
                                        <p className="text-sm font-medium text-gray-900">{follower.name}</p>
                                    </div>
                                </div>
                                <div className='py-2 px-4 border border-gray-600 rounded-md text-sm text-gray-900 font-normal'>Follow</div>

                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-600 mt-6">
                        You don't have any followers yet.
                    </p>
                )}
            </div>
        </div>
    );
};

export default FollowDialog;
