import {
  parseEip155ChainId
} from "./chunk-RN2SPJ3L.js";
import "./chunk-V4W7FLQ7.js";
import "./chunk-DIMUSPZQ.js";
import "./chunk-R65PP5GT.js";
import "./chunk-7IMMTQIW.js";
import "./chunk-KHEWVYBH.js";
import "./chunk-P4VU4REC.js";
import "./chunk-TMEMN4EL.js";
import "./chunk-SNQ54XRM.js";
import "./chunk-SEVZ5PBP.js";

// node_modules/thirdweb/dist/esm/wallets/wallet-connect/receiver/session-request.js
async function fulfillRequest(options) {
  const { wallet, walletConnectClient, thirdwebClient, event: { topic, id, params: { chainId: rawChainId, request } }, handlers } = options;
  const account = wallet.getAccount();
  if (!account) {
    throw new Error("No account connected to provided wallet");
  }
  let result;
  try {
    switch (request.method) {
      case "personal_sign": {
        if (handlers == null ? void 0 : handlers.personal_sign) {
          result = await handlers.personal_sign({
            account,
            params: request.params
          });
        } else {
          const { handleSignRequest } = await import("./sign-CV4GZUTQ.js");
          result = await handleSignRequest({
            account,
            params: request.params
          });
        }
        break;
      }
      case "eth_sign": {
        if (handlers == null ? void 0 : handlers.eth_sign) {
          result = await handlers.eth_sign({
            account,
            params: request.params
          });
        } else {
          const { handleSignRequest } = await import("./sign-CV4GZUTQ.js");
          result = await handleSignRequest({
            account,
            params: request.params
          });
        }
        break;
      }
      case "eth_signTypedData": {
        if (handlers == null ? void 0 : handlers.eth_signTypedData) {
          result = await handlers.eth_signTypedData({
            account,
            params: request.params
          });
        } else {
          const { handleSignTypedDataRequest } = await import("./sign-typed-data-PPCJRKO2.js");
          result = await handleSignTypedDataRequest({
            account,
            params: request.params
          });
        }
        break;
      }
      case "eth_signTypedData_v4": {
        if (handlers == null ? void 0 : handlers.eth_signTypedData_v4) {
          result = await handlers.eth_signTypedData_v4({
            account,
            params: request.params
          });
        } else {
          const { handleSignTypedDataRequest } = await import("./sign-typed-data-PPCJRKO2.js");
          result = await handleSignTypedDataRequest({
            account,
            params: request.params
          });
        }
        break;
      }
      case "eth_signTransaction": {
        if (handlers == null ? void 0 : handlers.eth_signTransaction) {
          result = await handlers.eth_signTransaction({
            account,
            params: request.params
          });
        } else {
          const { handleSignTransactionRequest } = await import("./sign-transaction-PEMRUUME.js");
          result = await handleSignTransactionRequest({
            account,
            params: request.params
          });
        }
        break;
      }
      case "eth_sendTransaction": {
        const chainId = parseEip155ChainId(rawChainId);
        if (handlers == null ? void 0 : handlers.eth_sendTransaction) {
          result = await handlers.eth_sendTransaction({
            account,
            chainId,
            params: request.params
          });
        } else {
          const { handleSendTransactionRequest } = await import("./send-transaction-INTZPVSX.js");
          result = await handleSendTransactionRequest({
            account,
            chainId,
            thirdwebClient,
            params: request.params
          });
        }
        break;
      }
      case "eth_sendRawTransaction": {
        const chainId = parseEip155ChainId(rawChainId);
        if (handlers == null ? void 0 : handlers.eth_sendRawTransaction) {
          result = await handlers.eth_sendRawTransaction({
            account,
            chainId,
            params: request.params
          });
        } else {
          const { handleSendRawTransactionRequest } = await import("./send-raw-transaction-57VWGLZ2.js");
          result = await handleSendRawTransactionRequest({
            account,
            chainId,
            params: request.params
          });
        }
        break;
      }
      case "wallet_addEthereumChain": {
        if (handlers == null ? void 0 : handlers.wallet_addEthereumChain) {
          result = await handlers.wallet_addEthereumChain({
            wallet,
            params: request.params
          });
        } else {
          throw new Error("Unsupported request method: wallet_addEthereumChain");
        }
        break;
      }
      case "wallet_switchEthereumChain": {
        if (handlers == null ? void 0 : handlers.wallet_switchEthereumChain) {
          result = await handlers.wallet_switchEthereumChain({
            wallet,
            params: request.params
          });
        } else {
          const { handleSwitchChain } = await import("./switch-chain-MECM5SCI.js");
          result = await handleSwitchChain({
            wallet,
            params: request.params
          });
        }
        break;
      }
      default: {
        const potentialHandler = handlers == null ? void 0 : handlers[request.method];
        if (potentialHandler) {
          result = await potentialHandler({
            account,
            chainId: parseEip155ChainId(rawChainId),
            params: request.params
          });
        } else {
          throw new Error(`Unsupported request method: ${request.method}`);
        }
      }
    }
  } catch (error) {
    result = {
      code: typeof error === "object" && error !== null && "code" in error ? error.code : 500,
      message: typeof error === "object" && error !== null && "message" in error ? error.message : "Unknown error"
    };
  }
  walletConnectClient.respond({
    topic,
    response: {
      id,
      jsonrpc: "2.0",
      result
    }
  });
}
export {
  fulfillRequest
};
//# sourceMappingURL=session-request-A2B4HMLI.js.map
