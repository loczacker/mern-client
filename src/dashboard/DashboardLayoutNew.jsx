import React, { useState } from 'react'
import useAuth from '../hooks/useAuth';
import useUser from '../hooks/useUser';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FaBlog, FaUsers } from 'react-icons/fa6';
import { BiHomeAlt, BiLogInCircle, BiSelectMultiple } from 'react-icons/bi';
import { BsApp, BsBook } from 'react-icons/bs';
import { MdBrowseGallery, MdIntegrationInstructions, MdOfflineBolt, MdPayments } from 'react-icons/md';
import Swal from 'sweetalert2';
import Scroll from '../hooks/useScroll';
import { HashLoader } from 'react-spinners';

const adminNavItems = [
  { to: "/dashboard/admin-home", icon: <BiHomeAlt className='text-2xl' />, label: "Dashboard Home" },
  { to: "/dashboard/manage-users", icon: <FaUsers className='text-2xl' />, label: "Manage Users" },
  { to: "/dashboard/manage-book", icon: <BsBook className='text-2xl' />, label: "Manage Books" },
  { to: "/dashboard/manage-applicatons", icon: <BsApp className='text-2xl' />, label: "Applications" },
]

const userNavItems = [
  { to: "/dashboard/user", icon: <BiHomeAlt className='text-2xl' />, label: "Dashboard" },
  { to: "/dashboard/my-selected", icon: <BiSelectMultiple className='text-2xl' />, label: "My Selected" },
  { to: "/dashboard/my-payments", icon: <MdPayments className='text-2xl' />, label: "Manage Books" },
  { to: "/dashboard/app-instructor", icon: <MdIntegrationInstructions className='text-2xl' />, label: "Apply for Instructor" },
]

const lastMenuItems = [
  {
    to: "/",
    icon: <BiHomeAlt className='text-2xl' />,
    label: "Main Home",
  },
  { to: "/trending", icon: <MdOfflineBolt className='text-2xl' />, label: "Trending" },
  { to: "/browse", icon: <MdBrowseGallery className='text-2xl' />, label: "Following" },
]

const DashboardLayoutNew = () => {
  const [open, setOpen] = useState(true);
  const { loader, logout } = useAuth();
  const { currentUser } = useUser();
  const role = currentUser?.role;
  const navigate = useNavigate();

  const hanleLogOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout me!"
    }).then((result) => {
      if (result.isConfirmed) {
        logout().then(Swal.fire({
          title: "Logged Out!",
          text: "Your account has been logged out.",
          icon: "success"
        })

        ).catch((error) => console.log(error))
      }
      navigate("/")
    });
  }

  // const role = "user";

  if(loader) {
    return <div className='flex justify-center items-center h-screen'>
    <HashLoader color="#36d7b7"
    size={50} />
    </div>
  }

  return (
    <div className='flex'>
      <div
        className={`${open ? "w-72 overflow-y-auto" :
          "w-[90px] overflow-auto"} bg-white h-screen p-5 md:block hidden pt-8 relative duration-300`}>
        <div className='flex gap-x-4 items-center'>
          <img onClick={() => setOpen(!open)}
            src='src/assets/awardbooks.png'
            className={`cursor-pointer h-[40px] duration-500 ${open && "rotate-[360deg]"}`} />
          <Link to= '/'>
            <h1
              onClick={() => setOpen(!open)}
              className={`text-dark-primary cursor-pointer font-bold origin-left text-xl 
          duration-200 ${!open && "scale-0"}`}>Book Master</h1>
          </Link>
        </div>

        {/* Navlinks */}

        {/*Admin roles */}
        {role === "admin" && (<ul className='pt-6'>
          <p className={`ml-3 text-gray-500 ${!open && "hidden"}`}><small>MENU</small></p>
          {
            role === "admin" && adminNavItems.map((menuItem, index) => (
              <li key={index} className='mb-2'>
                <NavLink to={menuItem.to}
                  className={
                    ({ isActive }) =>
                      `flex ${isActive ? "bg-red-500 text-white" : "text-[#413F44]"
                      } duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white
                    font-bold text-sm items-center gap-x-4`}>
                  {menuItem.icon}
                  <span className={`!open && "hidden" origin-left duration-200`}>{menuItem.label}</span>
                </NavLink>
              </li>
            ))
          }
        </ul>
        )}

        {/*User roles */}
        {role === "user" && (<ul className='pt-6'>
          <p className={`ml-3 text-gray-500 ${!open && "hidden"}`}><small>MENU</small></p>
          {
            userNavItems.map((menuItem, index) => (
              <li key={index} className='mb-2'>
                <NavLink to={menuItem.to}
                  className={
                    ({ isActive }) =>
                      `flex ${isActive ? "bg-red-500 text-white" : "text-[#413F44]"
                      } duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white
                    font-bold text-sm items-center gap-x-4`}>
                  {menuItem.icon}
                  <span className={`!open && "hidden" origin-left duration-200`}>{menuItem.label}</span>
                </NavLink>
              </li>
            ))
          }
        </ul>
        )}

        <ul className='pt-6'>
          <p className={`ml-3 text-gray-500 uppercase mb-3 ${!open && "hidden"}`}><small>Usefull Links</small></p>
          {lastMenuItems.map((menuItem, index) => (
            <li key={index} className='mb-2'>
              <NavLink to={menuItem.to}
                className={
                  ({ isActive }) =>
                    `flex ${isActive ? "bg-red-500 text-white" : "text-[#413F44]"
                    } duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white
                    font-bold text-sm items-center gap-x-4`}>
                {menuItem.icon}
                <span className={`!open && "hidden" origin-left duration-200`}>{menuItem.label}</span>
              </NavLink>
            </li>
          ))}

          <li>
            <NavLink
              onClick={() => hanleLogOut()}
              className={
                ({ isActive }) =>
                  `flex ${isActive ? "bg-red-500 text-white" : "text-[#413F44]"
                  } duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white
                    font-bold text-sm items-center gap-x-4`}>

              <BiLogInCircle className='text-2xl' />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Logout
              </span>
            </NavLink>
          </li>
        </ul>

      </div>

      <div>
        <Scroll/>
        <Outlet/>
      </div>
    </div>
  )
}

export default DashboardLayoutNew