"use client";

import { getQueryClient } from "@core/config/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import React, { ReactNode } from "react";

export default function Provider({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient();
  return (
    <ThemeProvider
      attribute="class"
      enableSystem={true}
      defaultTheme="system"
    >
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          {children}
          {process.env.NODE_ENV === "development" && <ReactQueryDevtools initialIsOpen={false} />}
        </SessionProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
