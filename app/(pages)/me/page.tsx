'use client'

import Topbar from "@/app/shared/components/Topbar";
import axios from "@/app/shared/config/axios";
import {useCallback, useContext, useEffect, useState} from "react";
import {Toaster} from "react-hot-toast";
import {moment} from "@/app/shared/config/moment"
import UpdateProfile from "@/app/(pages)/me/components/UpdateProfile";
import {AuthContext} from "@/app/shared/providers/authProvider";
import {Loader2} from "lucide-react";
import UserInfo from "@/app/(pages)/me/components/UserInfo";
import SolutionCard from "./components/SolutionCard";

moment.locale('fr')

export default function Solution() {
    const [solutions, setSolutions] = useState<any>()
    const [active, setActive] = useState<number>(0)
    const {user} = useContext(AuthContext)


    const LINKS = [
        {
            name: 'Mon profile',
            index: 0
        },
        {
            name: "Mes solutions",
            index: 1
        }
    ]

    const getSolutions = useCallback(async () => {
        try {
            const {data: reponse} = await axios.get(`solutions/user/${user?.email}`)
            setSolutions(reponse.data)
        } catch {
            setSolutions([])
        }
    }, []);

    useEffect(() => {
        (async () => await getSolutions())()
    }, [user?.email, getSolutions])

    return (
        <div className={'relative'}>
            <Topbar/>
            {
                user ? (
                    <div className={`p-8 max-w-screen-sm mx-auto flex flex-col pt-20 border-x border-dashed`}>
                        <div className="flex flex-col">
                            <UserInfo user={user}/>
                            <div className="flex items-center mb-8">
                                {
                                    LINKS.map((link, index) => (
                                        <button key={index}
                                                className={`flex items-center gap-2 py-2 px-4 rounded-md cursor-pointer ${link.index === active ? 'bg-gray-200' : ''}`}
                                                onClick={() => setActive(index)}>
                                            <span className={'text-gray-500 text-sm font-medium'}>{link.name}</span>
                                        </button>
                                    ))
                                }
                            </div>
                        </div>
                        {
                            active === 0 && <UpdateProfile user={user}/>
                        }
                        {
                            active === 1 && <SolutionCard solutions={solutions}/>
                        }
                    </div>
                ) : (
                    <>
                        <div className="h-screen w-full flex flex-col items-center justify-center gap-5 pt-16 mb-8">
                            <Loader2 className={'w-6 h-6 animate-spin'}/>
                            Chargement en cours...
                        </div>
                    </>
                )
            }
            <Toaster/>
        </div>
    )
}