import { createConfig } from "ponder";
import { http } from "viem";

import { MultiSigAbi } from "./abis/MultiSigAbi";

export default createConfig({
    networks: {
        localhost: {
            chainId: 31337,
            transport: http(process.env.LOCALHOST_RPC_URL),
        },
        moonbase: {
            transport: http(process.env.MOONBASE_RPC_URL),
            chainId: 1287,
            pollingInterval: 5_000, // 5s
            maxRequestsPerSecond: 10,
        },
    },
    contracts: {
        // MultiSig: {
        //     network: "moonbase",
        //     abi: MultiSigAbi,
        //     address: "0x297ee7F39AdE8941c746F7bd870e8c1F9f9F2E58",
        //     startBlock: 10233578,
        //     filter: {
        //         event: "SubmitTransaction",
        //     },
        // },
        MultiSig: {
            network: "localhost",
            abi: MultiSigAbi,
            address: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
            startBlock: 0,
            filter: {
                event: ["SubmitTransaction", "ConfirmTransaction", "ExecuteTransaction"],
            },
        },
    },
});
