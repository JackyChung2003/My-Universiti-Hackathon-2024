import {
  fetchTokenMetadata
} from "./chunk-23SHLTL7.js";
import {
  parseNFT
} from "./chunk-C67AATRF.js";
import {
  detectMethod
} from "./chunk-QSRHVW23.js";
import {
  readContract
} from "./chunk-YNNWR6WB.js";

// node_modules/thirdweb/dist/esm/extensions/erc721/__generated__/IERC721A/read/tokenURI.js
var FN_SELECTOR = "0xc87b56dd";
var FN_INPUTS = [
  {
    type: "uint256",
    name: "_tokenId"
  }
];
var FN_OUTPUTS = [
  {
    type: "string"
  }
];
function isTokenURISupported(availableSelectors) {
  return detectMethod({
    availableSelectors,
    method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS]
  });
}
async function tokenURI(options) {
  return readContract({
    contract: options.contract,
    method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    params: [options.tokenId]
  });
}

// node_modules/thirdweb/dist/esm/extensions/erc721/read/getNFT.js
async function getNFT(options) {
  const [uri, owner] = await Promise.all([
    tokenURI(options).catch(() => null),
    options.includeOwner ? import("./ownerOf-C76SMQ2Z.js").then((m) => m.ownerOf(options)).catch(() => null) : null
  ]);
  if (!uri) {
    return parseNFT({
      id: options.tokenId,
      type: "ERC721",
      uri: ""
    }, {
      tokenId: options.tokenId,
      tokenUri: "",
      type: "ERC721",
      owner
    });
  }
  return parseNFT(await fetchTokenMetadata({
    client: options.contract.client,
    tokenId: options.tokenId,
    tokenUri: uri
  }).catch(() => ({
    id: options.tokenId,
    type: "ERC721",
    uri
  })), {
    tokenId: options.tokenId,
    tokenUri: uri,
    type: "ERC721",
    owner
  });
}

export {
  isTokenURISupported,
  getNFT
};
//# sourceMappingURL=chunk-Y2OH5VFN.js.map
