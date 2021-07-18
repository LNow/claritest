import { Account, Chain, Client } from "../../mod.ts";

export class Counter extends Client {
  contractName: string = "counter";
  
  readCounter() {
    return this.callReadOnlyFn("read-counter")
  }
}
