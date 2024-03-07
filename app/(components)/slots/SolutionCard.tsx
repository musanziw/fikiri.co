import {Solution, SolutionImages} from "@/core/_models";
import Image from "next/image";
import img from "@/public/bg.jpg";
import Link from "next/link";
import {ArrowRight} from "lucide-react";
import React from "react";
import {imgPath} from "@/core/config/api";

interface SolutionProps {
    solution: Solution
}

export default function SolutionCard({solution}: SolutionProps) {
    const valideImage = (images: SolutionImages[]) => {
        return images.find(image => image.imageLink.endsWith('.jpeg')
            || image.imageLink.endsWith('.jpg')
            || image.imageLink.endsWith('.png')
        )
    }

    const sliceWord = (word: string, length: number, limit: number) => {
        return word.length > length ? word.slice(0, limit) + " ..." : word;
    };

    const capitalizeFirsteLetter = (word: string) => {
        return word.charAt(0).toUpperCase() + word.toLowerCase().slice(1);
    }

    const diplayImage = (solution: Solution) => {
        return solution.imageLink ? imgPath + solution.imageLink : (valideImage(solution.images) ? imgPath + solution.images[0].imageLink : img)
    }

    return (
        solution && <div className="flex flex-col">
            <Image src={diplayImage(solution)} alt={solution.name} height={250} width={300}
                   className="mb-4 h-60 w-auto rounded-md"/>
            <h3 className="font-semibold text-lg text-gray-800 mb-3">
                {sliceWord(capitalizeFirsteLetter(solution.name), 50, 30)}
            </h3>
            <p className="mb-1">
                {sliceWord(solution.description, 50, 170)}
            </p>
            <ul className="flex flex-wrap mb-4">
                <li className="mr-1.5 mt-2">
                    <div
                        className="flex items-center rounded-full bg-red-400/10 px-3 py-1 text-xs font-medium leading-5 text-red-500 ">
                        {solution.thematic?.name}
                    </div>
                </li>
                {
                    solution.challenges?.map((challenge, index) => (
                        <div key={index}
                             className="flex items-center bg-blue-400/10  rounded-full px-3 py-1 mt-2 text-xs font-medium leading-5 text-blue-500 ">
                            {sliceWord(challenge.name, 40, 40)}
                        </div>
                    ))
                }
            </ul>
            <Link href={"/"}
                  className="flex justify-between text-xs border-2 rounded-sm px-6 py-2.5 font-bold uppercase bg-blue-500/90 text-gray-50 transition-colors duration-300 hover:bg-blue-500">
                Plus d&apos;informations <ArrowRight size={16}/>
            </Link>
        </div>
    );
}