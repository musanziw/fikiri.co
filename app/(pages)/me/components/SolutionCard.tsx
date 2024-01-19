import {moment} from "@/app/shared/config/moment";
import Link from "next/link";
import {API_BASE_URL} from "@/app/shared/config/links";
import Image from "next/image";
import {Badge} from "@/app/shared/utils/ui/badge";
import {Pencil} from "lucide-react";

interface SolutionsCardProps {
    solutions: any[]
}

export default function SolutionCard({solutions}: SolutionsCardProps) {
    return (
        solutions ? solutions.map((solution, index) => (
            <div className="mb-8" key={index}>
                <div className="flex flex-col gap-2 ">
                    <div className="flex flex-col gap-2 mb-4">
                        <h2 className={'font-bold text-lg'}>
                            {solution.name} <Link href={`/solutions/update/${solution.id}`}><Pencil className={'inline-block ml-2'} size={16}/></Link>
                        </h2>
                        <div className="flex items-center gap-2">
                            <span className="text-gray-500 text-sm">{moment(solution.createdAt).fromNow(false)}</span>
                            <Badge>{solution.status.name}</Badge>
                        </div>
                        <p className="mt-5">
                            {solution.description}
                        </p>
                    </div>

                    <div className={`grid grid-cols-${solution.images.length} gap-3`}>
                        {
                            solution.images.map((image: any, index: number) => (
                                <div key={index}>
                                    <Image src={`${API_BASE_URL}uploads/${image.imageLink}`} alt={solution.name}
                                           width={400} height={200} className={'rounded-md object-cover h-[200px]'}
                                    />
                                </div>
                            ))
                        }
                    </div>

                </div>
            </div>
        )) : (
            <div className="flex flex-col">
                <h1 className={'text-xl font-bold'}>Vous n'avez pas encore de solution</h1>
            </div>
        )
    )
}