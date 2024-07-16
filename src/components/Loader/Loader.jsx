import { CgSpinner } from "react-icons/cg";

const Loader = () => {
    return (
        <div className="min-h-screen flex justify-center items-center">
            <CgSpinner size={40} className="text-[#e52165] animate-spin" />
        </div>
    );
};

export default Loader;