"use client";
import {useRouter} from "next/navigation";
import {Loader2} from "lucide-react";
import Image from "next/image";
import googleLogo from "@/public/googleLogo.svg";
import Link from "next/link";
import Toast from "@/core/utils/Toast";
import {useMutate} from "@/core/hooks/useMutate";
import {googleAuth, post} from "@/core/_requests";
import FormCard from "@/core/utils/formCard";
import {Label} from "@/core/utils/ui/label";
import {Input} from "@/core/utils/ui/input";
import getInputError from "@/core/helpers/getInputError";
import InputPassword from "@/core/utils/inputPassword";
import {Button} from "@/core/utils/ui/button";

const RegisterForm = () => {
    const router = useRouter();

    const onSuccess = async function () {
        router.push("/login");
        await Toast("success", "Inscription réussie");
    };

    const {isLoading, mutate, errors} = useMutate(post, onSuccess, "auth/register");

    return (
        <FormCard title={"Inscrivez-vous"} handleSubmit={mutate}>
            <Label htmlFor={"name"}>Nom</Label>
            <Input name={"name"} placeholder={"Entrez le nom"} error={getInputError(errors, "name")} type={"text"}/>

            <Label htmlFor={"email"}>Email</Label>
            <Input
                name={"email"}
                placeholder={"Entrez votre Email"}
                error={getInputError(errors, "email")}
                type={"email"}
            />

            <Label htmlFor={"phoneNumber"}>Téléphone</Label>
            <Input
                name={"phoneNumber"}
                placeholder={"Entrez votre numéro Téléphone"}
                error={getInputError(errors, "phoneNumber")}
                type={"text"}
            />

            <Label htmlFor={"address"}>Adresse</Label>
            <Input
                name={"address"}
                placeholder={"Entrez votre adresse"}
                error={getInputError(errors, "address")}
                type={"text"}
            />

            <Label htmlFor={"password"}>Mot de passe</Label>
            <InputPassword name={"password"} error={getInputError(errors, "password")}/>
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
                    "S'inscrire"
                )}
            </Button>
            <hr className="my-6 border-gray-300 w-full"/>
            <Button onClick={googleAuth} variant={"outline"} type={"button"}>
                <Image src={googleLogo} alt={"img logo"} className="mr-2 h-4 w-4"/>{" "}
                S&apos;inscrire avec google
            </Button>
            <Link href={"/login"} className={"text-gray-950 text-sm"}>
                Vous avez un compte ? Connectez-vous
            </Link>
        </FormCard>
    );
}
export default RegisterForm
