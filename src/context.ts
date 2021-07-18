import { Accounts } from "./clarity/accounts.ts";
import { Chain } from "./clarity/chain.ts";
import { Contracts } from "./clarity/contracts.ts";
import { ClientsFactory } from "./clients/clients_factory.ts";

export interface Context {
  chain: Chain;
  accounts: Accounts;
  contracts: Contracts;
  clients: ClientsFactory;
}
