import { ClarityValue } from "./mod.ts";

export interface ListCV<T extends ClarityValue = ClarityValue> {
  list: T[];
}

export function listCV<T extends ClarityValue = ClarityValue>(
  list: T[],
): ListCV<T> {
  return { list: list };
}
