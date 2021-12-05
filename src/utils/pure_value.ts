import { Downgraded, StateMethods } from "@hookstate/core";

export const getPureValue = <T>(value: StateMethods<T>) => {
  return value.attach(Downgraded).get();
};
