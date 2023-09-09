import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import '@typechain/hardhat'
import '@nomicfoundation/hardhat-ethers'
import '@nomicfoundation/hardhat-chai-matchers'

import 'dotenv/config';

const SEPOLIA_PRIVATE_KEY  = process.env.PRIVATE_KEY as string;
const ALCHEMY_SEPOLIA_API_KEY = process.env.ALCHEMY_SEPOLIA_URL as string;

const OPTIMISM_GEORLI_PRIVATE_KEY  = process.env.PRIVATE_KEY as string;;
const ALCHEMY_OPTIMISM_GEORLI_API_KEY = process.env.ALCHEMY_OPTIMISM_URL as string;

const config: HardhatUserConfig = {
  solidity: "0.8.19",

  networks: {
    eth_sepolia_testnet: {
      url: ALCHEMY_SEPOLIA_API_KEY,
      accounts: [SEPOLIA_PRIVATE_KEY]
    },

    optimism_goerli_testnet: {
      url: ALCHEMY_OPTIMISM_GEORLI_API_KEY,
      accounts: [OPTIMISM_GEORLI_PRIVATE_KEY]
    }
  }
};

export default config;
