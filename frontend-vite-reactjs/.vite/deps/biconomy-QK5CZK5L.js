import {
  ZERO_ADDRESS
} from "./chunk-673YCYST.js";
import {
  getContract
} from "./chunk-7VZHRFCE.js";
import {
  readContract
} from "./chunk-YNNWR6WB.js";
import "./chunk-ADB2NQOP.js";
import "./chunk-UWOTGWKX.js";
import "./chunk-QWJX262R.js";
import "./chunk-V4W7FLQ7.js";
import {
  keccak256
} from "./chunk-DIMUSPZQ.js";
import "./chunk-5WKP5JEZ.js";
import "./chunk-R65PP5GT.js";
import "./chunk-JZJYIG2P.js";
import {
  stringify
} from "./chunk-NJUWOGZE.js";
import {
  isHex
} from "./chunk-7IMMTQIW.js";
import "./chunk-KHEWVYBH.js";
import "./chunk-AINJJ2SM.js";
import "./chunk-KWDKOS5H.js";
import "./chunk-OFS4JK5L.js";
import {
  encodeAbiParameters
} from "./chunk-Q34TOGFK.js";
import "./chunk-P4VU4REC.js";
import "./chunk-TMEMN4EL.js";
import "./chunk-CJ7GOBZO.js";
import "./chunk-XN7MCJ4Y.js";
import "./chunk-P7ZDTV2E.js";
import "./chunk-SNQ54XRM.js";
import "./chunk-SEVZ5PBP.js";

// node_modules/thirdweb/dist/esm/transaction/actions/gasless/providers/biconomy.js
var BATCH_ID = 0n;
async function prepareBiconomyTransaction({ account, serializableTransaction, transaction, gasless }) {
  const forwarderContract = getContract({
    address: gasless.relayerForwarderAddress,
    chain: transaction.chain,
    client: transaction.client
  });
  const nonce = await readContract({
    contract: forwarderContract,
    method: "function getNonce(address,uint256) view returns (uint256)",
    params: [account.address, BATCH_ID]
  });
  const deadline = Math.floor(Date.now() / 1e3) + (gasless.deadlineSeconds ?? 3600);
  const request = {
    from: account.address,
    to: serializableTransaction.to,
    token: ZERO_ADDRESS,
    txGas: serializableTransaction.gas,
    tokenGasPrice: 0n,
    batchId: BATCH_ID,
    batchNonce: nonce,
    deadline,
    data: serializableTransaction.data
  };
  if (!request.to) {
    throw new Error("Cannot send a transaction without a `to` address");
  }
  if (!request.txGas) {
    throw new Error("Cannot send a transaction without a `gas` value");
  }
  if (!request.data) {
    throw new Error("Cannot send a transaction without a `data` value");
  }
  const message = encodeAbiParameters([
    { type: "address" },
    { type: "address" },
    { type: "address" },
    { type: "uint256" },
    { type: "uint256" },
    { type: "uint256" },
    { type: "uint256" },
    { type: "bytes32" }
  ], [
    request.from,
    request.to,
    request.token,
    request.txGas,
    request.tokenGasPrice,
    request.batchId,
    request.batchNonce,
    keccak256(request.data)
  ]);
  const signature = await account.signMessage({ message });
  return [request, signature];
}
async function relayBiconomyTransaction(options) {
  var _a;
  const [request, signature] = await prepareBiconomyTransaction(options);
  const response = await fetch("https://api.biconomy.io/api/v2/meta-tx/native", {
    method: "POST",
    body: stringify({
      apiId: options.gasless.apiId,
      params: [request, signature],
      from: request.from,
      to: request.to,
      gasLimit: request.txGas
    }),
    headers: {
      "x-api-key": options.gasless.apiKey,
      "Content-Type": "application/json;charset=utf-8"
    }
  });
  if (!response.ok) {
    (_a = response.body) == null ? void 0 : _a.cancel();
    throw new Error(`Failed to send transaction: ${await response.text()}`);
  }
  const json = await response.json();
  const transactionHash = json.txHash;
  if (isHex(transactionHash)) {
    return {
      transactionHash,
      chain: options.transaction.chain,
      client: options.transaction.client
    };
  }
  throw new Error(`Failed to send transaction: ${stringify(json)}`);
}
export {
  prepareBiconomyTransaction,
  relayBiconomyTransaction
};
//# sourceMappingURL=biconomy-QK5CZK5L.js.map
