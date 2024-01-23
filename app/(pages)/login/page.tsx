"use client";

import {FormEvent} from "react";
import Link from "next/link";
import {FormCard} from "@/app/shared/utils/formCard";
import Topbar from "@/app/shared/utils/Topbar";
import {toast, Toaster} from "react-hot-toast";
import {useRouter} from "next/navigation";
import {Label} from "@/app/shared/utils/ui/label";
import {Input} from "@/app/shared/utils/ui/input";
import {Button} from "@/app/shared/utils/ui/button";
import {Loader2} from "lucide-react";
import Image from "next/image";
import googleLogo from "@/public/googleLogo.svg"
import useStore from "@/app/shared/hooks/useStore";
import {useMutation} from "react-query";
import {api, apiBaseURL} from "@/app/shared/config/api";
import {login} from "@/app/(pages)/login/_requests";
import {AxiosError} from "axios";

export default function Login() {
    const setUser = useStore.use.setUser()
    const router = useRouter()

    const {isLoading, mutate} = useMutation(async (e: FormEvent) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const payload = Object.fromEntries(formData)
        if (!payload.email || !payload.password) throw new Error('Veuillez remplir tous les champs')
        return await login(payload)
    }, {
        onSuccess: (data) => {
            toast.success('Vous êtes connecté')
            setUser(data)
            router.push('/me')
        },
        onError: (error: AxiosError<any>) => {
            const message: string = error.response?.data?.message || error.message
            toast.error(message ?? 'Une erreur est survenue')
        }
    })

    const loginWithGoogle = async () => {
        window.location.replace(`${apiBaseURL}auth/google/redirect`);
        api.get('auth/login')
            .catch(() => router.push('/login'))
    }

    return (
        <div className={'relative'}>
            <Topbar/>
            <FormCard title={"Se connecter"} handleSubmit={mutate}>
                <Label htmlFor={'email'}>Email</Label>
                <Input name={'email'} placeholder={'Entrez votre email'}/>
                <Label htmlFor={'password'}>Mot de passe</Label>
                <Input name={'password'} type={'password'} placeholder={'Entrez votre mot de passe'}/>
                <Button type={'submit'} disabled={isLoading} className={'mt-5'}>
                    {
                        isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                En cours ...
                            </>
                        ) : "Se connecter"
                    }
                </Button>
                <hr className="my-6 border-gray-300 w-full"/>
                <Button onClick={loginWithGoogle} variant={'outline'} type={'button'}>
                    <Image src={googleLogo} alt={'img logo'} className="mr-2 h-4 w-4"/> Se connecter avec Google
                </Button>

                <p className="border-t border-gray-300 pt-6 text-sm text-gray-500">
                    Vous n&lsquo;avez pas de compte ?
                    <Link href={'/register'} className="text-gray-950 inline-block ml-1">
                        Inscrivez-vous
                    </Link>
                </p>
            </FormCard>
            <Toaster/>
        </div>
    );
}