"use client";

import Link from "next/link";
import {FormCard} from "@/app/shared/utils/formCard";
import Topbar from "@/app/shared/utils/Topbar";
import {toast, Toaster} from "react-hot-toast";
import {Label} from "@/app/shared/utils/ui/label";
import {Input} from "@/app/shared/utils/ui/input";
import {Button} from "@/app/shared/utils/ui/button";
import {Loader2} from "lucide-react";
import Image from "next/image";
import googleLogo from "@/public/googleLogo.svg"
import useStore from "@/app/shared/hooks/useStore";
import {useMutate} from "@/app/shared/hooks/useMutate";
import {FormEvent} from "react";
import {useRouter} from "next/navigation";
import {User} from "@/app/shared/models/User";
import {googleAuth, post} from "@/app/shared/_requests";

export default function Login() {
    const setUser = useStore.use.setUser()
    const router = useRouter()

    const login = async function (e: FormEvent) {
        const formData = new FormData(e.target as HTMLFormElement)
        const payload = Object.fromEntries(formData)
        return await post('auth/login', payload)
    }

    const onSuccess = function (data: User | null) {
        toast.success('Connexion réussie')
        setUser(data)
        router.push('/me')
    }


    const {isLoading, mutate} = useMutate(login, onSuccess)

    return (
        <div className={'relative'}>
            <Topbar/>
            <FormCard title={"Se connecter"} handleSubmit={mutate}>
                <Label htmlFor={'email'}>Email</Label>
                <Input name={'email'} placeholder={'Entrez votre email'} required={true}/>
                <Label htmlFor={'password'}>Mot de passe</Label>
                <Input name={'password'} type={'password'} placeholder={'Entrez votre mot de passe'} required={true}/>
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
                <Button onClick={googleAuth} variant={'outline'} type={'button'}>
                    <Image src={googleLogo} alt={'img logo'} className="mr-2 h-4 w-4"/> Se connecter avec Google
                </Button>
                <Link href={'/reset-password-request'} className={"text-gray-950 text-sm"}>
                    Mot de passe oublié ? Réinitialiser.
                </Link>
            </FormCard>
            <Toaster/>
        </div>
    );
}