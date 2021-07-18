enum TxType {
  transferSTX = 1,
  contractCall = 2,
  deployContract = 3,
}

export class Tx {
  type: number;
  sender: string;
  contractCall?: TxContractCall;
  transferStx?: TxTransfer;
  deployContract?: TxDeployContract;

  constructor(type: TxType, sender: string) {
    this.type = type;
    this.sender = sender;
  }

  static transferSTX(amount: number, recipient: string, sender: string) {
    let tx = new Tx(TxType.transferSTX, sender);
    tx.transferStx = {
      recipient,
      amount,
    };
    return tx;
  }

  static contractCall(
    contract: string,
    method: string,
    args: Array<string>,
    sender: string,
  ) {
    let tx = new Tx(TxType.contractCall, sender);
    tx.contractCall = {
      contract,
      method,
      args,
    };
    return tx;
  }

  static deployContract(name: string, code: string, sender: string) {
    let tx = new Tx(TxType.deployContract, sender);
    tx.deployContract = {
      name,
      code,
    };
    return tx;
  }
}

export interface TxContractCall {
  contract: string;
  method: string;
  args: Array<string>;
}

export interface TxDeployContract {
  code: string;
  name: string;
}

export interface TxTransfer {
  amount: number;
  recipient: string;
}
