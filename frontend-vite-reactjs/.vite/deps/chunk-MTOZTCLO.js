import {
  validateAccountAddress
} from "./chunk-RN2SPJ3L.js";
import {
  hexToBigInt,
  hexToNumber
} from "./chunk-7IMMTQIW.js";

// node_modules/thirdweb/dist/esm/wallets/wallet-connect/receiver/request-handlers/sign-transaction.js
async function handleSignTransactionRequest(options) {
  const { account, params: [transaction] } = options;
  if (!account.signTransaction) {
    throw new Error("The current account does not support signing transactions");
  }
  if (transaction.from !== void 0) {
    validateAccountAddress(account, transaction.from);
  }
  return account.signTransaction({
    gas: transaction.gas ? hexToBigInt(transaction.gas) : void 0,
    gasPrice: transaction.gasPrice ? hexToBigInt(transaction.gasPrice) : void 0,
    value: transaction.value ? hexToBigInt(transaction.value) : void 0,
    nonce: transaction.nonce ? hexToNumber(transaction.nonce) : void 0,
    to: transaction.to,
    data: transaction.data
  });
}

export {
  handleSignTransactionRequest
};
//# sourceMappingURL=chunk-MTOZTCLO.js.map
