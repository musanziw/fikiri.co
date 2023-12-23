import {Input} from "@/app/shared/utils/Input";
import {Button} from "@/app/shared/utils/Button";
import {FormEvent, useState} from "react";
import axios from "@/app/shared/config/axios";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";

interface UpdateProfileProps {
    user: any
}

export default function UpdateProfile({user}: UpdateProfileProps) {
    const router = useRouter()
    const [formStatus, setFormStatus] = useState('')
    const isPending = formStatus === 'pending'

    async function updateProfile(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setFormStatus('pending')
        const formData = new FormData(e.target as HTMLFormElement)
        const payload = Object.fromEntries(formData)
        try {
            await axios.patch(`users/${user?.id}`, JSON.stringify(payload))
            toast.success('Votre profil a été mis à jour')
        } catch {
            toast.error('Echec de mis à jour')
        } finally {
            setTimeout(() => {
                router.refresh()
            }, 1000)
            setFormStatus('')
        }
    }

    return (
        <form action={''} method={''} onSubmit={updateProfile}>
            <Input name={'name'} label={'Nom'} placeholder={''} type={'text'} value={user?.name}
                   error={''}/>
            <Input name={'address'} label={'Adresse'} placeholder={''} type={'text'} error={''}
                   value={user?.address}/>
            <Input name={'phoneNumber'} label={'Téléphone'} placeholder={''} type={'text'}
                   error={''} value={user?.phoneNumber}/>
            <Button label={'Enregistrez vos informations'} type={'submit'} pending={isPending}/>
        </form>
    )
}