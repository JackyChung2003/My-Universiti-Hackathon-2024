import {
  isValidSignature
} from "./chunk-D6J6I653.js";
import "./chunk-QSRHVW23.js";
import "./chunk-YNNWR6WB.js";
import "./chunk-ADB2NQOP.js";
import "./chunk-UWOTGWKX.js";
import "./chunk-QWJX262R.js";
import "./chunk-V4W7FLQ7.js";
import "./chunk-DIMUSPZQ.js";
import {
  hashMessage
} from "./chunk-5WKP5JEZ.js";
import "./chunk-R65PP5GT.js";
import "./chunk-JZJYIG2P.js";
import "./chunk-NJUWOGZE.js";
import {
  isHex
} from "./chunk-7IMMTQIW.js";
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

// node_modules/thirdweb/dist/esm/extensions/erc1271/checkContractWalletSignature.js
var MAGIC_VALUE = "0x1626ba7e";
async function checkContractWalletSignature(options) {
  if (!isHex(options.signature)) {
    throw new Error("The signature must be a valid hex string.");
  }
  const result = await isValidSignature({
    contract: options.contract,
    hash: hashMessage(options.message),
    signature: options.signature
  });
  return result === MAGIC_VALUE;
}
export {
  checkContractWalletSignature
};
//# sourceMappingURL=checkContractWalletSignature-NU3SQA55.js.map
