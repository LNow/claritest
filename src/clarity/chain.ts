import { Block, EmptyBlock } from "./blocks.ts";
import { ClarinetProxy } from "./clarinet_proxy.ts";
import { Tx } from "./transactions.ts";

export class Chain {
  readonly sessionId: number;
  private clarinet: ClarinetProxy;
  blockHeight: number = 1;

  constructor(sessionId: number, clarinet: ClarinetProxy) {
    this.sessionId = sessionId;
    this.clarinet = clarinet;
  }

  mineBlock(transactions: Array<Tx>): Block {
    let result = this.clarinet.mineBlock(this.sessionId, transactions);
    this.blockHeight = result.block_height;
    let block: Block = {
      height: result.block_height,
      receipts: result.receipts,
    };
    return block;
  }

  mineEmptyBlock(count: number): EmptyBlock {
    let result = this.clarinet.mineEmptyBlocks(this.sessionId, count);
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
    let result = this.clarinet.callReadOnlyFn(
      this.sessionId,
      contract,
      method,
      args,
      sender,
    );
    let readOnlyFn: ReadOnlyFn = {
      session_id: result.session_id,
      result: result.result,
      events: result.events,
    };
    return readOnlyFn;
  }

  getAssetsMaps(): AssetsMaps {
    let result = this.clarinet.getAssetsMap(this.sessionId);
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
