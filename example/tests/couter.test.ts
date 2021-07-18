import { describe, it, Tx } from "../../mod.ts";
import { Counter } from "../clients/counter.ts";

describe("Counter", () => {
  it("can be incremented multiple times per block, across multiple blocks", (
    ctx,
  ) => {
    const client = ctx.clients.get(Counter);
    const wallet_1 = ctx.accounts.get("wallet_1")!;
    const wallet_2 = ctx.accounts.get("wallet_2")!;

    let block = ctx.chain.mineBlock([
      Tx.contractCall("counter", "increment", ["u1"], wallet_1.address),
    ]);

    console.info(block);

    console.info(client.readCounter());
  });
});
