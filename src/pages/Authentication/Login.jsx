import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2'
import toast from 'react-hot-toast';
import axios from 'axios';
import { CgSpinner } from 'react-icons/cg';
import useAuth from '../../hooks/useAuth';

const Login = () => {
    const [ph, setPh] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const { setUser } = useAuth();


    const handleEmailSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        if (e.target.pin.value === '' || ph === '') {
            setLoading(false)
            return toast.error("Input field is required");
        } else if (e.target.pin.value.length !== 4) {
            setLoading(false)
            return toast.error('Enter a 4 digit pin!');
        } else if (ph.length !== 13) {
            setLoading(false)
            return toast.error('Phone number must be at least 13 characters!');
        }

        try {
            const { data } = await axios.post('http://localhost:5000/user/login', { phone: ph, pin: e.target.pin.value });
            if (data.message) {
                setLoading(false)
                return toast.error(data.message);
            }
            console.log(data);
            setUser(data);
            localStorage.setItem('phone', ph);
            toast.success('Login Successful');
            navigate('/');
            setLoading(false);
        } catch (error) {
            // toast.error(error.message);
            console.log(error);
        }
    };
    return (
        <div>
            <div className="w-full my-12 flex flex-col items-center justify-center px-4">
                <div className="max-w-sm w-full text-gray-600 space-y-8">
                    <div className="text-center">
                        <img
                            src="./logo.png"
                            width={170}
                            height={50}
                            alt="Loading....."
                            className='mx-auto'
                        />
                        <div className="mt-5 space-y-2">
                            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Login to your account</h3>
                            <p className="">Don't have an account? <Link to="/register" className="font-medium text-[#e52165] hover:text-[#e52165B3]">Register</Link></p>
                        </div>
                    </div>
                    <form
                        onSubmit={handleEmailSubmit}
                    >
                        <div className='bg-[#e52165] p-4 space-y-3'>
                            <div className='space-y-2'>
                                <label className="font-medium text-white">
                                    Verify Your Phone Number
                                </label>
                                <div>
                                    <PhoneInput country={"bd"} value={ph} onChange={setPh} />
                                </div>
                            </div>
                            <div>
                                <label className="font-medium text-white">
                                    Enter a 4 digit pin
                                </label>
                                <input
                                    type="number"
                                    name='pin'
                                    placeholder="enter a 4 digit pin"
                                    required
                                    className="w-full mt-2 px-3 py-2 text-black  outline-none border focus:border-white shadow-sm rounded-lg"
                                />
                            </div>
                        </div>
                        <button
                            disabled={loading}
                            className="flex items-center justify-center gap-2  w-full mt-4 px-4 py-2 text-white font-medium bg-[#e52165] hover:bg-[#e52165B3] active:bg-[#e52165] rounded-lg duration-150" type='submit'
                        >
                            {
                                loading && <CgSpinner size={20} className='animate-spin' />
                            }
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;