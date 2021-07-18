import { Account, Chain, ReadOnlyFn } from "../clarity/mod.ts";

export interface IClient {
  readonly contractName: string;
}

export abstract class Client {
  abstract readonly contractName: string;
  readonly chain: Chain;
  readonly deployer: Account;

  constructor(chain: Chain, deployer: Account) {
    this.chain = chain;
    this.deployer = deployer;
  }

  callReadOnlyFn(
    method: string,
    args: Array<any> = [],
    sender: Account = this.deployer,
  ): ReadOnlyFn {
    const result = this.chain.callReadOnlyFn(
      this.contractName,
      method,
      args,
      sender?.address,
    );

    return result;
  }

  public getContractAddress(): string {
    return `${this.deployer.address}.${this.contractName}`;
  }
}
