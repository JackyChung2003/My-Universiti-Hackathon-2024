import {
  decimals
} from "./chunk-DU5C6SXF.js";
import {
  withCache
} from "./chunk-AINJJ2SM.js";

// node_modules/thirdweb/dist/esm/extensions/erc20/read/decimals.js
async function decimals2(options) {
  return withCache(() => decimals(options), {
    cacheKey: `${options.contract.chain.id}:${options.contract.address}:decimals`,
    // can never change, so cache forever
    cacheTime: Number.POSITIVE_INFINITY
  });
}

export {
  decimals2 as decimals
};
//# sourceMappingURL=chunk-H4PFE77S.js.map
