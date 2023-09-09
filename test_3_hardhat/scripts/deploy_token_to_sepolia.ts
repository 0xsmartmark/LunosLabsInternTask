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
    let srcChainId: number = 10161; // Sepolia (Testnet)
    let srcEndPointAddress: AddressLike = "0xae92d5aD7583AD66E49A0c67BAd18F6ba52dDDc1"; // Sepolia

    let myToken: MyToken;
    let srcOFT: MyProxyOFT;

    let owner: Signer;

    [owner] = await ethers.getSigners();

    // Deploying MyToken
    const MyToken = await ethers.getContractFactory("MyToken");
    myToken = await MyToken.deploy([owner]);

    // Deploying Proxy for MyToken
    // const MyProxyOFT = await ethers.getContractFactory("MyProxyOFT");
    // srcOFT = await MyProxyOFT.deploy(srcEndPointAddress, await myToken.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
