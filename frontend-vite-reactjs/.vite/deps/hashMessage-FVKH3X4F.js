import "./chunk-QWJX262R.js";
import {
  keccak256
} from "./chunk-DIMUSPZQ.js";
import "./chunk-5WKP5JEZ.js";
import {
  stringToBytes,
  toBytes
} from "./chunk-R65PP5GT.js";
import "./chunk-7IMMTQIW.js";
import "./chunk-KHEWVYBH.js";
import "./chunk-KWDKOS5H.js";
import "./chunk-OFS4JK5L.js";
import {
  concat
} from "./chunk-Q34TOGFK.js";
import "./chunk-P4VU4REC.js";
import "./chunk-TMEMN4EL.js";
import "./chunk-SEVZ5PBP.js";

// node_modules/thirdweb/dist/esm/utils/hashing/hashMessage.js
var presignMessagePrefix = "Ethereum Signed Message:\n";
function hashMessage(message, to_) {
  const messageBytes = (() => {
    if (typeof message === "string") {
      return stringToBytes(message);
    }
    if (message.raw instanceof Uint8Array) {
      return message.raw;
    }
    return toBytes(message.raw);
  })();
  const prefixBytes = stringToBytes(`${presignMessagePrefix}${messageBytes.length}`);
  return keccak256(concat([prefixBytes, messageBytes]), to_);
}
export {
  hashMessage
};
//# sourceMappingURL=hashMessage-FVKH3X4F.js.map
