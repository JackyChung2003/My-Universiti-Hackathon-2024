import {
  getContractMetadata
} from "./chunk-PVGPDZGS.js";
import {
  ZERO_ADDRESS,
  isNativeTokenAddress
} from "./chunk-673YCYST.js";
import {
  maxUint256,
  padHex
} from "./chunk-Q34TOGFK.js";

// node_modules/thirdweb/dist/esm/utils/extensions/drops/get-claim-params.js
async function getClaimParams(options) {
  const cc = await (async () => {
    if (options.type === "erc1155") {
      const { getActiveClaimCondition: getActiveClaimCondition2 } = await import("./getActiveClaimCondition-YRDG4SYQ.js");
      return await getActiveClaimCondition2({
        contract: options.contract,
        tokenId: options.tokenId
      });
    }
    if (options.type === "erc721") {
      const { getActiveClaimCondition: getActiveClaimCondition2 } = await import("./getActiveClaimCondition-2RU5ZACD.js");
      return await getActiveClaimCondition2({
        contract: options.contract
      });
    }
    const { getActiveClaimCondition } = await import("./getActiveClaimCondition-WMO5WW3G.js");
    return await getActiveClaimCondition({
      contract: options.contract
    });
  })();
  const tokenDecimals = options.type === "erc20" ? options.tokenDecimals : 0;
  const allowlistProof = await (async () => {
    if (!cc.merkleRoot || cc.merkleRoot === padHex("0x", { size: 32 })) {
      return {
        currency: ZERO_ADDRESS,
        proof: [],
        quantityLimitPerWallet: 0n,
        pricePerToken: maxUint256
      };
    }
    const { fetchProofsForClaimer } = await import("./fetch-proofs-for-claimers-XP3CSKAQ.js");
    const metadata = await getContractMetadata({
      contract: options.contract
    });
    const merkleData = metadata.merkle || {};
    const snapshotUri = merkleData[cc.merkleRoot];
    if (!snapshotUri) {
      return {
        currency: ZERO_ADDRESS,
        proof: [],
        quantityLimitPerWallet: 0n,
        pricePerToken: maxUint256
      };
    }
    const allowListProof = await fetchProofsForClaimer({
      contract: options.contract,
      claimer: options.from || options.to,
      // receiver and claimer can be different, always prioritize the claimer for allowlists
      merkleTreeUri: snapshotUri,
      tokenDecimals
    });
    if (!allowListProof) {
      return {
        currency: ZERO_ADDRESS,
        proof: [],
        quantityLimitPerWallet: 0n,
        pricePerToken: maxUint256
      };
    }
    return allowListProof;
  })();
  const currency = allowlistProof.currency && allowlistProof.currency !== ZERO_ADDRESS ? allowlistProof.currency : cc.currency;
  const pricePerToken = allowlistProof.pricePerToken !== void 0 && allowlistProof.pricePerToken !== maxUint256 ? allowlistProof.pricePerToken : cc.pricePerToken;
  const totalPrice = pricePerToken * options.quantity / BigInt(10 ** tokenDecimals);
  const value = isNativeTokenAddress(currency) ? totalPrice : 0n;
  const erc20Value = !isNativeTokenAddress(currency) && pricePerToken > 0n ? {
    amountWei: totalPrice,
    tokenAddress: currency
  } : void 0;
  return {
    receiver: options.to,
    tokenId: options.type === "erc1155" ? options.tokenId : void 0,
    quantity: options.quantity,
    currency,
    pricePerToken,
    allowlistProof,
    data: "0x",
    overrides: {
      value,
      erc20Value
    }
  };
}

export {
  getClaimParams
};
//# sourceMappingURL=chunk-W6QPXLLL.js.map
