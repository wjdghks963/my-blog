"use client";

import { isServer, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import React, { ReactNode, useRef } from "react";
import { Provider as ReduxProvider } from "react-redux";

import { AppStore, makeStore } from "@store/index";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
        //@ts-ignore
        suspense: true,
      },
    },
  });
}
let browserQueryClient: QueryClient | undefined = undefined;
function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}
export default function Provider({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient();
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  return (
    <ThemeProvider
      attribute="class"
      enableSystem={true}
      defaultTheme="light"
    >
      <QueryClientProvider client={queryClient}>
        <ReduxProvider store={storeRef.current}>
          <SessionProvider>
            {children}
            {process.env.NODE_ENV === "development" && <ReactQueryDevtools initialIsOpen={false} />}
          </SessionProvider>
        </ReduxProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
