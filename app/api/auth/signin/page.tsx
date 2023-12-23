"use client";

import {useState, FormEvent} from "react";
import Link from "next/link";
import {FormCard} from "@/app/shared/utils/FormCard";
import {Button} from "@/app/shared/utils/Button";
import {signIn} from "next-auth/react";
import {Input} from "@/app/shared/utils/Input";
import "react-toastify/dist/ReactToastify.css";
import Topbar from "@/app/shared/components/Topbar";
import {API_LOGIN, WEB_PROFILE, WEB_REGISTER} from "@/app/shared/config/urls";
import axios from "@/app/shared/config/axios";
import {getInputError} from "@/app/shared/helpers/getInputError";
import {toast, ToastContainer} from "react-toastify";


export default function Login() {
    const [errors, setErrors] = useState([])
    const [formStatus, setFormStatus] = useState('')
    const isPending = formStatus === 'pending'

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setFormStatus('pending')
        setErrors([])
        const formData = new FormData(e.target as HTMLFormElement)
        const payload = Object.fromEntries(formData)
        try {
            const {data: response} = await axios.post(API_LOGIN, payload)
            const user = response.data
            await signIn('credentials', {
                email: user.email,
                password: payload.password,
                redirect: true,
                callbackUrl: WEB_PROFILE
            })
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
    }

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
            <FormCard title={"Se connecter"} handleSubmit={handleSubmit}>
                <Input name={'email'} label={'Email'} placeholder={'Entrez votre email'} type={'text'}
                       error={getInputError(errors, 'email')}/>
                <Input name={'password'} label={'Mot de passe'} placeholder={'Entrez votre mot de passe'}
                       type={'password'} error={getInputError(errors, 'password')}/>
                <Button type={'submit'} label={"Se connecter"} pending={isPending}/>

                <div className="flex flex-row gap-5 justify-center items-center">
                    <div className="basis-1/2 border-t border-gray-300 text-sm text-gray-500"></div>
                    <div className="pb-0">ou</div>
                    <div className="basis-1/2 border-t border-gray-300 text-sm text-gray-500"></div>
                </div>

                <button
                    className={'rounded-md text-sm px-5 py-2 font-medium border gap-8 hover:bg-gray-100 transition-colors duration-200 '}
                    onClick={loginWithGoogle}>
                    Se connecter avec google
                </button>

                <p className="border-t border-gray-300 pt-6 text-sm text-gray-500">
                    Vous n&lsquo;avez pas de compte ?
                    <Link href={WEB_REGISTER} className="text-gray-950 inline-block ml-1">
                        Inscrivez-vous
                    </Link>
                </p>
            </FormCard>
            <ToastContainer/>
        </div>
    );
}