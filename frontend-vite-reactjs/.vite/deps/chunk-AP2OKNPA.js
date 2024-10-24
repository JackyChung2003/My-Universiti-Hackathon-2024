import {
  injectedProvider
} from "./chunk-PWFRCBEK.js";
import {
  getValidPublicRPCUrl,
  normalizeChainId
} from "./chunk-IJRT7NGM.js";
import {
  parseTypedData
} from "./chunk-AZKQR3DT.js";
import {
  getAddress
} from "./chunk-V4W7FLQ7.js";
import {
  getTypesForEIP712Domain,
  serializeTypedData,
  validateTypedData
} from "./chunk-5WKP5JEZ.js";
import {
  numberToHex,
  stringToHex,
  uint8ArrayToHex
} from "./chunk-7IMMTQIW.js";
import {
  getCachedChain,
  getChainMetadata
} from "./chunk-AINJJ2SM.js";

// node_modules/thirdweb/dist/esm/wallets/injected/index.js
function getInjectedProvider(walletId) {
  const provider = injectedProvider(walletId);
  if (!provider) {
    throw new Error(`No injected provider found for wallet: "${walletId}"`);
  }
  return provider;
}
async function connectInjectedWallet(id, options, emitter) {
  const provider = getInjectedProvider(id);
  const addresses = await provider.request({
    method: "eth_requestAccounts"
  });
  const addr = addresses[0];
  if (!addr) {
    throw new Error("no accounts available");
  }
  const address = getAddress(addr);
  const chainId = await provider.request({ method: "eth_chainId" }).then(normalizeChainId);
  let connectedChain = options.chain && options.chain.id === chainId ? options.chain : getCachedChain(chainId);
  if (options.chain && options.chain.id !== chainId) {
    await switchChain(provider, options.chain);
    connectedChain = options.chain;
  }
  return onConnect(provider, address, connectedChain, emitter);
}
async function autoConnectInjectedWallet(id, emitter, chain) {
  const provider = getInjectedProvider(id);
  const addresses = await provider.request({
    method: "eth_accounts"
  });
  const addr = addresses[0];
  if (!addr) {
    throw new Error("no accounts available");
  }
  const address = getAddress(addr);
  const chainId = await provider.request({ method: "eth_chainId" }).then(normalizeChainId);
  const connectedChain = chain && chain.id === chainId ? chain : getCachedChain(chainId);
  return onConnect(provider, address, connectedChain, emitter);
}
function createAccount(provider, _address) {
  const account = {
    address: getAddress(_address),
    async sendTransaction(tx) {
      const transactionHash = await provider.request({
        method: "eth_sendTransaction",
        params: [
          {
            accessList: tx.accessList,
            value: tx.value ? numberToHex(tx.value) : void 0,
            gas: tx.gas ? numberToHex(tx.gas) : void 0,
            gasPrice: tx.gasPrice ? numberToHex(tx.gasPrice) : void 0,
            from: this.address,
            to: tx.to,
            data: tx.data
          }
        ]
      });
      return {
        transactionHash
      };
    },
    async signMessage({ message }) {
      if (!account.address) {
        throw new Error("Provider not setup");
      }
      const messageToSign = (() => {
        if (typeof message === "string") {
          return stringToHex(message);
        }
        if (message.raw instanceof Uint8Array) {
          return uint8ArrayToHex(message.raw);
        }
        return message.raw;
      })();
      return await provider.request({
        method: "personal_sign",
        params: [messageToSign, account.address]
      });
    },
    async signTypedData(typedData) {
      if (!provider || !account.address) {
        throw new Error("Provider not setup");
      }
      const parsedTypedData = parseTypedData(typedData);
      const { domain, message, primaryType } = parsedTypedData;
      const types = {
        EIP712Domain: getTypesForEIP712Domain({ domain }),
        ...parsedTypedData.types
      };
      validateTypedData({ domain, message, primaryType, types });
      const stringifiedData = serializeTypedData({
        domain: domain ?? {},
        message,
        primaryType,
        types
      });
      return await provider.request({
        method: "eth_signTypedData_v4",
        params: [account.address, stringifiedData]
      });
    },
    async watchAsset(asset) {
      const result = await provider.request({
        method: "wallet_watchAsset",
        params: asset
      }, { retryCount: 0 });
      return result;
    }
  };
  return account;
}
async function onConnect(provider, address, chain, emitter) {
  const account = createAccount(provider, address);
  async function disconnect() {
    provider.removeListener("accountsChanged", onAccountsChanged);
    provider.removeListener("chainChanged", onChainChanged);
    provider.removeListener("disconnect", onDisconnect);
  }
  async function onDisconnect() {
    disconnect();
    emitter.emit("disconnect", void 0);
  }
  function onAccountsChanged(accounts) {
    if (accounts[0]) {
      const newAccount = createAccount(provider, getAddress(accounts[0]));
      emitter.emit("accountChanged", newAccount);
      emitter.emit("accountsChanged", accounts);
    } else {
      onDisconnect();
    }
  }
  function onChainChanged(newChainId) {
    const newChain = getCachedChain(normalizeChainId(newChainId));
    emitter.emit("chainChanged", newChain);
  }
  if (provider.on) {
    provider.on("accountsChanged", onAccountsChanged);
    provider.on("chainChanged", onChainChanged);
    provider.on("disconnect", onDisconnect);
  }
  return [
    account,
    chain,
    onDisconnect,
    (newChain) => switchChain(provider, newChain)
  ];
}
async function switchChain(provider, chain) {
  var _a, _b, _c;
  const hexChainId = numberToHex(chain.id);
  try {
    await provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: hexChainId }]
    });
  } catch (e) {
    if ((e == null ? void 0 : e.code) === 4902 || ((_b = (_a = e == null ? void 0 : e.data) == null ? void 0 : _a.originalError) == null ? void 0 : _b.code) === 4902) {
      const apiChain = await getChainMetadata(chain);
      await provider.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: hexChainId,
            chainName: apiChain.name,
            nativeCurrency: apiChain.nativeCurrency,
            rpcUrls: getValidPublicRPCUrl(apiChain),
            // no client id on purpose here
            blockExplorerUrls: (_c = apiChain.explorers) == null ? void 0 : _c.map((x) => x.url)
          }
        ]
      });
    } else {
      throw e;
    }
  }
}

export {
  getInjectedProvider,
  connectInjectedWallet,
  autoConnectInjectedWallet
};
//# sourceMappingURL=chunk-AP2OKNPA.js.map
