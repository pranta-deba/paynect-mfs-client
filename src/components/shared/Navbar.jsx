import React, { useEffect } from 'react';
import { useState } from 'react';
import { TbMailDollar } from "react-icons/tb";
import { FaHandHoldingUsd } from "react-icons/fa";
import { FaHandHoldingHeart } from "react-icons/fa";
import { RiMobileDownloadFill } from "react-icons/ri";
import { FaRegLightbulb } from "react-icons/fa";
import { TbLocationDollar } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdOutlineMenu } from "react-icons/md";
import { RiCloseLargeFill } from "react-icons/ri";
import useAuth from '../../hooks/useAuth';
import { FaRegUserCircle } from "react-icons/fa";

const Navbar = () => {
    const { user, setUser } = useAuth();
    const [state, setState] = useState(false)
    const [drapdownState, setDrapdownState] = useState({ isActive: false, idx: null })
    const navigate = useNavigate();
    const dropdownNavs = [
        {
            navs: [
                {
                    title: "Send Money",
                    path: "/send-money",
                    icon: <TbMailDollar size={30} />
                    ,
                },
                {
                    title: "Cash Out",
                    path: "/cash-out",
                    icon: <FaHandHoldingUsd size={30} />,
                },
            ]
        }, {
            navs: [
                {
                    title: "Pay Bill",
                    path: "/pay-bill",
                    icon: <FaRegLightbulb size={30} />,
                },
                {
                    title: "Mobile Recharge",
                    path: "/mobile-recharge",
                    icon: <RiMobileDownloadFill size={30} />,
                },
            ]
        }, {
            navs: [
                {
                    title: "Paynect To Bank",
                    path: "/paynect-to-bank",
                    icon: <TbLocationDollar size={30} />,
                },
                {
                    title: "Loan",
                    path: "/loan",
                    icon: <FaHandHoldingHeart size={30} />,
                }
            ]
        }
    ]
    const navigation = [
        { title: "Services", path: "", isDrapdown: true, navs: dropdownNavs },
        { title: "Who We Are?", path: "/who-we-are", isDrapdown: false },
        { title: "Branch", path: "/branch", isDrapdown: false },
    ]
    useEffect(() => {
        document.onclick = (e) => {
            const target = e.target;
            if (!target.closest(".nav-menu")) setDrapdownState({ isActive: false, idx: null });
        };
    }, [])

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('phone');
        navigate('/');
        window.location.reload();
    }

    return (
        <div className='shadow-xl'>
            <nav className={`relative z-20 bg-white w-full md:static md:text-sm md:border-none ${state ? "shadow-lg rounded-b-xl md:shadow-none" : ""}`}>
                <div className="items-center gap-x-14 px-4 max-w-screen-xl mx-auto md:flex md:px-8">
                    <div className="flex items-center justify-between py-3 md:py-5 md:block">
                        <Link to={"/"} >
                            <img
                                src="./logo.png"
                                width={120}
                                height={50}
                                alt="Loading....."
                                className=''
                            />
                        </Link>
                        <div className="flex items-center md:hidden gap-2">
                            {user && <div className="flex items-center relative">
                                <button onClick={() => document.getElementById('my_modal_3').showModal()} className="text-[#e52165]">
                                    <IoNotificationsOutline size={25} />
                                    <span className='absolute w-2 h-2 rounded-full bg-red-600 top-0 right-0 animate-bounce'></span>
                                </button>
                            </div>}
                            <button className="text-gray-500 hover:text-gray-800"
                                onClick={() => setState(!state)}
                            >
                                {
                                    state ? (
                                        <RiCloseLargeFill size={30} className='text-[#e52165]' />
                                    ) : (
                                        <MdOutlineMenu size={30} className='text-[#e52165]' />

                                    )
                                }
                            </button>
                        </div>
                    </div>
                    <div className={`nav-menu flex-1 pb-3 mt-8 md:block md:pb-0 md:mt-0 ${state ? 'block' : 'hidden'}`}>
                        <ul className="items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
                            {
                                navigation.map((item, idx) => {
                                    return (
                                        <li key={idx} className='z-50'>
                                            {
                                                item.isDrapdown ? (
                                                    <>
                                                        {user.role !== "admin" && <button className="w-full flex items-center justify-between gap-1 text-[#0d1137] hover:text-[#e52165]"
                                                            onClick={() => setDrapdownState({ idx, isActive: !drapdownState.isActive })}
                                                        >
                                                            {item.title}
                                                            {
                                                                drapdownState.idx == idx && drapdownState.isActive ? (
                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                                                        <path fillRule="evenodd" d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z" clipRule="evenodd" />
                                                                    </svg>

                                                                ) : (
                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                                                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                                                    </svg>
                                                                )
                                                            }
                                                        </button>}
                                                    </>
                                                ) : (
                                                    <Link to={item.path} className="block text-[#0d1137] hover:text-[#e52165]">
                                                        {item.title}
                                                    </Link>
                                                )
                                            }
                                            {
                                                item.isDrapdown && drapdownState.idx == idx && drapdownState.isActive ? (
                                                    <div className="bg-white mt-6 inset-x-0 top-20 w-full md:absolute md:border-y md:shadow-md md:mt-0">
                                                        <ul className='max-w-screen-xl mx-auto grid items-center gap-6 md:p-8 md:grid-cols-2 lg:grid-cols-3'>
                                                            {item?.navs.map((dropdownItem, idx) => (
                                                                <li key={idx}>
                                                                    <ul className='space-y-6'>
                                                                        {dropdownItem.navs.map((navItem, idx) => (
                                                                            <li key={idx} className="group">
                                                                                <Link to={navItem.path} className='flex gap-3 items-center'>
                                                                                    <div className='w-12 h-12 rounded-full bg-indigo-50 text-[#e52165] flex items-center justify-center duration-150 group-hover:bg-[#e52165] group-hover:text-white md:w-14 md:h-14'>
                                                                                        {navItem.icon}
                                                                                    </div>
                                                                                    <div>
                                                                                        <span className="text-gray-800 duration-200 group-hover:text-[#e52165] text-sm font-medium md:text-base">{navItem.title}</span>
                                                                                    </div>
                                                                                </Link>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ) : ""
                                            }
                                        </li>
                                    )
                                })
                            }
                            <div className='flex-1 items-center justify-end gap-x-4 space-y-3 md:flex md:space-y-0'>
                                {user && <>
                                    <li>
                                        <div className="hidden md:flex items-center relative">
                                            <button onClick={() => document.getElementById('my_modal_3').showModal()} className="text-[#e52165]">
                                                <IoNotificationsOutline size={30} />
                                                <span className='absolute w-2 h-2 rounded-full bg-red-600 top-0 right-0 animate-bounce'></span>
                                            </button>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="dropdown dropdown-end z-[70]" title={user?.name}>
                                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                                <div className="w-10 rounded-full border-2 border-[#e52165]">
                                                    {!user?.image && <FaRegUserCircle size={37} className='mx-auto text-[#e52165]' />}
                                                    {user?.image && <img
                                                        alt={user?.name}
                                                        src={user?.image} />}
                                                </div>
                                            </div>
                                            <ul
                                                tabIndex={0}
                                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                                <li>
                                                    <Link className="justify-between hover:bg-[#e52165] hover:text-white rounded-none">
                                                        Profile
                                                        <span className="badge">New</span>
                                                    </Link>
                                                </li>
                                                <li><Link className='hover:bg-[#e52165] hover:text-white rounded-none'>Settings</Link></li>
                                                <li><button onClick={handleLogout} className='hover:bg-[#e52165] hover:text-white rounded-none'>Logout</button></li>
                                            </ul>
                                        </div>
                                    </li>
                                </>}

                                {!user && <>
                                    <li>
                                        <Link to={'/login'} className="block py-3 px-4 font-medium text-center text-white bg-[#e52165] hover:bg-[#e52165] active:bg-[#e52165] active:shadow-none rounded-sm shadow md:inline">
                                            Login
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={'/register'} className="block py-3 px-4 font-medium text-center text-white bg-[#e52165] hover:bg-[#e52165] active:bg-[#e52165] active:shadow-none rounded-sm shadow md:inline">
                                            Register
                                        </Link>
                                    </li>
                                </>}
                            </div>
                        </ul>
                    </div>
                </div >
            </nav >
            {
                state ? (
                    <div
                        className="z-10 fixed top-0 w-screen h-screen bg-black/20 backdrop-blur-sm md:hidden"
                        onClick={() => setState(false)}></div >
                ) : ""
            }

            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">Press ESC key or click on ✕ button to close</p>
                </div>
            </dialog>
        </div >
    );
};

export default Navbar;