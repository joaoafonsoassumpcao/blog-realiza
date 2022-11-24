import axios from "axios";
import { createContext, useEffect, useState } from "react";
import {HOST} from "../config"

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

    const login = async (inputs) => {
        const res = await axios.post(`${HOST}/api/login`, inputs);
        console.log(res)
        setCurrentUser(res.data);
    };

    const logout = async (inputs) => {
        const res = await axios.post(`${HOST}/api/logout`);
        console.log(res.data)
        setCurrentUser(null);
    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
        // localStorage.setItem("access_token", currentUser.access_data)
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
  
}