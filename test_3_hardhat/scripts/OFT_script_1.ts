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
    let srcChainId: number;
    let dstChainId: number;

    let myToken: MyToken;
    let srcOFT: MyProxyOFT;
    let dstOFT: MyOFT;
    
    let srcLzEndpointMock: LZEndpointMock;
    let dstLzEndpointMock: LZEndpointMock;

    let owner: Signer;

    [owner] = await ethers.getSigners();
  
    srcChainId = 10161; // Sepolia (Testnet)
    dstChainId = 10132; // Optimism-Goerli (Testnet) 

    let srcEndPointAddress: AddressLike = "0xae92d5aD7583AD66E49A0c67BAd18F6ba52dDDc1"; // Sepolia
    let dstEndPointAddress: AddressLike = "0xae92d5aD7583AD66E49A0c67BAd18F6ba52dDDc1"; // Goerli

    // Deploying MyToken
    const MyToken = await ethers.getContractFactory("MyToken");
    myToken = await MyToken.deploy([owner]);

    // Deploying Proxy for MyToken
    const MyProxyOFT = await ethers.getContractFactory("MyProxyOFT");
    srcOFT = await MyProxyOFT.deploy(srcEndPointAddress, await myToken.getAddress());

    // Deploying OFT myToken at 2nd chain
    const MyOFT = await ethers.getContractFactory("MyOFT");
    dstOFT = await MyOFT.deploy("MyToken", "MTK", dstEndPointAddress);
    
    // Setting Remote Access for OFT tokens on each chain
    await srcOFT.setTrustedRemoteAddress(dstChainId, await dstOFT.getAddress());  
    await dstOFT.setTrustedRemoteAddress(srcChainId, await srcOFT.getAddress());

    let tokensCnt = ethers.parseEther("2");
    let refundAddress = await owner.getAddress();
    let zroPaymentAddress = ethers.ZeroAddress;
    let adapterParams = ethers.solidityPacked(["uint16", "uint256"], [1, 200000])
    let fees = await srcOFT.estimateSendFee(dstChainId, await owner.getAddress(), tokensCnt, false, adapterParams);

    // myToken.approve(await srcOFT.getAddress(), tokensCnt);
    // srcOFT.sendFrom(...);
  }
  
  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  