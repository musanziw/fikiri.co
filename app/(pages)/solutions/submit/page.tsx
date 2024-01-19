"use client";

import {FormEvent, useContext, useEffect, useState} from "react";
import {toast, Toaster} from "react-hot-toast";
import {useRouter} from "next/navigation";
import Select from "react-select";
import axios from "@/app/shared/config/axios";
import Topbar from "@/app/shared/components/Topbar";
import {FormCard} from "@/app/shared/utils/ui/formCard";
import {AuthContext} from "@/app/shared/providers/authProvider";
import {Input} from "@/app/shared/utils/ui/input";
import {Label} from "@/app/shared/utils/ui/label";
import {Textarea} from "@/app/shared/utils/ui/textarea";
import {Button} from "@/app/shared/utils/ui/button";
import {Loader2} from "lucide-react";
import {getInputError} from "@/app/shared/helpers/getInputError";

export default function SubmitProject() {
    const [calls, setCalls] = useState<any[]>();
    const [thematics, setThematics] = useState<any[]>()
    const [selectedCall, setSelectedCall] = useState<any>()
    const [selectedThematic, setSelectedThematic] = useState<string>('')
    const [challenges, setChallenges] = useState<any[]>()
    const [selectedChallenges, setSelectedChallenges] = useState<any>()
    const router = useRouter();
    const {user} = useContext(AuthContext)
    const [isPending, setIsPending] = useState<boolean>(false)
    const [errors, setErrors] = useState([])

    useEffect(() => {
        (async () => {
            const {data: response} = await axios.get('calls')
            const options = response.data
            setCalls(
                options?.map((option: any) => ({
                    value: option.id,
                    label: option.name,
                }))
            );
        })()
    }, []);

    const handleCallChange = async (option: any) => {
        setSelectedCall(option.value)
        const {data: response} = await axios.get(`calls/${option.value}`)
        const {thematics: options} = response.data
        setThematics(
            options.map((option: any) => ({
                value: option.id,
                label: option.name,
            }))
        );
    };

    const handleThematicsChange = async (option: any) => {
        setSelectedThematic(option.value)
        const {data: reponse} = await axios.get(`thematics/${option.value}`)
        const {challenges: options} = reponse.data
        setChallenges(
            options.map((option: any) => ({
                value: option.id,
                label: option.name,
            }))
        );
    }

    function handleChallenge(options: any) {
        setSelectedChallenges(
            options.map((option: any) => option.value)
        )
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsPending(true)
        const formData = new FormData(e.target as HTMLFormElement)
        const data = Object.fromEntries(formData)
        const payload = {
            ...data,
            user: user?.email,
            call: selectedCall,
            thematic: selectedThematic,
            challenges: selectedChallenges,
        }
        try {
            await axios.post('solutions', JSON.stringify(payload));
            toast.success("Solution soumis avec succès !");
            setTimeout(() => {
                router.back()
            }, 1000)
        } catch (e: any) {
            const data = e.response.data
            if (typeof data.message === 'string') {
                toast.error(data.message)
            } else {
                setErrors(data.message)
            }
        }
        setIsPending(false)
    };

    return (
        <div className={'relative'}>
            <Topbar/>
            <FormCard handleSubmit={handleSubmit} title={'Votre solution'}>

                <Label htmlFor={'name'}>Nom de la solution</Label>
                <Input name={'name'} placeholder={"Saisir le nom de votre solution"}
                       error={getInputError(errors, 'name')} type={'text'}/>
                {
                    calls && (
                        <>
                            <div className="flex flex-col gap-3">
                                <label htmlFor={'call'}>Selectionner l&lsquo;appel</label>
                                <Select
                                    id={'call'}
                                    name={'call'}
                                    options={calls}
                                    onChange={handleCallChange}
                                    className="h-12 rounded w-full mt-2 basic-select"
                                />
                            </div>

                            <div className="flex flex-col gap-3">
                                <label htmlFor={"thematic"}>Choisir une thématique</label>
                                <Select
                                    id={'thematic'}
                                    options={thematics}
                                    onChange={handleThematicsChange}
                                    className="h-12 rounded w-full mt-2 basic-multi-select"
                                />
                            </div>

                            <div className="flex flex-col gap-3">
                                <label htmlFor={'challenges'}>A quoi votre solution répond elle ?</label>
                                <Select
                                    id={'challenges'}
                                    name={'challenges'}
                                    isMulti
                                    options={challenges}
                                    onChange={handleChallenge}
                                    className="h-12 rounded w-full mt-2 basic-multi-select"
                                />
                            </div>
                        </>
                    )
                }

                <Label htmlFor={'description'}>Description</Label>
                <Textarea name={'description'} placeholder={'Décrivez votre solution...'} error={getInputError(errors, 'description')}/>

                <Label htmlFor={'targetedProblem'}>Problème ciblé</Label>
                <Textarea name={'targetedProblem'} placeholder={'Decrire le problème ici...'}
                          error={getInputError(errors, 'targetedProblem')}/>

                <Label htmlFor={'solution'}>Lien youtube de la vidéo (optionnel)</Label>
                <Input name={'videoLink'} placeholder={"Coller le lien de la vidéo"} error={getInputError(errors, 'videoLink')}
                       type={'text'}/>

                <Button type={'submit'} disabled={isPending} className={'mt-5'}>
                    {
                        isPending ? (
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