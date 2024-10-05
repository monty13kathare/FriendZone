import { useEffect } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { sidebarLinks } from '../constants'
import { useSelector } from 'react-redux';
import { deleteMyProfile, logoutUser } from '../redux/Actions/User';
import { useDispatch } from 'react-redux';

const LeftSidebar = () => {
    const { pathname } = useLocation();
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
        <nav className='leftsidebar'>
            <div className="flex flex-col gap-11">
                <Link to="/" className='flex gap-3 items-center text-2xl font-bold'>
                    <i className="fa-solid fa-hand-peace text-4xl"></i> FriendZone
                </Link>
                <Link to={`/profile/${user?._id}`} className='flex gap-3 items-center'>
                    <img src={user?.avatar?.url || "/assets/icons/profile-placeholder.svg"} alt="profile" className='h-14 w-14 rounded-full' />
                    <div className="flex flex-col">
                        <p className='body-bold'>{user?.name}</p>
                        <p className='small-regular text-light-3'>@{user?.nameId}</p>
                    </div>
                </Link>

                <ul className='flex flex-col gap-6'>
                    {
                        sidebarLinks?.map((link) => {
                            const isActive = pathname === link.route;
                            return (
                                <li key={link.label} className={`leftsidebar-link group ${isActive && 'bg-primary-500'}`}>
                                    <NavLink to={link.route} className="flex gap-4 items-center p-4">
                                        <img src={link.imgURL} alt={link.label} className={`group-hover:invert-white ${isActive && 'invert-white'}`} />
                                        {link.label}
                                    </NavLink>
                                </li>
                            )
                        }
                        )
                    }
                </ul>
            </div>
            <button className='shad-button_ghost' onClick={logoutHandler} >
                <img src="/assets/icons/logout.svg" alt="logout" />
                <p className='small-medium lg:base-medium'>Logout</p>
            </button>
        </nav>
    )
}

export default LeftSidebar