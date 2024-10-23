import {
  name,
  symbol
} from "./chunk-NJBVM5CZ.js";
import {
  decimals
} from "./chunk-DU5C6SXF.js";
import {
  isNativeTokenAddress
} from "./chunk-673YCYST.js";

// node_modules/thirdweb/dist/esm/extensions/erc20/read/getCurrencyMetadata.js
async function getCurrencyMetadata(options) {
  if (isNativeTokenAddress(options.contract.address)) {
    return {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
      // overwrite with native currency of the chain if available
      ...options.contract.chain.nativeCurrency
    };
  }
  try {
    const [name_, symbol_, decimals_] = await Promise.all([
      name(options).catch(() => ""),
      symbol(options),
      decimals(options)
    ]);
    return {
      name: name_,
      symbol: symbol_,
      decimals: decimals_
    };
  } catch {
    throw new Error("Invalid currency token");
  }
}

export {
  getCurrencyMetadata
};
//# sourceMappingURL=chunk-OBWBBCAT.js.map
