import {
  readContract
} from "./chunk-YNNWR6WB.js";

// node_modules/thirdweb/dist/esm/extensions/erc1271/__generated__/isValidSignature/read/isValidSignature.js
var FN_SELECTOR = "0x1626ba7e";
var FN_INPUTS = [
  {
    type: "bytes32",
    name: "hash"
  },
  {
    type: "bytes",
    name: "signature"
  }
];
var FN_OUTPUTS = [
  {
    type: "bytes4"
  }
];
async function isValidSignature(options) {
  return readContract({
    contract: options.contract,
    method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    params: [options.hash, options.signature]
  });
}

export {
  isValidSignature
};
//# sourceMappingURL=chunk-D6J6I653.js.map
