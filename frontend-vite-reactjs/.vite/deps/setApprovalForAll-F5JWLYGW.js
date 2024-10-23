import {
  once,
  prepareContractCall
} from "./chunk-D22BNLI7.js";
import "./chunk-QC3K2OKT.js";
import "./chunk-CNLOA7AS.js";
import {
  detectMethod
} from "./chunk-QSRHVW23.js";
import "./chunk-ADB2NQOP.js";
import {
  encodeAbiParameters
} from "./chunk-UWOTGWKX.js";
import "./chunk-QWJX262R.js";
import "./chunk-V4W7FLQ7.js";
import "./chunk-DIMUSPZQ.js";
import "./chunk-5WKP5JEZ.js";
import "./chunk-R65PP5GT.js";
import "./chunk-NJUWOGZE.js";
import "./chunk-7IMMTQIW.js";
import "./chunk-KHEWVYBH.js";
import "./chunk-KWDKOS5H.js";
import "./chunk-OFS4JK5L.js";
import "./chunk-Q34TOGFK.js";
import "./chunk-P4VU4REC.js";
import "./chunk-TMEMN4EL.js";
import "./chunk-SNQ54XRM.js";
import "./chunk-SEVZ5PBP.js";

// node_modules/thirdweb/dist/esm/extensions/erc1155/__generated__/IERC1155/write/setApprovalForAll.js
var FN_SELECTOR = "0xa22cb465";
var FN_INPUTS = [
  {
    type: "address",
    name: "_operator"
  },
  {
    type: "bool",
    name: "_approved"
  }
];
var FN_OUTPUTS = [];
function isSetApprovalForAllSupported(availableSelectors) {
  return detectMethod({
    availableSelectors,
    method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS]
  });
}
function encodeSetApprovalForAllParams(options) {
  return encodeAbiParameters(FN_INPUTS, [options.operator, options.approved]);
}
function encodeSetApprovalForAll(options) {
  return FN_SELECTOR + encodeSetApprovalForAllParams(options).slice(2);
}
function setApprovalForAll(options) {
  const asyncOptions = once(async () => {
    return "asyncParams" in options ? await options.asyncParams() : options;
  });
  return prepareContractCall({
    contract: options.contract,
    method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    params: async () => {
      const resolvedOptions = await asyncOptions();
      return [resolvedOptions.operator, resolvedOptions.approved];
    },
    value: async () => {
      var _a;
      return (_a = (await asyncOptions()).overrides) == null ? void 0 : _a.value;
    },
    accessList: async () => {
      var _a;
      return (_a = (await asyncOptions()).overrides) == null ? void 0 : _a.accessList;
    },
    gas: async () => {
      var _a;
      return (_a = (await asyncOptions()).overrides) == null ? void 0 : _a.gas;
    },
    gasPrice: async () => {
      var _a;
      return (_a = (await asyncOptions()).overrides) == null ? void 0 : _a.gasPrice;
    },
    maxFeePerGas: async () => {
      var _a;
      return (_a = (await asyncOptions()).overrides) == null ? void 0 : _a.maxFeePerGas;
    },
    maxPriorityFeePerGas: async () => {
      var _a;
      return (_a = (await asyncOptions()).overrides) == null ? void 0 : _a.maxPriorityFeePerGas;
    },
    nonce: async () => {
      var _a;
      return (_a = (await asyncOptions()).overrides) == null ? void 0 : _a.nonce;
    },
    extraGas: async () => {
      var _a;
      return (_a = (await asyncOptions()).overrides) == null ? void 0 : _a.extraGas;
    },
    erc20Value: async () => {
      var _a;
      return (_a = (await asyncOptions()).overrides) == null ? void 0 : _a.erc20Value;
    }
  });
}
export {
  FN_SELECTOR,
  encodeSetApprovalForAll,
  encodeSetApprovalForAllParams,
  isSetApprovalForAllSupported,
  setApprovalForAll
};
//# sourceMappingURL=setApprovalForAll-F5JWLYGW.js.map
