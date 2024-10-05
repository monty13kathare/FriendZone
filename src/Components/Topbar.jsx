import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Topbar = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user?.user);

    console.log('user', user)



    return (
        <section className='topbar'>
            <div className="flex-between py-4 px-5">
                <Link to="/" className='flex gap-3 items-center text-2xl font-bold'>
                    <i className="fa-solid fa-hand-peace text-4xl"></i> FriendZone
                </Link>
                <div className="flex gap-4">
                    <button className='shad-button_ghost'>
                        <img src="/assets/icons/logout.svg" alt="logout" />
                    </button>
                    <Link to={`/account`} className='flex-center gap-3'>
                        <img src={user?.avatar?.url || '/assets/icons/profile-placeholder.svg'} alt="profile" className='h-8 w-8 rounded-full' />
                    </Link>
                </div>
            </div>

        </section>
    )
}

export default Topbar