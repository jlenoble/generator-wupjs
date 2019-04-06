declare namespace Wup {
  type Includes<T, U> = Extract<U, Exclude<U, T>> extends never ? true : false;

  type Equals<T, U> = Includes<T, U> extends true ? Includes<U, T> : false;

  type HasProperties<T, names> = Equals<
    names,
    { [K in keyof T]: Equals<K, names> extends true ? K : never }[keyof T]
  >;
}
