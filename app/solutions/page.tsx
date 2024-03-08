import Footer from "@/core/utils/Footer";
import Topbar from "@/core/utils/Topbar";
import {Solution} from "@/core/_models";
import {get} from "@/core/_requests";
import SolutionCardSkeleton from "@/app/(components)/slots/SolutionCardSkeleton";
import SolutionCard from "@/app/(components)/slots/SolutionCard";

const Solutions = async () => {
    const solutions = await get<Solution[]>(`solutions/mapped/all?cursor=}`);

    return (
        <div className={"relative"}>
            <Topbar/>
            <div className={"p-8 pt-28 text-gray-600 border-x border-dashed lg:mx-auto lg:max-w-screen-lg"}>
                <h3 className={"text-2xl font-bold mb-5"}>
                    Les solutions innovantes de la communauté{" "}
                    <span className={"text-indigo-700"}>({solutions.length})</span>
                </h3>
                <p className={"mb-10"}>
                    Les solutions innovantes de la communauté sont des projets qui ont été
                    mis en place par des organisations locales ou des individus pour
                    résoudre les problèmes de la communauté.
                </p>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {!solutions &&
                        Array.from({length: 6}, (_, i) => (
                            <SolutionCardSkeleton key={i}/>
                        ))}
                    {solutions &&
                        solutions.map((solution: Solution, index: number) => (
                            <SolutionCard key={index} solution={solution}/>
                        ))}
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Solutions