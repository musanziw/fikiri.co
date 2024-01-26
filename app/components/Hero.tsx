'use client'

import Link from "next/link";
import useStore from "@/app/shared/hooks/useStore";

export function Hero() {
    const user = useStore.use.user()

    return (
        <div className="bg-hero bg-center bg-cover">
            <div
                className={"p-8 h-full pt-36 pb-24 flex flex-col items-center justify-center bg-indigo-700/60 text-gray-50 mx-auto"}>
                <div className={"flex flex-col justify-center items-start gap-6 mx-auto md:max-w-screen-lg"}>
                    <h2 className={`text-xl md:text-4xl text-gray-50 font-semibold mt-6 md:w-2/3`}>
                        Cartographie des solutions innovantes locales pour accélérer
                        l&apos;atteinte des ODD en RDC.
                    </h2>
                    <p className={"md:w-2/3 md:text-xl font-medium mb-3"}>
                        Fikiri est une plateforme web qui vise à cartographier les
                        solutions locales en République Démocratique du Congo pour
                        accélérer l&apos;atteinte des Objectifs de Développement Durable
                        (ODD).
                    </p>
                    <Link href={user ? '/solutions/submit' : '/login'}
                          className={"px-6 text-lg fade-in-3 py-2 inline-block mb-10 rounded-md bg-indigo-500 text-white font-semibold"}>
                        Postulez dès maintenant
                    </Link>
                </div>
            </div>
        </div>
    );
}