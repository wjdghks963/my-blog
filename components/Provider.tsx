"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { useState } from "react";
import { Provider as ReduxProvider } from "react-redux";

import { makeStore } from "@store/index";

export default function Provider({ children }: { children: any }) {
  const [queryClient] = useState(() => new QueryClient());
  const store = makeStore();

  return (
    <QueryClientProvider client={queryClient}>
      <ReduxProvider store={store}>
        <ThemeProvider attribute="class">
          <SessionProvider>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </SessionProvider>
        </ThemeProvider>
      </ReduxProvider>
    </QueryClientProvider>
  );
}
