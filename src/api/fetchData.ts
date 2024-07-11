import apiClient from '.';
//Promise
export const fetchData = async <T>(apiEndpoint: string, params?: object): Promise<T> => {
  const res = await apiClient.get<T>(apiEndpoint, { params });
  return res.data;
};
