'use client'

import {FormEvent, useEffect, useMemo, useState} from "react";
import {FormCard} from "@/app/shared/utils/ui/formCard";
import Topbar from "@/app/shared/components/Topbar";
import axios from "@/app/shared/config/axios";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";
import {FilePond} from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import {API_BASE_URL} from "@/app/shared/config/links";
import {Input} from "@/app/shared/utils/ui/input";
import {Label} from "@/app/shared/utils/ui/label";
import {Textarea} from "@/app/shared/utils/ui/textarea";
import {Button} from "@/app/shared/utils/ui/button";
import {Loader2} from "lucide-react";

export default function Solution({params}: { params: { id: string } }) {
    const [solution, setSolution] = useState<any>()
    const [files, setFiles] = useState<any>([])
    const router = useRouter()
    const [formStatus, setFormStatus] = useState('')
    const isPending = useMemo(() => formStatus === 'pending', [formStatus])

    useEffect(() => {
        (async () => {
            const {data} = await axios.get(`solutions/${params.id}`)
            setSolution(data.data)
        })()
    }, [params.id]);

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setFormStatus('pending')
        const formData = new FormData(e.target as HTMLFormElement)
        const data = Object.fromEntries(formData)
        delete data.thumb
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
        } finally {
            setFormStatus('')
        }
    }

    return (
        <div className={'relative'}>
            <Topbar/>
            <FormCard title={'Modifier votre solution'} handleSubmit={handleSubmit}>
                <FilePond
                    files={files}
                    onupdatefiles={setFiles}
                    allowMultiple={false}
                    server={{
                        url: `${API_BASE_URL}solutions/${solution?.id}/image`
                    }}
                    name="thumb"
                    labelIdle='Selectionnez une image'
                />

                <Label htmlFor={'name'}>Nom de la solution</Label>
                <Input name={'name'} placeholder={''} type={'text'} value={solution?.name} error={''}/>

                <Label htmlFor={'description'}>La description de la solution</Label>
                <Textarea name={'description'} placeholder={''} value={solution?.description}/>

                <Label htmlFor={'targetedProblem'}>Votre solution résoud quel problème ?</Label>
                <Textarea name={'targetedProblem'} placeholder={''} value={solution?.targetedProblem}/>
                {
                    isPending ? <Button disabled>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                        En cours...
                    </Button> : <Button type={'submit'}>
                        Se connecter
                    </Button>
                }
            </FormCard>
        </div>
    )
}