import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineMenu } from "react-icons/md";
import { RiCloseLargeFill } from "react-icons/ri";
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
    const { user, setUser, setUserLoader } = useAuth();
    const [state, setState] = useState(false)
    const navigate = useNavigate();
    const handleLogout = () => {
        setUser(null);
        setUserLoader(true)
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
                            <div className='flex-1 items-center justify-end gap-x-4 space-y-3 md:flex md:space-y-0'>
                                {user && <>
                                    <li>
                                        <button onClick={handleLogout} className="block py-3 px-4 font-medium text-center text-white bg-[#e52165] hover:bg-[#e52165] active:bg-[#e52165] active:shadow-none rounded-sm shadow md:inline">
                                            Log out
                                        </button>
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
        </div >
    );
};

export default Navbar;