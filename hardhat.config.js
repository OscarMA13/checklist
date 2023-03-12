require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.0",
  networks: {
    development: {
      url: "http://localhost:3000",
      chainId: 1337
    }
  }
};
