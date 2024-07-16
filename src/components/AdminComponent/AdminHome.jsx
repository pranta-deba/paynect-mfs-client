import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { FaBangladeshiTakaSign } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { FaUser, FaUsers } from 'react-icons/fa';
import { MdSupportAgent } from "react-icons/md";
import { BiTransfer } from "react-icons/bi";
import SectionTitle from '../SectionTitle/SectionTitle';


const AdminHome = () => {
    const { user } = useAuth();
    const [check, setCheck] = useState(false);
    const handleBal = () => {
        setCheck(true);
        setTimeout(() => {
            setCheck(false);
        }, 5000)
    }
    return (
        <>
            <div className='my-12 flex flex-col md:flex-row justify-between items-center  gap-4' >
                <div className='flex-1 text-center md:text-start'>
                    <button onClick={handleBal} className='py-2 overflow-hidden font-bold rounded-xl flex items-center justify-center text-[#e52165] hover:border hover:border-[#e52165] w-[180px]'>
                        <FaBangladeshiTakaSign size={20} />
                        {check ? user?.bal ? user?.bal : 0 : "Check Balance"}
                    </button>
                </div>
                <div className='flex  justify-center items-center flex-wrap gap-4'>
                    <button title='Total User' className='rounded-xl hover:shadow-xl border p-4 text-[#e52165]'>
                        <FaUsers size={30} />
                    </button>
                    <button title='Total Agents' className='rounded-xl hover:shadow-xl border p-4 text-[#e52165]'>
                        <MdSupportAgent size={30} />
                    </button>
                    <button title='Total Transitions' className='rounded-xl hover:shadow-xl border p-4 text-[#e52165]'>
                        <BiTransfer size={30} />
                    </button>
                </div>


            </div>
            
        </>
    );
};

export default AdminHome;