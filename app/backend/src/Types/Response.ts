export type Response<T> = {
  status: number,
  data: T,
};

export type ResponseArray<T> = {
  status: number,
  data: T[],
};
