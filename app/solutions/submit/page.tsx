"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";
import Topbar from "@/app/core/utils/Topbar";
import {FormCard} from "@/app/core/utils/formCard";
import {Input} from "@/app/core/utils/ui/input";
import {Label} from "@/app/core/utils/ui/label";
import {Textarea} from "@/app/core/utils/ui/textarea";
import {Button} from "@/app/core/utils/ui/button";
import {Loader2} from "lucide-react";
import {getInputError} from "@/app/core/helpers/getInputError";
import useStore from "@/app/core/hooks/useStore";
import {useQuery, useQueryClient} from "react-query";
import Select, {MultiValue, SingleValue} from "react-select";
import {useMutate} from "@/app/core/hooks/useMutate";
import {getMany, getOne, post} from "@/app/core/_requests";
import {toast} from "@/app/core/helpers/toast";
import {Call, Challenge, Thematic} from "@/app/core/_models";

interface OptionProps {
    value: number;
    label: string;
}

type Model = Call | Thematic | Challenge;

export default function SubmitSolution() {
    const [selectedCall, setSelectedCall] = useState<number>();
    const [selectedThematic, setSelectedThematic] = useState<number>();
    const [selectedChallenges, setSelectedChallenges] = useState<number[]>([]);
    const router = useRouter();
    const user = useStore.use.user();
    const queryClient = useQueryClient();

    const {data: calls} = useQuery(
        ["calls"],
        async () => await getMany<Call[]>("calls")
    );

    const {data: thematics} = useQuery(
        ["thematics", selectedCall],
        async () => await getMany<Thematic[]>(`thematics/call/${selectedCall}`),
        {enabled: !!selectedCall}
    );

    const {data: challenges} = useQuery(
        ["challenges", selectedThematic],
        async () =>
            await getMany<Challenge[]>(`challenges/thematic/${selectedThematic}`),
        {enabled: !!selectedThematic}
    );

    const generateOptions = (models: Model[] | undefined) => {
        return models?.map((model: Model) => {
            return {
                value: model.id,
                label: model.name,
            };
        });
    };

    const modifier = function (payload: { [p: string]: FormDataEntryValue }) {
        payload["user"] = user?.email as unknown as FormDataEntryValue;
        payload["call"] = selectedCall as unknown as FormDataEntryValue;
        payload["thematic"] = selectedThematic as unknown as FormDataEntryValue;
        payload["challenges"] = selectedChallenges as unknown as FormDataEntryValue;
        return payload;
    };

    const onSuccess = async () => {
        await queryClient.invalidateQueries("solutions");
        await toast("success", "Solution soumise avec succès");
        router.push("/me");
    };

    const {isLoading, mutate, errors} = useMutate(
        post,
        onSuccess,
        "solutions",
        modifier
    );

    return (
        <div className={"relative"}>
            <Topbar/>
            <FormCard handleSubmit={mutate} title={"Ma solution"}>
                <Label htmlFor={"name"}>Nom de la solution</Label>
                <Input name={"name"} placeholder={"Saisir le nom de votre solution"}
                       error={getInputError(errors, "name")} type={"text"}/>
                {user && (
                    <>
                        <Label htmlFor={"call"}>Selectionner l&apos;appel</Label>
                        <Select id={"call"} name={"call"} options={generateOptions(calls)}
                                onChange={(option: SingleValue<OptionProps>) => setSelectedCall(option?.value)}/>
                        <Label htmlFor={"thematic"}>Choisir une thématique</Label>
                        <Select id={"thematic"} name={"thematic"} options={generateOptions(thematics)}
                                onChange={(option: SingleValue<OptionProps>) => setSelectedThematic(option?.value)}/>
                        <Label htmlFor={"challenges"}>
                            A quoi votre solution répond elle ?
                        </Label>
                        <Select id={"challenges"} name={"challenges"} isMulti={true}
                                options={generateOptions(challenges)} onChange={(options: MultiValue<OptionProps>) => {
                            setSelectedChallenges(
                                options.map((option: OptionProps) => option.value)
                            );
                        }}
                        />
                    </>
                )}
                <Label htmlFor={"description"}>Description</Label>
                <Textarea name={"description"} placeholder={"Décrivez votre solution..."}
                          error={getInputError(errors, "description")}/>
                <Label htmlFor={"targetedProblem"}>Problème ciblé</Label>
                <Textarea name={"targetedProblem"} placeholder={"Decrire le problème ici..."}
                          error={getInputError(errors, "targetedProblem")}/>
                <Label htmlFor={"solution"}>Lien youtube de la vidéo (optionnel)</Label>
                <Input name={"videoLink"} placeholder={"Coller le lien de la vidéo"}
                       error={getInputError(errors, "videoLink")} type={"text"}/>
                <Button type={"submit"} disabled={isLoading} className={"mt-5"}>
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                            Soumission...
                        </>
                    ) : (
                        "Soumettre la solution"
                    )}
                </Button>
            </FormCard>
        </div>
    );
}
