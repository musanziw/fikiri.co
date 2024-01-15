'use client'

import Topbar from "@/app/shared/components/Topbar";
import axios from "@/app/shared/config/axios";
import {useContext, useEffect, useState} from "react";
import {Toaster} from "react-hot-toast";
import {moment} from "@/app/shared/config/moment"
import {FilePond} from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import {API_BASE_URL} from "@/app/shared/config/links";
import UpdateProfile from "@/app/(pages)/me/components/UpdateProfile";
import {AuthContext} from "@/app/shared/providers/authProvider";
import {Loader2} from "lucide-react";

moment.locale('fr')

export default function Solution() {
    const [solutions, setSolutions] = useState<any>()
    const [files, setFiles] = useState<any>([])
    const {user} = useContext(AuthContext)

    // const imgPath: string = useMemo(() => `${API_BASE_URL}uploads/${user?.profile}`, [user])
    useEffect(() => {
        (async () => {
            const {data: reponse} = await axios.get(`solutions/user/${user?.email}`)
            setSolutions(reponse.data)
        })()
    }, [user])

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
                                    {/*<div className="relative w-32 h-32 rounded-full overflow-hidden">*/}
                                    {/*    <Image*/}
                                    {/*        src={imgPath ?? user?.image}*/}
                                    {/*        alt="profile"*/}
                                    {/*        height={128}*/}
                                    {/*        width={128}*/}
                                    {/*    />*/}
                                    {/*</div>*/}
                                    {
                                        !user?.image && !user?.profile && (
                                            <div
                                                className="relative w-32 h-32 flex flex-col items-center justify-center rounded-full bg-gray-200 overflow-hidden">
                                                <h1 className={'text-xl font-bold'}>{user?.name[0]}</h1>
                                            </div>
                                        )
                                    }

                                    <div className="flex flex-col items-start gap-2">
                                        <h1 className={'text-3xl font-bold'}>Mon compte</h1>
                                        <h2 className={'text-gray-500'}>
                                            Inscrit {moment(user?.createdAt).fromNow(false)}
                                        </h2>
                                        <div className="flex items-center gap-2 flex-wrap text-sm ">
                                            <h3 className={'rounded-md bg-gray-100 px-2 font-medium py-1'}>{user?.email}</h3>
                                        </div>
                                    </div>
                                </div>


                                <div className={'flex flex-col gap-5 w-full md:w-2/4'}>
                                    <FilePond
                                        files={files}
                                        onupdatefiles={setFiles}
                                        allowMultiple={true}
                                        className={'text-white'}
                                        server={{
                                            url: `${API_BASE_URL}users/${user?.id}/image`
                                        }}
                                        name="thumb"
                                        labelIdle='Selectionnez une image'
                                    />
                                    <UpdateProfile user={user}/>
                                </div>

                            </>
                        ) : (
                            <>
                                <div className="h-screen flex flex-col items-center justify-center gap-5 pt-16 mb-8">
                                    <Loader2 className={'w-6 h-6 animate-spin'}/>
                                    Chargement en cours...
                                </div>
                            </>
                        )
                    }
                </div>
                <Toaster/>
            </div>
        </>
    )
}