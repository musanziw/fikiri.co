"use client";
import React, {useState} from "react";
import {useQuery} from "react-query";
import SolutionCard from "./slots/SolutionCard";
import {Loader2} from "lucide-react";
import {get} from "@/core/_requests";
import {Solution} from "@/core/_models";
import {Button} from "@/core/utils/ui/button";

export default function Solutions() {
    const [cursor, setCursor] = useState(1);

    const {
        isFetched,
        data,
        isLoading
    } = useQuery(["solutions", cursor], () => get<Solution[]>(`solutions/mapped/all?cursor=${cursor}`), {
        keepPreviousData: true,
        enabled: !!cursor
    });

    const solutions = data || [];

    const loadMoreData = () => {
        setCursor(cursor => ++cursor);
    };

    return (
        <div className={"p-8 mx-auto max-w-screen-lg"}>
            <h2 className={"text-2xl mb-6 text-gray-900 font-semibold"}>
                Les solutions cartographiées
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
                {solutions?.map((solution, index) => (
                    <SolutionCard key={index} solution={solution}/>
                ))}
            </div>

            <Button type={"button"} disabled={!isFetched || isLoading} className={"mt-5"} onClick={loadMoreData}>
                {!isFetched ?? isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                        Les soultions sont en cours de hargement ...
                    </>
                ) : (
                    "Charger plus de solutions"
                )}
            </Button>
        </div>
    );


}
