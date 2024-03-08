"use client";

import {useRouter} from "next/navigation";
import {useQuery, useQueryClient} from "react-query";
import {get, patch} from "@/core/_requests";
import {useMutate} from "@/core/hooks/useMutate";
import {Label} from "@/core/utils/ui/label";
import Uploader from "@/core/utils/Uploader";
import {Input} from "@/core/utils/ui/input";
import getInputError from "@/core/helpers/getInputError";
import {Textarea} from "@/core/utils/ui/textarea";
import {Button} from "@/core/utils/ui/button";
import {Loader2} from "lucide-react";
import FormCard from "@/core/utils/formCard";
import {Solution} from "@/core/_models";
import Toast from "@/core/utils/Toast";

const UpdateSolutionForm = ({params}: { params: { id: string } }) => {
    const router = useRouter();
    const {data: solution} = useQuery(["solution", params.id], async () =>
        get<Solution>(`solutions/${+params.id}`)
    );

    const queryClient = useQueryClient();

    const modifier = function (payload: { [p: string]: FormDataEntryValue }) {
        delete payload.thumbs;
        return payload;
    };

    const onSuccess = async () => {
        await queryClient.invalidateQueries("solutions");
        router.back();
        await Toast("success", "La solution a été mise à jour");
    };

    const {mutate, isLoading, errors} = useMutate(
        patch,
        onSuccess,
        `solutions/${+params.id}/user`,
        modifier
    );

    return (
        <FormCard title={"Modifier votre solution"} handleSubmit={mutate}>
            <Label htmlFor={"thumbs"}>
                Preuve de l&apos;existence de la solution
            </Label>
            <Uploader name={"thumbs"} path={`solutions/${solution?.id}/images`}
                      label={"Cliquez pour ajouter max 3 photos"}/>
            <Label htmlFor={"name"}>Nom de la solution</Label>
            <Input name={"name"} placeholder={""} type={"text"} defaultValue={solution?.name}
                   error={getInputError(errors, "name")} required={true}/>
            <Label htmlFor={"description"}>La description de la solution</Label>
            <Textarea name={"description"} placeholder={""} defaultValue={solution?.description}
                      error={getInputError(errors, "description")} required={true}/>
            <Label htmlFor={"targetedProblem"}>
                Votre solution résoud quel problème ?
            </Label>
            <Textarea name={"targetedProblem"} placeholder={""} defaultValue={solution?.targetedProblem}
                      error={getInputError(errors, "targetedProblem")} required={true}/>
            <Label htmlFor={"solution"}>Lien youtube de la vidéo (optionnel)</Label>
            <Input name={"videoLink"} placeholder={"Coller le lien de la vidéo"} defaultValue={solution?.videoLink}
                   error={getInputError(errors, "videoLink")} type={"text"} required={true}/>
            <Button type={"submit"} disabled={isLoading} className={"mt-5"}>
                {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                        En cours...
                    </>
                ) : (
                    "Soumettre les modifications"
                )}
            </Button>
        </FormCard>
    );
}

export default UpdateSolutionForm
