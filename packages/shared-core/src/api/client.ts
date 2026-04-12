export type ApiOptions = {
  orgId: string;
  token?: string;
};

export const withOrgScope = <T>(orgId: string, key: readonly T[]) =>
  ["org", orgId, ...key] as const;

export async function apiGet<T>(path: string, options: ApiOptions): Promise<T> {
  const response = await fetch(`${path}?orgId=${options.orgId}`, {
    headers: options.token ? { Authorization: `Bearer ${options.token}` } : {},
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return (await response.json()) as T;
}
