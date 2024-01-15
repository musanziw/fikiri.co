import {FormEvent, ReactNode} from "react";

interface FormCardProps {
    title: string
    handleSubmit?: (ev: FormEvent<HTMLFormElement>) => void,
    children: ReactNode
}

export function FormCard({title, handleSubmit, children}: FormCardProps) {
    return (
        <div className="relative py-16 bg-gray-50">
            <div className="container relative m-auto px-6 md:px-12 xl:px-40">
                <div className="m-auto space-y-8 md:w-8/12 lg:w-6/12 xl:w-6/12 mt-10">
                    <div
                        className="rounded-md border border-gray-100 bg-white shadow-sm shadow-gray-600/30 backdrop-blur-2xl">
                        <div className="p-8 py-12 sm:p-16">
                            <form onSubmit={handleSubmit} className="relative gap-6 flex flex-col justify-center">
                                <h2 className="text-2xl font-extrabold mb-4">{title}</h2>
                                {children}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}