import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import toast from "react-hot-toast";
import axios from "axios";
import { CgSpinner } from "react-icons/cg";

const CashIn = () => {
    const { user, refetchUser, setRefetchUser } = useAuth();
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [ph, setPh] = useState("");

    const handleSendMoney = async (e) => {
        setLoading(true);
        e.preventDefault();
        const to = ph;
        const from = user?.phone;
        const amount = e.target.amount.value;
        const pin = e.target.pin.value;
        if (user?.status === 'pending') {
            setLoading(false)
            return toast.error("It will take 1 hr to activate your account. please wait..");
        }
        if (user?.status === 'block') {
            setLoading(false)
            return toast.error("Your account is blocked. Please contact a service administrator!");
        }
        if (to === '' || amount === '' || pin === '' || amount < 0) {
            setLoading(false)
            return toast.error("Input field is required");
        } else if (pin.length !== 4) {
            setLoading(false)
            return toast.error('Enter a 4 digit pin!');
        } else if (to.length !== 13) {
            setLoading(false)
            return toast.error('Phone number must be at least 13 characters!');
        } else if (parseInt(amount) < 50) {
            setLoading(false)
            return toast.error('Cash out should be at least 50!');
        }
        try {
            const { data } = await axios.post('http://localhost:5000/transaction/cash-in', { to, pin, from, amount });
            if (data.insertedId) {
                toast.success('Cash in request send. please wait....');
                setLoading(false);
                setRefetchUser(!refetchUser);
                navigate('/');
            } else {
                toast.error(data.message);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }
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
                            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Cash In</h3>
                        </div>
                    </div>
                    <form onSubmit={handleSendMoney}
                    >
                        <div className='bg-[#e52165] p-4 space-y-3'>
                            <div>
                                <label className="font-medium text-white">
                                    Enter a agent number
                                </label>
                                <div>
                                    <PhoneInput country={"bd"} value={ph} onChange={setPh} />
                                </div>
                            </div>
                            <div>
                                <label className="font-medium text-white">
                                    Amount
                                </label>
                                <input
                                    type="number"
                                    name='amount'
                                    placeholder="enter a amount"
                                    required
                                    className="w-full mt-2 px-3 py-2 text-black  outline-none border focus:border-white shadow-sm rounded-lg"
                                />
                            </div>

                            <div>
                                <label className="font-medium text-white">
                                    Enter Your Pin
                                </label>
                                <input
                                    type="number"
                                    name='pin'
                                    placeholder="enter your pin"
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
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CashIn;