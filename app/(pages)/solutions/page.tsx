'use client';

import {Footer} from "@/app/shared/utils/Footer";
import Topbar from "@/app/shared/utils/Topbar";
import {SolutionCard} from "@/app/(pages)/solutions/components/SolutionCard";
import {useQuery} from "react-query";
import {loadMappedSolution} from "@/app/(pages)/solutions/_requests";
import {Solution} from "@/app/shared/models/Solution";
import {Skeleton} from "@/app/shared/utils/ui/skeleton";

export default function Solutions() {
    const {data, isFetching, isFetched} = useQuery(
        ['solutions'],
        () => loadMappedSolution()
    )
    const solutions: Solution[] = data || []

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
                        {isFetching &&
                            Array.from({length: 10}, (_, i) => (
                                <Skeleton key={i} className={'animate-pulse h-[250px]'}/>
                            ))
                        }
                        {isFetched &&
                            solutions.map((solution: Solution, index: number) => (
                                <SolutionCard key={index} solution={solution}/>
                            ))
                        }
                    </div>
                </div>
            )}
            <Footer/>
        </div>
    );
}
