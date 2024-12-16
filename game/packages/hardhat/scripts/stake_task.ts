import { ethers } from "hardhat";

async function createPool() {
  const CONTRACT_NAME = "Winfinity";
  const timeInSeoconds=(_mins:number)=>{
    return _mins*60;
  }
  const WinfintyAddress = "0x06d7841983A17bB370c5CDE5f67B1C6C1e8f77Ed";
  const sender = new ethers.Wallet(
    process.env.DEPLOYER_ACCOUNT_PRIV_KEY as any,
    ethers.provider
  );
  const winfinityContract = await ethers.getContractAt(
    CONTRACT_NAME,
    WinfintyAddress,
    sender
  );
  const tx = await winfinityContract.;
  await tx.wait();
  console.log("Pool Created Successfully:", tx.hash);
}

async function main() {
  await createPool();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});