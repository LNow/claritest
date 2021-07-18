import { Tx } from "./transactions.ts";

export class ClarinetProxy {
  private static instance: ClarinetProxy;

  private constructor() {
    (Deno as any).core.ops();
  }

  public static getInstance(): ClarinetProxy {
    if (!ClarinetProxy.instance) {
      ClarinetProxy.instance = new ClarinetProxy();
    }

    return ClarinetProxy.instance;
  }

  setupChain(name: string, transactions: Array<Tx>): SetupChainResult {
    return JSON.parse(
      (Deno as any).core.opSync("setup_chain", {
        name: name,
        transactions: transactions,
      }),
    );
  }

  mineBlock(sessionId: number, transactions: Array<Tx>): MineBlockResult {
    return JSON.parse((Deno as any).core.opSync("mine_block", {
      sessionId: sessionId,
      transactions: transactions,
    }));
  }

  mineEmptyBlocks(sessionId: number, count: number): MineEmptyBlocksResult {
    return JSON.parse((Deno as any).core.opSync("mine_empty_blocks", {
      sessionId: sessionId,
      count: count,
    }));
  }

  callReadOnlyFn(
    sessionId: number,
    contract: string,
    method: string,
    args: Array<any>,
    sender: string,
  ): CallReadOnlyFnResult {
    return JSON.parse((Deno as any).core.opSync("call_read_only_fn", {
      sessionId: sessionId,
      contract: contract,
      method: method,
      args: args,
      sender: sender,
    }));
  }

  getAssetsMap(sessionId: number): GetAssetsMapsResult {
    return JSON.parse((Deno as any).core.opSync("get_assets_maps", {
      sessionId: sessionId,
    }));
  }
}

interface Account {
  address: string;
  balance: number;
  name: string;
  mnemonic: string;
  derivation: string;
}

interface Contract {
  contract_id: string;
  contract_interface: {
    functions: [];
    variables: [];
    maps: [];
    fungible_tokens: [];
    non_fungible_tokens: [];
  };
  dependencies: [];
  source: string;
}

interface Receipt {
  result: string;
  events: Array<any>;
}

interface SetupChainResult {
  session_id: number;
  accounts: Account[];
  contracts: Contract[];
}

interface MineBlockResult {
  block_height: number;
  receipts: Receipt[];
}

interface MineEmptyBlocksResult {
  block_height: number;
  session_id: number;
}

interface CallReadOnlyFnResult {
  session_id: number;
  result: string;
  events: Array<any>;
}

interface GetAssetsMapsResult {
  session_id: number;
  assets: {
    [name: string]: {
      [owner: string]: number;
    };
  };
}
