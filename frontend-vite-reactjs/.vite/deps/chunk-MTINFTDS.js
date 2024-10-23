import {
  hexToNumber
} from "./chunk-7IMMTQIW.js";
import {
  defineChain
} from "./chunk-AINJJ2SM.js";

// node_modules/thirdweb/dist/esm/wallets/wallet-connect/receiver/request-handlers/switch-chain.js
async function handleSwitchChain(options) {
  var _a;
  const { wallet, params } = options;
  if (((_a = wallet.getChain()) == null ? void 0 : _a.id) === hexToNumber(params[0].chainId)) {
    return "0x1";
  }
  await wallet.switchChain(defineChain(hexToNumber(params[0].chainId)));
  return "0x1";
}

export {
  handleSwitchChain
};
//# sourceMappingURL=chunk-MTINFTDS.js.map
