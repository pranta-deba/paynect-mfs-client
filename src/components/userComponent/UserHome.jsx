import React, { useEffect, useState } from 'react';
import SectionTitle from '../SectionTitle/SectionTitle';
import useAuth from '../../hooks/useAuth';
// import axios from 'axios';
import { FaBangladeshiTakaSign } from 'react-icons/fa6';
import axios from 'axios';

const UserHome = () => {
    const { user } = useAuth();
    const [transitions, setTransitions] = useState([]);
    const [transitionLoader, setTransitionLoader] = useState(true);

    useEffect(() => {
        setTransitionLoader(true);
        if (user) {
            loadAllTransitions();
        }
    }, [user])

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
    return (
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
                                    transitions.slice(0,10).map((transition) => (
                                        <tr key={transition._id} title='user' className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50 hover:bg-[#e5216521] hover:shadow-xl">
                                            <td className="p-3">
                                                <p>+
                                                    {transition?.system === "send money" ? transition?.to : ""}
                                                    {transition?.system === "cash out" ? transition?.to : ""}
                                                    {transition?.system === "cash in" ? transition?.from : ""}
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
                {transitionLoader && <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 mt-3 mb-6 rounded"></div>
                    <div className="h-4 bg-gray-300 mb-6 rounded"></div>
                    <div className="h-4 bg-gray-200 mb-6 rounded"></div>
                    <div className="h-4 bg-gray-300 mb-6 rounded"></div>
                    <div className="h-4 bg-gray-200 mb-6 rounded"></div>
                </div>}
            </div>
        </div>
    );
};

export default UserHome;