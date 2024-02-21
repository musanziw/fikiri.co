"use client";

import { useRouter } from "next/navigation";
import { post } from "@/app/shared/_requests";
import { useMutate } from "@/app/shared/hooks/useMutate";
import { FormCard } from "@/app/shared/utils/formCard";
import { Label } from "@/app/shared/utils/ui/label";
import { Input } from "@/app/shared/utils/ui/input";
import { getInputError } from "@/app/shared/helpers/getInputError";
import { Button } from "@/app/shared/utils/ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "@/app/shared/helpers/toast";

export function Form() {
  const router = useRouter();

  const onSuccess = async function () {
    router.push("/reset-password");
    await toast("success", "Mot de passe envoyé par email");
  };

  const { isLoading, errors, mutate } = useMutate(
    post,
    onSuccess,
    "auth/reset-password-request"
  );

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
      <Input
        name={"email"}
        placeholder={"Entrez votre email"}
        required={true}
        error={getInputError(errors, "email")}
      />
      <Button type={"submit"} disabled={isLoading} className={"mt-5"}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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
