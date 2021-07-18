export interface Contract {
  contract_id: string;
  source: string;
  contract_interface: any;
}

export class Contracts extends Map<string, Contract> {}
