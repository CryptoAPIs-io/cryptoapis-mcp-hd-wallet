import * as z from "zod";
import { RequestMetadataSchema } from "@cryptoapis-io/mcp-shared";

export const XrpNetwork = z.enum(["mainnet", "testnet"]);
export const XrpAction = z.enum(["derive-receiving-address", "list-addresses", "list-transactions", "list-assets", "get-details"]);

export const HdWalletDataXrpToolSchema = z
    .object({
        action: XrpAction.describe("Action to perform"),
        network: XrpNetwork.optional().describe("XRP network (mainnet or testnet); required for all actions"),
        extendedPublicKey: z.string().optional().describe("xPub for XRP"),
        limit: z.number().optional().describe("Max results per page (for list-* actions)"),
        offset: z.number().optional().describe("Pagination offset (for list-* actions)"),
        addressFormat: z.enum(["classic"]).optional().describe("XRP list-addresses: address format"),
        isChangeAddress: z.boolean().optional().describe("XRP list-addresses: filter change addresses"),
        derivation: z.enum(["account", "bip32"]).optional().describe("XRP list-transactions: derivation type"),
    })
    .merge(RequestMetadataSchema);

export type HdWalletDataXrpToolInput = z.infer<typeof HdWalletDataXrpToolSchema>;
