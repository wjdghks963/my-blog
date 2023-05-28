"use client"
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { Provider as ReduxProvider } from "react-redux";
import {makeStore} from "../store";
import {
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";



export default function Provider({children}:{children:any}) {
    const [queryClient] = useState(() => new QueryClient());
    const store = makeStore()

    return (
        <QueryClientProvider client={queryClient}>
            <ReduxProvider store={store}>
                <ThemeProvider attribute="class">
                    <SessionProvider >
                        {children}
                        <ReactQueryDevtools initialIsOpen={false} />
                    </SessionProvider>
                </ThemeProvider>
            </ReduxProvider>
        </QueryClientProvider>
    );
}
