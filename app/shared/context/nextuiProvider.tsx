'use client'

import {NextUIProvider} from '@nextui-org/react'
import {ReactNode} from "react";

export function NextuiProvider({children}: { children: ReactNode }) {
    return (
        <NextUIProvider>
            {children}
        </NextUIProvider>
    )
}