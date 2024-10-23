import {
  allowance
} from "./chunk-CWCXFEOU.js";
import {
  approve
} from "./chunk-Q3XHS3C5.js";
import "./chunk-D22BNLI7.js";
import {
  resolvePromisedValue
} from "./chunk-QC3K2OKT.js";
import {
  getContract
} from "./chunk-7VZHRFCE.js";
import "./chunk-CNLOA7AS.js";
import "./chunk-QSRHVW23.js";
import "./chunk-YNNWR6WB.js";
import "./chunk-ADB2NQOP.js";
import "./chunk-UWOTGWKX.js";
import "./chunk-QWJX262R.js";
import {
  getAddress
} from "./chunk-V4W7FLQ7.js";
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
import "./chunk-Q34TOGFK.js";
import "./chunk-P4VU4REC.js";
import "./chunk-TMEMN4EL.js";
import "./chunk-CJ7GOBZO.js";
import "./chunk-XN7MCJ4Y.js";
import "./chunk-P7ZDTV2E.js";
import "./chunk-SNQ54XRM.js";
import "./chunk-SEVZ5PBP.js";

// node_modules/thirdweb/dist/esm/extensions/erc20/write/getApprovalForTransaction.js
async function getApprovalForTransaction(options) {
  const { transaction, account } = options;
  if (!account) {
    return null;
  }
  const erc20Value = await resolvePromisedValue(transaction.erc20Value);
  if (erc20Value) {
    const target = await resolvePromisedValue(transaction.to);
    if (!target || !erc20Value.tokenAddress || getAddress(target) === getAddress(erc20Value.tokenAddress)) {
      return null;
    }
    const contract = getContract({
      address: erc20Value.tokenAddress,
      chain: transaction.chain,
      client: transaction.client
    });
    const approvedValue = await allowance({
      contract,
      owner: account.address,
      spender: target
    });
    if (approvedValue > erc20Value.amountWei) {
      return null;
    }
    return approve({
      contract,
      value: erc20Value.amountWei,
      spender: target
    });
  }
  return null;
}
export {
  getApprovalForTransaction
};
//# sourceMappingURL=getApprovalForTransaction-34Y6LQXT.js.map
