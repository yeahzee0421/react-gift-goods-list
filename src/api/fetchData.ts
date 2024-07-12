import apiClient from '.';
export const fetchData = async <T>(
  apiEndpoint: string,
  params?: object,
): Promise<{ data: T; ok: boolean }> => {
  const res = await apiClient.get<T>(apiEndpoint, { params });
  const ok = res.status === 200;
  if (!ok) {
    throw new Error('Error to fetch Data!');
  }
  return { data: res.data, ok };
};
