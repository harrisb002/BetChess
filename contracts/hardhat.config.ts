import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

// If you need to import TypeScript files explicitly, register ts-node here
// This is not necessary if you only plan to execute .js files with Hardhat.
require('ts-node').register({
  files: true,
  transpileOnly: true,
});

const config: HardhatUserConfig = {
  solidity: "0.8.24",
};

export default config;
