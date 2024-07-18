import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import useAuth from "../hooks/useAuth";
import Loader from "../components/Loader/Loader";

const Root = () => {
    const { userLoader } = useAuth();
    if (userLoader) {
        return <Loader />
    }
    return (
        <>
            <Navbar />
            <main className="md:max-w-screen-xl mx-auto px-4 lg:px-8 md:min-h-[calc(100vh-290.787px)]">
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default Root;