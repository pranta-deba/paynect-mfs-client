import React, { useState } from 'react';
import Banner from '../../components/homeComponents/Banner';
import Solutions from '../../components/homeComponents/Solutions';
import useAuth from '../../hooks/useAuth';
import Navigation from '../../components/userComponent/Navigation';
import AdminHome from '../../components/AdminComponent/AdminHome';
import UserHome from '../../components/userComponent/UserHome';
import AgentHome from '../../components/AgentComponent/AgentHome';

const Home = () => {
    const { user } = useAuth();
    return (
        <div>
            {
                user && user.role === "user" && <>
                    <Navigation />
                    <UserHome />
                </>
            }
            {
                user && user.role === "admin" && <>
                    <AdminHome />
                </>
            }
            {
                user && user.role === "agent" && <>
                    <AgentHome />
                </>
            }
            {
                !user && <>
                    <Banner />
                </>
            }
            {!user && <Solutions />}
        </div>
    );
};

export default Home;