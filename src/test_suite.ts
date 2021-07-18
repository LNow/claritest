import { TestCase } from "./test_case.ts";
import { TestPlan } from "./test_plan.ts";

export class TestSuite {
  name: string;
  parent: TestPlan | TestSuite;
  children: (TestSuite | TestCase)[] = [];

  constructor(name: string, parent: TestPlan | TestSuite) {
    this.name = name;
    this.parent = parent;
  }
}
