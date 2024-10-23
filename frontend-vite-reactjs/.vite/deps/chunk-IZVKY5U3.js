import {
  addTransactionToStore
} from "./chunk-3DBHE3NE.js";
import {
  toSerializableTransaction
} from "./chunk-JOTM2E7T.js";

// node_modules/thirdweb/dist/esm/transaction/actions/send-transaction.js
async function sendTransaction(options) {
  const { account, transaction, gasless } = options;
  if (account.onTransactionRequested) {
    await account.onTransactionRequested(transaction);
  }
  if (options.transaction.eip712) {
    const { sendEip712Transaction } = await import("./send-eip712-transaction-UF37O5AQ.js");
    return sendEip712Transaction({
      account,
      transaction
    });
  }
  const serializableTransaction = await toSerializableTransaction({
    transaction,
    from: account.address
  });
  if (gasless) {
    const { sendGaslessTransaction } = await import("./send-gasless-transaction-HU6BPIBH.js");
    return sendGaslessTransaction({
      account,
      transaction,
      serializableTransaction,
      gasless
    });
  }
  const result = await account.sendTransaction(serializableTransaction);
  addTransactionToStore({
    address: account.address,
    transactionHash: result.transactionHash,
    chainId: transaction.chain.id
  });
  return { ...result, chain: transaction.chain, client: transaction.client };
}

export {
  sendTransaction
};
//# sourceMappingURL=chunk-IZVKY5U3.js.map
