import Topbar from "@/app/shared/components/Topbar";
import {Footer} from "@/app/shared/components/Footer";
import axios from "@/app/shared/config/axios";

export default async function Solution({params}: { params: { id: string } }) {
    const solution = await axios.get(`solutions/${params.id}`)
        .then(({data: response}) => response.data)

    return (
        <div className={'relative'}>
            <Topbar/>
            <div className="flex flex-col mx-6 justify-center max-w-screen-md md:mx-auto border-x border-dashed">
                <div className="p-4 pt-24">
                    <p className="text-sm uppercase font-bold text-gray-800 mb-6">
                        {solution.thematic.name}
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
            </div>
            <Footer/>
        </div>
    )
}