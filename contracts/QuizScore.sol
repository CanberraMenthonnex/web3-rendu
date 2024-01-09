// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract QuizScore is ERC1155, Ownable {
    uint256 private _tokenIdCounter = 0;
    constructor(address initialOwner) ERC1155("") Ownable(initialOwner) {}

    function mintNFT(address _to, uint256 _tokenId)
        external
        onlyOwner {
        _tokenIdCounter++;
        _mint(_to, _tokenId, 1, "");
    }
}
