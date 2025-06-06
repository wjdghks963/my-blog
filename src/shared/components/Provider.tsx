"use client";

import { getQueryClient } from "@core/config/queryClient";
import { AppStore, makeStore } from "@core/config/store";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import React, { ReactNode, useRef } from "react";
import { Provider as ReduxProvider } from "react-redux";

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
