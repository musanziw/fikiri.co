"use client";

import React from "react";
import {useQuery} from "react-query";
import {getMany} from "@/app/core/_requests";
import {Solution} from "@/app/core/models/Solution";
import Image from "next/image";
import img from "@/public/bg.jpg";
import Link from "next/link";
import {ArrowRight} from "lucide-react";

export default function Solutions() {
    const {data} = useQuery("solutions-mapped", async () =>
        getMany<Solution[]>("solutions/mapped")
    );
    const solutions = data ?? [];

    const sliceWord = (word: string, limit: number) => {
        return word.length > 100 ? word.slice(0, limit) + " ..." : word;
    };

    return (
        <div className={"p-8 mx-auto max-w-screen-lg"}>
            <h2 className={"text-2xl mb-6 text-gray-900 font-semibold"}>
                Les solutions cartographiées
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
                {Array.from({length: 8}, (_, i) => {
                    return (
                        <div className="flex flex-col" key={i}>
                            <Image
                                src={img}
                                alt="img"
                                height={250}
                                width={300}
                                className="mb-4"
                            />
                            <h3 className="font-semibold text-lg text-gray-800 mb-3">
                                {sliceWord("Le titre de la solution", 30)}
                            </h3>
                            <p className="mb-1">
                                {sliceWord(
                                    `Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Reprehenderit possimus porro, accusamus est deserunt facilis
                architecto at obcaecati provident esse labore fuga ullam ipsam
                doloribus ipsum, asperiores suscipit odit repellat?`,
                                    170
                                )}
                            </p>
                            <ul className="flex flex-wrap mb-4">
                                <li className="mr-1.5 mt-2">
                                    <div
                                        className="flex items-center rounded-full bg-blue-400/10 px-3 py-1 text-xs font-medium leading-5 text-blue-500 ">
                                        Inclusion financière et numérique
                                    </div>
                                </li>
                                <li className="mr-1.5 mt-2">
                                    <div
                                        className="flex items-center rounded-full bg-blue-400/10 px-3 py-1 text-xs font-medium leading-5 text-blue-500 ">
                                        Mécanisation légère agricole
                                    </div>
                                </li>
                            </ul>
                            <Link href={"/"} className="flex items-center justify-between text-xs border-2 rounded-sm px-6 py-2.5 font-bold uppercase bg-blue-400 text-gray-50 transition-colors duration-300 hover:bg-blue-500">
                                Plus d&apos;informations <ArrowRight size={16}/>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
