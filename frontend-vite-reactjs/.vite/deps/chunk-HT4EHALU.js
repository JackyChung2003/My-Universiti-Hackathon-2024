import {
  formatBlock
} from "./chunk-5WKP5JEZ.js";
import {
  numberToHex
} from "./chunk-7IMMTQIW.js";

// node_modules/thirdweb/dist/esm/rpc/actions/eth_getBlockByNumber.js
async function eth_getBlockByNumber(request, params) {
  const blockTag = params.blockTag ?? "latest";
  const includeTransactions = params.includeTransactions ?? false;
  const blockNumberHex = params.blockNumber !== void 0 ? numberToHex(params.blockNumber) : void 0;
  const block = await request({
    method: "eth_getBlockByNumber",
    params: [blockNumberHex || blockTag, includeTransactions]
  });
  if (!block) {
    throw new Error("Block not found");
  }
  return formatBlock(block);
}

export {
  eth_getBlockByNumber
};
//# sourceMappingURL=chunk-HT4EHALU.js.map
