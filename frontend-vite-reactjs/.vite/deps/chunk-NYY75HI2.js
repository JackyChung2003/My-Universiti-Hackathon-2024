import {
  sendTransaction
} from "./chunk-IZVKY5U3.js";
import {
  waitForReceipt
} from "./chunk-BGRWEG5J.js";

// node_modules/thirdweb/dist/esm/transaction/actions/send-and-confirm-transaction.js
async function sendAndConfirmTransaction(options) {
  const submittedTx = await sendTransaction(options);
  return waitForReceipt(submittedTx);
}

export {
  sendAndConfirmTransaction
};
//# sourceMappingURL=chunk-NYY75HI2.js.map
