import * as z from "zod";
import { RequestMetadataSchema } from "@cryptoapis-io/mcp-shared";
import { EvmBlockchain, EvmNetwork } from "./base-schema.js";

export const EvmAction = z.enum([
    "derive-receiving-address",
    "list-addresses",
    "list-transactions",
    "prepare-transaction",
    "list-assets",
    "get-details",
]);

export const HdWalletDataEvmToolSchema = z
    .object({
        action: EvmAction.describe("Action to perform"),
        blockchain: EvmBlockchain.optional().describe("EVM blockchain (e.g. ethereum, binance-smart-chain, polygon); required for all actions"),
        network: EvmNetwork.optional().describe("Network (e.g. mainnet, sepolia); required for all actions"),
        extendedPublicKey: z.string().optional().describe("xPub/yPub/zPub for this chain"),
        limit: z.number().optional().describe("Max results per page (for list-* actions)"),
        offset: z.number().optional().describe("Pagination offset (for list-* actions)"),
        fromAddress: z.string().optional().describe("Sender address (required for prepare-transaction)"),
        toAddress: z.string().optional().describe("Recipient address (required for prepare-transaction)"),
        value: z.string().optional().describe("Amount in the native coin's smallest unit, e.g. wei (required for prepare-transaction)"),
        data: z.string().optional().describe("Hex-encoded calldata for contract interaction (prepare-transaction only)"),
        feePriority: z.enum(["slow", "standard", "fast"]).optional().describe("Fee priority level (prepare-transaction only; defaults to standard)"),
    })
    .merge(RequestMetadataSchema);

export type HdWalletDataEvmToolInput = z.infer<typeof HdWalletDataEvmToolSchema>;
