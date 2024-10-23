import {
  hexToNumber,
  numberToHex
} from "./chunk-7IMMTQIW.js";

// node_modules/thirdweb/dist/esm/rpc/actions/eth_getTransactionCount.js
async function eth_getTransactionCount(request, params) {
  const count = await request({
    method: "eth_getTransactionCount",
    params: [
      params.address,
      // makes sense to default to `pending` here, since we're asking for a transaction count (nonce)
      params.blockNumber ? numberToHex(params.blockNumber) : params.blockTag || "pending"
    ]
  });
  return hexToNumber(count);
}

export {
  eth_getTransactionCount
};
//# sourceMappingURL=chunk-JHXKG54L.js.map
