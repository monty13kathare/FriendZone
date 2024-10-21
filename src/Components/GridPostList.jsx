import { Link } from "react-router-dom";




const GridPostList = ({
    posts,
    showUser = true,
}) => {

    return (
        <ul className="grid-container">
            {posts?.map((post, index) => (
                <li key={index} className="relative md:min-w-80 md:h-80 w-full h-60">
                    <Link to={`/postDetail/${post?._id}`} className="grid-post_link">
                        <img
                            src={post?.image?.url}
                            alt="post"
                            className="h-full w-full object-cover"
                        />
                    </Link>

                    <div className="grid-post_user">
                        {showUser && (
                            <div className="flex items-center justify-start gap-2 flex-1">
                                <img
                                    src={
                                        post?.owner?.avatar?.url ||
                                        "/assets/icons/profile-placeholder.svg"
                                    }
                                    alt="creator"
                                    className="w-8 h-8 rounded-full object-cover"
                                />
                                <p className="line-clamp-1">{post?.owner?.name}</p>
                            </div>
                        )}
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default GridPostList;