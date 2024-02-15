"use client";

import React, {FormEvent, useEffect, useState} from "react";
import {toast, Toaster} from "react-hot-toast";
import {useRouter} from "next/navigation";
import Topbar from "@/app/shared/utils/Topbar";
import {FormCard} from "@/app/shared/utils/formCard";
import {Input} from "@/app/shared/utils/ui/input";
import {Label} from "@/app/shared/utils/ui/label";
import {Textarea} from "@/app/shared/utils/ui/textarea";
import {Button} from "@/app/shared/utils/ui/button";
import {Loader2} from "lucide-react";
import {getInputError} from "@/app/shared/helpers/getInputError";
import useStore from "@/app/shared/hooks/useStore";
import {useQuery} from "react-query";
import {loadCalls, loadChallenges, loadThematics} from "@/app/(pages)/solutions/submit/_requests";
import {Thematic} from "@/app/shared/models/Thematic";
import {Challenge} from "@/app/shared/models/Challenge";
import Select, {MultiValue, SingleValue} from "react-select";
import {Call} from "@/app/shared/models/Call";
import {useMutate} from "@/app/shared/hooks/useMutate";
import {post} from "@/app/shared/_requests";

interface OptionProps {
    value: number;
    label: string;
}

export default function SubmitProject() {
    const [selectedCall, setSelectedCall] = useState<number | undefined>(undefined)
    const [selectedThematic, setSelectedThematic] = useState<number | undefined>(undefined)
    const [selectedChallenges, setSelectedChallenges] = useState<number[]>([])
    const [thematics, setThematics] = useState<OptionProps[]>([])
    const [challenges, setChallenges] = useState<OptionProps[]>([])
    const router = useRouter();
    const user = useStore.use.user()

    const {data} = useQuery(['calls'], async () => loadCalls().then((data) => data))

    const calls = data?.map((call: Call) => {
        return {
            value: call.id,
            label: call.name
        }
    }) || []

    useEffect(() => {
        if (selectedCall) {
            loadThematics(selectedCall).then((data) => {
                setThematics(data.map((thematic: Thematic) => ({
                    value: thematic.id,
                    label: thematic.name
                })))
            })
        }
    }, [selectedCall])

    useEffect(() => {
        if (selectedThematic) {
            loadChallenges(selectedThematic).then((data) => {
                setChallenges(data.map((challenge: Challenge) => ({
                    value: challenge.id,
                    label: challenge.name
                })))
            })
        }
    }, [selectedThematic])

    const handleCallChange = async (option: SingleValue<OptionProps>) => {
        option && setSelectedCall(option.value)
    }

    const handleThematicsChange = async (option: SingleValue<OptionProps>) => {
        option && setSelectedThematic(option.value)
    }

    const handleChallenge = async (options: MultiValue<OptionProps>) => setSelectedChallenges(
        options.map((option: OptionProps) => option.value)
    )

    const submitSolution = async function (e: FormEvent) {
        const formData = new FormData(e.target as HTMLFormElement)
        const data = Object.fromEntries(formData)
        const payload = {
            ...data,
            user: user?.email,
            call: selectedCall,
            thematic: selectedThematic,
            challenges: selectedChallenges,
        }
        return await post('solutions', payload)
    }

    const onSuccess = () => {
        toast.success('Solution soumise avec succès')
        router.push('/me')
    }


    const {isLoading, mutate, errors} = useMutate(submitSolution, onSuccess)

    return (
        <div className={'relative'}>
            <Topbar/>
            <FormCard handleSubmit={mutate} title={'M   a solution'}>
                <Label htmlFor={'name'}>Nom de la solution</Label>
                <Input name={'name'} placeholder={"Saisir le nom de votre solution"}
                       error={getInputError(errors, 'name')} type={'text'}/>
                {
                    calls && (
                        <>
                            <Label htmlFor={'call'}>Selectionner l&apos;appel</Label>
                            <Select id={'call'} name={'call'} options={calls} onChange={handleCallChange}/>
                            <Label htmlFor={"thematic"}>Choisir une thématique</Label>
                            <Select id={'thematic'} name={'thematic'} options={thematics} onChange={handleThematicsChange}/>
                            <Label htmlFor={'challenges'}>A quoi votre solution répond elle ?</Label>
                            <Select id={'challenges'} name={'challenges'} isMulti={true} options={challenges}
                                    onChange={handleChallenge}/>
                        </>
                    )
                }
                <Label htmlFor={'description'}>Description</Label>
                <Textarea name={'description'} placeholder={'Décrivez votre solution...'}
                          error={getInputError(errors, 'description')}/>
                <Label htmlFor={'targetedProblem'}>Problème ciblé</Label>
                <Textarea name={'targetedProblem'} placeholder={'Decrire le problème ici...'}
                          error={getInputError(errors, 'targetedProblem')}/>
                <Label htmlFor={'solution'}>Lien youtube de la vidéo (optionnel)</Label>
                <Input name={'videoLink'} placeholder={"Coller le lien de la vidéo"}
                       error={getInputError(errors, 'videoLink')}
                       type={'text'}/>
                <Button type={'submit'} disabled={isLoading} className={'mt-5'}>
                    {
                        isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                Soumission...
                            </>
                        ) : "Soumettre la solution"
                    }
                </Button>
            </FormCard>
            <Toaster/>
        </div>
    );
}