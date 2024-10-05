import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Loader from "../Components/Loader";
import GridPostList from "../Components/GridPostList";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../redux/Actions/User";
import { VscChromeClose } from 'react-icons/vsc';


const Explore = () => {
    const dispatch = useDispatch();
    const { ref, inView } = useInView();
    const { loading, posts, error } = useSelector((state) => state.allPosts);

    useEffect(() => {
        dispatch(getAllPosts());
    }, [dispatch]);

    const [searchValue, setSearchValue] = useState("");

    // Function to filter posts based on search value
    const filteredPosts = posts?.filter(post => {
        const { caption, location, tags, owner } = post;
        const lowerCaseSearchValue = searchValue?.toLowerCase();

        // Check if search value matches caption, location, tags, or owner's name
        return (
            caption?.toLowerCase()?.includes(lowerCaseSearchValue) ||
            location?.toLowerCase()?.includes(lowerCaseSearchValue) ||
            tags?.toLowerCase()?.includes(lowerCaseSearchValue) ||
            owner?.name?.toLowerCase()?.includes(lowerCaseSearchValue)
        );
    });

    if (loading || !posts)
        return (
            <div className="flex-center w-full h-full">
                <Loader />
            </div>
        );

    return (
        <div className="explore-container">
            <div className="explore-inner_container">
                <h2 className="h3-bold md:h2-bold w-full">Search Posts</h2>
                <div className="flex gap-2 px-4 w-full rounded-lg bg-dark-4 items-center">
                    <img
                        src="/assets/icons/search.svg"
                        width={24}
                        height={24}
                        alt="search"
                    />
                    <input
                        type="text"
                        placeholder="Search by caption, location, tags, or user name..."
                        className="explore-search w-full outline-none"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    {searchValue && (
                        <VscChromeClose size={20} onClick={() => setSearchValue("")} className="cursor-pointer" />

                    )}

                </div>
            </div>

            <div className="flex-between w-full max-w-5xl mt-16 mb-7">
                <h3 className="body-bold md:h3-bold">Popular Today</h3>
                <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
                    <p className="small-medium md:base-medium text-light-2">All</p>
                    <img
                        src="/assets/icons/filter.svg"
                        width={20}
                        height={20}
                        alt="filter"
                    />
                </div>
            </div>

            <div className="flex flex-wrap gap-9 w-full max-w-5xl">
                {filteredPosts.length > 0 ? (
                    <GridPostList posts={filteredPosts} />
                ) : (
                    <p className="text-light-4 mt-10 text-center w-full">No results found</p>
                )}
            </div>

            {/* Uncomment this section if you want to implement infinite scrolling */}
            {/* {hasNextPage && !searchValue && (
                <div ref={ref} className="mt-10">
                    <Loader />
                </div>
            )} */}
        </div>
    );
};

export default Explore;
