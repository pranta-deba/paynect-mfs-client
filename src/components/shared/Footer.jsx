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
                <p className="text-center text-xs text-gray-500">&copy; {new Date().getFullYear()}. Paynect. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;