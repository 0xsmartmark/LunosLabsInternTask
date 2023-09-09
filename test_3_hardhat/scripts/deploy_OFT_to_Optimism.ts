import {
    time,
    loadFixture,
  } from "@nomicfoundation/hardhat-toolbox/network-helpers";
  import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
  import { expect } from "chai";
  import { ethers } from "hardhat";
import { Contract } from "hardhat/internal/hardhat-network/stack-traces/model";
import { ILayerZeroEndpoint, LZEndpointMock, MyOFT, MyProxyOFT, MyToken } from "../typechain-types";
import { AddressLike, Signer } from "ethers";

async function main() {
    let dstChainId: number = 10132; // Optimism-Goerli (Testnet) 
    let dstEndPointAddress: AddressLike = "0xae92d5aD7583AD66E49A0c67BAd18F6ba52dDDc1"; // Goerli

    let dstOFT: MyOFT;

    let owner: Signer;

    [owner] = await ethers.getSigners();

    // Deploying OFT myToken at 2nd chain
    const MyOFT = await ethers.getContractFactory("MyOFT");
    dstOFT = await MyOFT.deploy("MyToken", "MTK", dstEndPointAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
