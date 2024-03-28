// Deployment notes:
// - Must run a local hardhat node that acts as the blockchain netword to interact with: 
//     'npx hardhat node'
// - Then with the node instance, keep running and in seperate terminal:
//     `npx hardhat run --network localhost ./scripts/deploy.js`

const hre = require("hardhat");
const fs = require("fs/promises");

async function main() {
  const ChessAccount = await hre.ethers.deployContract("ChessAccount");
  const chessAccount = await ChessAccount.waitForDeployment();

  await writeDeploymentInfo(chessAccount);
}

async function writeDeploymentInfo(contract) {
  const data = {
    contract: {
      address: contract.target,  // represents the contract address named 'target'
      signerAddress: contract.runner.address,  // Use 'runner.address' instead of 'signer.address' 
      abi: contract.interface.format(),
    },
  };

  const content = JSON.stringify(data, null, 2);
  await fs.writeFile("deployment.json", content, { encoding: "utf-8" });
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});