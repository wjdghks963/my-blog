import { DefaultOptions, QueryClient } from "@tanstack/react-query";

let queryClient: QueryClient | undefined;

const makeQueryClient = () => {
  const defaultOptions: DefaultOptions = {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      refetchOnWindowFocus: false,
      retry: 1,
      refetchOnReconnect: true,
      gcTime: 5 * 60 * 1000,
    },
    mutations: {
      retry: 0,
      onError: (error) => {
        if (process.env.NODE_ENV !== "production") {
          // eslint-disable-next-line no-console
          console.error("Mutation Error:", error);
        }
      },
    },
  };

  return new QueryClient({
    defaultOptions,
  });
};

export const getQueryClient = () => {
  if (!queryClient) {
    queryClient = makeQueryClient();
  }
  return queryClient;
};
