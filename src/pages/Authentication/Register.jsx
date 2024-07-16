import React, { useState } from 'react';
import OTPInput, { ResendOTP } from "otp-input-react";
import { CgSpinner } from "react-icons/cg";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { auth } from '../../services/firebase.config';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const { setUser } = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pin, setPin] = useState("");
    const [ph, setPh] = useState("");
    const [OTP, setOTP] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()


    const [emailBox, setEmailBox] = useState(true);
    const [numberBox, setNumberBox] = useState(false);
    const [otpBox, setOtpBox] = useState(false);


    const handleEmailSubmit = e => {
        e.preventDefault();
        setEmail(e.target.email.value);
        setName(e.target.name.value);
        setPin(e.target.pin.value);
        if (e.target.pin.value.length != 4) {
            return toast.error('Enter a 4 digit pin');
        }
        setEmailBox(false)
        setNumberBox(true);
        setOtpBox(false)
    }
    const handleNumberSubmit = () => {
        setEmailBox(false)
        setNumberBox(false);
        setOtpBox(true);
    }

    const onCaptchVerify = () => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                'size': 'invisible',
                'callback': (response) => {
                    onRegister()
                },
                'expired-callback': () => { }
            });

        }
    }

    const onRegister = () => {
        setLoading(true);
        onCaptchVerify();
        const appVerifier = window.recaptchaVerifier;
        const formatPh = "+" + ph;

        signInWithPhoneNumber(auth, formatPh, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                setLoading(false);
                setEmailBox(false)
                setNumberBox(false);
                setOtpBox(true);

            }).catch((error) => {
                console.log(error);
                setLoading(false);
                // document.location.reload();
            });
    }

    const onOTPVerify = () => {
        setLoading(true);
        window.confirmationResult
            .confirm(OTP)
            .then(async (res) => {
                const { data } = await axios.post('http://localhost:5000/user', {
                    name,
                    email,
                    pin,
                    phone: ph,
                    role: 'user',
                    bal: 0,
                    image: null
                })
                if (data.insertedId) {
                    setUser({
                        name,
                        email,
                        phone: ph,
                        role: 'user',
                        bal: 0,
                        image: null,
                        status: false,
                    });
                    localStorage.setItem('phone', ph);
                    toast.success('Registration Successful');
                    navigate('/');
                    setLoading(false);
                }
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }


    return (
        <div>
            <div id='recaptcha-container'></div>
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
                            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Register to your account</h3>
                            <p className="">Already Registered account? <Link to="/login" className="font-medium text-[#e52165] hover:text-[#e52165B3]">Login</Link></p>
                        </div>
                    </div>
                    {
                        emailBox && <>
                            <form
                                onSubmit={handleEmailSubmit}
                            >
                                <div className='bg-[#e52165] p-4 space-y-3'>
                                    <div>
                                        <label className="font-medium text-white">
                                            Enter Your Name
                                        </label>
                                        <input
                                            type="text"
                                            name='name'
                                            placeholder="Enter your name"
                                            required
                                            className="w-full mt-2 px-3 py-2 text-black  outline-none border focus:border-white shadow-sm rounded-lg"
                                        />
                                    </div>
                                    <div>
                                        <label className="font-medium text-white">
                                            Enter Your Email
                                        </label>
                                        <input
                                            type="email"
                                            name='email'
                                            placeholder="Enter your email"
                                            required
                                            className="w-full mt-2 px-3 py-2 text-black  outline-none border focus:border-white shadow-sm rounded-lg"
                                        />
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
                                    className="w-full mt-4 px-4 py-2 text-white font-medium bg-[#e52165] hover:bg-[#e52165B3] active:bg-[#e52165] rounded-lg duration-150" type='submit'
                                >
                                    Next
                                </button>
                            </form>
                        </>
                    }
                    {
                        numberBox && <>
                            <div>
                                <div className='flex flex-col items-center justify-center gap-5  bg-[#e52165] p-4'>
                                    <label className="font-medium text-white">
                                        Verify Your Phone Number
                                    </label>
                                    <div>
                                        <PhoneInput country={"bd"} value={ph} onChange={setPh} />
                                    </div>
                                </div>
                                <button
                                    className="flex items-center justify-center gap-2 w-full mt-4 px-4 py-2 text-white font-medium bg-[#e52165] hover:bg-[#e52165B3] active:bg-[#e52165] rounded-lg duration-150"
                                    onClick={onRegister}
                                >
                                    {
                                        loading && <CgSpinner size={20} className='animate-spin' />
                                    }
                                    Send Code Via SMS
                                </button>
                            </div>
                        </>
                    }
                    {
                        otpBox && <>
                            <div>
                                <div className='flex flex-col items-center justify-center gap-5  bg-[#e52165] p-4'>
                                    <label className="font-medium text-white">
                                        Enter Your OTP
                                    </label>
                                    <div>
                                        <OTPInput
                                            value={OTP}
                                            onChange={setOTP}
                                            autoFocus
                                            OTPLength={6}
                                            otpType="number"
                                            disabled={false}
                                            className="opt-container" />
                                    </div>
                                </div>
                                <button
                                    onClick={onOTPVerify}
                                    className="flex items-center justify-center gap-2 w-full mt-4 px-4 py-2 text-white font-medium bg-[#e52165] hover:bg-[#e52165B3] active:bg-[#e52165] rounded-lg duration-150"
                                >
                                    {
                                        loading && <CgSpinner size={20} className='animate-spin' />
                                    }
                                    Verify OTP
                                </button>
                            </div>
                        </>
                    }

                </div>
            </div>
        </div>
    );
};

export default Register;