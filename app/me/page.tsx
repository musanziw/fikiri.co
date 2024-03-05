"use client";
import {useEffect, useState} from "react";
import UpdateProfile from "@/app/me/(components)/UpdateProfile";
import {Loader2} from "lucide-react";
import UserInfo from "@/app/me/(components)/UserInfo";
import SolutionCard from "./(components)/SolutionCard";
import {useQuery} from "react-query";
import {useRouter} from "next/navigation";
import useStore from "@/core/hooks/useStore";
import {get} from "@/core/_requests";
import {Solution} from "@/core/_models";
import Topbar from "@/core/utils/Topbar";

export default function Solution() {
    const [active, setActive] = useState<number>(0);
    const user = useStore.use.user();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/login");
        }
    }, [user, router]);

    const LINKS = [
        {
            name: "Mon profile",
            index: 0,
        },
        {
            name: "Mes solutions",
            index: 1,
        },
    ];

    const {data} = useQuery(
        ["solutions", user?.id],
        async () => user && get<Solution[]>(`solutions/user/${user?.email}`),
        {
            enabled: !!user?.email,
        }
    );

    const solutions = data || [];

    return (
        <div className={"relative"}>
            <Topbar/>
            {user ? (
                <div className={`p-8 max-w-screen-sm mx-auto flex flex-col pt-20 border-x border-dashed`}>
                    <div className="flex flex-col">
                        <UserInfo user={user}/>
                        <div className="flex items-center gap-3 mb-8">
                            {LINKS.map((link, index) => (
                                <button key={index}
                                        className={`flex items-center gap-2 py-2 px-4 rounded-md cursor-pointer ${link.index === active ? "bg-gray-300/70 text-gray-950" : "bg-gray-100/90"}`}
                                        onClick={() => setActive(index)}>
                                      <span className={"text-gray-500 text-sm font-medium"}>
                                        {link.name}
                                      </span>
                                </button>
                            ))}
                        </div>
                    </div>
                    {active === 0 && <UpdateProfile user={user}/>}
                    {active === 1 && solutions.map((solution: any, index: number) => (
                        <SolutionCard key={index} solution={solution}/>
                    ))}
                </div>
            ) : (
                <div className="h-screen w-full flex flex-col items-center justify-center gap-5 pt-16 mb-8">
                    <Loader2 className={"w-6 h-6 animate-spin"}/>
                    Chargement en cours...
                </div>
            )}
        </div>
    );
}
