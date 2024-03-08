"use client";
import React, {useState} from "react";
import {useQuery} from "react-query";
import SolutionCard from "./slots/SolutionCard";
import {Loader2} from "lucide-react";
import {get} from "@/core/_requests";
import {Solution, Thematic} from "@/core/_models";
import SolutionCardSkeleton from "@/app/(components)/slots/SolutionCardSkeleton";
import {cn} from "@/lib/utils";
import {Skeleton} from "@/core/utils/ui/skeleton";

const Solutions = () => {
    const [cursor, setCursor] = useState(1);
    const [oddFilter, setOddFilter] = useState<number>(100);
    const [filteredSolutions, setFilteredSolutions] = useState<Solution[] | undefined>([]);
    const [isFiltering, setIsFiltering] = useState<boolean>(false);
    const [thematicFilter, setThematicFilter] = useState<number>(100);

    const {
        isLoading,
        isFetched,
        data: solutions
    } = useQuery(["solutions", cursor], async () => await get<Solution[]>(`solutions/mapped/all?cursor=${cursor}`), {
        keepPreviousData: true,
        enabled: !!cursor
    });

    const {data: thematics} = useQuery(["thematics"], async () => await get<Thematic[]>(`thematics`));

    const loadMoreData = () => {
        setCursor(cursor => ++cursor);
    };

    const changeActive = (index: number) => {
        setIsFiltering(true);
        setOddFilter(index);
        const filteredSolutions = index === 100 ? solutions : solutions?.filter(solution => solution.thematic?.odds.includes(index?.toString() || ''));
        setTimeout(() => {
            setFilteredSolutions(filteredSolutions);
            setIsFiltering(false);
        }, 1000)
    }

    const changeThematic = (thematicId: number) => {
        setIsFiltering(true);
        setThematicFilter(thematicId);
        const filterByThematic = thematicId === 100 ? solutions : solutions?.filter(solution => solution.thematic?.id === thematicId);
        setTimeout(() => {
            setFilteredSolutions(filterByThematic);
            setIsFiltering(false);
        }, 1000)
    }

    return (
        <div className={"p-8 mx-auto max-w-screen-lg"}>
            <h2 className={"text-2xl mb-6 text-gray-900 font-semibold"}>
                Les solutions cartographiées
            </h2>
            <p className={'mb-4 font-bold text-gray-950'}>
                Choisissez un ODD pour filtrer les solutions
            </p>
            <div className="flex gap-3 flex-wrap mb-6">
                <span
                    className={cn(`rounded-full py-1 font-semibold px-3 border text-sm cursor-pointer ${oddFilter === 100 && 'bg-cyan-600/90 text-white'}`)}
                    onClick={() => changeActive(100)}>
                           Aucun
                </span>

                {
                    Array.from({length: 17}).map((_, index) => (
                        <span
                            className={cn(`rounded-full font-semibold py-1 px-3 border text-sm cursor-pointer ${oddFilter === index + 1 && 'bg-cyan-600/90 text-white'}`)}
                            key={index}
                            onClick={() => changeActive(index + 1)}>
                            ODD {index + 1}
                        </span>
                    ))
                }
            </div>

            <p className={'mb-4 font-bold text-gray-950'}>
                Filtrer par thématique
            </p>

            <div className="flex gap-3 flex-wrap mb-6">
                 <span
                     className={cn(`rounded-full py-1 px-3 border text-sm cursor-pointer ${thematicFilter === 100 && 'bg-cyan-600/90 text-white'}`)}
                     onClick={() => changeThematic(100)}>
                           Aucune
                </span>
                {
                    thematics && thematics.map((thematic, index) => (
                        <span
                            onClick={() => changeThematic(thematic.id)}
                            className={cn(`rounded-full py-1 px-3 border text-sm cursor-pointer font-bold ${thematicFilter === thematic.id && 'bg-cyan-600/90 text-white'}`)}
                            key={index}>
                            {thematic.name}
                        </span>
                    ))
                }
            </div>


            {
                !thematics && <div className={"flex gap-3 flex-wrap mb-6"}>
                    <Skeleton className={'h-6 bg-gray-400/30 w-[70px] rounded-full py-1 px-3 border text-sm'}></Skeleton>
                    <Skeleton className={'h-6 bg-gray-400/30 w-[350px] rounded-full py-1 px-3 border text-sm '}></Skeleton>
                    <Skeleton className={'h-6 bg-gray-400/30 w-[350px] rounded-full py-1 px-3 border text-sm '}></Skeleton>
                    <Skeleton className={'h-6 bg-gray-400/30 w-[230px] rounded-full py-1 px-3 border text-sm '}></Skeleton>
                    <Skeleton className={'h-6 bg-gray-400/30 w-[230px] rounded-full py-1 px-3 border text-sm '}></Skeleton>
                    <Skeleton className={'h-6 bg-gray-400/30 w-[230px] rounded-full py-1 px-3 border text-sm '}></Skeleton>
                </div>

            }

            {
                oddFilter !== 100 && filteredSolutions && filteredSolutions.length <= 0 && !isFiltering && (
                    <h2 className={'text-2xl font-bold'}>
                        Aucune solution trouvée
                    </h2>
                )
            }

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
                {
                    solutions && !filteredSolutions || oddFilter === 100 && solutions && solutions.map((solution, index) => (
                        <SolutionCard key={index} solution={solution}/>
                    ))
                }
                {
                    filteredSolutions && oddFilter !== 100 && filteredSolutions.map((solution, index) => (
                        <SolutionCard key={index} solution={solution}/>
                    ))
                }
                {
                    (isFiltering || isLoading) && Array.from({length: 6}).map((_, index) => (
                        <SolutionCardSkeleton key={index}/>
                    ))
                }
            </div>

            <div className="flex mt-8 w-full justify-center items-center text-sm">
                <hr className="w-full border-gray-300"/>
                <button type={"button"} disabled={!isFetched}
                        className={'bg-none border w-1/2 rounded-full py-2 px-8 text-gray-950 hover:bg-gray-300/40 duration-75 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed'}
                        onClick={loadMoreData}>
                    {!isFetched ? (
                        <div className={'flex items-center justify-center gap-3'}>
                            <Loader2 className="h-5 w-5 animate-spin"/>
                        </div>
                    ) : (
                        "Plus"
                    )}
                </button>
                <hr className="w-full border-gray-300"/>
            </div>
        </div>
    );
}

export default Solutions
