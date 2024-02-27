"use client";

import {useState} from "react";
import Link from "next/link";
import logo from "@/public/logo.png";
import Image from "next/image";
import {usePathname, useRouter} from "next/navigation";
import useStore from "@/app/core/hooks/useStore";
import {api} from "@/app/core/config/api";
import {User} from "@/app/core/models/User";

type Link = {
    name: string;
    path: string;
    isShown: boolean;
};

export default function Topbar() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const pathname: string = usePathname();
    const router = useRouter();
    const user: User | null = useStore.use.user();
    const setUser = useStore.use.setUser();

    const logOut = async (e: any) => {
        e.preventDefault();
        router.push("/");
        setUser(null);
        await api.post("auth/logout");
    };

    const trimName = (name: string) => {
        if (name.length > 15) {
            return name.substring(0, 15) + "...";
        }
        return name;
    };

    const LINKS: Link[] = [
        {
            name: "Accueil",
            path: "/",
            isShown: true,
        },
        {
            name: "Solutions",
            path: "/solutions",
            isShown: true,
        },
        {
            name: "Se connecter",
            path: "/login",
            isShown: user === null,
        },
        {
            name: "S'inscrire",
            path: "/register",
            isShown: user === null,
        },
        {
            name: trimName(user?.name || ""),
            path: "/me",
            isShown: user !== null,
        },
    ];

    return (
        <header
            className={`fixed w-full text-gray-800 bg-white shadow-md px-10 py-4 z-10 flex items-center justify-between`}
        >
            <Link href={"/"} className={"inline-block"} aria-label="logo">
                <Image
                    src={logo}
                    alt={"Logo"}
                    className={"cursor-pointer w-24"}
                    priority={true}
                />
            </Link>
            <div className={`flex flex-col gap-2 lg:hidden ${isOpen && "active"}`} onClick={() => {
                setIsOpen(!isOpen);
            }}>
                <div className="h-[1px] w-6 bg-black transition-transform duration-300"></div>
                <div className="h-[1px] w-6 bg-black transition-transform duration-300"></div>
            </div>

            {/* Mobile navbar */}
            <div
                className={`absolute top-14 z-30 w-screen h-screen bg-white transition-transform shadow-xl duration-500 right-0 py-20 px-16 flex flex-col items-start gap-6 justify-start lg:hidden ${!isOpen && "-translate-y-[200%]"}`}>
                {LINKS.map(
                    (link, index) =>
                        link.isShown && (
                            <Link href={link.path} key={index}
                                  className={`transition-colors duration-300 flex items-center gap-1 ${pathname === link.path && "text-blue-800"}`}>
                                {link.name}
                            </Link>
                        )
                )}
                {user && <button onClick={logOut}>Déconnexion</button>}
            </div>

            {/* Desktop navbar */}
            <div className={"hidden lg:flex items-center gap-4"}>
                {LINKS.map(
                    (link, index) =>
                        link.isShown && (
                            <Link href={link.path} key={index}
                                  className={`transition-colors duration-300 flex items-center gap-1 ${pathname === link.path && "text-blue-800"}`}>
                                {link.name}
                            </Link>
                        )
                )}
                {user && <button onClick={logOut}>Déconnexion</button>}
            </div>
        </header>
    );
}
