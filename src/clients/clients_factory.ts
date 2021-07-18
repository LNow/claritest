import { Account, Chain } from "../clarity/mod.ts";
import { Client } from "./client.ts";

export class ClientsFactory {
  private chain: Chain;
  private deployer: Account;

  constructor(chain: Chain, deployer: Account) {
    this.chain = chain;
    this.deployer = deployer;
  }

  public get<T extends Client>(type: {
    new (chain: Chain, deployer: Account): T;
  }): T {
    return new type(this.chain, this.deployer);
  }
}
