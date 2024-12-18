import {
  checksumAddress
} from "./chunk-V4W7FLQ7.js";

// node_modules/thirdweb/dist/esm/wallets/wallet-connect/receiver/utils.js
function validateAccountAddress(account, address) {
  if (checksumAddress(account.address) !== checksumAddress(address)) {
    throw new Error(`Failed to validate account address (${account.address}), differs from ${address}`);
  }
}
function parseEip155ChainId(chainId) {
  const chainIdParts = chainId.split(":");
  const chainIdAsNumber = Number.parseInt(chainIdParts[1] ?? "0");
  if (chainIdParts.length !== 2 || chainIdParts[0] !== "eip155" || chainIdAsNumber === 0 || !chainIdAsNumber) {
    throw new Error(`Invalid chainId ${chainId}, should have the format 'eip155:1'`);
  }
  return chainIdAsNumber;
}

export {
  validateAccountAddress,
  parseEip155ChainId
};
//# sourceMappingURL=chunk-RN2SPJ3L.js.map
