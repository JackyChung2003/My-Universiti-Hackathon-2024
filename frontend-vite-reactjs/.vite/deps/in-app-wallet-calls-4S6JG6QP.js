import {
  randomBytesHex
} from "./chunk-5CUSF22A.js";
import {
  sendBatchTransaction
} from "./chunk-GABHXY75.js";
import {
  sendAndConfirmTransaction
} from "./chunk-NYY75HI2.js";
import "./chunk-IZVKY5U3.js";
import "./chunk-3DBHE3NE.js";
import "./chunk-JOTM2E7T.js";
import "./chunk-HT4EHALU.js";
import "./chunk-QC3K2OKT.js";
import {
  eth_getTransactionReceipt
} from "./chunk-BGRWEG5J.js";
import "./chunk-LMT6OD3N.js";
import "./chunk-H6EKSCJG.js";
import "./chunk-ZNEQLT5Q.js";
import "./chunk-UY2SRO54.js";
import "./chunk-4OCU6WGG.js";
import "./chunk-QWJX262R.js";
import "./chunk-5WKP5JEZ.js";
import {
  getRpcClient
} from "./chunk-JZJYIG2P.js";
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
import {
  LruMap
} from "./chunk-SNQ54XRM.js";
import "./chunk-SEVZ5PBP.js";

// node_modules/thirdweb/dist/esm/wallets/in-app/core/eip5972/in-app-wallet-calls.js
var bundlesToTransactions = new LruMap(1e3);
async function inAppWalletSendCalls(args) {
  const { account, calls } = args;
  const hashes = [];
  const bundleId = randomBytesHex(65);
  bundlesToTransactions.set(bundleId, hashes);
  if (account.sendBatchTransaction) {
    const receipt = await sendBatchTransaction({
      account,
      transactions: calls
    });
    hashes.push(receipt.transactionHash);
    bundlesToTransactions.set(bundleId, hashes);
  } else {
    for (const tx of calls) {
      const receipt = await sendAndConfirmTransaction({
        account,
        transaction: tx
      });
      hashes.push(receipt.transactionHash);
      bundlesToTransactions.set(bundleId, hashes);
    }
  }
  return bundleId;
}
async function inAppWalletGetCallsStatus(args) {
  const { wallet, client, bundleId } = args;
  const chain = wallet.getChain();
  if (!chain) {
    throw new Error("Failed to get calls status, no active chain found");
  }
  const bundle = bundlesToTransactions.get(bundleId);
  if (!bundle) {
    throw new Error("Failed to get calls status, unknown bundle id");
  }
  const request = getRpcClient({ client, chain });
  let status = "CONFIRMED";
  const receipts = await Promise.all(bundle.map((hash) => eth_getTransactionReceipt(request, { hash }).then((receipt) => ({
    logs: receipt.logs.map((l) => ({
      address: l.address,
      data: l.data,
      topics: l.topics
    })),
    status: receipt.status,
    blockHash: receipt.blockHash,
    blockNumber: receipt.blockNumber,
    gasUsed: receipt.gasUsed,
    transactionHash: receipt.transactionHash
  })).catch(() => {
    status = "PENDING";
    return null;
  })));
  return {
    status,
    receipts: receipts.filter((r) => r !== null)
    // ts 5.5 please come we need you
  };
}
export {
  inAppWalletGetCallsStatus,
  inAppWalletSendCalls
};
//# sourceMappingURL=in-app-wallet-calls-4S6JG6QP.js.map
