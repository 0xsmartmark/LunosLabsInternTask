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
    let dstOFT: MyOFT;

    let owner: Signer;

    [owner] = await ethers.getSigners();

    await dstOFT.setTrustedRemoteAddress(srcChainId, await srcOFT.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
