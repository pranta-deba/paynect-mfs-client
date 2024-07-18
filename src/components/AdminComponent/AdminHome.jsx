import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { FaBangladeshiTakaSign } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { FaUser, FaUsers } from 'react-icons/fa';
import { MdSupportAgent } from "react-icons/md";
import { BiTransfer } from "react-icons/bi";
import SectionTitle from '../SectionTitle/SectionTitle';
import axios from 'axios';
import toast from 'react-hot-toast';


const AdminHome = () => {
    const { user } = useAuth();
    const [check, setCheck] = useState(false);
    const [transitions, setTransitions] = useState([]);
    const [users, setUsers] = useState([]);
    const [temUsers, setTemUsers] = useState([]);
    const [transitionLoader, setTransitionLoader] = useState(true);
    const [changeStatusLoader, setChangeStatusLoader] = useState(false);
    const [size, setSize] = useState(10);
    const [refetchUser, setRefetchUser] = useState(true);
    const handleBal = () => {
        setCheck(true);
        setTimeout(() => {
            setCheck(false);
        }, 5000)
    }
    useEffect(() => {
        setTransitionLoader(true);
        loadAllTransitions();
    }, [])
    useEffect(() => {
        loadUsers();
    }, [refetchUser])

    const loadAllTransitions = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/admin/all-transitions');
            const result = data.sort((a, b) => b - a);
            setTransitions(result);
            setTransitionLoader(false);
        } catch (error) {
            console.error(error);
            setTransitionLoader(false);
        }
    }

    const loadUsers = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/admin/all-users');
            setUsers(data);
            setTemUsers(data);
        } catch (error) {
            console.error(error);
        }
    }
    const handleLoadData = () => {
        setSize(size + 10);
    }
    const handleSearch = e => {
        e.preventDefault();
        const name = e.target.name.value;
        if (name === "") {
            setUsers(temUsers);
            return;
        }
        const res = temUsers.filter(user => user.name.toLowerCase().includes(name.toLowerCase()));
        setUsers(res);
    }
    const handleSort = e => {
        const val = e.target.value;
        if (val === 'all') {
            setUsers(temUsers);
        } else if (val === 'user') {
            const res = temUsers.filter(user => user.role === 'user');
            setUsers(res);
        } else if (val === 'admin') {
            const res = temUsers.filter(user => user.role === 'admin');
            setUsers(res);
        } else if (val === 'agent') {
            const res = temUsers.filter(user => user.role === 'agent');
            setUsers(res);
        }
    }

    const handleStatus = async (status, id) => {
        setChangeStatusLoader(true);
        try {
            const { data } = await axios.patch('http://localhost:5000/admin/change-status', { status, id });
            if (data.modifiedCount > 0) {
                setRefetchUser(!refetchUser);
                setChangeStatusLoader(false);
            } else {
                toast.error('Something went wrong, try again!')
                setChangeStatusLoader(false);
            }
        } catch (error) {
            setChangeStatusLoader(false);
        }
    }
    return (
        <>
            <div className='md:my-12 flex flex-col md:flex-row justify-between items-center  gap-4 shadow-lg p-4 rounded-lg'>
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
                                        <th className="p-3">From</th>
                                        <th className="p-3">To</th>
                                        <th className="p-3">What</th>
                                        <th className="p-3">Date</th>
                                        <th className="p-3">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        transitions.slice(0, size).map((transition) => (
                                            <tr key={transition._id} title='user' className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50 hover:bg-[#e5216521] hover:shadow-xl">
                                                <td className="p-3">
                                                    <p>+{transition?.from}</p>
                                                </td>
                                                <td className="p-3">
                                                    <p>+{transition?.to}</p>
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
                                                <td className="p-3 font-bold">
                                                    <p className='flex'><FaBangladeshiTakaSign />{transition?.amount}</p>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {transitions.length !== 0 && transitions.length > 10 && <div className='flex justify-center my-2'>
                        <button onClick={() => handleLoadData()} className="py-1 px-4 font-medium text-center text-white bg-[#e52165] hover:bg-[#e52165] active:bg-[#e52165] active:shadow-none rounded-sm shadow md:inline">
                            Load More...
                        </button>
                    </div>}
                    {transitionLoader && <div className="animate-pulse">
                        <div className="h-4 bg-gray-200 mt-3 mb-6 rounded"></div>
                        <div className="h-4 bg-gray-300 mb-6 rounded"></div>
                        <div className="h-4 bg-gray-200 mb-6 rounded"></div>
                        <div className="h-4 bg-gray-300 mb-6 rounded"></div>
                        <div className="h-4 bg-gray-200 mb-6 rounded"></div>
                    </div>}
                </div>
            </div>
            <div className='mb-12'>
                <SectionTitle title='User List' />
                <div className='min-h-[200px] my-4'>
                    <div className='flex justify-center'>
                        <form onSubmit={handleSearch} className="join flex flex-wrap gap-2 md:gap-0">
                            <div className="w-full sm:w-auto">
                                <div>
                                    <input name='name' className="input input-bordered join-item w-full sm:w-auto rounded-none" placeholder="User Name" />
                                </div>
                            </div>
                            <select onChange={handleSort} name='role' className="select select-bordered join-item w-full sm:w-auto">
                                <option value={'all'}>All</option>
                                <option value={'user'}>User</option>
                                <option value={'agent'}>Agent</option>
                                <option value={'admin'}>Admin</option>
                            </select>
                            <div className="indicator">
                                <button type='submit' className="btn join-item py-1 px-4 font-medium text-center text-white bg-[#e52165] hover:bg-[#e52165] active:bg-[#e52165] active:shadow-none rounded-sm shadow">Search</button>
                            </div>
                        </form>
                    </div>
                    <div className="mt-12">
                        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {
                                users.map((u) => (
                                    <li key={u._id} className="relative flex gap-4 items-center py-2 rounded-lg shadow-xl border">
                                        <span
                                            className={`absolute top-1 right-2 font-bold text-[10px] 
                                        ${u?.role === "user" ? "text-blue-800" : ""}
                                        ${u?.role === "agent" ? "text-green-800" : ""}
                                        ${u?.role === "admin" ? "text-red-800" : ""}
                                        `}
                                        >{u?.role}</span>
                                        <div className="flex items-center justify-center w-24 h-24">
                                            {u?.image ? <img
                                                src={u?.image}
                                                className="w-full h-full rounded-full"
                                                alt="ddd"
                                            /> :
                                                <FaUser size={70} />}
                                        </div>
                                        <div>
                                            <h4 className="text-gray-700 font-semibold sm:text-lg">{u?.name}</h4>
                                            <p className="text-indigo-600">+{u?.phone}</p>
                                            {u?.status && <div className="mt-3 flex gap-4 text-gray-400">
                                                {u?.status === "verified" ? <button onClick={() => handleStatus('block', u?._id)} disabled={changeStatusLoader} className='bg-[#e52165] text-white px-2 rounded-md hover:shadow-xl'>Block</button> :
                                                    <button onClick={() => handleStatus('verified', u?._id)} disabled={changeStatusLoader} className='bg-green-600 text-white px-2 rounded-md hover:shadow-xl'>Activated</button>}
                                            </div>}
                                        </div>
                                    </li>
                                ))
                            }

                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminHome;