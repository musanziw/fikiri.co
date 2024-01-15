"use client";

import {useContext, useState} from "react";
import Link from "next/link";
import logo from "@/public/logo.png";
import Image from "next/image";
import {usePathname, useRouter} from "next/navigation";
import {
    WEB_BASE_URL,
    WEB_LOGIN,
    WEB_PROFILE,
    WEB_REGISTER,
    WEB_SOLUTIONS,
    WEB_SOLUTIONS_SUBMIT,
} from "@/app/shared/config/links";
import {AuthContext} from "@/app/shared/providers/authProvider";
import axios from "@/app/shared/config/axios";
import {toast, Toaster} from "react-hot-toast";

export default function Topbar() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const pathname: string = usePathname();
    const {isLoggedIn, user, setIsLoggedIn, setUser} = useContext(AuthContext)
    const router = useRouter()

    const logOut = async (e: any) => {
        e.preventDefault()
        router.push('/')
        setIsLoggedIn(false)
        setUser(null)
        setTimeout(async () => {
            await axios.post('auth/logout')
        }, 1000)
    };

    const trimName = (name: string) => {
        if (name.length > 15) {
            return name.substring(0, 15) + "...";
        }
        return name;
    }

    const LINKS = [
        {
            name: "Acceuil",
            path: WEB_BASE_URL,
            isShown: true,
        },
        {
            name: "Solutions",
            label: 'solutions',
            path: WEB_SOLUTIONS,
            isShown: true,
        },
        {
            name: "Se connecter",
            path: WEB_LOGIN,
            isShown: !isLoggedIn,
        },
        {
            name: "S'inscrire",
            path: WEB_REGISTER,
            isShown: !isLoggedIn,
        },
        {
            name: trimName(user?.name || ''),
            path: WEB_PROFILE,
            isShown: isLoggedIn,
        },
    ];

    return (
        <header
            className={`fixed w-full text-gray-800 bg-white shadow-md px-10 py-4 z-10 flex items-center justify-between`}>
            <Link href={"/"} className={"inline-block"} aria-label="logo">
                <Image src={logo} alt={"Logo"} className={"cursor-pointer w-24"} priority={true}/>
            </Link>
            <div className={`flex flex-col gap-2 lg:hidden ${isOpen && "active"}`} onClick={() => {
                setIsOpen(!isOpen)
            }}>
                <div className="h-[1px] w-6 bg-black transition-transform duration-300"></div>
                <div className="h-[1px] w-6 bg-black transition-transform duration-300"></div>
            </div>

            {/* Mobile navbar */}
            <div
                className={`absolute top-14 z-30 w-screen h-screen bg-white transition-transform shadow-xl duration-500 right-0 py-20 px-16 flex flex-col items-start gap-6 justify-start lg:hidden ${!isOpen && "-translate-y-[200%]"}`}>
                {LINKS.map((link, index) => (
                    link.isShown && (
                        <Link href={link.path} key={index}
                              className={`transition-colors duration-300 flex items-center gap-1 ${pathname === link.path && "text-blue-800"}`}>
                            {link.name}
                        </Link>
                    )
                ))}
                {
                    isLoggedIn && (
                        <button onClick={logOut}>
                            Déconnexion
                        </button>
                    )
                }
            </div>

            {/* Desktop navbar */}
            <div className={"hidden lg:flex items-center gap-4"}>
                {LINKS.map((link, index) =>
                        link.isShown && (
                            <Link href={link.path} key={index}
                                  className={`transition-colors duration-300 flex items-center gap-1 ${pathname === link.path && "text-blue-800"}`}>
                                {link.name}
                            </Link>
                        )
                )}
                {
                    isLoggedIn && (
                        <button onClick={logOut}>
                            Déconnexion
                        </button>
                    )
                }
            </div>
            <Toaster/>
        </header>
    );
}
