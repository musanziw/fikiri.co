import {Skeleton} from "@/core/utils/ui/skeleton";

const SolutionCardSkeleton = () => {
    return (
        <div className="flex flex-col gap-4">
            <Skeleton className={'h-60 bg-gray-400/30'}></Skeleton>

            <Skeleton className={'h-4 bg-gray-400/30 mb-2'}></Skeleton>
            {
                Array.from({length: 5}).map((_, index) => (
                    <Skeleton className={'h-2 bg-gray-400/30 last:mb-2'} key={index}></Skeleton>
                ))
            }
            <div className=""></div>
            {
                Array.from({length: 2}).map((_, index) => (
                    <div className="flex gap-1" key={index}>
                        <Skeleton className={'h-3 w-1/2 bg-gray-400/30'}></Skeleton>
                        <Skeleton className={'h-3 w-1/2 bg-gray-400/30'}></Skeleton>
                    </div>
                ))
            }

            <Skeleton className={'h-8 bg-gray-400/30 mt-3'}></Skeleton>
        </div>
    )
}

export default SolutionCardSkeleton;