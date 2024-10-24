import {
  validateAccountAddress
} from "./chunk-RN2SPJ3L.js";

// node_modules/thirdweb/dist/esm/wallets/wallet-connect/receiver/request-handlers/sign-typed-data.js
async function handleSignTypedDataRequest(options) {
  const { account, params } = options;
  validateAccountAddress(account, params[0]);
  return account.signTypedData(
    // The data could be sent to us as a string or object, depending on the level of parsing on the client side
    typeof params[1] === "string" ? JSON.parse(params[1]) : params[1]
  );
}

export {
  handleSignTypedDataRequest
};
//# sourceMappingURL=chunk-6ZWFQRFC.js.map
