export type Response<T> = {
  message: string;
  data: T;
  error: {
    message: string;
  }
}