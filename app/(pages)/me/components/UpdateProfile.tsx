import {FormEvent, useState} from "react";
import axios from "@/app/shared/config/axios";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";
import {Input} from "@/app/shared/utils/ui/input";
import {Label} from "@/app/shared/utils/ui/label";
import {Button} from "@/app/shared/utils/ui/button";
import {Loader2} from "lucide-react";
import {getInputError} from "@/app/shared/helpers/getInputError";

interface UpdateProfileProps {
    user: any
}

export default function UpdateProfile({user}: UpdateProfileProps) {
    const router = useRouter()
    const [isPending, setIsPending] = useState(false)
    const [errors, setErrors] = useState<any>([]);

    async function updateProfile(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsPending(true)
        setErrors([])
        const formData = new FormData(e.target as HTMLFormElement)
        const payload = Object.fromEntries(formData)
        try {
            await axios.patch(`auth/profile/${user?.id}`, JSON.stringify(payload))
            toast.success('Votre profil a été mis à jour')
        } catch (e: any){
            const data = e.response.data
            if (typeof data.message === 'string') {
                toast.error(data.message)
            } else {
                setErrors(data.message)
            }
        } finally {
            setTimeout(() => {
                router.refresh()
            }, 1000)
            setIsPending(false)
        }
    }

    return (
        <form action={''} method={''} onSubmit={updateProfile} className={'flex flex-col gap-4'}>
            <Label htmlFor={'name'}>Nom</Label>
            <Input name={'name'} placeholder={''} type={'text'} defaultValue={user?.name}/>

            <Label htmlFor={'address'}>Adresse</Label>
            <Input name={'address'} placeholder={''} type={'text'} error={getInputError(errors, 'address')} defaultValue={user?.address}/>

            <Label htmlFor={'phoneNumber'}>Téléphone</Label>
            <Input name={'phoneNumber'} placeholder={''} type={'text'} error={getInputError(errors, 'phoneNumber')} defaultValue={user?.phoneNumber}/>

            {
                isPending ? <Button disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                    En cours d&apos;enregistrement...
                </Button> : <Button type={'submit'}>
                    Enregistrer les modifications
                </Button>
            }
        </form>
    )
}