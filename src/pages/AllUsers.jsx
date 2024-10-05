import { useSelector } from "react-redux";
import Loader from "../Components/Loader";
import { getAllUsers } from "../redux/Actions/User";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import User from "../Components/User";
import { VscChromeClose } from 'react-icons/vsc';

const AllUsers = () => {
    const dispatch = useDispatch();
    const { users, loading: usersLoading } = useSelector((state) => state.allUsers);
    const currentUserId = useSelector((state) => state.user?.user?._id);

    // State to manage search value
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    // Function to filter users based on search input
    const filteredUsers = users?.filter((user) => {
        return (
            user._id !== currentUserId &&
            (user.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                user.nameId.toLowerCase().includes(searchValue.toLowerCase()))
        );
    });

    return (
        <div className="common-container">
            <div className="user-container">
                <h2 className="h3-bold md:h2-bold text-left w-full">All Users</h2>

                {/* Search Field */}
                <div className="flex gap-2 px-4 w-full rounded-lg bg-dark-4 mb-4 items-center">
                    <img
                        src="/assets/icons/search.svg"
                        width={24}
                        height={24}
                        alt="search"
                    />
                    <input
                        type="text"
                        placeholder="Search by name or username..."
                        className="explore-search w-full outline-none"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    {/* Conditionally render the close icon only if searchValue is not empty */}
                    {searchValue && (
                        <VscChromeClose size={20} onClick={() => setSearchValue("")} className="cursor-pointer" />

                    )}
                </div>

                {usersLoading && !users ? (
                    <Loader />
                ) : (
                    <ul className="user-grid">
                        {filteredUsers?.length > 0 ? (
                            filteredUsers.map((creator) => (
                                <li key={creator?._id} className="flex-1 min-w-[200px] w-full">
                                    <User avatar={creator?.avatar?.url} name={creator?.name} username={creator?.nameId} userId={creator?._id} />
                                </li>
                            ))
                        ) : (
                            <p className="text-light-4 text-center w-full mt-4">
                                No users found matching your search criteria.
                            </p>
                        )}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default AllUsers;
