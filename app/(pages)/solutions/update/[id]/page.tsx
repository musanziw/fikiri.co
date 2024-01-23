'use client'

import {FormEvent, useEffect, useState} from "react";
import {FormCard} from "@/app/shared/utils/formCard";
import Topbar from "@/app/shared/utils/Topbar";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";
import {Input} from "@/app/shared/utils/ui/input";
import {Label} from "@/app/shared/utils/ui/label";
import {Textarea} from "@/app/shared/utils/ui/textarea";
import {Button} from "@/app/shared/utils/ui/button";
import {Loader2} from "lucide-react";
import Uploader from "@/app/shared/utils/Uploader";
import {Solution} from "@/app/shared/models/Solution";
import {api} from "@/app/shared/config/api";

export default function Solution({params}: { params: { id: string } }) {
    const [solution, setSolution] = useState<Solution>()
    const router = useRouter()
    const [isPending, setIsPending] = useState(false)

    useEffect(() => {
        (async () => {
            const {data} = await api.get(`solutions/${params.id}`)
            setSolution(data.data)
        })()
    }, [params.id]);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        setIsPending(true)
        const formData = new FormData(e.target as HTMLFormElement)
        const data = Object.fromEntries(formData)
        delete data.thumbs
        const payload = {
            ...data
        }
        try {
            await api.patch(`solutions/${params.id}/user`, JSON.stringify(payload))
            toast.success('La solution a été mis à jour')
            setTimeout(() => {
                router.back()
            }, 1000)
        } catch(e) {
            console.log(e)
            toast.error('Echec de mis à jour')
            setTimeout(() => {
                router.refresh()
            }, 1000)
        }
        setIsPending(false)
    }

    return (
        <div className={'relative'}>
            <Topbar/>
            <FormCard title={'Modifier votre solution'} handleSubmit={handleSubmit}>

                <Label htmlFor={'thumbs'}>Preuve de l&apos;existence de la solution</Label>
                <Uploader name={'thumbs'} path={`solutions/${solution?.id}/images`} label={'Cliquez pour ajouter max 3 photos'}/>

                <Label htmlFor={'name'}>Nom de la solution</Label>
                <Input name={'name'} placeholder={''} type={'text'} defaultValue={solution?.name} error={''}/>

                <Label htmlFor={'description'}>La description de la solution</Label>
                <Textarea name={'description'} placeholder={''} defaultValue={solution?.description}/>

                <Label htmlFor={'targetedProblem'}>Votre solution résoud quel problème ?</Label>
                <Textarea name={'targetedProblem'} placeholder={''} defaultValue={solution?.targetedProblem}/>

                <Button type={'submit'} disabled={isPending} className={'mt-5'}>
                    {
                        isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                En cours de traitement...
                            </>
                        ) : "Soumettre les modifications"
                    }
                </Button>
            </FormCard>
        </div>
    )
}