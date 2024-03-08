"use client";

import {useRouter} from "next/navigation";
import {Loader2} from "lucide-react";
import Link from "next/link";
import Toast from "@/core/utils/Toast";
import {useMutate} from "@/core/hooks/useMutate";
import {post} from "@/core/_requests";
import FormCard from "@/core/utils/formCard";
import {Label} from "@/core/utils/ui/label";
import {Input} from "@/core/utils/ui/input";
import InputPassword from "@/core/utils/inputPassword";
import getInputError from "@/core/helpers/getInputError";
import {Button} from "@/core/utils/ui/button";

const ResetPasswordForm = () => {
    const router = useRouter();

    const onSuccess = async () => {
        router.push("/login");
        await Toast("success", "Mot de passe réinitialisé");
    };

    const {isLoading, errors, mutate} = useMutate(post, onSuccess, "auth/reset-password");

    return (
        <FormCard title={"Réinitialiser"} handleSubmit={mutate}>
            <Label htmlFor={"token"}>Mot de passe à 6 chiffres</Label>
            <Input name={"token"} placeholder={"Mot de passe à 6 chiffres"} error={getInputError(errors, "token")}
                   required={true}/>

            <Label htmlFor={"password"}>Nouveau mot de passe</Label>
            <InputPassword name={"password"} placeholder={"Entrez le nouveau mot de passe"}
                           error={getInputError(errors, "password")}/>

            <Label htmlFor={"passwordConfirm"}>Confirmez votre de passe</Label>
            <InputPassword name={"passwordConfirm"} placeholder={"Confirmez votre mot de passe"}
                           error={getInputError(errors, "passwordConfirm")}/>

            <Button type={"submit"} disabled={isLoading} className={"mt-5"}>
                {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                        En cours ...
                    </>
                ) : (
                    "Réinitialiser"
                )}
            </Button>
            <Link href={"/login"} className="text-gray-950 text-sm">
                Vous avez un compte ? Connectez-vous.
            </Link>
        </FormCard>
    );
}
export default ResetPasswordForm
