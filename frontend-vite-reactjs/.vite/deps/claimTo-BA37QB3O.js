import {
  getClaimParams
} from "./chunk-W6QPXLLL.js";
import {
  isGetActiveClaimConditionSupported
} from "./chunk-QO2MYBUN.js";
import {
  isContractURISupported
} from "./chunk-PVGPDZGS.js";
import "./chunk-KTUB2FRR.js";
import "./chunk-NJBVM5CZ.js";
import "./chunk-657SCGLL.js";
import {
  once,
  prepareContractCall
} from "./chunk-D22BNLI7.js";
import "./chunk-QC3K2OKT.js";
import "./chunk-673YCYST.js";
import "./chunk-CNLOA7AS.js";
import {
  detectMethod
} from "./chunk-QSRHVW23.js";
import "./chunk-YNNWR6WB.js";
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

// node_modules/thirdweb/dist/esm/extensions/erc721/__generated__/IDrop/write/claim.js
var FN_SELECTOR = "0x84bb1e42";
var FN_INPUTS = [
  {
    type: "address",
    name: "receiver"
  },
  {
    type: "uint256",
    name: "quantity"
  },
  {
    type: "address",
    name: "currency"
  },
  {
    type: "uint256",
    name: "pricePerToken"
  },
  {
    type: "tuple",
    name: "allowlistProof",
    components: [
      {
        type: "bytes32[]",
        name: "proof"
      },
      {
        type: "uint256",
        name: "quantityLimitPerWallet"
      },
      {
        type: "uint256",
        name: "pricePerToken"
      },
      {
        type: "address",
        name: "currency"
      }
    ]
  },
  {
    type: "bytes",
    name: "data"
  }
];
var FN_OUTPUTS = [];
function isClaimSupported(availableSelectors) {
  return detectMethod({
    availableSelectors,
    method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS]
  });
}
function claim(options) {
  const asyncOptions = once(async () => {
    return "asyncParams" in options ? await options.asyncParams() : options;
  });
  return prepareContractCall({
    contract: options.contract,
    method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    params: async () => {
      const resolvedOptions = await asyncOptions();
      return [
        resolvedOptions.receiver,
        resolvedOptions.quantity,
        resolvedOptions.currency,
        resolvedOptions.pricePerToken,
        resolvedOptions.allowlistProof,
        resolvedOptions.data
      ];
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

// node_modules/thirdweb/dist/esm/extensions/erc721/drops/write/claimTo.js
function claimTo(options) {
  return claim({
    contract: options.contract,
    asyncParams: () => getClaimParams({
      type: "erc721",
      contract: options.contract,
      to: options.to,
      quantity: options.quantity,
      from: options.from
    })
  });
}
function isClaimToSupported(availableSelectors) {
  return isClaimSupported(availableSelectors) && // required to check if the contract supports the getActiveClaimCondition method
  isGetActiveClaimConditionSupported(availableSelectors) && // requires contractMetadata for claimer proofs
  isContractURISupported(availableSelectors);
}
export {
  claimTo,
  isClaimToSupported
};
//# sourceMappingURL=claimTo-BA37QB3O.js.map
