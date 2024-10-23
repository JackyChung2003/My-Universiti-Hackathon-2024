import {
  toFunctionSelector
} from "./chunk-Q34TOGFK.js";

// node_modules/thirdweb/dist/esm/utils/bytecode/detectExtension.js
function detectMethod(options) {
  const fnSelector = Array.isArray(options.method) ? options.method[0] : toFunctionSelector(options.method);
  return options.availableSelectors.includes(fnSelector);
}

export {
  detectMethod
};
//# sourceMappingURL=chunk-QSRHVW23.js.map
