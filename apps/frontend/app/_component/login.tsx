"use client";

import { HttpAgent } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";

import type React from "react";
import { useState } from "react";

import { createActorWithAuth } from "#/service/actor-locator";

export default function Login() {
    const [greeting, setGreeting] = useState<string>("");

    async function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();

        const authClient = await AuthClient.create();

        await new Promise((resolve) => {
            authClient.login({
                identityProvider: process.env.NEXT_PUBLIC_II_URL,
                onSuccess: resolve,
            });
        });

        const identity = authClient.getIdentity();
        const agent = new HttpAgent({ identity });

        const actor = createActorWithAuth(agent);

        const name = "elizielx";
        actor.greet(name).then((greeting) => {
            setGreeting(greeting);
        });

        actor.whoami().then((principal) => {
            console.log(principal);
        });

        return false;
    }

    return (
        <div className="flex flex-row p-4 mt-8">
            <span>{greeting ? <span>{greeting}</span> : <span>No greeting yet</span>}</span>

            <button type="button" onClick={handleSubmit} className="ml-4">
                Login
            </button>
        </div>
    );
}
