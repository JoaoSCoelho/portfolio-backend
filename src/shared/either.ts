export class Left<L> {
  constructor(readonly value: L) {}
}

export type Either<L, A> = Left<L> | A;

export const left = <L, A>(l: L): Either<L, A> => {
  return new Left<L>(l);
};

export function isLeft<L, A>(e: Either<L, A>): e is Left<L> {
  return e instanceof Left
}

export function everyIsRight<L, A>(ea: Either<L, A>[]): ea is A[] {
  return ea.every((e) => !isLeft(e))
}