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
    let srcOFT: MyProxyOFT;
    let dstOFT: MyOFT;

    let owner: Signer;

    [owner] = await ethers.getSigners();

    let tokensCnt = ethers.parseEther("2");
    let refundAddress = await owner.getAddress();
    let zroPaymentAddress = ethers.ZeroAddress;
    let adapterParams = ethers.solidityPacked(["uint16", "uint256"], [1, 200000])
    let fees = await srcOFT.estimateSendFee(dstChainId, await owner.getAddress(), tokensCnt, false, adapterParams);

    token.approve(await srcProxyOFT.getAddress(), tokensCnt, {from: owner});
    await srcProxyOFT.sendFrom(await owner.getAddress(), dstChainId, await owner.getAddress(), tokensCnt, 
        refundAddress, zroPaymentAddress, "0x", {value: fees[0]});
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
