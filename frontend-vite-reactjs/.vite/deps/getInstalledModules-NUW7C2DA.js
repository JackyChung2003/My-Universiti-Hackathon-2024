import {
  detectMethod
} from "./chunk-QSRHVW23.js";
import {
  readContract
} from "./chunk-YNNWR6WB.js";
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
import {
  decodeAbiParameters
} from "./chunk-Q34TOGFK.js";
import "./chunk-P4VU4REC.js";
import "./chunk-TMEMN4EL.js";
import "./chunk-CJ7GOBZO.js";
import "./chunk-XN7MCJ4Y.js";
import "./chunk-P7ZDTV2E.js";
import "./chunk-SNQ54XRM.js";
import "./chunk-SEVZ5PBP.js";

// node_modules/thirdweb/dist/esm/extensions/modules/__generated__/IModularCore/read/getInstalledModules.js
var FN_SELECTOR = "0x3e429396";
var FN_INPUTS = [];
var FN_OUTPUTS = [
  {
    type: "tuple[]",
    components: [
      {
        type: "address",
        name: "implementation"
      },
      {
        type: "tuple",
        name: "config",
        components: [
          {
            type: "bool",
            name: "registerInstallationCallback"
          },
          {
            type: "bytes4[]",
            name: "requiredInterfaces"
          },
          {
            type: "bytes4[]",
            name: "supportedInterfaces"
          },
          {
            type: "tuple[]",
            name: "callbackFunctions",
            components: [
              {
                type: "bytes4",
                name: "selector"
              }
            ]
          },
          {
            type: "tuple[]",
            name: "fallbackFunctions",
            components: [
              {
                type: "bytes4",
                name: "selector"
              },
              {
                type: "uint256",
                name: "permissionBits"
              }
            ]
          }
        ]
      }
    ]
  }
];
function isGetInstalledModulesSupported(availableSelectors) {
  return detectMethod({
    availableSelectors,
    method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS]
  });
}
function decodeGetInstalledModulesResult(result) {
  return decodeAbiParameters(FN_OUTPUTS, result)[0];
}
async function getInstalledModules(options) {
  return readContract({
    contract: options.contract,
    method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    params: []
  });
}
export {
  FN_SELECTOR,
  decodeGetInstalledModulesResult,
  getInstalledModules,
  isGetInstalledModulesSupported
};
//# sourceMappingURL=getInstalledModules-NUW7C2DA.js.map
