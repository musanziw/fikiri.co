'use client'

import {useRouter} from "next/navigation";
import React, {FormEvent, useState} from "react";
import {googleAuth, post} from "@/app/shared/_requests";
import {toast} from "@/app/shared/helpers/toast";
import {useMutate} from "@/app/shared/hooks/useMutate";
import {Label} from "@/app/shared/utils/ui/label";
import {Input} from "@/app/shared/utils/ui/input";
import {getInputError} from "@/app/shared/helpers/getInputError";
import {Button} from "@/app/shared/utils/ui/button";
import {Loader2} from "lucide-react";
import Image from "next/image";
import googleLogo from "@/public/googleLogo.svg";
import Link from "next/link";
import {FormCard} from "@/app/shared/utils/formCard";
import {InputPassword} from "@/app/shared/utils/inputPassword";

export default function Form() {
    const router = useRouter()
    const [error, setError] = useState<string>('')

    // const checkPasswordMatch = (passwordConfirm: string, password: string) => {
    //     if (passwordConfirm === password) return true
    //     else {
    //         setError("Les mots de passe saisis sont invalides")
    //         return false
    //     }
    // }

    const checkPasswordMatch = (passwordConfirm: string, password: string) => passwordConfirm === password

    const register = async function (e: FormEvent) {
        const formData = new FormData(e.target as HTMLFormElement)
        const payload = Object.fromEntries(formData)
        const passwordConfirm = formData.get('passwordConfirm') as string
        const password = formData.get('password') as string
        const isMatch = checkPasswordMatch(passwordConfirm, password)
        if (isMatch) {
            setError('')
            delete payload.passwordConfirm
            return await post("auth/register", payload)
        } else {
            setError("Les mots de passe saisis sont invalides")
            throw new Error()
        }
    }

    const onSuccess = async function () {
        await toast('success', 'Inscription réussie')
        // router.push('/login')
    }

    const {isLoading, mutate, errors} = useMutate(register, onSuccess)

    return (
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
            <InputPassword name={'password'} error={getInputError(errors, 'password')}/>

            <Label htmlFor={'passwordConfirm'}>Confirmez votre de passe</Label>
            <InputPassword name={'passwordConfirm'} placeholder={'Confirmez votre mot de passe'} error={error}/>

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
            <Button onClick={googleAuth} variant={'outline'} type={"button"}>
                <Image src={googleLogo} alt={'img logo'} className="mr-2 h-4 w-4"/> S&apos;inscrire avec google
            </Button>
            <Link href={'/login'} className={"text-gray-950 text-sm"}>
                Vous avez un compte ? Connectez-vous
            </Link>
        </FormCard>
    )
}