export type IResultError<TName extends string> = {
  name: TName;
  TGetName: TName;
  message: string;
  throw: () => void;
  ok: false;
};
