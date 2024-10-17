import type { HttpAgent } from "@dfinity/agent";
import { createActor as createHelloActor, canisterId as helloCanisterId } from "#/declarations";

export function createActor() {
    return createHelloActor(helloCanisterId, {
        agentOptions: {
            host: process.env.NEXT_PUBLIC_IC_HOST,
        },
    });
}

export function createActorWithAuth(agent: HttpAgent) {
    return createHelloActor(helloCanisterId, {
        agent,
    });
}
