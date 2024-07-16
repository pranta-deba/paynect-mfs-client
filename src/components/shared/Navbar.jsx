import React, { useEffect } from 'react';
import { useState } from 'react';
import { TbMailDollar } from "react-icons/tb";
import { FaHandHoldingUsd } from "react-icons/fa";
import { FaHandHoldingHeart } from "react-icons/fa";
import { RiMobileDownloadFill } from "react-icons/ri";
import { FaRegLightbulb } from "react-icons/fa";
import { TbLocationDollar } from "react-icons/tb";
import { Link } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdOutlineMenu } from "react-icons/md";
import { RiCloseLargeFill } from "react-icons/ri";

const Navbar = () => {
    const [state, setState] = useState(false)
    const [drapdownState, setDrapdownState] = useState({ isActive: false, idx: null })
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

    return (
        <div>
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
                            {/* <div class="flex items-center relative">
                                <button class="text-[#e52165]">
                                    <IoNotificationsOutline size={25} />
                                    <span className='absolute w-2 h-2 rounded-full bg-red-600 top-0 right-0 animate-bounce'></span>
                                </button>
                            </div> */}
                            <button className="text-gray-500 hover:text-gray-800"
                                onClick={() => setState(!state)}
                            >
                                {
                                    state ? (
                                        <RiCloseLargeFill size={30} className='text-[#e52165]'/>
                                    ) : (
                                        <MdOutlineMenu size={30} className='text-[#e52165]'/>

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
                                        <li key={idx}>
                                            {
                                                item.isDrapdown ? (
                                                    <button className="w-full flex items-center justify-between gap-1 text-[#0d1137] hover:text-[#e52165]"
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
                                                    </button>
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
                            <div className='flex-1 items-center justify-end gap-x-6 space-y-3 md:flex md:space-y-0'>
                                {/* <li>
                                    <div class="hidden md:flex items-center relative">
                                        <button class="text-[#e52165]">
                                            <IoNotificationsOutline size={30} />
                                            <span className='absolute w-2 h-2 rounded-full bg-red-600 top-0 right-0 animate-bounce'></span>
                                        </button>
                                    </div>
                                </li> */}
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
                            </div>
                        </ul>
                    </div>
                </div>
            </nav>
            {
                state ? (
                    <div
                        className="z-10 fixed top-0 w-screen h-screen bg-black/20 backdrop-blur-sm md:hidden"
                        onClick={() => setState(false)}></div>
                ) : ""
            }
        </div>
    );
};

export default Navbar;