import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";

const Root = () => {
    return (
        <>
            <Navbar />
            <main className="mx-auto max-w-screen-xl px-4 lg:px-8 min-h-[calc(100vh-579.587px)]">
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default Root;