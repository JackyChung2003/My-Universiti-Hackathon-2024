import {
  waitForReceipt
} from "./chunk-BGRWEG5J.js";
import {
  getContract
} from "./chunk-7VZHRFCE.js";
import {
  readContract
} from "./chunk-YNNWR6WB.js";
import "./chunk-ADB2NQOP.js";
import "./chunk-UWOTGWKX.js";
import "./chunk-4OCU6WGG.js";
import "./chunk-QWJX262R.js";
import "./chunk-V4W7FLQ7.js";
import "./chunk-DIMUSPZQ.js";
import "./chunk-5WKP5JEZ.js";
import "./chunk-R65PP5GT.js";
import "./chunk-JZJYIG2P.js";
import {
  stringify
} from "./chunk-NJUWOGZE.js";
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

// node_modules/thirdweb/dist/esm/transaction/actions/gasless/providers/engine.js
async function prepareEngineTransaction({ account, serializableTransaction, transaction, gasless }) {
  const forrwaderContract = getContract({
    address: gasless.relayerForwarderAddress,
    chain: transaction.chain,
    client: transaction.client
  });
  const nonce = await readContract({
    contract: forrwaderContract,
    method: "function getNonce(address) view returns (uint256)",
    params: [account.address]
  });
  const [signature, message] = await (async () => {
    if (!serializableTransaction.to) {
      throw new Error("engine transactions must have a 'to' address");
    }
    if (!serializableTransaction.gas) {
      throw new Error("engine transactions must have a 'gas' value");
    }
    if (!serializableTransaction.data) {
      throw new Error("engine transactions must have a 'data' value");
    }
    if (gasless.experimentalChainlessSupport) {
      const message3 = {
        from: account.address,
        to: serializableTransaction.to,
        value: 0n,
        gas: serializableTransaction.gas,
        nonce,
        data: serializableTransaction.data,
        chainid: BigInt(transaction.chain.id)
      };
      return [
        await account.signTypedData({
          domain: {
            name: "GSNv2 Forwarder",
            version: "0.0.1",
            verifyingContract: forrwaderContract.address
          },
          message: message3,
          primaryType: "ForwardRequest",
          types: { ForwardRequest: ChainAwareForwardRequest }
        }),
        message3
      ];
    }
    const message2 = {
      from: account.address,
      to: serializableTransaction.to,
      value: 0n,
      gas: serializableTransaction.gas,
      nonce,
      data: serializableTransaction.data
    };
    return [
      await account.signTypedData({
        domain: {
          name: gasless.domainName ?? "GSNv2 Forwarder",
          version: gasless.domainVersion ?? "0.0.1",
          chainId: transaction.chain.id,
          verifyingContract: forrwaderContract.address
        },
        message: message2,
        primaryType: "ForwardRequest",
        types: { ForwardRequest }
      }),
      message2
    ];
  })();
  const messageType = "forward";
  return { message, signature, messageType };
}
var ForwardRequest = [
  { name: "from", type: "address" },
  { name: "to", type: "address" },
  { name: "value", type: "uint256" },
  { name: "gas", type: "uint256" },
  { name: "nonce", type: "uint256" },
  { name: "data", type: "bytes" }
];
var ChainAwareForwardRequest = [
  { name: "from", type: "address" },
  { name: "to", type: "address" },
  { name: "value", type: "uint256" },
  { name: "gas", type: "uint256" },
  { name: "nonce", type: "uint256" },
  { name: "data", type: "bytes" },
  { name: "chainid", type: "uint256" }
];
async function relayEngineTransaction(options) {
  const { message, messageType, signature } = await prepareEngineTransaction(options);
  const response = await fetch(options.gasless.relayerUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: stringify({
      request: message,
      type: messageType,
      signature,
      forwarderAddress: options.gasless.relayerForwarderAddress
    })
  });
  if (!response.ok) {
    throw new Error(`Failed to send transaction: ${await response.text()}`);
  }
  const json = await response.json();
  if (!json.result) {
    throw new Error(`Relay transaction failed: ${json.message}`);
  }
  const queueId = json.result.queueId;
  const timeout = 6e4;
  const interval = 1e3;
  const endtime = Date.now() + timeout;
  while (Date.now() < endtime) {
    const receipt = await fetchReceipt({ options, queueId });
    if (receipt) {
      return {
        transactionHash: receipt.transactionHash,
        chain: options.transaction.chain,
        client: options.transaction.client
      };
    }
    await new Promise((resolve) => setTimeout(resolve, interval));
  }
  throw new Error(`Failed to find relayed transaction after ${timeout}ms`);
}
async function fetchReceipt(args) {
  const { options, queueId } = args;
  const url = options.gasless.relayerUrl.split("/relayer/")[0];
  const res = await fetch(`${url}/transaction/status/${queueId}`, {
    method: "GET"
  });
  const resJson = await res.json();
  if (!res.ok) {
    return null;
  }
  const result = resJson.result;
  if (!result) {
    return null;
  }
  switch (result.status) {
    case "errored":
      throw new Error(`Transaction errored with reason: ${result.errorMessage}`);
    case "cancelled":
      throw new Error("Transaction execution cancelled.");
    case "mined": {
      const receipt = await waitForReceipt({
        client: options.transaction.client,
        chain: options.transaction.chain,
        transactionHash: result.transactionHash
      });
      return receipt;
    }
    default: {
      return null;
    }
  }
}
export {
  prepareEngineTransaction,
  relayEngineTransaction
};
//# sourceMappingURL=engine-HTUMBYZU.js.map
