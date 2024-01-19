'use client'

import {FormEvent, useEffect, useState} from "react";
import {FormCard} from "@/app/shared/utils/ui/formCard";
import Topbar from "@/app/shared/components/Topbar";
import axios from "@/app/shared/config/axios";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";
import {Input} from "@/app/shared/utils/ui/input";
import {Label} from "@/app/shared/utils/ui/label";
import {Textarea} from "@/app/shared/utils/ui/textarea";
import {Button} from "@/app/shared/utils/ui/button";
import {Loader2} from "lucide-react";
import Uploader from "@/app/shared/utils/Uploader";

export default function Solution({params}: { params: { id: string } }) {
    const [solution, setSolution] = useState<any>()
    const router = useRouter()
    const [isPending, setIsPending] = useState(false)

    useEffect(() => {
        (async () => {
            const {data} = await axios.get(`solutions/${params.id}`)
            setSolution(data.data)
        })()
    }, []);

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsPending(true)
        const formData = new FormData(e.target as HTMLFormElement)
        const data = Object.fromEntries(formData)
        delete data.thumbs
        const payload = {
            ...data,
            status: solution?.status?.id
        }
        try {
            await axios.patch(`solutions/${params.id}`, JSON.stringify(payload))
            toast.success('La solution a été mis à jour')
            setTimeout(() => {
                router.back()
            }, 1000)
        } catch {
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
                <Uploader name={'thumbs'} path={`solutions/${solution?.id}/images`}/>

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