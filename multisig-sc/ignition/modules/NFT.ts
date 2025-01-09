// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const MockERC721 = buildModule("MockERC721", (m) => {
    const mockERC721 = m.contract("MockERC721", [
        "MockERC721",
        "ME721",
    ]);

    return { mockERC721 };
});

export default MockERC721;
