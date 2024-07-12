export interface FetchState<T> {
  isLoading: boolean;
  isError: boolean;
  isDataNull: boolean;
  data: T | null;
  errorMessage: string | null;
}
