export interface Response<T> {
  result: T;
  isSuccess: boolean;
  errorMessage: string;
};
