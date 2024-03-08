"use client";

import {useRouter} from "next/navigation";
import {Loader2} from "lucide-react";
import Image from "next/image";
import googleLogo from "@/public/googleLogo.svg";
import Link from "next/link";
import useStore from "@/core/hooks/useStore";
import {User} from "@/core/_models";
import Toast from "@/core/utils/Toast";
import {useMutate} from "@/core/hooks/useMutate";
import {googleAuth, post} from "@/core/_requests";
import FormCard from "@/core/utils/formCard";
import {Label} from "@/core/utils/ui/label";
import {Input} from "@/core/utils/ui/input";
import InputPassword from "@/core/utils/inputPassword";
import {Button} from "@/core/utils/ui/button";

const LoginForm = () => {
    const setUser = useStore.use.setUser();
    const router = useRouter();

    const onSuccess = async function (data: User | null) {
        setUser(data);
        router.push("/profile");
        await Toast("success", "Connexion réussie");
    };

    const {isLoading, mutate} = useMutate(post, onSuccess, "auth/login");

    return (
        <FormCard title={"Se connecter"} handleSubmit={mutate}>
            <Label htmlFor={"email"}>Email</Label>
            <Input
                name={"email"}
                placeholder={"Entrez votre email"}
                required={true}
            />
            <Label htmlFor={"password"}>Mot de passe</Label>
            <InputPassword name={"password"}/>
            <Button type={"submit"} disabled={isLoading} className={"mt-5"}>
                {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                        En cours ...
                    </>
                ) : (
                    "Se connecter"
                )}
            </Button>
            <hr className="my-6 border-gray-300 w-full"/>
            <Button onClick={googleAuth} variant={"outline"} type={"button"}>
                <Image src={googleLogo} alt={"img logo"} className="mr-2 h-4 w-4"/> Se
                connecter avec Google
            </Button>
            <Link href={"/reset-password-request"} className={"text-gray-950 text-sm"}>
                Mot de passe oublié ? Réinitialiser.
            </Link>
        </FormCard>
    );
}

export default LoginForm
