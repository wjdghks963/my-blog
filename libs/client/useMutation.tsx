import { useState } from "react";

interface IPostData<T> {
  data?: T;
  loading: boolean;
  error?: Object;
}

type MutationResult<T> = [(data: any) => Promise<void>, IPostData<T>];

export function useMutation<T = any>(url: string): MutationResult<T> {
  const [response, setResponse] = useState<IPostData<T>>({
    data: undefined,
    loading: false,
    error: undefined,
  });

  const mutation = async (data: any) => {
    await fetch(url, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((response) => response.json().catch(() => {}))
      .then((json) => setResponse((prev) => ({ ...prev, data: json })))
      .catch((error) => setResponse((prev) => ({ ...prev, error })))
      .finally(() => setResponse((prev) => ({ ...prev, loading: false })));
  };

  return [mutation, response];
}
