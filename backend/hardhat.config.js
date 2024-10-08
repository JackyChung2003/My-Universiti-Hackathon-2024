require("@matterlabs/hardhat-zksync-solc");
require("dotenv").config();

const { API_URL, PRIVATE_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  zksolc: {
    version: "1.3.9",
    defaultNetwork: "holesky", 
    compilerSource: "binary",
    settings: {
      optimizer: {
        enabled: true,
      },
    },
  },
  // networks: {
  //   hardhat: {},
  //   holesky: {
  //     url: "https://rpc.ankr.com/eth_holesky", 
  //     accounts: [`0x${PRIVATE_KEY}`],
  //   },
  // },
  networks: {
    holesky: {
      // url: `https://holesky.infura.io/v3/${process.env.ALCHEMY_API_KEY}`, // Use Alchemy or Infura Holesky RPC
      url: `https://eth-holesky.g.alchemy.com/v2/g77AJPB5k8hN1cwIWZaKk3cX71cWgHSp`, // Use Alchemy or Infura Holesky RPC
      
      accounts: [`0x${process.env.PRIVATE_KEY}`],
      chainId: 17000, // Holesky Testnet Chain ID
    },
  },
  paths: {
    artifacts: "./artifacts-zk",
    cache: "./cache-zk",
    sources: "./contracts",
    tests: "./test",
  },
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
