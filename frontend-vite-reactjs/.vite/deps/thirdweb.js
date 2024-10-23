import {
  eth_estimateGas
} from "./chunk-PWDZXMC2.js";
import {
  isValidSignature
} from "./chunk-D6J6I653.js";
import {
  eth_getStorageAt
} from "./chunk-HL2TAEA2.js";
import {
  eth_getTransactionCount
} from "./chunk-JHXKG54L.js";
import {
  eth_getLogs,
  getBuyWithCryptoHistory,
  getContractEvents,
  isBaseTransactionOptions,
  simulateTransaction,
  watchContractEvents
} from "./chunk-BX3VLPP7.js";
import {
  sendBatchTransaction
} from "./chunk-GABHXY75.js";
import {
  estimateGasCost,
  getBuyWithCryptoQuote,
  getBuyWithCryptoStatus,
  getBuyWithCryptoTransfer
} from "./chunk-SRL7C4C4.js";
import {
  sendAndConfirmTransaction
} from "./chunk-NYY75HI2.js";
import {
  eth_getBalance
} from "./chunk-GDIXMSW3.js";
import {
  sendTransaction
} from "./chunk-IZVKY5U3.js";
import "./chunk-3DBHE3NE.js";
import {
  parseEventLogs,
  prepareEvent
} from "./chunk-WMLM7PHC.js";
import "./chunk-BAPFF6UD.js";
import "./chunk-Q3XHS3C5.js";
import {
  prepareContractCall
} from "./chunk-D22BNLI7.js";
import {
  estimateGas,
  eth_gasPrice,
  eth_maxPriorityFeePerGas,
  getGasPrice,
  resolveContractAbi,
  toSerializableTransaction
} from "./chunk-JOTM2E7T.js";
import {
  eth_getBlockByNumber
} from "./chunk-HT4EHALU.js";
import "./chunk-QC3K2OKT.js";
import {
  NATIVE_TOKEN_ADDRESS,
  ZERO_ADDRESS
} from "./chunk-673YCYST.js";
import {
  eth_blockNumber,
  eth_getTransactionReceipt,
  waitForReceipt,
  watchBlockNumber
} from "./chunk-BGRWEG5J.js";
import {
  encode
} from "./chunk-LMT6OD3N.js";
import "./chunk-3ZOYRTTJ.js";
import "./chunk-H6EKSCJG.js";
import "./chunk-ZNEQLT5Q.js";
import {
  getContract
} from "./chunk-7VZHRFCE.js";
import {
  eth_getCode
} from "./chunk-NPXNISXJ.js";
import {
  fromGwei,
  toEther,
  toTokens,
  toUnits,
  toWei
} from "./chunk-UY2SRO54.js";
import {
  prepareTransaction
} from "./chunk-CNLOA7AS.js";
import "./chunk-QSRHVW23.js";
import {
  eth_call,
  readContract
} from "./chunk-YNNWR6WB.js";
import "./chunk-ADB2NQOP.js";
import {
  encodeAbiParameters
} from "./chunk-UWOTGWKX.js";
import {
  concatHex
} from "./chunk-HMKIZ6SN.js";
import {
  eth_sendRawTransaction
} from "./chunk-MWAIX6LF.js";
import "./chunk-4OCU6WGG.js";
import {
  serializeSignature
} from "./chunk-QWJX262R.js";
import {
  getAddress,
  isAddress
} from "./chunk-V4W7FLQ7.js";
import {
  keccak256
} from "./chunk-DIMUSPZQ.js";
import {
  formatBlock,
  formatTransaction,
  hashTypedData,
  serializeTransaction
} from "./chunk-5WKP5JEZ.js";
import {
  boolToBytes,
  hexToBytes,
  numberToBytes,
  stringToBytes,
  toBytes
} from "./chunk-R65PP5GT.js";
import {
  getRpcClient
} from "./chunk-JZJYIG2P.js";
import "./chunk-NJUWOGZE.js";
import {
  assertSize,
  boolToHex,
  fromHex,
  hexToBigInt,
  hexToBool,
  hexToNumber,
  hexToString,
  hexToUint8Array,
  isHex,
  numberToHex,
  padHex,
  stringToHex,
  toHex,
  uint8ArrayToHex
} from "./chunk-7IMMTQIW.js";
import "./chunk-KHEWVYBH.js";
import {
  defineChain
} from "./chunk-AINJJ2SM.js";
import {
  equalBytes,
  secp256k1
} from "./chunk-KWDKOS5H.js";
import {
  sha256
} from "./chunk-OFS4JK5L.js";
import {
  encodeDeployData,
  parseAbiItem,
  sliceHex,
  universalSignatureValidatorAbi,
  universalSignatureValidatorByteCode
} from "./chunk-Q34TOGFK.js";
import "./chunk-P4VU4REC.js";
import "./chunk-TMEMN4EL.js";
import {
  getThirdwebBaseUrl
} from "./chunk-CJ7GOBZO.js";
import {
  getClientFetch,
  isJWT
} from "./chunk-XN7MCJ4Y.js";
import "./chunk-P7ZDTV2E.js";
import {
  LruMap
} from "./chunk-SNQ54XRM.js";
import "./chunk-SEVZ5PBP.js";

// node_modules/thirdweb/dist/esm/utils/hashing/sha256.js
function sha2562(value, to) {
  const bytes = sha256(isHex(value, { strict: false }) ? hexToUint8Array(value) : value);
  if (to === "bytes") {
    return bytes;
  }
  return uint8ArrayToHex(bytes);
}

// node_modules/thirdweb/dist/esm/utils/client-id.js
var cache = new LruMap(4096);
function computeClientIdFromSecretKey(secretKey) {
  if (cache.has(secretKey)) {
    return cache.get(secretKey);
  }
  const cId = sha2562(stringToBytes(secretKey)).slice(2, 34);
  cache.set(secretKey, cId);
  return cId;
}

// node_modules/thirdweb/dist/esm/client/client.js
function createThirdwebClient(options) {
  const { clientId, secretKey, ...rest } = options;
  let realClientId = clientId;
  if (secretKey) {
    if (isJWT(secretKey)) {
      if (!clientId) {
        throw new Error("clientId must be provided when using a JWT secretKey");
      }
    } else {
      realClientId = computeClientIdFromSecretKey(secretKey);
    }
  }
  if (!realClientId) {
    throw new Error("clientId or secretKey must be provided");
  }
  return {
    ...rest,
    clientId: realClientId,
    secretKey
  };
}

// node_modules/thirdweb/dist/esm/rpc/actions/eth_getBlockByHash.js
async function eth_getBlockByHash(request, params) {
  const includeTransactions = params.includeTransactions ?? false;
  const block = await request({
    method: "eth_getBlockByHash",
    params: [params.blockHash, includeTransactions]
  });
  if (!block) {
    throw new Error("Block not found");
  }
  return formatBlock(block);
}

// node_modules/thirdweb/dist/esm/rpc/actions/eth_getTransactionByHash.js
async function eth_getTransactionByHash(request, params) {
  const receipt = await request({
    method: "eth_getTransactionByHash",
    params: [params.hash]
  });
  if (!receipt) {
    throw new Error("Transaction not found.");
  }
  return formatTransaction(receipt);
}

// node_modules/thirdweb/dist/esm/wallets/in-app/core/users/getUser.js
async function getUser({ client, walletAddress, email, phone, id, externalWalletAddress, ecosystem }) {
  if (!client.secretKey) {
    throw new Error("A secret key is required to query for users. If you're making this request from the server, please add a secret key to your client.");
  }
  const url = new URL(`${getThirdwebBaseUrl("inAppWallet")}/api/2023-11-30/embedded-wallet/user-details`);
  if (walletAddress) {
    url.searchParams.set("queryBy", "walletAddress");
    url.searchParams.set("walletAddress", walletAddress);
  } else if (email) {
    url.searchParams.set("queryBy", "email");
    url.searchParams.set("email", email);
  } else if (phone) {
    url.searchParams.set("queryBy", "phone");
    url.searchParams.set("phone", phone);
  } else if (id) {
    url.searchParams.set("queryBy", "id");
    url.searchParams.set("id", id);
  } else if (externalWalletAddress) {
    url.searchParams.set("queryBy", "externalWalletAddress");
    url.searchParams.set("externalWalletAddress", externalWalletAddress);
  } else {
    throw new Error("Please provide a walletAddress, email, phone, id, or externalWalletAddress to query for users.");
  }
  const clientFetch = getClientFetch(client, ecosystem);
  const res = await clientFetch(url.toString());
  if (!res.ok) {
    throw new Error("Failed to get profiles");
  }
  const data = await res.json();
  return data.map((item) => ({
    userId: item.userId,
    walletAddress: item.walletAddress,
    email: item.email,
    phone: item.phone,
    createdAt: item.createdAt,
    profiles: item.linkedAccounts
  }))[0] || null;
}

// node_modules/thirdweb/dist/esm/transaction/resolve-method.js
function resolveMethod(method) {
  return async (contract) => {
    var _a;
    if (typeof method === "string" && method.startsWith("function ")) {
      return parseAbiItem(method);
    }
    const resolvedAbi = ((_a = contract.abi) == null ? void 0 : _a.length) ? contract.abi : await resolveContractAbi(contract);
    const abiFunction = resolvedAbi.find((item) => {
      if (item.type !== "function") {
        return false;
      }
      return item.name === method;
    });
    if (!abiFunction) {
      throw new Error(`could not find function with name "${method}" in abi`);
    }
    return abiFunction;
  };
}

// node_modules/thirdweb/dist/esm/utils/signatures/sign.js
function sign({ hash, privateKey }) {
  const { r, s, recovery } = secp256k1.sign(hash.slice(2), privateKey.slice(2));
  return {
    r: toHex(r, { size: 32 }),
    s: toHex(s, { size: 32 }),
    v: recovery ? 28n : 27n,
    yParity: recovery
  };
}

// node_modules/thirdweb/dist/esm/transaction/serialize-transaction.js
function serializeTransaction2(options) {
  const { transaction } = options;
  const signature = (() => {
    if (options.signature)
      return options.signature;
    if (transaction.v === void 0 && transaction.yParity === void 0) {
      return void 0;
    }
    if (transaction.r === void 0 || transaction.s === void 0) {
      throw new Error("Invalid signature provided with transaction");
    }
    return {
      v: transaction.v,
      r: transaction.r,
      s: transaction.s,
      yParity: transaction.yParity
    };
  })();
  return serializeTransaction(transaction, signature);
}

// node_modules/thirdweb/dist/esm/transaction/actions/sign-transaction.js
function signTransaction({ transaction, privateKey }) {
  if (transaction.type === "eip4844") {
    transaction = { ...transaction, sidecars: false };
  }
  const serializedTransaction = serializeTransaction2({ transaction });
  const signature = sign({
    hash: keccak256(serializedTransaction),
    privateKey
  });
  return serializeTransaction2({
    transaction: { ...transaction, ...signature }
  });
}

// node_modules/thirdweb/dist/esm/utils/encoding/helpers/trim.js
function trim(hexOrBytes, { dir = "left" } = {}) {
  let data = typeof hexOrBytes === "string" ? hexOrBytes.replace("0x", "") : hexOrBytes;
  let sliceLength = 0;
  for (let i = 0; i < data.length - 1; i++) {
    if (data[dir === "left" ? i : data.length - i - 1].toString() === "0") {
      sliceLength++;
    } else {
      break;
    }
  }
  data = dir === "left" ? data.slice(sliceLength) : data.slice(0, data.length - sliceLength);
  if (typeof hexOrBytes === "string") {
    if (data.length === 1 && dir === "right") {
      data = `${data}0`;
    }
    return `0x${data.length % 2 === 1 ? `0${data}` : data}`;
  }
  return data;
}

// node_modules/thirdweb/dist/esm/utils/encoding/from-bytes.js
function fromBytes(bytes, toOrOpts) {
  const opts = typeof toOrOpts === "string" ? { to: toOrOpts } : toOrOpts;
  switch (opts.to) {
    case "number":
      return bytesToNumber(bytes, opts);
    case "bigint":
      return bytesToBigInt(bytes, opts);
    case "boolean":
      return bytesToBool(bytes, opts);
    case "string":
      return bytesToString(bytes, opts);
    default:
      return uint8ArrayToHex(bytes, opts);
  }
}
function bytesToBigInt(bytes, opts = {}) {
  if (typeof opts.size !== "undefined") {
    assertSize(bytes, { size: opts.size });
  }
  const hex = uint8ArrayToHex(bytes, opts);
  return hexToBigInt(hex, opts);
}
function bytesToBool(bytes_, opts = {}) {
  let bytes = bytes_;
  if (typeof opts.size !== "undefined") {
    assertSize(bytes, { size: opts.size });
    bytes = trim(bytes);
  }
  if (bytes.length > 1 || bytes[0] && bytes[0] > 1) {
    throw new Error(`Invalid boolean representation: ${bytes}`);
  }
  return Boolean(bytes[0]);
}
function bytesToNumber(bytes, opts = {}) {
  if (typeof opts.size !== "undefined") {
    assertSize(bytes, { size: opts.size });
  }
  const hex = uint8ArrayToHex(bytes, opts);
  return hexToNumber(hex, opts);
}
function bytesToString(bytes_, opts = {}) {
  let bytes = bytes_;
  if (typeof opts.size !== "undefined") {
    assertSize(bytes, { size: opts.size });
    bytes = trim(bytes, { dir: "right" });
  }
  return new TextDecoder().decode(bytes);
}

// node_modules/thirdweb/dist/esm/auth/constants.js
var ERC_6492_MAGIC_VALUE = "0x6492649264926492649264926492649264926492649264926492649264926492";

// node_modules/thirdweb/dist/esm/auth/is-erc6492-signature.js
function isErc6492Signature(signature) {
  return sliceHex(signature, -32) === ERC_6492_MAGIC_VALUE;
}

// node_modules/thirdweb/dist/esm/auth/serialize-erc6492-signature.js
function serializeErc6492Signature({ address, data, signature }) {
  return concatHex([
    encodeAbiParameters([{ type: "address" }, { type: "bytes" }, { type: "bytes" }], [address, data, signature]),
    ERC_6492_MAGIC_VALUE
  ]);
}

// node_modules/thirdweb/dist/esm/auth/verify-hash.js
async function verifyHash({ hash, signature, address, client, chain, accountFactory }) {
  const signatureHex = (() => {
    if (isHex(signature))
      return signature;
    if (typeof signature === "object" && "r" in signature && "s" in signature)
      return serializeSignature(signature);
    if (signature instanceof Uint8Array)
      return fromBytes(signature, "hex");
    throw new Error(`Invalid signature type for signature ${signature}: ${typeof signature}`);
  })();
  const wrappedSignature = await (async () => {
    if (!accountFactory)
      return signatureHex;
    if (isErc6492Signature(signatureHex))
      return signatureHex;
    return serializeErc6492Signature({
      address: accountFactory.address,
      data: accountFactory.verificationCalldata,
      signature: signatureHex
    });
  })();
  const verificationData = encodeDeployData({
    abi: universalSignatureValidatorAbi,
    args: [address, hash, wrappedSignature],
    bytecode: universalSignatureValidatorByteCode
  });
  const rpcRequest = getRpcClient({
    chain,
    client
  });
  try {
    const result = await eth_call(rpcRequest, {
      data: verificationData
    });
    const hexResult = isHex(result) ? toBytes(result) : result;
    return equalBytes(hexResult, toBytes("0x1"));
  } catch {
    const validEip1271 = await verifyEip1271Signature({
      hash,
      signature: signatureHex,
      contract: getContract({
        chain,
        address,
        client
      })
    }).catch(() => false);
    if (validEip1271) {
      return true;
    }
    return false;
  }
}
var EIP_1271_MAGIC_VALUE = "0x1626ba7e";
async function verifyEip1271Signature({ hash, signature, contract }) {
  const result = await isValidSignature({
    hash,
    signature,
    contract
  });
  return result === EIP_1271_MAGIC_VALUE;
}

// node_modules/thirdweb/dist/esm/auth/verify-typed-data.js
async function verifyTypedData({ address, signature, client, chain, accountFactory, message, domain, primaryType, types }) {
  const messageHash = hashTypedData({
    message,
    domain,
    primaryType,
    types
  });
  return verifyHash({
    hash: messageHash,
    signature,
    address,
    chain,
    client,
    accountFactory
  });
}
export {
  ZERO_ADDRESS as ADDRESS_ZERO,
  NATIVE_TOKEN_ADDRESS,
  ZERO_ADDRESS,
  boolToBytes,
  boolToHex,
  bytesToBigInt,
  bytesToBool,
  bytesToNumber,
  bytesToString,
  concatHex,
  createThirdwebClient,
  defineChain,
  encode,
  estimateGas,
  estimateGasCost,
  eth_blockNumber,
  eth_call,
  eth_estimateGas,
  eth_gasPrice,
  eth_getBalance,
  eth_getBlockByHash,
  eth_getBlockByNumber,
  eth_getCode,
  eth_getLogs,
  eth_getStorageAt,
  eth_getTransactionByHash,
  eth_getTransactionCount,
  eth_getTransactionReceipt,
  eth_maxPriorityFeePerGas,
  eth_sendRawTransaction,
  fromBytes,
  fromGwei,
  fromHex,
  getAddress,
  getBuyWithCryptoHistory,
  getBuyWithCryptoQuote,
  getBuyWithCryptoStatus,
  getBuyWithCryptoTransfer,
  getContract,
  getContractEvents,
  getGasPrice,
  getRpcClient,
  getUser,
  hexToBigInt,
  hexToBool,
  hexToBytes,
  hexToNumber,
  hexToString,
  hexToUint8Array,
  isAddress,
  isBaseTransactionOptions,
  isHex,
  keccak256,
  numberToBytes,
  numberToHex,
  padHex,
  parseEventLogs,
  prepareContractCall,
  prepareEvent,
  prepareTransaction,
  readContract,
  resolveMethod,
  sendAndConfirmTransaction,
  sendBatchTransaction,
  sendTransaction,
  serializeTransaction2 as serializeTransaction,
  sha2562 as sha256,
  signTransaction,
  simulateTransaction,
  stringToBytes,
  stringToHex,
  toBytes,
  toEther,
  toHex,
  toSerializableTransaction,
  toTokens,
  toUnits,
  toWei,
  uint8ArrayToHex,
  verifyTypedData,
  waitForReceipt,
  watchBlockNumber,
  watchContractEvents
};
//# sourceMappingURL=thirdweb.js.map
