import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { FaBangladeshiTakaSign, FaCircleDollarToSlot } from 'react-icons/fa6';
import { FaHandHoldingUsd } from 'react-icons/fa';
import { TbMailDollar } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import SectionTitle from '../SectionTitle/SectionTitle';
import axios from 'axios';
import toast from 'react-hot-toast';

const AgentHome = () => {
    const { user, refetchUser, setRefetchUser } = useAuth();
    const [check, setCheck] = useState(false);
    const [transitions, setTransitions] = useState([]);
    const [transitionLoader, setTransitionLoader] = useState(true);
    const [acceptLoader, setAcceptLoader] = useState(false);
    const [refetch, setRefetch] = useState(false);


    const handleBal = () => {
        setCheck(true);
        setTimeout(() => {
            setCheck(false);
        }, 5000)
    }

    useEffect(() => {
        setTransitionLoader(true);
        if (user) {
            loadAllTransitions();
        }
    }, [user, refetch])

    const loadAllTransitions = async () => {
        try {
            const { data } = await axios.post('http://localhost:5000/user/all-transitions', { phone: user.phone });
            const result = data.sort((a, b) => new Date(b.date) - new Date(a.date));
            setTransitions(result);
            setTransitionLoader(false);
        } catch (error) {
            console.error(error);
            setTransitionLoader(false);
        }
    }
    const handleAccept = async (id, amount, to) => {
        setAcceptLoader(true);
        if (parseInt(user.bal) < parseInt(amount)) {
            setAcceptLoader(false);
            return toast.error('Insufficient balance!');
        }
        try {
            const { data } = await axios.patch(`http://localhost:5000/agent/accept-cash-in`, { phone: user?.phone, id, amount, to })
            if (data.modifiedCount > 0) {
                setAcceptLoader(false);
                setRefetch(!refetch);
                setRefetchUser(!refetchUser);
            } else {
                setAcceptLoader(false);
                toast.error('Failed to accept cash in!');
            }

        } catch (error) {
            console.log(error);
            setAcceptLoader(false);
        }
    }
    return (
        <>
            <div className='my-12 flex justify-between items-center flex-wrap gap-4' >
                <div className='flex-1 flex justify-center md:justify-start md:text-start'>
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
            <div>
                <SectionTitle title='All Transactions' />
                <div className='min-h-[200px]'>
                    <div className="p-2 mx-auto  dark:text-gray-800">
                        <div className="overflow-x-auto rounded-xl">
                            <table className="min-w-full text-xs">
                                <colgroup>
                                    <col />
                                    <col />
                                    <col />
                                    <col />
                                    <col />
                                </colgroup>
                                <thead className="dark:bg-gray-300">
                                    <tr className="text-left text-[#e52165] bg-[#e5216521] shadow-lg">
                                        <th className="p-3">Number</th>
                                        <th className="p-3">Transition ID</th>
                                        <th className="p-3">Description</th>
                                        <th className="p-3">What</th>
                                        <th className="p-3">Date</th>
                                        <th className="p-3">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        transitions.slice(0, 10).map((transition) => (
                                            <tr key={transition._id} className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50 hover:bg-[#e5216521] hover:shadow-xl">
                                                <td className="p-3">
                                                    <p>+
                                                        {transition?.to == user?.phone ? transition?.from : ''}
                                                        {transition?.from == user?.phone ? transition?.to : ''}
                                                    </p>
                                                </td>
                                                <td className="p-3">
                                                    <p>{transition?.transactionNumber}</p>
                                                </td>
                                                <td className="p-3">
                                                    <p>{transition?.message}</p>
                                                </td>
                                                <td className="p-3">
                                                    <p
                                                        className={`capitalize font-bold 
                                                    ${transition?.system === "send money" ? "text-[#e52165]" : ""}
                                                    ${transition?.system === "cash out" ? "text-yellow-500" : ""}
                                                    ${transition?.system === "cash in" ? "text-blue-700" : ""}
                                                    `}
                                                    >{transition?.system}</p>
                                                </td>
                                                <td className="p-3">
                                                    <p className="">{new Date(transition?.date).toLocaleDateString()}</p>
                                                    <p className="text-[10px]">{new Date(transition?.date).toLocaleTimeString()}</p>
                                                </td>
                                                <td className="p-3 font-bold flex gap-2 items-center">
                                                    <p className={`flex ${!transition?.approved && transition?.system === "cash in" ? "line-through text-red-600" : ""}`}><FaBangladeshiTakaSign />{transition?.amount}</p>
                                                    {
                                                        !transition?.approved && transition?.system === "cash in" &&
                                                        <button
                                                            disabled={acceptLoader}
                                                            onClick={() => handleAccept(transition._id, parseInt(transition?.amount), transition?.to)}
                                                            className='bg-[#e52165] px-2 py-1 rounded-md text-white'>Accept</button>
                                                    }
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {transitionLoader && <div className="animate-pulse">
                        <div className="h-4 bg-gray-200 mt-3 mb-6 rounded"></div>
                        <div className="h-4 bg-gray-300 mb-6 rounded"></div>
                        <div className="h-4 bg-gray-200 mb-6 rounded"></div>
                        <div className="h-4 bg-gray-300 mb-6 rounded"></div>
                        <div className="h-4 bg-gray-200 mb-6 rounded"></div>
                    </div>}
                </div>
            </div>
        </>
    );
};

export default AgentHome;