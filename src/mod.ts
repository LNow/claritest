import { Context } from "./context.ts";
import { TestPlan } from "./test_plan.ts";

const plan = TestPlan.getInstance();

export function describe(name: string, fn: () => void) {
  plan.describe(name, fn);
}

export function it(name: string, fn: (ctx: Context) => void) {
  plan.it(name, fn);
}

export * from "./clarity/mod.ts";
export * from "./clients/mod.ts";
