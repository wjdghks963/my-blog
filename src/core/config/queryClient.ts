import { QueryClient } from "@tanstack/react-query";

let queryClient: QueryClient | undefined;

const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  });
};

export const getQueryClient = () => {
  if (!queryClient) {
    queryClient = makeQueryClient();
  }
  return queryClient;
};
