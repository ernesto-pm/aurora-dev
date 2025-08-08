import { LettaClient } from "@letta-ai/letta-client";

export class TemporalLettaClient {
    client: LettaClient

    constructor() {
        this.client = new LettaClient({
            baseUrl: "http://localhost:8283"
        })
    }

    async getBlocks() {
        const blocks = await this.client.blocks.list()
        return blocks
    }

    createBaseClientForUser() {
        this.client.agents.create({
            name: "Agente Base de Aurora AI",
            system: 'This is my base system prompt',
        })
    }
}

let lettaClient: TemporalLettaClient;

export function getLettaClient() {
    if (!lettaClient) {
        lettaClient = new TemporalLettaClient();
    }
    return lettaClient;
}