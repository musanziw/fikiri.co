"use client";

import {useState, FormEvent} from "react";
import {toast, Toaster} from "react-hot-toast";
import Link from "next/link";
import {FormCard} from "@/app/shared/utils/formCard";
import {useRouter} from "next/navigation";
import Topbar from "@/app/shared/utils/Topbar";
import {getInputError} from "@/app/shared/helpers/getInputError";
import {Input} from "@/app/shared/utils/ui/input";
import {Label} from "@/app/shared/utils/ui/label";
import {Button} from "@/app/shared/utils/ui/button";
import {Loader2} from "lucide-react";
import Image from "next/image";
import googleLogo from "@/public/googleLogo.svg";
import {api, apiBaseURL} from "@/app/shared/config/api";
import {useMutation} from "react-query";
import {register} from "@/app/(pages)/register/_requests";
import {AxiosError} from "axios";


export default function Register() {
    const [errors, setErrors] = useState<any>([]);
    const router = useRouter()

    const {isLoading, mutate} = useMutation(async (e: FormEvent) => {
        e.preventDefault()
        setErrors([])
        const formData = new FormData(e.target as HTMLFormElement)
        const payload = Object.fromEntries(formData)
        return await register(payload)
    }, {
        onSuccess: () => {
            toast.success('Inscription réussie')
            router.push('/login')
        },
        onError: (error: AxiosError<any>) => {
            const message: string = error.response?.data?.message
            if (Array.isArray(message)) setErrors(message)
            else toast.error(message)
        }
    })

    const registerWithGoogle = async () => {
        window.location.replace(`${apiBaseURL}auth/google/redirect`);
        api.get('auth/login')
            .catch(() => router.push('/login'))
    }

    return (
        <div className={'relative'}>
            <Topbar/>
            <FormCard title={"Inscrivez-vous"} handleSubmit={mutate}>
                <Label htmlFor={'name'}>Nom</Label>
                <Input name={'name'} placeholder={'Entrez le nom'} error={getInputError(errors, 'name')} type={'text'}/>

                <Label htmlFor={'email'}>Email</Label>
                <Input name={'email'} placeholder={'Entrez votre Email'} error={getInputError(errors, 'email')}
                       type={'email'}/>

                <Label htmlFor={'phoneNumber'}>Téléphone</Label>
                <Input name={'phoneNumber'} placeholder={'Entrez votre numéro Téléphone'}
                       error={getInputError(errors, 'phoneNumber')} type={'text'}/>

                <Label htmlFor={'address'}>Adresse</Label>
                <Input name={'address'} placeholder={'Entrez votre adresse'} error={getInputError(errors, 'address')}
                       type={'text'}/>

                <Label htmlFor={'password'}>Mot de passe</Label>
                <Input name={'password'} placeholder={'Entrez le mot de passe'}
                       error={getInputError(errors, 'password')} type={'password'}/>

                <Button type={'submit'} disabled={isLoading} className={'mt-5'}>
                    {
                        isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                En cours ...
                            </>
                        ) : "S'inscrire"
                    }
                </Button>
                <hr className="my-6 border-gray-300 w-full"/>
                <Button onClick={registerWithGoogle} variant={'outline'} type={"button"}>
                    <Image src={googleLogo} alt={'img logo'} className="mr-2 h-4 w-4"/> S&apos;inscrire avec google
                </Button>

                <p className="border-t border-gray-300 pt-6 text-sm text-gray-500 dark:text-gray-400">
                    Vous avez un compte ?{" "}
                    <Link href={'/login'} className="text-gray-950">
                        Connectez-vous
                    </Link>
                </p>
            </FormCard>
            <Toaster/>
        </div>
    )
}
