"use client";

import {useState, FormEvent, useContext} from "react";
import {toast, Toaster} from "react-hot-toast";
import Link from "next/link";
import axios from "@/app/shared/config/axios";
import {FormCard} from "@/app/shared/utils/ui/formCard";
import {useRouter} from "next/navigation";
import Topbar from "@/app/shared/components/Topbar";
import {getInputError} from "@/app/shared/helpers/getInputError";
import {API_BASE_URL, API_REGISTER, WEB_LOGIN} from "@/app/shared/config/links";
import {Input} from "@/app/shared/utils/ui/input";
import {Label} from "@/app/shared/utils/ui/label";
import {Button} from "@/app/shared/utils/ui/button";
import {Loader2} from "lucide-react";
import Image from "next/image";
import googleLogo from "@/public/googleLogo.svg";
import {AuthContext} from "@/app/shared/providers/authProvider";


export default function Register() {
    const [errors, setErrors] = useState<any>([]);
    const router = useRouter()
    const [isPending, setIsPending] = useState(false)
    const {setIsLoggedIn} = useContext(AuthContext)

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsPending(true)
        setErrors([])
        const formData = new FormData(e.target as HTMLFormElement)
        const payload = Object.fromEntries(formData)
        try {
            await axios.post(API_REGISTER, JSON.stringify(payload));
            toast.success("Inscription reussie");
            setTimeout(() => {
                router.push(WEB_LOGIN)
            }, 3000)
        } catch (e: any) {
            const data = e.response.data
            if (typeof data.message === 'string') {
                toast.error(data.message)
            } else {
                setErrors(data.message)
            }
        } finally {
            setIsPending(false)
        }
    };

    async function registerWithGoogle(e: FormEvent) {
        e.preventDefault();
        setIsLoggedIn(true)
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
            <FormCard title={"Inscrivez-vous"} handleSubmit={onSubmit}>
                <Label htmlFor={'name'}>Nom</Label>
                <Input name={'name'} placeholder={'Entrez le nom'} error={getInputError(errors, 'name')} type={'text'}/>

                <Label htmlFor={'email'}>Email</Label>
                <Input name={'email'} placeholder={'Entrez votre Email'} error={getInputError(errors, 'email')} type={'email'}/>

                <Label htmlFor={'phoneNumber'}>Téléphone</Label>
                <Input name={'phoneNumber'} placeholder={'Entrez votre numéro Téléphone'} error={getInputError(errors, 'phoneNumber')} type={'text'}/>

                <Label htmlFor={'address'}>Adresse</Label>
                <Input name={'address'} placeholder={'Entrez votre adresse'} error={getInputError(errors, 'address')} type={'text'}/>

                <Label htmlFor={'password'}>Mot de passe</Label>
                <Input name={'password'} placeholder={'Entrez le mot de passe'} error={getInputError(errors, 'password')} type={'password'}/>

                <Button type={'submit'} disabled={isPending} className={'mt-5'}>
                    {
                        isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                En cours ...
                            </>
                        ) : "S'inscrire"
                    }
                </Button>


                <div className="flex flex-row gap-5 justify-center items-center">
                    <div className="basis-1/2 border-t border-gray-300 text-sm text-gray-500"></div>
                    <div className="pb-0">ou</div>
                    <div className="basis-1/2 border-t border-gray-300 text-sm text-gray-500"></div>
                </div>

                <Button onClick={registerWithGoogle} variant={'outline'}>
                    <Image src={googleLogo} alt={'img logo'} className="mr-2 h-4 w-4"/> S&apos;inscrire avec google
                </Button>

                <p className="border-t border-gray-300 pt-6 text-sm text-gray-500 dark:text-gray-400">
                    Vous avez un compte ?{" "}
                    <Link href={WEB_LOGIN} className="text-gray-950">
                        Connectez-vous
                    </Link>
                </p>
            </FormCard>
            <Toaster/>
        </div>
    )
}
