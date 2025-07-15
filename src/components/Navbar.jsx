import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeUser } from '../utils/userSlice';
import axios from 'axios';
import userimg from '../assets/user.png';
import user2img from '../assets/user2.png';
import ganesh1 from '../assets/ganesh1.png'
import kcdt1 from '../assets/kc4.png'
import kcdt2 from '../assets/kc2.jpeg'
import kcdt3 from '../assets/kcdas.png'
const BASE_URL = import.meta.env.VITE_API_URL;

const Navbar = () => {
    //  const user = useSelector((store) => store.user)
     const user = JSON.parse(localStorage.getItem("user") || "null");
    const dispatch = useDispatch();
    const navigate = useNavigate();


 const HandleLogout = async () => {
    try {
        await axios.post(BASE_URL + "/logout",{},{withCredentials:true});
         localStorage.removeItem("user");
        dispatch(removeUser());
        return navigate('/login')
    }
    catch (err) {
        console.error(err);
    }

 }

  return (
    <>
    <div className="navbar">
  <div className="flex-1">
    {/* <img src={kcdt1} style={{height:'82px',width:'82px'}} /> */}
    <div className='flex flex-col'>
    {/* <p className="text-sm font-bold text-white pl-1">K C Das Memorial Charitable Trust</p>
    <p className="text-sm font-bold text-white pl-1">Sanathana Dharma Vaaradhi</p> */}
    <p className="text-sm font-bold text-white pl-1">JapaSankhya</p>
    </div>
    <img src={ganesh1} style={{height:'64px',width:'64px'}} />
  </div>
  
  {user &&
  <div className="flex-none">
    
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={user2img} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        {/* <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li> */}
        <li className='px-3 py-1'>Welcome, <strong>{user.name}</strong></li>
        <li className='px-3'>PINNum: <strong>{user.pinnum}</strong></li>
        {user.usertype === "admin" && (
                                    <>
                                        <li>
                                            <a onClick={() => navigate('/dashboard')}>Your Dashboard</a>
                                        </li>
                                        <li>
                                            <a onClick={() => navigate('/overview')}>Users Overview</a>
                                        </li>
                                        <li>
                                            <a onClick={() => navigate('/deactivate-user')}>Deactivate User</a>
                                        </li>
                                        <li>
                                            <a onClick={() => navigate('/create-event')}>Create Event</a>
                                        </li>
                                        <li>
                                            <a onClick={() => navigate('/list-events')}>Events List</a>
                                        </li>
                                    </>
                                )}
        <li><a onClick={() => navigate('/user/events')}>Your Events</a></li>
        <li><a onClick={HandleLogout}>Logout</a></li>
      </ul>
    </div>
  </div>
}
</div>
    </>
  )
}

export default Navbar