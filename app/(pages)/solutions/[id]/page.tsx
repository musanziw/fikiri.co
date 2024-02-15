import Topbar from "@/app/shared/utils/Topbar";
import {Footer} from "@/app/shared/utils/Footer";
import {Loader2} from "lucide-react";
import {getOne} from "@/app/shared/_requests";
import {Solution} from "@/app/shared/models/Solution";

export default async function Solution({params}: { params: { id: string } }) {
    const solution = await getOne<Solution>(`solutions/${+params.id}`)

    return (
        <div className={'relative'}>
            <Topbar/>
            <div className="flex flex-col mx-6 justify-center max-w-screen-md md:mx-auto border-x border-dashed">
                {solution && (
                    <>
                        <div className="p-4 pt-24">
                            <p className="text-sm uppercase font-bold text-gray-800 mb-6">
                                {solution.thematic?.name}
                            </p>
                            <h2 className={'text-gray-600 text-2xl font-semibold mb-6 uppercase'}>
                                {solution.name}
                            </h2>
                            <h2 className={'font-semibold text-xl mb-4'}>
                                Desciption de la solution
                            </h2>
                            <p className={'font-medium mb-4'}>
                                {solution.description}
                            </p>
                        </div>
                        <div className="p-4">
                            <h2 className={'font-semibold text-xl mb-4'}>
                                Problème résolu
                            </h2>
                            <p className={'font-medium mb-8'}>
                                {solution.targetedProblem}
                            </p>
                        </div>
                    </>)
                }
                {
                    !solution && (
                        <div className="h-screen w-full flex flex-col items-center justify-center gap-5 pt-16 mb-8">
                            <Loader2 className={'w-6 h-6 animate-spin'}/>
                            Chargement en cours...
                        </div>
                    )
                }
            </div>
            <Footer/>
        </div>
    )
}