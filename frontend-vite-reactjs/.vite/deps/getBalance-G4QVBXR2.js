import {
  getCurrencyMetadata
} from "./chunk-OBWBBCAT.js";
import "./chunk-NJBVM5CZ.js";
import "./chunk-DU5C6SXF.js";
import "./chunk-673YCYST.js";
import {
  toTokens
} from "./chunk-UY2SRO54.js";
import "./chunk-QSRHVW23.js";
import {
  readContract
} from "./chunk-YNNWR6WB.js";
import "./chunk-ADB2NQOP.js";
import "./chunk-UWOTGWKX.js";
import "./chunk-QWJX262R.js";
import "./chunk-V4W7FLQ7.js";
import "./chunk-DIMUSPZQ.js";
import "./chunk-5WKP5JEZ.js";
import "./chunk-R65PP5GT.js";
import "./chunk-JZJYIG2P.js";
import "./chunk-NJUWOGZE.js";
import "./chunk-7IMMTQIW.js";
import "./chunk-KHEWVYBH.js";
import "./chunk-AINJJ2SM.js";
import "./chunk-KWDKOS5H.js";
import "./chunk-OFS4JK5L.js";
import "./chunk-Q34TOGFK.js";
import "./chunk-P4VU4REC.js";
import "./chunk-TMEMN4EL.js";
import "./chunk-CJ7GOBZO.js";
import "./chunk-XN7MCJ4Y.js";
import "./chunk-P7ZDTV2E.js";
import "./chunk-SNQ54XRM.js";
import "./chunk-SEVZ5PBP.js";

// node_modules/thirdweb/dist/esm/extensions/erc20/__generated__/IERC20/read/balanceOf.js
var FN_SELECTOR = "0x70a08231";
var FN_INPUTS = [
  {
    type: "address",
    name: "_address"
  }
];
var FN_OUTPUTS = [
  {
    type: "uint256"
  }
];
async function balanceOf(options) {
  return readContract({
    contract: options.contract,
    method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    params: [options.address]
  });
}

// node_modules/thirdweb/dist/esm/extensions/erc20/read/getBalance.js
async function getBalance(options) {
  const [balanceWei, currencyMetadata] = await Promise.all([
    balanceOf(options),
    getCurrencyMetadata(options)
  ]);
  return {
    ...currencyMetadata,
    value: balanceWei,
    displayValue: toTokens(balanceWei, currencyMetadata.decimals)
  };
}
export {
  getBalance
};
//# sourceMappingURL=getBalance-G4QVBXR2.js.map
