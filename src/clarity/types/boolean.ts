export type BooleanCV = TrueCV | FalseCV;

export interface TrueCV {}

export interface FalseCV {}

export function trueCV(): TrueCV {
  return {};
}

export function falseCV(): FalseCV {
  return {};
}
