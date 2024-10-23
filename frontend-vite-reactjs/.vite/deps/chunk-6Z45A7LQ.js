import {
  createWalletEmitter,
  trackConnect
} from "./chunk-ILZATN6A.js";
import {
  getCachedChainIfExists
} from "./chunk-AINJJ2SM.js";

// node_modules/thirdweb/dist/esm/wallets/in-app/core/wallet/in-app-core.js
var connectorCache = /* @__PURE__ */ new Map();
async function getOrCreateInAppWalletConnector(client, connectorFactory, ecosystem) {
  const key = JSON.stringify({ clientId: client.clientId, ecosystem });
  if (connectorCache.has(key)) {
    return connectorCache.get(key);
  }
  const connector = await connectorFactory(client);
  connectorCache.set(key, connector);
  return connector;
}
function createInAppWallet(args) {
  const { createOptions, connectorFactory, ecosystem } = args;
  const walletId = ecosystem ? ecosystem.id : "inApp";
  const emitter = createWalletEmitter();
  let account = void 0;
  let chain = void 0;
  let client;
  return {
    id: walletId,
    subscribe: emitter.subscribe,
    getChain() {
      if (!chain) {
        return void 0;
      }
      chain = getCachedChainIfExists(chain.id) || chain;
      return chain;
    },
    getConfig: () => createOptions,
    getAccount: () => account,
    autoConnect: async (options) => {
      const { autoConnectInAppWallet } = await import("./wallet-LZ67I5PI.js");
      const connector = await getOrCreateInAppWalletConnector(options.client, connectorFactory, ecosystem);
      const [connectedAccount, connectedChain] = await autoConnectInAppWallet(options, createOptions, connector);
      client = options.client;
      account = connectedAccount;
      chain = connectedChain;
      trackConnect({
        client: options.client,
        walletType: walletId,
        walletAddress: account.address
      });
      return account;
    },
    connect: async (options) => {
      const { connectInAppWallet } = await import("./wallet-LZ67I5PI.js");
      const connector = await getOrCreateInAppWalletConnector(options.client, connectorFactory, ecosystem);
      const [connectedAccount, connectedChain] = await connectInAppWallet(options, createOptions, connector);
      client = options.client;
      account = connectedAccount;
      chain = connectedChain;
      trackConnect({
        client: options.client,
        walletType: walletId,
        walletAddress: account.address
      });
      return account;
    },
    disconnect: async () => {
      if (client) {
        const connector = await getOrCreateInAppWalletConnector(client, connectorFactory, ecosystem);
        const result = await connector.logout();
        if (!result.success) {
          throw new Error("Failed to logout");
        }
      }
      account = void 0;
      chain = void 0;
      emitter.emit("disconnect", void 0);
    },
    switchChain: async (newChain) => {
      if ((createOptions == null ? void 0 : createOptions.smartAccount) && client && account) {
        const { autoConnectInAppWallet } = await import("./wallet-LZ67I5PI.js");
        const connector = await getOrCreateInAppWalletConnector(client, connectorFactory, ecosystem);
        const [connectedAccount, connectedChain] = await autoConnectInAppWallet({
          chain: newChain,
          client
        }, createOptions, connector);
        account = connectedAccount;
        chain = connectedChain;
      } else {
        chain = newChain;
      }
      emitter.emit("chainChanged", newChain);
    }
  };
}

export {
  getOrCreateInAppWalletConnector,
  createInAppWallet
};
//# sourceMappingURL=chunk-6Z45A7LQ.js.map
