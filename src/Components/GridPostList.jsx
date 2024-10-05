import { useSelector } from "react-redux";
import { Link } from "react-router-dom";




const GridPostList = ({
    posts,
    showUser = true,
}) => {
    const user = useSelector((state) => state.user?.user);

    console.log('user 234', user)
    console.log('posts', posts)

    return (
        <ul className="grid-container">
            {posts?.map((post) => (
                <li key={post._id} className="relative min-w-80 h-80">
                    <Link to={`/postDetail/${post._id}`} className="grid-post_link">
                        <img
                            src={post.image?.url}
                            alt="post"
                            className="h-full w-full object-cover"
                        />
                    </Link>

                    <div className="grid-post_user">
                        {showUser && (
                            <div className="flex items-center justify-start gap-2 flex-1">
                                <img
                                    src={
                                        post.owner.avatar?.url ||
                                        "/assets/icons/profile-placeholder.svg"
                                    }
                                    alt="creator"
                                    className="w-8 h-8 rounded-full"
                                />
                                <p className="line-clamp-1">{post.owner.name}</p>
                            </div>
                        )}
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default GridPostList;