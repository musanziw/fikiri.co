'use client'

import {useRouter} from "next/navigation";
import {FormEvent} from "react";
import {post} from "@/app/shared/_requests";
import {toast} from "@/app/shared/helpers/toast";
import {useMutate} from "@/app/shared/hooks/useMutate";
import {Label} from "@/app/shared/utils/ui/label";
import {Input} from "@/app/shared/utils/ui/input";
import {getInputError} from "@/app/shared/helpers/getInputError";
import {Button} from "@/app/shared/utils/ui/button";
import {Loader2} from "lucide-react";
import Link from "next/link";
import {FormCard} from "@/app/shared/utils/formCard";

export default function Form() {
    const router = useRouter()

    const resetPassword = async (e: FormEvent) => {
        const formData = new FormData(e.target as HTMLFormElement)
        const payload = Object.fromEntries(formData)
        return await post('auth/reset-password', payload)
    }

    const onSuccess = async () => {
        await toast('success', 'Mot de passe réinitialisé')
        router.push('/login')
    }

    const {isLoading, errors, mutate} = useMutate(resetPassword, onSuccess)

    return (
        <FormCard title={"Réinitialiser"} handleSubmit={mutate}>
            <Label htmlFor={'token'}>Mot de passe à 6 chiffres</Label>
            <Input name={'token'} placeholder={'Mot de passe à 6 chiffres'} error={getInputError(errors, 'token')}
                   required={true}/>
            <Label htmlFor={'email'}>Nouveau mot de passe</Label>
            <Input name={'password'} type={'password'} placeholder={'Entrez le nouveau mot de passe'}
                   error={getInputError(errors, 'password')} required={true}/>
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
            <Link href={'/login'} className="text-gray-950 text-sm">
                Vous avez un compte ? Connectez-vous.
            </Link>
        </FormCard>
    )
}