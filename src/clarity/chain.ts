import { Block, EmptyBlock } from "./blocks.ts";
import { Tx } from "./transactions.ts";

export class Chain {
  readonly sessionId: number;
  blockHeight: number = 1;

  constructor(sessionId: number) {
    this.sessionId = sessionId;
  }

  mineBlock(transactions: Array<Tx>): Block {
    let result = JSON.parse((Deno as any).core.opSync("mine_block", {
      sessionId: this.sessionId,
      transactions: transactions,
    }));
    this.blockHeight = result.block_height;
    let block: Block = {
      height: result.block_height,
      receipts: result.receipts,
    };
    return block;
  }

  mineEmptyBlock(count: number): EmptyBlock {
    let result = JSON.parse((Deno as any).core.opSync("mine_empty_blocks", {
      sessionId: this.sessionId,
      count: count,
    }));
    this.blockHeight = result.block_height;
    let emptyBlock: EmptyBlock = {
      session_id: result.session_id,
      height: result.block_height,
    };
    return emptyBlock;
  }

  callReadOnlyFn(
    contract: string,
    method: string,
    args: Array<any>,
    sender: string,
  ): ReadOnlyFn {
    let result = JSON.parse((Deno as any).core.opSync("call_read_only_fn", {
      sessionId: this.sessionId,
      contract: contract,
      method: method,
      args: args,
      sender: sender,
    }));
    let readOnlyFn: ReadOnlyFn = {
      session_id: result.session_id,
      result: result.result,
      events: result.events,
    };
    return readOnlyFn;
  }

  getAssetsMaps(): AssetsMaps {
    let result = JSON.parse((Deno as any).core.opSync("get_assets_maps", {
      sessionId: this.sessionId,
    }));
    let assetsMaps: AssetsMaps = {
      session_id: result.session_id,
      assets: result.assets,
    };
    return assetsMaps;
  }
}

export interface AssetsMaps {
  session_id: number;
  assets: {
    [name: string]: {
      [owner: string]: number;
    };
  };
}

export interface ReadOnlyFn {
  session_id: number;
  result: string;
  events: Array<any>;
}
