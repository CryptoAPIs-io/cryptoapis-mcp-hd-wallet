import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { GetPromptResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { formatSupportedChains } from "@cryptoapis-io/mcp-shared";
import { supportedChains } from "../resources/supported-chains.js";

export function registerPrompts(server: McpServer): void {
    server.registerPrompt(
        "sync-and-check-wallet",
        {
            description: "Sync an HD wallet by xPub and check its balance",
            argsSchema: {
                blockchain: z.string().describe("Blockchain protocol (e.g. ethereum, bitcoin, xrp)"),
                network: z.string().describe("Network name (e.g. mainnet, testnet, sepolia)"),
                extendedPublicKey: z.string().describe("Extended public key (xPub/yPub/zPub) of the HD wallet"),
            },
        },
        (args): GetPromptResult => ({
            messages: [
                {
                    role: "user",
                    content: {
                        type: "text",
                        text: `First use manage_hd_wallet with action 'sync' to sync the HD wallet with extended public key ${args.extendedPublicKey} on ${args.blockchain}/${args.network}. This registers the xPub for balance tracking. Then use the appropriate data tool (hd_wallet_data_evm, hd_wallet_data_utxo, or hd_wallet_data_xrp) to check the wallet balance and list derived addresses with their individual balances.\n\n${formatSupportedChains(supportedChains)}`,
                    },
                },
            ],
        }),
    );
}
