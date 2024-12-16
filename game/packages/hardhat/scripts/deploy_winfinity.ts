import { ethers } from "hardhat";

async function deployWinfinity() {
  const CONTRACT_NAME = "Winfinity";
  const ERC20_CONTRACT_NAME = "Token";

  const rewardToken = await ethers.deployContract(ERC20_CONTRACT_NAME, [
    "USDC",
    "USDC",
  ]);
  await rewardToken.waitForDeployment();

  let rewardTokenAddress = await rewardToken.getAddress();
  console.log("Deployed Reward Token contract address:", rewardTokenAddress);
  
  const stakingToken = await ethers.deployContract(ERC20_CONTRACT_NAME, [
    "WIN",
    "WIN",
  ]);

  await stakingToken.waitForDeployment();

  let stakingTokenAddress = await stakingToken.getAddress();

  console.log("Deployed Stake Token contract address:", stakingTokenAddress);

  const winfinity = await ethers.deployContract(CONTRACT_NAME, [
    stakingTokenAddress,
    rewardTokenAddress,
  ]);
  await winfinity.waitForDeployment();
  console.log(
    "Deployed Winfinity contract address:",
    await winfinity.getAddress()
  );
}

async function main() {
  await deployWinfinity();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
