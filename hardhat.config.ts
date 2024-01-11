import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks:{
    sepolia: {
      url: process.env.API_URL,
      accounts: ["0x" + process.env.OWNER_ADRESS],
    }
  }
};

export default config;
