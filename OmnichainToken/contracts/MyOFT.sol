// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@layerzerolabs/solidity-examples/contracts/token/oft/OFT.sol";

// override decimal() function is needed
contract MyOFT is OFT {
    constructor(string memory _name, string memory _symbol, address _lzEndpoint) OFT(_name, _symbol, _lzEndpoint) {
        _mint(msg.sender, 100 * (10 ** decimals()));
    }
}