import {
  validateAccountAddress
} from "./chunk-RN2SPJ3L.js";
import {
  sendTransaction
} from "./chunk-IZVKY5U3.js";
import {
  prepareTransaction
} from "./chunk-CNLOA7AS.js";
import {
  hexToBigInt
} from "./chunk-7IMMTQIW.js";
import {
  getCachedChain
} from "./chunk-AINJJ2SM.js";

// node_modules/thirdweb/dist/esm/wallets/wallet-connect/receiver/request-handlers/send-transaction.js
async function handleSendTransactionRequest(options) {
  const { account, chainId, thirdwebClient, params: [transaction] } = options;
  if (transaction.from !== void 0) {
    validateAccountAddress(account, transaction.from);
  }
  const preparedTransaction = prepareTransaction({
    gas: transaction.gas ? hexToBigInt(transaction.gas) : void 0,
    gasPrice: transaction.gasPrice ? hexToBigInt(transaction.gasPrice) : void 0,
    value: transaction.value ? hexToBigInt(transaction.value) : void 0,
    to: transaction.to,
    data: transaction.data,
    chain: getCachedChain(chainId),
    client: thirdwebClient
  });
  const txResult = await sendTransaction({
    transaction: preparedTransaction,
    account
  });
  return txResult.transactionHash;
}

export {
  handleSendTransactionRequest
};
//# sourceMappingURL=chunk-SHQGXSMG.js.map
