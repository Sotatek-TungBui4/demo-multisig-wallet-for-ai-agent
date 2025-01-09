#!/bin/bash

yarn hardhat ignition deploy ignition/modules/Token.ts --network localhost
yarn hardhat ignition deploy ignition/modules/NFT.ts --network localhost
yarn hardhat ignition deploy ignition/modules/MultiSig.ts --network localhost
yarn hardhat ignition deploy ignition/modules/Distributor.ts --network localhost
