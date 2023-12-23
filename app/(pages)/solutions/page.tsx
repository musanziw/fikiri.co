import {Footer} from "@/app/shared/components/Footer";
import Topbar from "@/app/shared/components/Topbar";
import axios from "@/app/shared/config/axios";
import {SolutionCard} from "@/app/(pages)/solutions/components/SolutionCard";

export default async function Solutions() {
    const solutions: any[] = await axios.get(`solutions/approved`)
        .then(({data: response}) => response.data)

    return (
        <div className={'relative'}>
            <Topbar/>
            {solutions && (
                <div className={"p-8 pt-28 text-gray-600 border-x border-dashed lg:mx-auto lg:max-w-screen-lg"}>
                    <h3 className={"text-2xl font-bold mb-5"}>
                        Les solutions innovantes de la communauté{" "}
                        <span className={"text-indigo-700"}>({solutions.length})</span>
                    </h3>
                    <p className={"mb-10"}>
                        Les solutions innovantes de la communauté sont des projets qui ont
                        été mis en place par des organisations locales ou des individus pour
                        résoudre les problèmes de la communauté.
                    </p>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <SolutionCard solutions={solutions}/>
                    </div>
                </div>
            )}
            <Footer/>
        </div>
    );
}
