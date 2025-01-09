// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import DeployedAddr from "../deployments/chain-31337/deployed_addresses.json"
// import DeployedAddr from "../deployments/chain-1287/deployed_addresses.json"

const Distributor = buildModule("Distributor", (m) => {
    console.log(DeployedAddr);

    const tokenAddr = DeployedAddr["MockERC20#MockERC20"];
    const nftAddr = DeployedAddr["MockERC721#MockERC721"];    
    const distributor = m.contract("Distributor", [tokenAddr, nftAddr]);

    return { distributor };
});

export default Distributor;
