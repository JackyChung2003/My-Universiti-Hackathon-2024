import {
  validateAccountAddress
} from "./chunk-RN2SPJ3L.js";

// node_modules/thirdweb/dist/esm/wallets/wallet-connect/receiver/request-handlers/sign.js
async function handleSignRequest(options) {
  const { account, params } = options;
  validateAccountAddress(account, params[1]);
  return account.signMessage({ message: { raw: params[0] } });
}

export {
  handleSignRequest
};
//# sourceMappingURL=chunk-JHGC4UNU.js.map
