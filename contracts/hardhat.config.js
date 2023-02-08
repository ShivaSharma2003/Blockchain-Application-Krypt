require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli:
    {
      url: "https://eth-goerli.g.alchemy.com/v2/f4Sfjh2SZDear6KYHJy1Su4SyrOhMbEW",
      accounts: ['b5c809eede25c0f9e6c89c51cc99d47934eac7e74dfac74d35a3cc3f2105c91d'],
    },
  }
};
