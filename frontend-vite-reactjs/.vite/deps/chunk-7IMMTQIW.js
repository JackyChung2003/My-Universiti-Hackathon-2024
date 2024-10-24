import {
  cachedTextDecoder
} from "./chunk-KHEWVYBH.js";

// node_modules/thirdweb/dist/esm/utils/encoding/helpers/is-hex.js
function isHex(value, options = {}) {
  if (!value) {
    return false;
  }
  if (typeof value !== "string") {
    return false;
  }
  return options.strict ? /^0x[0-9a-fA-F]*$/.test(value) : value.startsWith("0x");
}

// node_modules/thirdweb/dist/esm/utils/encoding/helpers/byte-size.js
function byteSize(value) {
  if (isHex(value, { strict: false })) {
    return Math.ceil((value.length - 2) / 2);
  }
  return value.length;
}

// node_modules/thirdweb/dist/esm/utils/text-encoder.js
var textEncoder;
function cachedTextEncoder() {
  if (!textEncoder) {
    textEncoder = new TextEncoder();
  }
  return textEncoder;
}

// node_modules/thirdweb/dist/esm/utils/encoding/helpers/assert-size.js
function assertSize(hexOrBytes, { size }) {
  const givenSize = byteSize(hexOrBytes);
  if (givenSize > size) {
    throw new Error(`Size overflow: ${givenSize} > ${size}`);
  }
}

// node_modules/thirdweb/dist/esm/utils/encoding/helpers/charcode-to-base-16.js
var charCodeMap = {
  zero: 48,
  nine: 57,
  A: 65,
  F: 70,
  a: 97,
  f: 102
};
function charCodeToBase16(char) {
  if (char >= charCodeMap.zero && char <= charCodeMap.nine) {
    return char - charCodeMap.zero;
  }
  if (char >= charCodeMap.A && char <= charCodeMap.F) {
    return char - (charCodeMap.A - 10);
  }
  if (char >= charCodeMap.a && char <= charCodeMap.f) {
    return char - (charCodeMap.a - 10);
  }
  return void 0;
}

// node_modules/thirdweb/dist/esm/utils/encoding/hex.js
function trim(hexOrBytes, options = {}) {
  const dir = options.dir || "left";
  let data = typeof hexOrBytes === "string" ? hexOrBytes.replace("0x", "") : hexOrBytes;
  let sliceLength = 0;
  for (let i = 0; i < data.length - 1; i++) {
    if (data[dir === "left" ? i : data.length - i - 1].toString() === "0") {
      sliceLength++;
    } else {
      break;
    }
  }
  data = dir === "left" ? data.slice(sliceLength) : data.slice(0, data.length - sliceLength);
  if (typeof hexOrBytes === "string") {
    if (data.length === 1 && dir === "right") {
      data = `${data}0`;
    }
    return `0x${data.length % 2 === 1 ? `0${data}` : data}`;
  }
  return data;
}
function padHex(hex_, options = {}) {
  const { dir, size = 32 } = options;
  if (size === null) {
    return hex_;
  }
  const hex = hex_.replace("0x", "");
  if (hex.length > size * 2) {
    throw new Error(`Size overflow: ${Math.ceil(hex.length / 2)} > ${size}`);
  }
  return `0x${hex[dir === "right" ? "padEnd" : "padStart"](size * 2, "0")}`;
}
function hexToString(hex, opts = {}) {
  let bytes = hexToUint8Array(hex);
  if (opts.size) {
    assertSize(bytes, { size: opts.size });
    bytes = trim(bytes, { dir: "right" });
  }
  return cachedTextDecoder().decode(bytes);
}
function hexToBigInt(hex, opts = {}) {
  const { signed } = opts;
  if (opts.size) {
    assertSize(hex, { size: opts.size });
  }
  const value = BigInt(hex);
  if (!signed) {
    return value;
  }
  const size = (hex.length - 2) / 2;
  const max = (1n << BigInt(size) * 8n - 1n) - 1n;
  if (value <= max) {
    return value;
  }
  return value - BigInt(`0x${"f".padStart(size * 2, "f")}`) - 1n;
}
function hexToNumber(hex, opts = {}) {
  return Number(hexToBigInt(hex, opts));
}
function hexToBool(hex, opts = {}) {
  if (opts.size) {
    assertSize(hex, { size: opts.size });
    hex = trim(hex);
  }
  if (trim(hex) === "0x00") {
    return false;
  }
  if (trim(hex) === "0x01") {
    return true;
  }
  throw new Error(`Invalid hex boolean: ${hex}`);
}
function hexToUint8Array(hex, opts = {}) {
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
      throw new Error(`Invalid hex character: ${hexString}`);
    }
    bytes[index] = nibbleLeft * 16 + nibbleRight;
  }
  return bytes;
}
function fromHex(hex, toOrOpts) {
  const opts = typeof toOrOpts === "string" ? { to: toOrOpts } : toOrOpts;
  switch (opts.to) {
    case "number":
      return hexToNumber(hex, opts);
    case "bigint":
      return hexToBigInt(hex, opts);
    case "string":
      return hexToString(hex, opts);
    case "boolean":
      return hexToBool(hex, opts);
    default:
      return hexToUint8Array(hex, opts);
  }
}
var hexes = (() => Array.from({ length: 256 }, (_v, i) => i.toString(16).padStart(2, "0")))();
function boolToHex(value, opts = {}) {
  const hex = `0x${Number(value)}`;
  if (typeof opts.size === "number") {
    assertSize(hex, { size: opts.size });
    return padHex(hex, { size: opts.size });
  }
  return hex;
}
function uint8ArrayToHex(value, opts = {}) {
  let string = "";
  for (let i = 0; i < value.length; i++) {
    string += hexes[value[i]];
  }
  const hex = `0x${string}`;
  if (typeof opts.size === "number") {
    assertSize(hex, { size: opts.size });
    return padHex(hex, { dir: "right", size: opts.size });
  }
  return hex;
}
function numberToHex(value_, opts = {}) {
  const { signed, size } = opts;
  const value = BigInt(value_);
  let maxValue;
  if (size) {
    if (signed) {
      maxValue = (1n << BigInt(size) * 8n - 1n) - 1n;
    } else {
      maxValue = 2n ** (BigInt(size) * 8n) - 1n;
    }
  } else if (typeof value_ === "number") {
    maxValue = BigInt(Number.MAX_SAFE_INTEGER);
  }
  const minValue = typeof maxValue === "bigint" && signed ? -maxValue - 1n : 0;
  if (maxValue && value > maxValue || value < minValue) {
    const suffix = typeof value_ === "bigint" ? "n" : "";
    throw new Error(`Number "${value_}${suffix}" is not in safe ${size ? `${size * 8}-bit ${signed ? "signed" : "unsigned"} ` : ""}integer range ${maxValue ? `(${minValue} to ${maxValue})` : `(above ${minValue})`}`);
  }
  const hex = `0x${(signed && value < 0 ? (1n << BigInt(size * 8)) + BigInt(value) : value).toString(16)}`;
  if (size) {
    return padHex(hex, { size });
  }
  return hex;
}
function stringToHex(value_, opts = {}) {
  const value = cachedTextEncoder().encode(value_);
  return uint8ArrayToHex(value, opts);
}
function toHex(value, opts = {}) {
  switch (typeof value) {
    case "number":
    case "bigint":
      return numberToHex(value, opts);
    case "string":
      return stringToHex(value, opts);
    case "boolean":
      return boolToHex(value, opts);
    default:
      return uint8ArrayToHex(value, opts);
  }
}

export {
  cachedTextEncoder,
  isHex,
  byteSize,
  assertSize,
  charCodeToBase16,
  padHex,
  hexToString,
  hexToBigInt,
  hexToNumber,
  hexToBool,
  hexToUint8Array,
  fromHex,
  boolToHex,
  uint8ArrayToHex,
  numberToHex,
  stringToHex,
  toHex
};
//# sourceMappingURL=chunk-7IMMTQIW.js.map
