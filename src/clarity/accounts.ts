export interface Account {
  address: string;
  balance: number;
  name: string;
  mnemonic: string;
  derivation: string;
}

export class Accounts extends Map<string, Account> {}
