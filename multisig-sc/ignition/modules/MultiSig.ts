// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { ethers } from "ethers";
import fs from 'fs';
import path from 'path';

const MultiSig = buildModule("MultiSig", (m) => {
    const MNEMONIC_RELATIVE_PATH = path.resolve(__dirname, '..', '..', 'mnemonics');
    const mnemonicsFiles = fs.readdirSync(MNEMONIC_RELATIVE_PATH);
    // 0xBf2eD083D87919042B6Dce241c0a3c537FbB7eBb
    // 0xfA7C26a2Bcb5F4BEba816CCe6bc66a2ca0CB8B71
    // 0xc469200449B170f1f5140DCFdaF1e0c1a5102bB8
    const mnemonics = mnemonicsFiles.map(file => fs.readFileSync(path.resolve(MNEMONIC_RELATIVE_PATH, file), 'utf-8'));
    const wallets = mnemonics.map((m) => ethers.Wallet.fromPhrase(m)).map(w => w.address);
    
    const owners = wallets;
    const numConfirmation = 2; // 2/3
    const multiSig = m.contract("MultiSig", [
        owners, numConfirmation,
    ]);

    return { multiSig };
});

export default MultiSig;
