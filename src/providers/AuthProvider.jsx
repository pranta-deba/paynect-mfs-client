import { createContext, useEffect, useState } from "react";
import axios from 'axios';
export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userLoader, setUserLoader] = useState(true);
    const [refetchUser, setRefetchUser] = useState(true);

    useEffect(() => {
        const currentUserNumber = localStorage.getItem("phone") || "";
        if (currentUserNumber) {
            axios.post(`http://localhost:5000/user/phone`, { phone: currentUserNumber })
                .then(res => {
                    if (res.data.token) {
                        localStorage.setItem('token', res.data.token);
                        setUser(res.data.user);
                        setUserLoader(false);
                    }
                })
                .catch(err => {
                    setUser(null);
                    setUserLoader(false);
                    localStorage.removeItem('token');
                });
        } else {
            setUser(null);
            setUserLoader(false);
            localStorage.removeItem('token');
        }
    }, [refetchUser]);


    console.log(user);

    return <AuthContext.Provider
        value={{ user, setUser, userLoader, refetchUser, setRefetchUser, setUserLoader }}
    >{children}</AuthContext.Provider>
};

export default AuthProvider;