import React, { useState } from 'react';
import { TbMailDollar } from 'react-icons/tb';
import { FaHandHoldingUsd, FaRegUserCircle } from 'react-icons/fa';
import { FaCircleDollarToSlot } from "react-icons/fa6";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Navigation = () => {
    const { user } = useAuth();
    const [check, setCheck] = useState(false);
    const handleBal = () => {
        setCheck(true);
        setTimeout(() => {
            setCheck(false);
        }, 5000)
    }
    return (
        <div className='my-12 flex justify-between items-center flex-wrap gap-4' >
            <div className='flex-1 text-center md:text-start'>
                <button onClick={handleBal} className='py-2 overflow-hidden font-bold rounded-xl flex items-center justify-center text-[#e52165] hover:border hover:border-[#e52165] w-[180px]'>
                    <FaBangladeshiTakaSign size={20} />
                    {check ? user?.bal ? user?.bal : 0 : "Check Balance"}
                </button>
            </div>
            <div className='flex justify-center items-center flex-wrap gap-4'>
                <Link to={"/send-money"} className='rounded-xl hover:shadow-xl flex flex-col items-center justify-center border p-4 text-[#e52165]'>
                    <TbMailDollar size={30}></TbMailDollar>
                    <h1>Send Money</h1>
                </Link>
                <Link to={"/cash-out"} className='rounded-xl hover:shadow-xl flex flex-col items-center justify-center border p-4 text-[#e52165]'>
                    <FaHandHoldingUsd size={30} />
                    <h1>Cash Out</h1>
                </Link>
                <Link to={"/cash-in"} className='rounded-xl hover:shadow-xl flex flex-col items-center justify-center border p-4 text-[#e52165]'>
                    <FaCircleDollarToSlot size={30}></FaCircleDollarToSlot>
                    <h1>Cash In</h1>
                </Link>
            </div>
        </div>
    );
};

export default Navigation;