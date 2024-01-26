"use client";

import {FormEvent, useState} from "react";
import Link from "next/link";
import {FormCard} from "@/app/shared/utils/formCard";
import Topbar from "@/app/shared/utils/Topbar";
import {toast, Toaster} from "react-hot-toast";
import {useRouter} from "next/navigation";
import {Label} from "@/app/shared/utils/ui/label";
import {Input} from "@/app/shared/utils/ui/input";
import {Button} from "@/app/shared/utils/ui/button";
import {Loader2} from "lucide-react";
import {useMutation} from "react-query";
import {AxiosError} from "axios";
import {resetPassword} from "@/app/(pages)/reset-password/_requests";
import {getInputError} from "@/app/shared/helpers/getInputError";

export default function Login() {
    const [errors, setErrors] = useState<ApiValidationError[]>([]);
    const router = useRouter()

    const {isLoading, mutate} = useMutation(async (e: FormEvent) => {
        e.preventDefault()
        setErrors([])
        const formData = new FormData(e.target as HTMLFormElement)
        const payload = Object.fromEntries(formData)
        return await resetPassword(payload)
    }, {
        onSuccess: () => {
            toast.success('Mot de passe réinitialisé')
            router.push('/login')
        },
        onError: (error: AxiosError<any>) => {
            const message: string | ApiValidationError[] = error.response?.data?.message
            if (Array.isArray(message)) setErrors(message)
            else toast.error(message)
        }
    })

    return (
        <div className={'relative'}>
            <Topbar/>
            <FormCard title={"Réinitialiser le mot de passe"} handleSubmit={mutate}>
                <Label htmlFor={'token'}>Mot de passe à 6 chiffres</Label>
                <Input name={'token'} placeholder={'Mot de passe à 6 chiffres'} error={getInputError(errors, 'token')}/>
                <Label htmlFor={'email'}>Nouveau mot de passe</Label>
                <Input name={'password'} type={'password'} placeholder={'Entrez le nouveau mot de passe'} error={getInputError(errors, 'password')}/>
                <Button type={'submit'} disabled={isLoading} className={'mt-5'}>
                    {
                        isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                En cours ...
                            </>
                        ) : "Réinitialiser"
                    }
                </Button>

                <p className="border-t border-gray-300 pt-6 text-sm text-gray-500">
                    <Link href={'/login'} className="text-gray-950 inline-block ml-1">
                        Connectez-vous
                    </Link>
                </p>
            </FormCard>
            <Toaster/>
        </div>
    );
}