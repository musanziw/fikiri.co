import * as React from "react"

import {cn} from "@/lib/utils"

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    error?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({className, error, ...props}, ref) => {
        return (
            <div className={'flex flex-col gap-1'}>
                <textarea
                    className={cn(
                        "flex min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-5 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {
                    error && (
                        <p className="text-red-700 text-sm">
                            {error}
                        </p>
                    )
                }
            </div>
        )
    }
)
Textarea.displayName = "Textarea"

export {Textarea}
