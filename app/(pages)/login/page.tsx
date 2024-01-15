"use client";

import {FormEvent, useContext, useMemo, useState} from "react";
import Link from "next/link";
import {FormCard} from "@/app/shared/utils/ui/formCard";
import Topbar from "@/app/shared/components/Topbar";
import {API_BASE_URL, API_LOGIN, WEB_PROFILE, WEB_REGISTER} from "@/app/shared/config/links";
import axios from "@/app/shared/config/axios";
import {getInputError} from "@/app/shared/helpers/getInputError";
import {toast, Toaster} from "react-hot-toast";
import {AuthContext} from "@/app/shared/providers/authProvider";
import {useRouter} from "next/navigation";
import {Label} from "@/app/shared/utils/ui/label";
import {Input} from "@/app/shared/utils/ui/input";
import {Button} from "@/app/shared/utils/ui/button";
import {Loader2, Mail} from "lucide-react";
import Image from "next/image";
import googleLogo from "@/public/googleLogo.svg"

export default function Login() {
    const [errors, setErrors] = useState([])
    const [isPending, setIsPending] = useState(false)
    const {setIsLoggedIn, setUser} = useContext(AuthContext)
    const router = useRouter()

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setIsPending(true)
        setErrors([])
        const formData = new FormData(e.target as HTMLFormElement)
        const payload = Object.fromEntries(formData)
        try {
            const {data: response} = await axios.post(API_LOGIN, payload)
            toast.success(response.message)
            setUser(response.data)
            setIsLoggedIn(true)
            setTimeout(() => {
                router.push(WEB_PROFILE)
            }, 1000)
        } catch (e: any) {
            const data = e.response.data
            if (typeof data.message === 'string') {
                toast.error(data.message)
            } else {
                setErrors(data.message)
            }
            setIsLoggedIn(false)
        } finally {
            setIsPending(false)
        }
    }

    async function loginWithGoogle(e: FormEvent) {
        e.preventDefault();
        window.location.replace(`${API_BASE_URL}auth/google/redirect`);
        try {
            await axios.get('auth/login')
        } catch {
            router.push('/login')
        }
    }

    return (
        <div className={'relative'}>
            <Topbar/>
            <FormCard title={"Se connecter"} handleSubmit={handleSubmit}>

                <Label htmlFor={'email'}>Email</Label>
                <Input name={'email'} placeholder={'Entrez votre email'} type={'text'}
                       error={getInputError(errors, 'email')}/>

                <Label htmlFor={'password'}>Mot de passe</Label>
                <Input name={'password'} placeholder={'Entrez votre mot de passe'}
                       type={'password'} error={getInputError(errors, 'password')}/>
                {
                    isPending ? <Button disabled>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                        En cours...
                    </Button> : <Button type={'submit'}>
                        Se connecter
                    </Button>
                }

                <div className="flex flex-row gap-5 justify-center items-center">
                    <div className="basis-1/2 border-t border-gray-300 text-sm text-gray-500"></div>
                    <div className="pb-0">ou</div>
                    <div className="basis-1/2 border-t border-gray-300 text-sm text-gray-500"></div>
                </div>

                <Button onClick={loginWithGoogle} variant={'outline'}>
                    <Image src={googleLogo} alt={'img logo'} className="mr-2 h-4 w-4"/> Se connecter avec Google
                </Button>

                <p className="border-t border-gray-300 pt-6 text-sm text-gray-500">
                    Vous n&lsquo;avez pas de compte ?
                    <Link href={WEB_REGISTER} className="text-gray-950 inline-block ml-1">
                        Inscrivez-vous
                    </Link>
                </p>
            </FormCard>
            <Toaster/>
        </div>
    );
}