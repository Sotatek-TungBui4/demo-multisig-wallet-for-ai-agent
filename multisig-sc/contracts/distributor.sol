// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "./interfaces/IERC20Mintable.sol";
import "./interfaces/IERC721Mintable.sol";

contract Distributor {
    IERC20Mintable token;
    IERC721Mintable nft;

    constructor(address token_, address nft_) {
        token = IERC20Mintable(token_);
        nft = IERC721Mintable(nft_);
    }
    

    function mintERC20(address account, uint256 amount) external {
        token.mint(account, amount);
    }

    function mintERC721(address to, uint256 tokenId, string memory uri) external {
        nft.mint(to, tokenId, uri);
    }
}