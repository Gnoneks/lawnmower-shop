export type TypedForm<T> = {
  [K in keyof T]?: any;
};
