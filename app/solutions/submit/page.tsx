"use client";
import {useState} from "react";
import {useRouter} from "next/navigation";
import Topbar from "@/core/utils/Topbar";
import FormCard from "@/core/utils/formCard";
import {Input} from "@/core/utils/ui/input";
import {Label} from "@/core/utils/ui/label";
import {Textarea} from "@/core/utils/ui/textarea";
import {Button} from "@/core/utils/ui/button";
import {Loader2} from "lucide-react";
import {useQuery, useQueryClient} from "react-query";
import Select, {MultiValue, SingleValue} from "react-select";
import {useMutate} from "@/core/hooks/useMutate";
import {get, post} from "@/core/_requests";
import {Call, Challenge, Thematic} from "@/core/_models";
import useStore from "@/core/hooks/useStore";
import Toast from "@/core/utils/Toast";
import getInputError from "@/core/helpers/getInputError";

interface OptionProps {
    value: number;
    label: string;
}

type Model = Call | Thematic | Challenge;

const SubmitSolution = () => {
    const [selectedCall, setSelectedCall] = useState<number>();
    const [selectedThematic, setSelectedThematic] = useState<number>();
    const [selectedChallenges, setSelectedChallenges] = useState<number[]>([]);
    const router = useRouter();
    const user = useStore.use.user();
    const queryClient = useQueryClient();

    const {data: calls} = useQuery(
        ["calls"],
        async () => await get<Call[]>("calls")
    );

    const {data: thematics} = useQuery(
        ["thematics", selectedCall],
        async () => await get<Thematic[]>(`thematics/call/${selectedCall}`),
        {enabled: !!selectedCall}
    );

    const {data: challenges} = useQuery(
        ["challenges", selectedThematic],
        async () =>
            await get<Challenge[]>(`challenges/thematic/${selectedThematic}`),
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
        await Toast("success", "SolutionCard soumise avec succès");
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

export default SubmitSolution
