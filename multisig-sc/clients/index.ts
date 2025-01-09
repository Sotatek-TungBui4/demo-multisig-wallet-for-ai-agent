import "dotenv/config";
import { ethers } from "ethers";
import fs from 'fs';
import path from 'path';
// import DeployedAddress from '../ignition/deployments/chain-1287/deployed_addresses.json';
import DeployedAddress from '../ignition/deployments/chain-31337/deployed_addresses.json';
import { 
    Distributor__factory, MockERC20__factory, MockERC721__factory, 
    MultiSig__factory
} from "../typechain-types";

const TREASURY_PRIVATE_KEY = 
    // process.env.PRIVATE_KEY!;
    '0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e';
const AMOUNT = ethers.parseEther('1');

const provider = new ethers.JsonRpcProvider(
    // 'https://rpc.testnet.moonbeam.network'
    "http://127.0.0.1:8545/"
);
const MNEMONIC_RELATIVE_PATH = path.resolve(__dirname, '..', 'mnemonics');
const mnemonicsFiles = fs.readdirSync(MNEMONIC_RELATIVE_PATH);
const mnemonics = mnemonicsFiles.map(file => fs.readFileSync(path.resolve(MNEMONIC_RELATIVE_PATH, file), 'utf-8'));
const wallets = mnemonics.map((m) => ethers.Wallet.fromPhrase(m, provider))
console.info(`Loaded ${wallets.length} wallets`);

// 0xbf0ef0531287d49de7795ae3887e54d093e90d27bb83e4c51004b8843c648b5d
// 0xc469200449B170f1f5140DCFdaF1e0c1a5102bB8
// console.log(wallets[2].address);

const treasury = new ethers.Wallet(TREASURY_PRIVATE_KEY, provider);

async function sleep(ms: number) {
    return new Promise(r => {
        setTimeout(() => r(ms), ms)
    })
}

async function faucet() {
    for (const wallet of wallets) {
        console.info(`Faucet to ${wallet.address} ...`);
        const tx = await treasury.sendTransaction({
            to: wallet.address,
            value: AMOUNT,
        });
        await tx.wait(1);
        await sleep(500);
    }
}

async function main() {
    // // faucet
    // await faucet();
    
    // give the agent wallet#3, so client use only 2 first wallets 
    const wallet0MultiSig = MultiSig__factory.connect(DeployedAddress['MultiSig#MultiSig'], wallets[0]);
    const wallet1MultiSig = MultiSig__factory.connect(DeployedAddress['MultiSig#MultiSig'], wallets[1]);
    const agentTxIndex = 2;

    const mockERC20 = MockERC20__factory.connect(DeployedAddress['MockERC20#MockERC20'], wallets[1]);
    const mockERC721 = MockERC721__factory.connect(DeployedAddress['MockERC721#MockERC721'], wallets[1]);
    const distributor = Distributor__factory.connect(DeployedAddress['Distributor#Distributor'], wallets[0]);
    const distributorInterface = Distributor__factory.createInterface();

    const encodedMintERC20 = distributorInterface.encodeFunctionData('mintERC20', [wallets[2].address, 1000000000])
    const encodedMintERC721 = distributorInterface.encodeFunctionData('mintERC721', [wallets[2].address, 0, "https://example.com/"])
    // const wallet0SubmitTxMintERC20 = await (
    //     await wallet0MultiSig.submitTransaction(DeployedAddress['Distributor#Distributor'], 0, encodedMintERC20)
    // ).wait(1);
    // console.info("submitted mint ERC20 transaction")
    // const wallet0SubmitTxMintERC721 = await (
    //     await wallet0MultiSig.submitTransaction(DeployedAddress['Distributor#Distributor'], 0, encodedMintERC721)
    // ).wait(1);
    // console.info("submitted mint ERC721 transaction")

    // await (
    //     await wallet0MultiSig.confirmTransaction(agentTxIndex)
    // ).wait(1);
    // console.info("Wallet #1 confirmed");
    // await (
    //     await wallet1MultiSig.confirmTransaction(agentTxIndex)
    // ).wait(1);
    // console.info("Wallet #2 confirmed");
    // // wallet#1 & wallet#2 confirmed, => 2/3 wallets have confirmed => agent can execute transaction

    // // execute transaction
    // await (
    //     await wallet1MultiSig.executeTransaction(agentTxIndex)
    // ).wait(1);
    // console.info(`Tx at ${agentTxIndex} executed`);

    // console.log(await mockERC20.balanceOf(wallets[2].address))
    // console.log(await mockERC721.balanceOf(wallets[2].address))

}

main().then(() => process.exit(0))
