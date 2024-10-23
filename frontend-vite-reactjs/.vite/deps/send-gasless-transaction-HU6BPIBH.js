import {
  addTransactionToStore
} from "./chunk-3DBHE3NE.js";
import "./chunk-SEVZ5PBP.js";

// node_modules/thirdweb/dist/esm/transaction/actions/gasless/send-gasless-transaction.js
async function sendGaslessTransaction({ account, transaction, serializableTransaction, gasless }) {
  if (serializableTransaction.value && serializableTransaction.value > 0n) {
    throw new Error("Gasless transactions cannot have a value");
  }
  let result;
  if (gasless.provider === "biconomy") {
    const { relayBiconomyTransaction } = await import("./biconomy-QK5CZK5L.js");
    result = await relayBiconomyTransaction({
      account,
      transaction,
      serializableTransaction,
      gasless
    });
  }
  if (gasless.provider === "openzeppelin") {
    const { relayOpenZeppelinTransaction } = await import("./openzeppelin-WDUOMKPS.js");
    result = await relayOpenZeppelinTransaction({
      account,
      transaction,
      serializableTransaction,
      gasless
    });
  }
  if (gasless.provider === "engine") {
    const { relayEngineTransaction } = await import("./engine-HTUMBYZU.js");
    result = await relayEngineTransaction({
      account,
      transaction,
      serializableTransaction,
      gasless
    });
  }
  if (!result) {
    throw new Error("Unsupported gasless provider");
  }
  addTransactionToStore({
    address: account.address,
    transactionHash: result.transactionHash,
    chainId: transaction.chain.id
  });
  return result;
}
export {
  sendGaslessTransaction
};
//# sourceMappingURL=send-gasless-transaction-HU6BPIBH.js.map
