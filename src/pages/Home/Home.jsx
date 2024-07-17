import React, { useState } from 'react';
import Banner from '../../components/homeComponents/Banner';
import Solutions from '../../components/homeComponents/Solutions';
import useAuth from '../../hooks/useAuth';
import Navigation from '../../components/userComponent/Navigation';
import AdminHome from '../../components/AdminComponent/AdminHome';

const Home = () => {
    const { user } = useAuth();
    return (
        <div>
            {
                user && user.role === "user" && <>
                    <Navigation />
                </>
            }
            {
                user && user.role === "admin" && <>
                    <AdminHome />
                </>
            }
            {
                user && user.role === "user" || user && user.role === "agent" || !user && <>
                    <Banner />
                </>
            }
            <Solutions />
        </div>
    );
};

export default Home;