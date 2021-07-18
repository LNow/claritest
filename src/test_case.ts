import { TestSuite } from "./test_suite.ts";
import { TestPlan } from "./test_plan.ts";
import { Chain } from "./clarity/chain.ts";
import { Account, Accounts } from "./clarity/accounts.ts";
import { Contracts } from "./clarity/contracts.ts";
import { ClientsFactory } from "./clients/clients_factory.ts";
import { Tx } from "./clarity/transactions.ts";
import { Context } from "./context.ts";
import { ClarinetProxy } from "./clarity/clarinet_proxy.ts";

export class TestCase {
  name: string;
  parent: TestSuite | TestPlan;
  fn: (ctx: Context) => void;

  constructor(
    name: string,
    parent: TestSuite | TestPlan,
    fn: (ctx: Context) => void,
  ) {
    this.name = name;
    this.parent = parent;
    this.fn = fn;
  }

  getFullName() {
    const ancestors: Array<string> = new Array();

    let ancestor = this.parent;
    while (ancestor instanceof TestSuite) {
      ancestors.push(ancestor.name);
      ancestor = ancestor.parent;
    }
    ancestors.reverse().push(this.name);
    return ancestors.join(" > ");
  }

  run() {
    const fullName = this.getFullName();

    const fn = async () => {
      let chain: Chain;
      let accounts: Accounts;
      let contracts: Contracts;
      let deployer: Account;
      let clients: ClientsFactory;
      let clarinet = ClarinetProxy.getInstance();

      let transactions: Array<Tx> = [];
      let result = clarinet.setupChain(fullName, transactions);

      chain = new Chain(result.session_id, clarinet);
      accounts = new Map();

      for (let account of result.accounts) {
        accounts.set(account.name, account);
      }

      contracts = new Map();
      for (let contract of result.contracts) {
        contracts.set(contract.contract_id, contract);
      }

      deployer = accounts.get("deployer")!;
      clients = new ClientsFactory(chain, deployer);

      const ctx: Context = {
        chain: chain,
        accounts: accounts,
        contracts: contracts,
        clients: clients,
      };

      this.fn(ctx);
    };

    const testDefinition: Deno.TestDefinition = {
      name: fullName,
      fn: fn,
    };

    Deno.test(testDefinition);
  }
}
