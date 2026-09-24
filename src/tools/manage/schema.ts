import * as z from "zod";
import { RequestMetadataSchema, ConfirmationSchema } from "@cryptoapis-io/mcp-shared";

export const ManageAction = z.enum(["sync-wallet", "list-wallets", "activate-wallet", "delete-wallet", "get-status"]);

/**
 * All /hd-wallets/manage/{blockchain}/{network}... actions (sync, list, activate,
 * delete, get-status) accept the same uniform set per the spec — verified across
 * sync/list/activate/delete; get-status is absent from the current spec snapshot
 * but shares the same URL family and error semantics live (xpub_not_synced, not
 * uri_not_found), so the same set is assumed.
 */
export const ManageHdWalletBlockchain = z.enum([
    "bitcoin", "bitcoin-cash", "litecoin", "dogecoin", "dash", "zcash",
    "ethereum", "ethereum-classic", "binance-smart-chain", "tron", "xrp",
]);

export const ManageHdWalletNetwork = z.enum([
    "mainnet", "testnet", "mordor", "nile", "sepolia",
]);

export const ManageHdWalletToolSchema = z
    .object({
        action: ManageAction.describe("Action to perform"),
        blockchain: ManageHdWalletBlockchain.optional().describe("Blockchain; required for all actions"),
        network: ManageHdWalletNetwork.optional().describe("Network; required for all actions"),
        extendedPublicKey: z.string().optional().describe("xPub/yPub/zPub; required for sync, activate, delete, get-status"),
        limit: z.number().optional().describe("Max results per page (list-wallets only)"),
        offset: z.number().optional().describe("Pagination offset (list-wallets only)"),
    })
    .merge(RequestMetadataSchema)
    .merge(ConfirmationSchema);

export type ManageHdWalletToolInput = z.infer<typeof ManageHdWalletToolSchema>;
