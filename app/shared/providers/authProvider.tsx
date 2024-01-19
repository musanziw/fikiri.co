'use client'

import React, {createContext, ReactNode, useEffect, useState} from 'react';
import axios from "@/app/shared/config/axios";

interface AuthContextProps {
    user: any | null;
    isLoggedIn: boolean;
    setUser: (user: any) => void;
    setIsLoggedIn: (isLoggedIn: boolean) => void
}

export const AuthContext = createContext<AuthContextProps>({
    user: null,
    isLoggedIn: false,
    setIsLoggedIn: () => {},
    setUser: () => {}
});

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [user, setUser] = useState<any | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const checkAuth = async () => {
        try {
            setIsLoggedIn(true)
            const {data} = await axios.get('auth/profile')
            if (data.data) {
                const {data: response} = await axios.get(`users/${data.data.id}`)
                setUser(response.data)
            }
        } catch {
            setUser(null);
            setIsLoggedIn(false)
        }
    };

    useEffect(() => {
        (async () => await checkAuth())()
    }, []);

    return (
        <AuthContext.Provider value={{user, isLoggedIn, setIsLoggedIn, setUser}}>
            {children}
        </AuthContext.Provider>
    );
};