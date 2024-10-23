import {
  eth_getStorageAt
} from "./chunk-HL2TAEA2.js";
import {
  getBytecode
} from "./chunk-BTE2Y3SL.js";
import "./chunk-NPXNISXJ.js";
import {
  readContract
} from "./chunk-YNNWR6WB.js";
import "./chunk-ADB2NQOP.js";
import "./chunk-UWOTGWKX.js";
import "./chunk-QWJX262R.js";
import {
  isAddress
} from "./chunk-V4W7FLQ7.js";
import "./chunk-DIMUSPZQ.js";
import "./chunk-5WKP5JEZ.js";
import "./chunk-R65PP5GT.js";
import {
  getRpcClient
} from "./chunk-JZJYIG2P.js";
import "./chunk-NJUWOGZE.js";
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

// node_modules/thirdweb/dist/esm/utils/bytecode/extractMnimalProxyImplementationAddress.js
function extractMinimalProxyImplementationAddress(bytecode) {
  if (!bytecode.startsWith("0x")) {
    bytecode = `0x${bytecode}`;
  }
  if (bytecode.startsWith("0x363d3d373d3d3d363d73")) {
    const implementationAddress = bytecode.slice(22, 62);
    return `0x${implementationAddress}`;
  }
  if (bytecode.startsWith("0x36603057343d5230")) {
    const implementationAddress = bytecode.slice(122, 122 + 40);
    return `0x${implementationAddress}`;
  }
  if (bytecode.startsWith("0x3d3d3d3d363d3d37363d73")) {
    const implementationAddress = bytecode.slice(24, 24 + 40);
    return `0x${implementationAddress}`;
  }
  if (bytecode.startsWith("0x366000600037611000600036600073")) {
    const implementationAddress = bytecode.slice(32, 32 + 40);
    return `0x${implementationAddress}`;
  }
  if (bytecode.startsWith("0x36600080376020600036600073")) {
    const implementationAddress = bytecode.slice(28, 28 + 40);
    return `0x${implementationAddress}`;
  }
  if (bytecode.startsWith("0x365f5f375f5f365f73")) {
    const implementationAddress = bytecode.slice(20, 60);
    return `0x${implementationAddress}`;
  }
  return void 0;
}

// node_modules/thirdweb/dist/esm/utils/bytecode/resolveImplementation.js
var AddressZero = "0x0000000000000000000000000000000000000000";
var ZERO_BYTES32 = "0x0000000000000000000000000000000000000000000000000000000000000000";
async function resolveImplementation(contract) {
  const [originalBytecode, beacon] = await Promise.all([
    getBytecode(contract),
    getBeaconFromStorageSlot(contract)
  ]);
  const minimalProxyImplementationAddress = extractMinimalProxyImplementationAddress(originalBytecode);
  if (minimalProxyImplementationAddress) {
    return {
      address: minimalProxyImplementationAddress,
      bytecode: await getBytecode({
        ...contract,
        address: minimalProxyImplementationAddress
      })
    };
  }
  let implementationAddress;
  if (beacon && beacon !== AddressZero) {
    contract = { ...contract, address: beacon };
    implementationAddress = await getImplementationFromContractCall(contract);
  } else {
    implementationAddress = await getImplementationFromStorageSlot(contract);
  }
  if (implementationAddress && isAddress(implementationAddress) && implementationAddress !== AddressZero) {
    const implementationBytecode = await getBytecode({
      ...contract,
      address: implementationAddress
    });
    if (implementationBytecode === "0x") {
      return {
        address: contract.address,
        bytecode: originalBytecode
      };
    }
    return {
      address: implementationAddress,
      bytecode: implementationBytecode
    };
  }
  return { address: contract.address, bytecode: originalBytecode };
}
async function getBeaconFromStorageSlot(contract) {
  const rpcRequest = getRpcClient({
    client: contract.client,
    chain: contract.chain
  });
  try {
    const proxyStorage = await eth_getStorageAt(rpcRequest, {
      address: contract.address,
      position: "0xa3f0ad74e5423aebfd80d3ef4346578335a9a72aeaee59ff6cb3582b35133d50"
    });
    return `0x${proxyStorage.slice(-40)}`;
  } catch {
    return void 0;
  }
}
async function getImplementationFromStorageSlot(contract) {
  const rpcRequest = getRpcClient({
    client: contract.client,
    chain: contract.chain
  });
  try {
    const proxyStoragePromises = [
      eth_getStorageAt(rpcRequest, {
        address: contract.address,
        position: "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc"
      }),
      eth_getStorageAt(rpcRequest, {
        address: contract.address,
        position: (
          // keccak256("matic.network.proxy.implementation") - used in polygon USDT proxy: https://polygonscan.com/address/0xc2132d05d31c914a87c6611c10748aeb04b58e8f#code
          "0xbaab7dbf64751104133af04abc7d9979f0fda3b059a322a8333f533d3f32bf7f"
        )
      }),
      eth_getStorageAt(rpcRequest, {
        address: contract.address,
        position: (
          // keccak256("org.zeppelinos.proxy.implementation") - e.g. base USDC proxy: https://basescan.org/address/0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913#code
          "0x7050c9e0f4ca769c69bd3a8ef740bc37934f8e2c036e5a723fd8ee048ed3f8c3"
        )
      })
    ];
    const proxyStorages = await Promise.all(proxyStoragePromises);
    const proxyStorage = proxyStorages.find((storage) => storage !== ZERO_BYTES32);
    return proxyStorage ? `0x${proxyStorage.slice(-40)}` : AddressZero;
  } catch {
    return void 0;
  }
}
var UPGRADEABLE_PROXY_ABI = {
  type: "function",
  name: "implementation",
  inputs: [],
  outputs: [
    {
      type: "address",
      name: "",
      internalType: "address"
    }
  ],
  stateMutability: "view"
};
async function getImplementationFromContractCall(contract) {
  try {
    return await readContract({ contract, method: UPGRADEABLE_PROXY_ABI });
  } catch {
    return void 0;
  }
}
export {
  resolveImplementation
};
//# sourceMappingURL=resolveImplementation-6VVWY26C.js.map
