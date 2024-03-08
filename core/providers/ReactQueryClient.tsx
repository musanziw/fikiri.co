"use client";

import {QueryClient, QueryClientProvider} from "react-query";
import {ReactNode} from "react";

const reactQueryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
        },
    },
});

const ReactQueryClient = ({children}: { children: ReactNode }) => {
    return (
        <QueryClientProvider client={reactQueryClient}>
            {children}
        </QueryClientProvider>
    );
}

export default ReactQueryClient