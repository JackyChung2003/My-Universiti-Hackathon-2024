// node_modules/thirdweb/dist/esm/utils/encoding/helpers/concat-hex.js
function concatHex(values) {
  return `0x${values.reduce((acc, x) => acc + x.replace("0x", ""), "")}`;
}

export {
  concatHex
};
//# sourceMappingURL=chunk-HMKIZ6SN.js.map
