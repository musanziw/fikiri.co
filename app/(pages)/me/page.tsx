'use client'

import Topbar from "@/app/shared/components/Topbar";
import axios from "@/app/shared/config/axios";
import {useEffect, useMemo, useState} from "react";
import {useSession} from "next-auth/react";
import Image from 'next/image'
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {moment} from "@/app/shared/config/moment"
import {FilePond} from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import {API_BASE_URL} from "@/app/shared/config/urls";
import SolutionCard from "@/app/(pages)/me/components/SolutionCard";
import UpdateProfile from "@/app/(pages)/me/components/UpdateProfile";
import {Skeleton} from "@/app/shared/utils/ui/skeleton";
import {Tabs, TabsContent, TabsList} from "@/app/shared/utils/ui/tabs";
import {TabsTrigger} from "@radix-ui/react-tabs";

moment.locale('fr')

export default function Solution() {
    const {data: account, status: authStatus} = useSession()
    const [solutions, setSolutions] = useState<any>()
    const [user, setUser] = useState<any>()
    const [files, setFiles] = useState<any>([])
    const authenticated = useMemo(() => authStatus === 'authenticated', [authStatus])
    const imgPath: string = useMemo(() => `${API_BASE_URL}uploads/${user?.profile}`, [user])

    useEffect(() => {
        if (!authenticated) return
        (async () => {
            const payload = {
                name: account?.user?.name,
                email: account?.user?.email,
                profile: account?.user?.image
            }
            await axios.post(`users/create`, JSON.stringify(payload))
            const {data: response} = await axios.get(`auth/profile/${account?.user?.email}`)
            setUser(response.data)
            const {data: reponse} = await axios.get(`solutions/user/${account?.user?.email}`)
            setSolutions(reponse.data)
        })()
    }, [account, authenticated])


    return (
        <>
            <div className={'relative'}>
                <Topbar/>
                <div
                    className={`p-8 flex flex-col mx-6 justify-start max-w-screen-lg md:mx-auto border-x border-dashed`}>
                    {
                        user ? (
                            <>
                                <div className="flex flex-col md:flex-row md:items-center gap-5 pt-16 mb-8">
                                    <div className="relative w-32 h-32 rounded-full overflow-hidden">
                                        <Image
                                            src={imgPath ?? account?.user?.image}
                                            alt="profile"
                                            height={128}
                                            width={128}
                                        />
                                    </div>
                                    {
                                        !account?.user?.image && !user?.profile && (
                                            <div
                                                className="relative w-32 h-32 flex flex-col items-center justify-center rounded-full bg-gray-200 overflow-hidden">
                                                <h1 className={'text-xl font-bold'}>{user?.name[0]}</h1>
                                            </div>
                                        )
                                    }

                                    <div className="flex flex-col items-start gap-2">
                                        <h1 className={'text-3xl font-bold text-gray-950'}>Mon compte</h1>
                                        <h2 className={'text-gray-500'}>
                                            Inscrit
                                            <span className="font-bold ml-2">
                                                {moment(user?.createdAt).fromNow(false)}
                                            </span>
                                        </h2>
                                        <div className="flex items-center gap-2 flex-wrap text-sm ">
                                            <h3 className={'rounded-md bg-gray-100 px-2 font-bold py-1'}>{user?.email}</h3>
                                        </div>
                                    </div>
                                </div>

                                <Tabs defaultValue="profile">
                                    <TabsList className="flex items-center gap-2 w-[200px] bg-none">
                                        <TabsTrigger value="profile">Profile</TabsTrigger>
                                        <TabsTrigger value="solutions">Solutions</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="profile">
                                        <div className={'flex flex-col gap-5 w-full md:w-2/3'}>
                                            <FilePond
                                                files={files}
                                                onupdatefiles={setFiles}
                                                allowMultiple={false}
                                                server={{
                                                    url: `${API_BASE_URL}users/${user?.id}/image`
                                                }}
                                                name="thumb"
                                                labelIdle='Selectionnez une image'
                                            />
                                            <UpdateProfile user={user}/>
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="profile">
                                        {
                                            solutions && <SolutionCard solutions={solutions}/>
                                        }
                                    </TabsContent>
                                </Tabs>
                            </>
                        ) : (
                            <>
                                <div className="flex flex-col md:flex-row md:items-center gap-5 pt-16 mb-8">
                                    <Skeleton className={'w-32 h-32 rounded-full bg-gray-200'}/>
                                    <div className="flex flex-col items-start gap-2">
                                        <Skeleton className="h-8 w-full md:w-[400px] bg-gray-200"/>
                                        <Skeleton className="h-4 w-full md:w-[400px] bg-gray-200"/>
                                        <Skeleton className="h-4 w-full md:w-[400px] bg-gray-200"/>
                                    </div>
                                </div>

                                <div className="flex gap-5 mb-6">
                                    <Skeleton className="h-6 w-full md:w-2/3 bg-gray-200"/>
                                </div>

                                <div className="mb-6 flex flex-col gap-4">
                                    {
                                        Array.from({length: 10}).map((_, i) => (
                                            <Skeleton key={i} className="h-10 w-full md:w-2/3 bg-gray-200"/>
                                        ))
                                    }
                                </div>
                            </>
                        )
                    }
                </div>
                <ToastContainer/>
            </div>
        </>
    )
}