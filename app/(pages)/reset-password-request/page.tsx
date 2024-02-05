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
import {resetPasswordRequest} from "@/app/(pages)/reset-password-request/_requests";
import {getInputError} from "@/app/shared/helpers/getInputError";
import {useMutate} from "@/app/shared/hooks/useMutate";

export default function Login() {
    const router = useRouter()

    const getFormData = function (e: FormEvent) {
        const formData = new FormData(e.target as HTMLFormElement)
        return Object.fromEntries(formData)
    }

    const onSuccess = function () {
        toast.success('Mot de passe envoyé par email')
        router.push('/reset-password')
    }

    const {isLoading, errors, mutate} = useMutate(getFormData, resetPasswordRequest, onSuccess)

    return (
        <div className={'relative'}>
            <Topbar/>
            <FormCard title={"Réinitialisation"} handleSubmit={mutate}>

                <div className="mb-3 -mt-6">
                    <p className="text-sm">
                        Entrez votre adresse email pour recevoir un code à 6 chiffres par mail pour réinitialiser votre
                        mot de passe,
                        sur la page suivante, vous pourrez entrer le code reçu par mail et choisir un nouveau mot de
                        passe.
                    </p>
                </div>

                <Label htmlFor={'email'}>Email</Label>
                <Input name={'email'} placeholder={'Entrez votre email'} error={getInputError(errors, 'email')}/>
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
            <Toaster/>
        </div>
    );
}