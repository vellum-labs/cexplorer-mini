type GqlError = { message: string };
type GqlResponse<T> = { data?: T; errors?: GqlError[] };

export async function gql<
  TData,
  TVariables extends Record<string, unknown> | undefined = undefined,
>(
  query: string,
  variables?: TVariables,
  options?: { headers?: Record<string, string>; signal?: AbortSignal },
): Promise<TData> {
  const endpoint = import.meta.env.VITE_GQL_ENDPOINT as string;
  const adminSecret = import.meta.env.VITE_HASURA_ADMIN_SECRET as string;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(adminSecret && { "x-hasura-admin-secret": adminSecret }),
      ...(options?.headers ?? {}),
    },
    body: JSON.stringify({ query, variables }),
    signal: options?.signal,
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status} ${res.statusText}`);
  }

  const json = (await res.json()) as GqlResponse<TData>;

  if (json.errors?.length) {
    throw new Error(json.errors.map(e => e.message).join("; "));
  }

  if (!json.data) {
    throw new Error("No data in GraphQL response");
  }

  return json.data;
}
