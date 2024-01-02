'use client'

import {Input} from "@/app/shared/utils/Input";
import {FormEvent, useEffect, useMemo, useState} from "react";
import {FormCard} from "@/app/shared/utils/FormCard";
import Topbar from "@/app/shared/components/Topbar";
import axios from "@/app/shared/config/axios";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";
import {FilePond} from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import {API_BASE_URL} from "@/app/shared/config/urls";
import {Textarea} from "@/app/shared/utils/TextArea";
import {Button} from "@/app/shared/utils/Button";

export default function Solution({params}: { params: { id: string } }) {
    const [solution, setSolution] = useState<any>()
    const [files, setFiles] = useState<any>([])
    const router = useRouter()
    const [formStatus, setFormStatus] = useState('')
    const isPending = useMemo(() => formStatus === 'pending', [formStatus])

    useEffect(() => {
        (async () => {
            const {data: response} = await axios.get(`solutions/${params.id}`)
            setSolution(response?.data)
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
                <Input name={'name'} label={'Nom de la solution'}
                       placeholder={''} type={'text'} value={solution?.name}
                       error={''}
                />
                <Textarea name={'description'} label={'La description de la solution'} placeholder={''} error={''}
                          value={solution?.description}/>
                <Textarea name={'targetedProblem'} label={' Votre solution résoud quel problème ?'} placeholder={''}
                          error={''} value={solution?.targetedProblem}/>
                <Button label={"Enregistrez les informations"} type={'submit'} pending={isPending}/>
            </FormCard>
        </div>
    )
}