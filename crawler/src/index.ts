import { ponder } from "ponder:registry";
import schema from "ponder:schema";
import redis from 'redis';

class Publisher {
    publisher: redis.RedisClientType;
    isConnected: boolean;

    constructor() {
        this.publisher = redis.createClient({
            password: 'redis_pwd'
        });
        this.isConnected = false;
    }

    // Singleton pattern
    async createConnection(): Promise<redis.RedisClientType> {
        if (!this.isConnected) {
            await this.publisher.connect();
            this.isConnected = true;
        }
        return this.publisher;
    }
}

const publisher = new Publisher();

ponder.on("MultiSig:SubmitTransaction", async ({ event, context }) => {
    console.log('agent submit new tx');
    const publisherClient = await publisher.createConnection();
    const txData = {
        id: event.log.id,
        owner: event.args.owner,
        txIndex: `${event.args.txIndex}`,
        to: event.args.to,
        value: `${event.args.value}`,
        data: event.args.data,
        blockNumber: `${event.block.number}`,
        txHash: event.transaction.hash,
    };
    await publisherClient.publish("agent_submitted_new_tx", JSON.stringify({ data: txData }));
    await context.db.insert(schema.submitTxEvent).values(txData);
});
