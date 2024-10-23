import {
  getClientFetch
} from "./chunk-XN7MCJ4Y.js";

// node_modules/thirdweb/dist/esm/analytics/track.js
var ANALYTICS_ENDPOINT = "https://c.thirdweb.com/event";
function trackConnect(args) {
  const { client, walletType, walletAddress } = args;
  track(client, {
    source: "connectWallet",
    action: "connect",
    walletType,
    walletAddress
  });
}
function trackPayEvent(args) {
  track(args.client, {
    source: "pay",
    action: args.event,
    clientId: args.client.clientId,
    chainId: args.chainId,
    walletAddress: args.walletAddress,
    walletType: args.walletType,
    tokenAddress: args.fromToken,
    amountWei: args.fromAmount,
    dstTokenAddress: args.toToken,
    dstChainId: args.chainId
  });
}
function track(client, data) {
  const fetch = getClientFetch(client);
  fetch(ANALYTICS_ENDPOINT, {
    method: "POST",
    body: JSON.stringify(data, (_key, value) => {
      if (typeof value === "bigint") {
        return value.toString();
      }
      return value;
    })
  });
}

// node_modules/thirdweb/dist/esm/utils/tiny-emitter.js
function createEmitter() {
  const subsribers = /* @__PURE__ */ new Map();
  return {
    subscribe(event, cb) {
      var _a;
      if (!subsribers.has(event)) {
        subsribers.set(event, /* @__PURE__ */ new Set([cb]));
      } else {
        (_a = subsribers.get(event)) == null ? void 0 : _a.add(cb);
      }
      return () => {
        const subscribers = subsribers.get(event);
        if (subscribers) {
          subscribers.delete(cb);
        }
      };
    },
    emit(event, data) {
      const subscribers = subsribers.get(event);
      if (subscribers) {
        for (const cb of subscribers) {
          cb(data);
        }
      }
    }
  };
}

// node_modules/thirdweb/dist/esm/wallets/wallet-emitter.js
function createWalletEmitter() {
  return createEmitter();
}

export {
  trackConnect,
  trackPayEvent,
  createWalletEmitter
};
//# sourceMappingURL=chunk-ILZATN6A.js.map
