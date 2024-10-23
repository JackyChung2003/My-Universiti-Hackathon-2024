import {
  assertSize,
  cachedTextEncoder,
  charCodeToBase16,
  isHex,
  numberToHex,
  padHex
} from "./chunk-7IMMTQIW.js";

// node_modules/thirdweb/dist/esm/utils/encoding/to-bytes.js
function padBytes(bytes, { dir, size = 32 } = {}) {
  if (size === null) {
    return bytes;
  }
  if (bytes.length > size) {
    throw new Error(`Size overflow: ${bytes.length} > ${size}`);
  }
  const paddedBytes = new Uint8Array(size);
  for (let i = 0; i < size; i++) {
    const padEnd = dir === "right";
    paddedBytes[padEnd ? i : size - i - 1] = // biome-ignore lint/style/noNonNullAssertion: we know its there
    bytes[padEnd ? i : bytes.length - i - 1];
  }
  return paddedBytes;
}
function toBytes(value, opts = {}) {
  switch (typeof value) {
    case "number":
    case "bigint":
      return numberToBytes(value, opts);
    case "boolean":
      return boolToBytes(value, opts);
    default:
      if (isHex(value)) {
        return hexToBytes(value, opts);
      }
      return stringToBytes(value, opts);
  }
}
function boolToBytes(value, opts = {}) {
  const bytes = new Uint8Array(1);
  bytes[0] = Number(value);
  if (typeof opts.size === "number") {
    assertSize(bytes, { size: opts.size });
    return padBytes(bytes, { size: opts.size });
  }
  return bytes;
}
function hexToBytes(hex_, opts = {}) {
  let hex = hex_;
  if (opts.size) {
    assertSize(hex, { size: opts.size });
    hex = padHex(hex, { dir: "right", size: opts.size });
  }
  let hexString = hex.slice(2);
  if (hexString.length % 2) {
    hexString = `0${hexString}`;
  }
  const length = hexString.length / 2;
  const bytes = new Uint8Array(length);
  for (let index = 0, j = 0; index < length; index++) {
    const nibbleLeft = charCodeToBase16(hexString.charCodeAt(j++));
    const nibbleRight = charCodeToBase16(hexString.charCodeAt(j++));
    if (nibbleLeft === void 0 || nibbleRight === void 0) {
      throw new Error(`Invalid byte sequence ("${hexString[j - 2]}${hexString[j - 1]}" in "${hexString}").`);
    }
    bytes[index] = nibbleLeft * 16 + nibbleRight;
  }
  return bytes;
}
function numberToBytes(value, opts) {
  const hex = numberToHex(value, opts);
  return hexToBytes(hex);
}
function stringToBytes(value, opts = {}) {
  const bytes = cachedTextEncoder().encode(value);
  if (typeof opts.size === "number") {
    assertSize(bytes, { size: opts.size });
    return padBytes(bytes, { dir: "right", size: opts.size });
  }
  return bytes;
}

export {
  toBytes,
  boolToBytes,
  hexToBytes,
  numberToBytes,
  stringToBytes
};
//# sourceMappingURL=chunk-R65PP5GT.js.map
