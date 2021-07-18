import { Context } from "./context.ts";
import { TestCase } from "./test_case.ts";
import { TestSuite } from "./test_suite.ts";

export class TestPlan {
  private static instance: TestPlan;
  children: (TestSuite | TestCase)[] = [];
  scope: TestPlan | TestSuite = this;

  private constructor() {}

  public static getInstance(): TestPlan {
    if (!TestPlan.instance) {
      TestPlan.instance = new TestPlan();
    }

    return TestPlan.instance;
  }

  public describe(name: string, fn: () => void) {
    const parent = this.scope;
    const testSuite = new TestSuite(name, parent);
    parent.children.push();
    this.scope = testSuite;
    fn();
    this.scope = parent;
  }

  public it(name: string, fn: (ctx: Context) => void) {
    const parent = this.scope;
    const testCase = new TestCase(name, parent, fn);
    parent.children.push(testCase);
    testCase.run();
  }
}
