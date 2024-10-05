import React from 'react';
import { useSelector } from 'react-redux';
import Post from '../Components/Post';
import Loader from '../Components/Loader';
import { getAllPosts, loadUser } from '../redux/Actions/User';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';



const Home = () => {
    const dispatch = useDispatch();

    const { loading, posts, error } = useSelector((state) => state.allPosts);

    console.log('posts', posts)

    useEffect(() => {
        dispatch(getAllPosts());
        dispatch(loadUser());
    }, [dispatch]);

    return (

        <div className="flex flex-1">
            <div className="home-container">
                <div className="home-posts">
                    <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
                    {loading && !posts ? (
                        <Loader />
                    ) : (
                        <ul className="flex flex-col flex-1 gap-9 w-full">
                            {posts?.map((post, index) => (
                                <div key={index}>
                                    <Post
                                        postId={post._id}
                                        caption={post.caption}
                                        postImage={post.image.url}
                                        likes={post.likes}
                                        comments={post.comments}
                                        ownerImage={post.owner.avatar.url}
                                        ownerName={post.owner.name}
                                        ownerId={post.owner._id}
                                        location={post.location}
                                        createdAt={post.createdAt}
                                        tags={post.tags}
                                        post={post}
                                    />
                                </div>

                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Home;
