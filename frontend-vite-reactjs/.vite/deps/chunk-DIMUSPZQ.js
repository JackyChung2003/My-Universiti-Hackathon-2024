import {
  hexToUint8Array,
  isHex,
  uint8ArrayToHex
} from "./chunk-7IMMTQIW.js";
import {
  keccak_256
} from "./chunk-P4VU4REC.js";

// node_modules/thirdweb/dist/esm/utils/hashing/keccak256.js
function keccak256(value, to) {
  const bytes = keccak_256(isHex(value, { strict: false }) ? hexToUint8Array(value) : value);
  if (to === "bytes") {
    return bytes;
  }
  return uint8ArrayToHex(bytes);
}

export {
  keccak256
};
//# sourceMappingURL=chunk-DIMUSPZQ.js.map
