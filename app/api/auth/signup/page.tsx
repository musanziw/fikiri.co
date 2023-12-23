"use client";

import {useState, FormEvent} from "react";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import axios from "@/app/shared/config/axios";
import {FormCard} from "@/app/shared/utils/FormCard";
import {Button} from "@/app/shared/utils/Button";
import {useRouter} from "next/navigation";
import {signIn} from "next-auth/react";
import Topbar from "@/app/shared/components/Topbar";
import {Input} from "@/app/shared/utils/Input";
import {getInputError} from "@/app/shared/helpers/getInputError";
import {API_REGISTER, WEB_LOGIN, WEB_PROFILE} from "@/app/shared/config/urls";


export default function Register() {
    const [errors, setErrors] = useState<any>([]);
    const router = useRouter()
    const [formStatus, setFormStatus] = useState<string>('')
    const isPending = formStatus === 'pending'

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormStatus('pending')
        setErrors([])
        const formData = new FormData(e.target as HTMLFormElement)
        const payload = Object.fromEntries(formData)
        try {
            await axios.post(API_REGISTER, JSON.stringify(payload));
            toast.success("Inscription reussie");
            router.push(WEB_LOGIN)
        } catch (e: any) {
            const data = e.response.data
            if (typeof data.message === 'string') {
                toast.error(data.message)
            } else {
                setErrors(data.message)
            }
        } finally {
            setFormStatus('')
        }
    };


    async function loginWithGoogle(e: FormEvent) {
        e.preventDefault();
        await signIn('google', {
            redirect: true,
            callbackUrl: WEB_PROFILE
        })
    }

    return (
        <div className={'relative'}>
            <Topbar/>
            <FormCard title={"Inscrivez-vous"} handleSubmit={onSubmit}>
                <Input name={'name'} label={'Nom'} placeholder={'Entrez le nom'} error={getInputError(errors, 'name')}
                       type={'text'}/>

                <Input name={'email'} label={'Email'} placeholder={'Entrez votre Email'}
                       error={getInputError(errors, 'email')} type={'email'}/>

                <Input name={'phoneNumber'} label={'Téléphone'} placeholder={'Entrez votre numéro Téléphone'}
                       error={getInputError(errors, 'phoneNumber')} type={'text'}/>

                <Input name={'address'} label={'Adresse'} placeholder={'Entrez votre adresse'}
                       error={getInputError(errors, 'address')} type={'text'}/>

                <Input name={'password'} label={'Mot de passe'} placeholder={'Entrez le mot de passe'}
                       error={getInputError(errors, 'password')} type={'password'}/>

                <Button type={'submit'} label={"S'inscire"} pending={isPending}/>

                <div className="flex flex-row gap-5 justify-center items-center">
                    <div className="basis-1/2 border-t border-gray-300 text-sm text-gray-500"></div>
                    <div className="pb-0">ou</div>
                    <div className="basis-1/2 border-t border-gray-300 text-sm text-gray-500"></div>
                </div>
                <button
                    className={'rounded-md text-sm px-5 py-2 font-medium border gap-8 hover:bg-gray-100 transition-colors duration-200 '}
                    onClick={loginWithGoogle}>
                    S&apos;inscrire avec google
                </button>
                <p className="border-t border-gray-300 pt-6 text-sm text-gray-500 dark:text-gray-400">
                    Vous avez un compte ?{" "}
                    <Link href={WEB_LOGIN} className="text-gray-950">
                        Connectez-vous
                    </Link>
                </p>
            </FormCard>
            <ToastContainer/>
        </div>
    )
}
