export interface TxReceipt {
  result: string;
  events: Array<any>;
}

export interface Block {
  height: number;
  receipts: Array<TxReceipt>;
}

export interface EmptyBlock {
  height: number;
  session_id: number;
}
