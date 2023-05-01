export interface ResponseType<T> {
  result: T;
  isSuccess: boolean;
  errorMessage: string;
};
