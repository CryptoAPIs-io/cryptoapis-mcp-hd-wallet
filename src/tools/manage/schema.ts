import * as z from "zod";
import { RequestMetadataSchema, ConfirmationSchema } from "@cryptoapis-io/mcp-shared";

export const ManageAction = z.enum(["sync-wallet", "list-wallets", "activate-wallet", "delete-wallet", "get-status"]);

export const ManageHdWalletToolSchema = z
    .object({
        action: ManageAction.describe("Action to perform"),
        blockchain: z.string().optional().describe("Blockchain (e.g. bitcoin, ethereum, xrp); required for all actions"),
        network: z.string().optional().describe("Network (e.g. mainnet, testnet, sepolia); required for all actions"),
        extendedPublicKey: z.string().optional().describe("xPub/yPub/zPub; required for sync, activate, delete, get-status"),
        limit: z.number().optional().describe("Max results per page (list-wallets only)"),
        offset: z.number().optional().describe("Pagination offset (list-wallets only)"),
    })
    .merge(RequestMetadataSchema)
    .merge(ConfirmationSchema);

export type ManageHdWalletToolInput = z.infer<typeof ManageHdWalletToolSchema>;
