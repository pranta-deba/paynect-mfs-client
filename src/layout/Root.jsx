import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import useAuth from "../hooks/useAuth";
import Loader from "../components/Loader/Loader";

const Root = () => {
    const {userLoader} = useAuth();
    if (userLoader) {
        return <Loader/>
    }
    return (
        <>
            <Navbar />
            <main className="mx-auto md:max-w-screen-xl px-4 lg:px-8 min-h-[calc(100vh-579.587px)]">
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default Root;