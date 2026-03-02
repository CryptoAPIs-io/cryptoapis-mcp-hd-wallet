import * as z from "zod";
import { RequestMetadataSchema } from "@cryptoapis-io/mcp-shared";
import { UtxoBlockchain, UtxoNetwork } from "./base-schema.js";

export const UtxoAction = z.enum([
    "derive-receiving-address",
    "derive-change-address",
    "list-addresses",
    "list-transactions",
    "list-utxos",
    "prepare-transaction",
    "list-assets",
    "get-details",
]);

export const HdWalletDataUtxoToolSchema = z
    .object({
        action: UtxoAction.describe("Action to perform"),
        blockchain: UtxoBlockchain.optional().describe("UTXO blockchain (e.g. bitcoin, litecoin, bitcoin-cash, dogecoin, dash, zcash); required for all actions"),
        network: UtxoNetwork.optional().describe("Network (e.g. mainnet, testnet); required for all actions"),
        extendedPublicKey: z.string().optional().describe("xPub/yPub/zPub for this chain"),
        limit: z.number().optional().describe("Max results per page (for list-* actions)"),
        offset: z.number().optional().describe("Pagination offset (for list-* actions)"),
        addressFormat: z.enum(["p2pkh", "p2sh", "p2wpkh", "p2pkh-cash", "p2sh-cash"]).optional().describe("UTXO list-addresses: address format"),
        derivation: z.enum(["account", "bip32"]).optional().describe("UTXO list-utxos / list-transactions: derivation type"),
        recipients: z.array(z.object({ address: z.string(), amount: z.string() })).optional().describe("Array of {address, amount} objects (required for prepare-transaction)"),
        feePriority: z.enum(["slow", "standard", "fast"]).optional().describe("Fee priority level (prepare-transaction only; defaults to standard)"),
    })
    .merge(RequestMetadataSchema);

export type HdWalletDataUtxoToolInput = z.infer<typeof HdWalletDataUtxoToolSchema>;
