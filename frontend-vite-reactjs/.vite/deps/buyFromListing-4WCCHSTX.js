import {
  getListing,
  isGetListingSupported,
  isListingValid
} from "./chunk-G7QU34LP.js";
import "./chunk-GRJHGPJQ.js";
import "./chunk-OBWBBCAT.js";
import "./chunk-NJBVM5CZ.js";
import "./chunk-DU5C6SXF.js";
import {
  once,
  prepareContractCall
} from "./chunk-D22BNLI7.js";
import "./chunk-HT4EHALU.js";
import "./chunk-QC3K2OKT.js";
import {
  isNativeTokenAddress
} from "./chunk-673YCYST.js";
import "./chunk-7VZHRFCE.js";
import "./chunk-UY2SRO54.js";
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

// node_modules/thirdweb/dist/esm/extensions/marketplace/__generated__/IDirectListings/write/buyFromListing.js
var FN_SELECTOR = "0x704232dc";
var FN_INPUTS = [
  {
    type: "uint256",
    name: "_listingId"
  },
  {
    type: "address",
    name: "_buyFor"
  },
  {
    type: "uint256",
    name: "_quantity"
  },
  {
    type: "address",
    name: "_currency"
  },
  {
    type: "uint256",
    name: "_expectedTotalPrice"
  }
];
var FN_OUTPUTS = [];
function isBuyFromListingSupported(availableSelectors) {
  return detectMethod({
    availableSelectors,
    method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS]
  });
}
function buyFromListing(options) {
  const asyncOptions = once(async () => {
    return "asyncParams" in options ? await options.asyncParams() : options;
  });
  return prepareContractCall({
    contract: options.contract,
    method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    params: async () => {
      const resolvedOptions = await asyncOptions();
      return [
        resolvedOptions.listingId,
        resolvedOptions.buyFor,
        resolvedOptions.quantity,
        resolvedOptions.currency,
        resolvedOptions.expectedTotalPrice
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

// node_modules/thirdweb/dist/esm/extensions/marketplace/direct-listings/write/buyFromListing.js
function buyFromListing2(options) {
  return buyFromListing({
    contract: options.contract,
    asyncParams: async () => {
      const listing = await getListing({
        contract: options.contract,
        listingId: options.listingId
      });
      const listingValidity = await isListingValid({
        contract: options.contract,
        listing,
        quantity: options.quantity
      });
      if (!listingValidity.valid) {
        throw new Error(listingValidity.reason);
      }
      return {
        listingId: options.listingId,
        quantity: options.quantity,
        buyFor: options.recipient,
        currency: listing.currencyContractAddress,
        expectedTotalPrice: listing.pricePerToken * options.quantity,
        overrides: {
          value: isNativeTokenAddress(listing.currencyContractAddress) ? listing.pricePerToken * options.quantity : 0n,
          extraGas: 50000n
          // add extra gas to account for router call
        }
      };
    }
  });
}
function isBuyFromListingSupported2(availableSelectors) {
  return isBuyFromListingSupported(availableSelectors) && isGetListingSupported(availableSelectors);
}
export {
  buyFromListing2 as buyFromListing,
  isBuyFromListingSupported2 as isBuyFromListingSupported
};
//# sourceMappingURL=buyFromListing-4WCCHSTX.js.map
