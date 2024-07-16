import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useNavigate } from "react-router-dom";
import Loader from '../components/Loader/Loader';

const Private = ({ children }) => {
    const { user, userLoader } = useAuth();

    if (userLoader) {
        return <Loader />
    }

    if (user) {
        return children;
    }
    return <Navigate to={"/login"}></Navigate>
};

export default Private;