import {moment} from "@/app/shared/config/moment";
import Link from "next/link";

interface SolutionsCardProps {
    solutions: any[]
}

export default function SolutionCard({solutions}: SolutionsCardProps) {
    return (
        solutions.map((solution, index) => (
            <div className="mb-6" key={index}>
                <div className="flex items-center gap-5">
                    <h5 className={'text-gray-900'}>{index + 1}.</h5>
                    <h3 className={'text-gray-900 font-bold basis-1/6'}>{solution?.name}</h3>
                    <h3 className={'text-gray-900 basis-1/6'}> {moment(solution?.createdAt).fromNow(false)}</h3>
                    <h3 className={'rounded-sm bg-gray-200 px-2 py-1 text-xs'}>{solution?.status?.name}</h3>

                    <Link href={`/solutions/${solution?.id}`}
                          className={'text-sm text-gray-950'}>
                        Voir la solution
                    </Link>
                    <Link href={`/solutions/update/${solution?.id}`}
                          className={'text-sm text-gray-950'}>
                        Modifier la solution
                    </Link>
                </div>
            </div>
        ))
    )
}