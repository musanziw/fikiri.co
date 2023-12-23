"use client";

import {useState} from "react";
import Link from "next/link";
import logo from "@/public/logo.png";
import Image from "next/image";
import {usePathname} from "next/navigation";
import {signOut, useSession} from "next-auth/react";
import {
    WEB_BASE_URL,
    WEB_LOGIN,
    WEB_PROFILE,
    WEB_REGISTER,
    WEB_SOLUTIONS, WEB_SOLUTIONS_SUBMIT,
} from "@/app/shared/config/urls";

export default function Topbar() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const {status, data} = useSession();
    const pathname: string = usePathname();
    const isLogged: boolean = status === "authenticated";

    const logOut = async (e: any) => {
        e.preventDefault()
        await signOut({
            redirect: true,
            callbackUrl: WEB_BASE_URL
        })
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
            path: WEB_SOLUTIONS,
            isShown: true,
        },
        {
            name: "Postuler",
            path: WEB_SOLUTIONS_SUBMIT,
            isShown: true,
        },
        {
            name: "Se connecter",
            path: WEB_LOGIN,
            isShown: !isLogged,
        },
        {
            name: "S'inscrire",
            path: WEB_REGISTER,
            isShown: !isLogged,
        },
        {
            name: trimName(data?.user?.name || ""),
            path: WEB_PROFILE,
            isShown: isLogged,
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
                    isLogged && (
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
                    isLogged && (
                        <button onClick={logOut}>
                            Déconnexion
                        </button>
                    )
                }
            </div>
        </header>
    );
}
