// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract QuizScore is ERC1155URIStorage, Ownable {
    uint256 private _tokenId;
    mapping(uint256 => address) private _tokenOwner;

    event TokenAwarded(address to, uint256 indexed tokenId, string tokenURI);

    constructor(address initialOwner) ERC1155("") Ownable(initialOwner){}

    function awardItem(address to, string memory tokenURI)
        public
        payable
        returns (uint256){
            _tokenId++;
            _mint(to, _tokenId, 1, "");
            _setURI(_tokenId, tokenURI);
            _tokenOwner[_tokenId] = to;
            emit TokenAwarded(to, _tokenId, tokenURI);
            return _tokenId;
    }

    function tokenOwner(uint256 tokenId) public view returns (address){
        return _tokenOwner[tokenId];
    }
}