"use client";

import {FormEvent, useContext, useEffect, useMemo, useState} from "react";
import {toast, Toaster} from "react-hot-toast";
import {useRouter} from "next/navigation";
import Select from "react-select";
import axios from "@/app/shared/config/axios";
import Topbar from "@/app/shared/components/Topbar";
import {FormCard} from "@/app/shared/utils/ui/formCard";
import {AuthContext} from "@/app/shared/providers/authProvider";

export default function SubmitProject() {
    const [calls, setCalls] = useState<any[]>();
    const [thematics, setThematics] = useState<any[]>()
    const [selectedCall, setSelectedCall] = useState<any>()
    const [selectedThematic, setSelectedThematic] = useState<string>('')
    const [challenges, setChallenges] = useState<any[]>()
    const [selectedChallenges, setSelectedChallenges] = useState<any>()
    const router = useRouter();
    const {user} = useContext(AuthContext)
    const [formStatus, setFormStatus] = useState('')
    const isPending = useMemo(() => formStatus === 'pending', [formStatus])

    useEffect(() => {


        (async () => {
            const {data: response} = await axios.get('calls')
            const options = response.data
            console.log(response)
            setCalls(
                options?.map((option: any) => ({
                    value: option.id,
                    label: option.name,
                }))
            );
        })()
    }, [calls]);

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
        setFormStatus('pending')
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
        } catch (e: any) {
            toast.error(e.response.data.message)
        } finally {
            setTimeout(() => {
                router.back()
            }, 1000)
            setFormStatus('')
        }
    };

    return (
        <div className={'relative'}>
            <Topbar/>
            <FormCard handleSubmit={handleSubmit} title={'Votre solution'}>
                {/*<Input name={'name'} label={'Titre de la solution'} placeholder={"Saisir le nom de votre solution"}*/}
                {/*       error={''} type={'text'}/>*/}
                {/*{*/}
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
                {/*    )*/}
                {/*}*/}

                {/*<Textarea name={'description'} label={'Parlez brièvement de votre solution'}*/}
                {/*          placeholder={'Décrivez votre solution...'} error={''}/>*/}

                {/*<Textarea name={'targetedProblem'} label={'Problème ciblé'}*/}
                {/*          placeholder={'Decrire le problème ici...'}*/}
                {/*          error={''}/>*/}

                {/*<Input name={'videoLink'} label={'Lien youtube de la vidéo (optionnel)'}*/}
                {/*       placeholder={"Coller le lien de la vidéo"} error={''}*/}
                {/*       type={'text'}/>*/}

                {/*<Button label={"Soumettre"} type={'submit'} pending={isPending}/>*/}
            </FormCard>
            <Toaster/>
        </div>
    );
}