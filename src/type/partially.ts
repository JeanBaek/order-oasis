export type PartiallyOptional<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;

export type PartiallyRequired<T, K extends keyof T> = Omit<T, K> &
  Required<Pick<T, K>>;

// 기존 K 타입의 필수/비필수 여부가 R 타입에 그대로 적용됨
export type PartiallyReplaced<T, K extends keyof T, R> = Omit<T, K> &
  (undefined extends T[K] ? Partial<{ [P in K]: R }> : { [P in K]: R }) &
  Pick<T, Exclude<keyof T, K>>;
