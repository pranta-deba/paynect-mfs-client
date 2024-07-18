import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Footer = () => {
    const { user } = useAuth()
    return (
        <footer className="bg-[#0d1137] text-white">
            <div className="mx-auto max-w-screen-xl space-y-8 px-4 py-12 sm:px-6 lg:space-y-16 lg:px-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <div className="flex justify-center">
                        <Link to={"/"} >
                            <img
                                src="./logo2.png"
                                width={120}
                                height={50}
                                alt="Loading....."
                                className=''
                            />
                        </Link>
                    </div>

                    <ul className="mt-8 flex justify-center md:justify-start gap-6 sm:mt-0 sm:justify-end">
                        <li>
                            <Link>
                                <img src="./playstore.svg" alt="" title='Get Paynect app on Google Play' />
                            </Link>
                        </li>
                        <li>
                            <Link>
                                <img src="./applestore.svg" alt="" title='Get Paynect app on Google Play' />
                            </Link>
                        </li>
                    </ul>
                </div>

                {!user && <div
                    className="grid grid-cols-1 gap-8 border-t border-gray-100 pt-8 sm:grid-cols-2 lg:grid-cols-4 lg:pt-12"
                >
                    <div className='text-gray-300'>
                        Welcome to Paynect, your trusted platform for fast and secure financial transactions. Experience convenience at your fingertips with Paynect.
                    </div>

                    <div>
                        <p className="font-medium">Company</p>

                        <ul className="mt-6 space-y-4 text-sm">
                            <li>
                                <a href="#" className=" transition hover:opacity-75 text-gray-300"> About </a>
                            </li>

                            <li>
                                <a href="#" className=" transition hover:opacity-75 text-gray-300"> Meet the Team </a>
                            </li>

                            <li>
                                <a href="#" className=" transition hover:opacity-75 text-gray-300"> Accounts Review </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <p className="font-medium ">Helpful Links</p>

                        <ul className="mt-6 space-y-4 text-sm">
                            <li>
                                <a href="#" className=" transition hover:opacity-75 text-gray-300"> Contact </a>
                            </li>

                            <li>
                                <a href="#" className=" transition hover:opacity-75 text-gray-300"> FAQs </a>
                            </li>

                            <li>
                                <a href="#" className=" transition hover:opacity-75 text-gray-300"> Live Chat </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <p className="font-medium ">Legal</p>

                        <ul className="mt-6 space-y-4 text-sm">
                            <li>
                                <a href="#" className=" transition hover:opacity-75 text-gray-300"> Accessibility </a>
                            </li>

                            <li>
                                <a href="#" className=" transition hover:opacity-75 text-gray-300"> Returns Policy </a>
                            </li>

                            <li>
                                <a href="#" className=" transition hover:opacity-75 text-gray-300"> Refund Policy </a>
                            </li>

                            <li>
                                <a href="#" className=" transition hover:opacity-75 text-gray-300"> Hiring Statistics </a>
                            </li>
                        </ul>
                    </div>
                </div>}

                {!user && <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()}. Paynect. All rights reserved.</p>}
                {user && <p className="text-center text-xs text-gray-500">&copy; {new Date().getFullYear()}. Paynect. All rights reserved.</p>}
            </div>
        </footer>
    );
};

export default Footer;