const hre = require("hardhat");

const main = async () => {
  const TransactionFactory = await hre.ethers.getContractFactory('Transaction')
  const transactionContract = await TransactionFactory.deploy();

  await transactionContract.deployed();

  console.log(
    `Transaction Contract deployed to -  ${transactionContract.address}`
  );
}

const runMain = async () => {
  try {
    await main()
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

runMain()
