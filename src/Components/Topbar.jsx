import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { logoutUser } from '../redux/Actions/User';
import { useDispatch } from 'react-redux';

const Topbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user?.user);



    const logoutHandler = async () => {
        try {
            await dispatch(logoutUser());
            localStorage.removeItem("token");
            navigate("/login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <section className='topbar'>
            <div className="flex-between py-4 px-5">
                <Link to="/" className='flex gap-3 items-center text-2xl font-bold'>
                    <i className="fa-solid fa-hand-peace text-4xl text-primary-500"></i>
                    <p>Friend<span className='text-primary-500'>Zone</span></p>
                </Link>
                <div className="flex gap-4">
                    <button className='shad-button_ghost' onClick={logoutHandler}>
                        <img src="/assets/icons/logout.svg" alt="logout" />
                    </button>
                    <Link to={`/profile/${user?._id}`} className='flex-center gap-3'>
                        <img src={user?.avatar?.url || '/assets/icons/profile-placeholder.svg'} alt="profile" className='h-8 w-8 rounded-full object-cover' />
                    </Link>
                </div>
            </div>

        </section>
    )
}

export default Topbar