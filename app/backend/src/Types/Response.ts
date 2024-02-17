import { errorMessage } from './ErrorMessage';

export type Response<T> = {
  status: number,
  data: T | errorMessage,
};

export type ResponseArray<T> = {
  status: number,
  data: T[] | errorMessage,
};
