"use client";

import type React from "react";
import { useState } from "react";
import { createActor } from "#/service/actor-locator";

const greet = createActor();

export default function Greeting() {
    const [greeting, setGreeting] = useState<string>("");

    function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();

        const name = "elizielx";
        greet.greet(name).then((greeting) => {
            setGreeting(greeting);
        });

        return false;
    }

    return (
        <div className="flex flex-row p-4">
            <span>{greeting ? <span>{greeting}</span> : <span>No greeting yet</span>}</span>
            <button type="button" onClick={handleSubmit} className="ml-4">
                Greet me
            </button>
        </div>
    );
}
