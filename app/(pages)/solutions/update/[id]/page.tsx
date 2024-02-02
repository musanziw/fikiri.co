'use client'

import React, {FormEvent, useState} from "react";
import {FormCard} from "@/app/shared/utils/formCard";
import Topbar from "@/app/shared/utils/Topbar";
import {toast, Toaster} from "react-hot-toast";
import {useRouter} from "next/navigation";
import {Input} from "@/app/shared/utils/ui/input";
import {Label} from "@/app/shared/utils/ui/label";
import {Textarea} from "@/app/shared/utils/ui/textarea";
import {Button} from "@/app/shared/utils/ui/button";
import {Loader2} from "lucide-react";
import Uploader from "@/app/shared/utils/Uploader";
import {Solution} from "@/app/shared/models/Solution";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {loadSolution, updateSolution} from "@/app/(pages)/solutions/_requests";
import {AxiosError} from "axios";
import {getInputError} from "@/app/shared/helpers/getInputError";

export default function Solution({params}: { params: { id: string } }) {
    const [errors, setErrors] = useState<ApiValidationError[]>([]);
    const router = useRouter()

    const {data} = useQuery(['solution', params.id], async () => loadSolution(+params.id))
    const solution: Solution = data || {}
    const queryClient = useQueryClient()


    const {mutate, isLoading: isUpdating} = useMutation(async (e: FormEvent) => {
        e.preventDefault()
        setErrors([])
        const formData = new FormData(e.target as HTMLFormElement)
        const data = Object.fromEntries(formData)
        delete data.thumbs
        const payload = {
            ...data
        }
        return await updateSolution(+params.id, payload)
    }, {
        onSuccess: async () => {
            await queryClient.invalidateQueries(['solutions'])
            await queryClient.invalidateQueries(['solution'])
            toast.success('La solution a été mise à jour')
            router.back()
        },
        onError: (error: AxiosError<any>) => {
            const message: string | ApiValidationError[] = error.response?.data?.message
            if (Array.isArray(message)) setErrors(message)
            else toast.error(message)
        }
    })

    return (
        <div className={'relative'}>
            <Topbar/>
            <FormCard title={'Modifier votre solution'} handleSubmit={mutate}>

                <Label htmlFor={'thumbs'}>Preuve de l&apos;existence de la solution</Label>
                <Uploader name={'thumbs'} path={`solutions/${solution?.id}/images`}
                          label={'Cliquez pour ajouter max 3 photos'}/>

                <Label htmlFor={'name'}>Nom de la solution</Label>
                <Input name={'name'} placeholder={''} type={'text'} defaultValue={solution?.name}
                       error={getInputError(errors, 'name')}/>

                <Label htmlFor={'description'}>La description de la solution</Label>
                <Textarea name={'description'} placeholder={''} defaultValue={solution?.description}
                          error={getInputError(errors, 'description')}/>

                <Label htmlFor={'targetedProblem'}>Votre solution résoud quel problème ?</Label>
                <Textarea name={'targetedProblem'} placeholder={''} defaultValue={solution?.targetedProblem}
                          error={getInputError(errors, 'targetedProblem')}/>

                <Label htmlFor={'solution'}>Lien youtube de la vidéo (optionnel)</Label>
                <Input name={'videoLink'} placeholder={"Coller le lien de la vidéo"} defaultValue={solution?.videoLink}
                       error={getInputError(errors, 'videoLink')} type={'text'}/>

                <Button type={'submit'} disabled={isUpdating} className={'mt-5'}>
                    {
                        isUpdating ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                En cours de traitement...
                            </>
                        ) : "Soumettre les modifications"
                    }
                </Button>
            </FormCard>
            <Toaster/>
        </div>
    )
}