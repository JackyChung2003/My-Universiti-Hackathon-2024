import {
  detectMethod
} from "./chunk-QSRHVW23.js";
import {
  readContract
} from "./chunk-YNNWR6WB.js";
import "./chunk-ADB2NQOP.js";
import {
  encodeAbiParameters
} from "./chunk-UWOTGWKX.js";
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
import {
  decodeAbiParameters
} from "./chunk-Q34TOGFK.js";
import "./chunk-P4VU4REC.js";
import "./chunk-TMEMN4EL.js";
import "./chunk-CJ7GOBZO.js";
import "./chunk-XN7MCJ4Y.js";
import "./chunk-P7ZDTV2E.js";
import "./chunk-SNQ54XRM.js";
import "./chunk-SEVZ5PBP.js";

// node_modules/thirdweb/dist/esm/extensions/erc721/__generated__/IERC721A/read/getApproved.js
var FN_SELECTOR = "0x081812fc";
var FN_INPUTS = [
  {
    type: "uint256",
    name: "tokenId"
  }
];
var FN_OUTPUTS = [
  {
    type: "address"
  }
];
function isGetApprovedSupported(availableSelectors) {
  return detectMethod({
    availableSelectors,
    method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS]
  });
}
function encodeGetApprovedParams(options) {
  return encodeAbiParameters(FN_INPUTS, [options.tokenId]);
}
function encodeGetApproved(options) {
  return FN_SELECTOR + encodeGetApprovedParams(options).slice(2);
}
function decodeGetApprovedResult(result) {
  return decodeAbiParameters(FN_OUTPUTS, result)[0];
}
async function getApproved(options) {
  return readContract({
    contract: options.contract,
    method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    params: [options.tokenId]
  });
}
export {
  FN_SELECTOR,
  decodeGetApprovedResult,
  encodeGetApproved,
  encodeGetApprovedParams,
  getApproved,
  isGetApprovedSupported
};
//# sourceMappingURL=getApproved-IHELQXWJ.js.map
