import apiClient from '.';

export const fetchData = async <T>(
  apiEndpoint: string,
  params?: object,
): Promise<T | undefined> => {
  try {
    const res = await apiClient.get<T>(apiEndpoint, { params });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
