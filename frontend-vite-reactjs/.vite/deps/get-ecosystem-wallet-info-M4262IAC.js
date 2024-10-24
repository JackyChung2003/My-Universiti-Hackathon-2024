import {
  getThirdwebBaseUrl
} from "./chunk-CJ7GOBZO.js";
import "./chunk-SEVZ5PBP.js";

// node_modules/thirdweb/dist/esm/wallets/ecosystem/get-ecosystem-wallet-info.js
async function getEcosystemWalletInfo(walletId) {
  const res = await fetch(`${getThirdwebBaseUrl("inAppWallet")}/api/2024-05-05/ecosystem-wallet`, {
    headers: {
      "x-ecosystem-id": walletId
    }
  });
  const data = await res.json();
  if (!data || data.code === "UNAUTHORIZED") {
    throw new Error(data.message || `Could not find ecosystem wallet with id ${walletId}, please check your ecosystem wallet configuration.`);
  }
  return {
    id: walletId,
    name: data.name,
    image_id: data.imageUrl,
    homepage: data.homepage,
    rdns: null,
    app: {
      browser: null,
      ios: null,
      android: null,
      mac: null,
      windows: null,
      linux: null,
      opera: null,
      chrome: null,
      firefox: null,
      safari: null,
      edge: null
    },
    mobile: {
      native: null,
      universal: null
    },
    desktop: {
      native: null,
      universal: null
    }
  };
}
export {
  getEcosystemWalletInfo
};
//# sourceMappingURL=get-ecosystem-wallet-info-M4262IAC.js.map
