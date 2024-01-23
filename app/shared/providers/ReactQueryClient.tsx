'use client'

import {QueryClient, QueryClientProvider} from 'react-query'
import {ReactNode} from "react";
import {ReactQueryDevtools} from "react-query/devtools";

const reactQueryClient = new QueryClient()

export function ReactQueryClient({children}: { children: ReactNode }) {
    return (
        <QueryClientProvider client={reactQueryClient}>
            <ReactQueryDevtools initialIsOpen={false}/>
            {children}
        </QueryClientProvider>
    )
}