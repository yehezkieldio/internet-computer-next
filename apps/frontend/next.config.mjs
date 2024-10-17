import fs from "node:fs";
import { join } from "node:path";

async function initCanisterIds() {
    let localCanisters = {};

    try {
        const projectRoot = join(import.meta.dirname, "..", "..", ".dfx", "local", "canister_ids.json");
        const canisterIds = JSON.parse(fs.readFileSync(projectRoot, "utf8"));
        localCanisters = canisterIds;
    } catch (_error) {
        console.log("No local canister_ids.json found. Continuing production");
    }

    console.log(`localCanisters: ${JSON.stringify(localCanisters)}`);

    const network = process.env.DFX_NETWORK || (process.env.NODE_ENV === "production" ? "ic" : "local");

    console.info(`initCanisterIds: network=${network}`);
    console.info(`initCanisterIds: DFX_NETWORK=${process.env.DFX_NETWORK}`);

    localCanisters = network === "local" ? localCanisters : prodCanisters;

    for (const canister in localCanisters) {
        process.env[`NEXT_PUBLIC_${canister.toUpperCase()}_CANISTER_ID`] = localCanisters[canister][network];
    }
    process.env.NEXT_PUBLIC_II_URL = `http://${process.env.CANISTER_ID_INTERNET_IDENTITY}.localhost:4943/`;
}

await initCanisterIds();

// NEXT_PUBLIC_INTERNET_COMPUTER_NEXT_BACKEND_CANISTER_ID
for (const key in process.env) {
    if (key.startsWith("NEXT_PUBLIC")) {
        console.log(`${key}=${process.env[key]}`);
    }
}

import webpack from "webpack";

const EnvPlugin = new webpack.EnvironmentPlugin({
    DFX_NETWORK: "local",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    webpack: (config) => {
        config.plugins.push(EnvPlugin);
        return config;
    },
};

export default nextConfig;
