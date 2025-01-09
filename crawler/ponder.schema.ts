import { onchainTable } from "ponder";

export const submitTxEvent = onchainTable("submitTxEvent", (t) => ({
    id: t.text().primaryKey(),
    owner: t.hex().notNull(),
    txIndex: t.varchar().notNull(),
    to: t.hex().notNull(),
    value: t.varchar().notNull(),
    data: t.varchar().notNull(),
    blockNumber: t.varchar().notNull(),
    txHash: t.hex().notNull(),
}));
