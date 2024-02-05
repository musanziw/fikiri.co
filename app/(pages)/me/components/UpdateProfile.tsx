import {FormEvent} from "react";
import {toast} from "react-hot-toast";
import {Input} from "@/app/shared/utils/ui/input";
import {Label} from "@/app/shared/utils/ui/label";
import {Button} from "@/app/shared/utils/ui/button";
import {Loader2} from "lucide-react";
import {getInputError} from "@/app/shared/helpers/getInputError";
import Uploader from "@/app/shared/utils/Uploader";
import {User} from "@/app/shared/models/User";
import '@/app/shared/types/ApiValidationError'
import {updateUser} from "@/app/(pages)/me/_requests";
import useStore from "@/app/shared/hooks/useStore";
import {useMutate} from "@/app/shared/hooks/useMutate";

interface UpdateProfileProps {
    user: User
}

export default function UpdateProfile({user}: UpdateProfileProps) {
    const setUser = useStore.use.setUser()

    const getFormData = function (e: FormEvent) {
        const formData = new FormData(e.target as HTMLFormElement)
        const payload = Object.fromEntries(formData)
        delete payload.thumb
        return payload
    }

    const onSuccess = function (data: any) {
        setUser(data.data)
        toast.success('Votre profil a été mis à jour avec succès')
    }

    const updateProfile = function <T>(payload: T) {
        return updateUser(user.id, payload)
    }

    const {isLoading, mutate, errors} = useMutate(getFormData, updateProfile, onSuccess)

    return (
        <form onSubmit={mutate}>
            <div className={'flex flex-col gap-6'}>
                <div className="flex flex-col gap-4">
                    <Label htmlFor={'thumb'}>Photo de profile</Label>
                    <Uploader name={'thumb'} path={`users/${user.id}/image`} label={'Ajouter une photo de profile'}/>
                </div>
                <div className="flex flex-col gap-4">
                    <Label htmlFor={'name'}>Nom</Label>
                    <Input name={'name'} placeholder={''} type={'text'} defaultValue={user.name}/>
                </div>
                <div className="flex flex-col gap-4">
                    <Label htmlFor={'address'}>Adresse</Label>
                    <Input name={'address'} placeholder={'Votre ville'} type={'text'}
                           error={getInputError(errors, 'address')} defaultValue={user.address}/>
                </div>
                <div className="flex flex-col gap-4">
                    <Label htmlFor={'phoneNumber'}>Téléphone</Label>
                    <Input name={'phoneNumber'} placeholder={'Votre numéro de téléphone'} type={'text'}
                           error={getInputError(errors, 'phoneNumber')} defaultValue={user.phoneNumber}/>
                </div>
            </div>
            <Button type={'submit'} disabled={isLoading} className={'mt-5'}>
                {
                    isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                            En cours d&apos;enregistrement...
                        </>
                    ) : "Enregistrer les modifications"
                }
            </Button>
        </form>
    )
}