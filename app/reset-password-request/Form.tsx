"use client";
import {useRouter} from "next/navigation";
import {Loader2} from "lucide-react";
import Link from "next/link";
import {Toast} from "@/core/utils/Toast";
import {useMutate} from "@/core/hooks/useMutate";
import {post} from "@/core/_requests";
import {FormCard} from "@/core/utils/formCard";
import {Label} from "@/core/utils/ui/label";
import {Input} from "@/core/utils/ui/input";
import {getInputError} from "@/core/helpers/getInputError";
import {Button} from "@/core/utils/ui/button";

export function Form() {
    const router = useRouter();

    const onSuccess = async function () {
        router.push("/reset-password");
        await Toast("success", "Mot de passe envoyé par email");
    };

    const {isLoading, errors, mutate} = useMutate(post, onSuccess, "auth/reset-password-request");

    return (
        <FormCard title={"Réinitialisation"} handleSubmit={mutate}>
            <div className="mb-3 -mt-6">
                <p className="text-sm">
                    Entrez votre adresse email pour recevoir un code à 6 chiffres par mail
                    pour réinitialiser votre mot de passe, sur la page suivante, vous
                    pourrez entrer le code reçu par mail et choisir un nouveau mot de
                    passe.
                </p>
            </div>

            <Label htmlFor={"email"}>Email</Label>
            <Input name={"email"} placeholder={"Entrez votre email"} required={true} error={getInputError(errors, "email")}/>
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
