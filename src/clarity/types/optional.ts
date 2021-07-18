import { ClarityValue } from "./mod.ts";

export type OptionalCV<T extends ClarityValue> = NoneCV | SomeCV;

export interface NoneCV<T extends ClarityValue = ClarityValue> {}

export interface SomeCV<T extends ClarityValue = ClarityValue> {
  value: T;
}

export function noneCV(): NoneCV {
  return {};
}

export function someCV<T extends ClarityValue = ClarityValue>(
  value: T,
): SomeCV {
  return { value: value };
}

export function optionalCVOf<T extends ClarityValue = ClarityValue>(
  value?: T,
): OptionalCV<T> {
  if (value) {
    return someCV(value);
  } else {
    return noneCV();
  }
}
