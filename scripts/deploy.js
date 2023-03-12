const { ethers } = require("hardhat");

async function main() {
  const Checklist = await ethers.getContractFactory("Checklist");
  const checklist = await Checklist.deploy();

  console.log("Checklist contract deployed to:", checklist.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
