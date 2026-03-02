import type { CryptoApisHttpClient, RequestResult, DangerousActionMap } from "@cryptoapis-io/mcp-shared";
import { requiresConfirmation, buildConfirmationPreview, formatDangerousActionsWarning } from "@cryptoapis-io/mcp-shared";
import type { McpToolDef } from "../types.js";
import { ManageHdWalletToolSchema, type ManageHdWalletToolInput } from "./schema.js";
import * as api from "../../api/manage/index.js";
import { syncCredits, listCredits, activateCredits, deleteCredits, getStatusCredits } from "./credits.js";

const DANGEROUS_ACTIONS: DangerousActionMap = {
    "sync-wallet": {
        warning: "Syncing an HD wallet starts monitoring all derived addresses with daily credit costs.",
        impact: "Daily monitoring tax per derived address plus one-time processing tax per indexed transaction. Costs scale with the number of derived addresses. Use system_info(action='credits') for exact costs per blockchain.",
    },
    "activate-wallet": {
        warning: "Reactivating a wallet resumes monitoring and daily credit charges for all derived addresses.",
        impact: "Daily monitoring tax will resume for all derived addresses in this wallet.",
    },
    "delete-wallet": {
        warning: "Deleting an HD wallet stops monitoring all derived addresses.",
        impact: "Monitoring will stop. The wallet can be re-activated later with 'activate-wallet'.",
    },
};

const ACTION_CREDITS: Record<string, number> = {
    "sync-wallet": syncCredits,
    "activate-wallet": activateCredits,
    "delete-wallet": deleteCredits,
};

export const manageHdWalletTool: McpToolDef<typeof ManageHdWalletToolSchema> = {
    name: "manage_hd_wallet",
    description: `Manage HD wallets identified by extended public key (xPub/yPub/zPub). Private keys never leave the user's device — only the extended public key is sent to CryptoAPIs for address derivation and balance tracking.

Actions:
• sync-wallet: Register an xPub to start syncing its addresses and balances
• list-wallets: List all synced HD wallets for a blockchain/network
• activate-wallet: Re-activate a previously deleted wallet
• delete-wallet: Remove an xPub from tracking (can be re-activated later)
• get-status: Check the sync status of a wallet (syncing, synced, etc.)${formatDangerousActionsWarning(DANGEROUS_ACTIONS)}`,
    credits: { "sync-wallet": syncCredits, "list-wallets": listCredits, "activate-wallet": activateCredits, "delete-wallet": deleteCredits, "get-status": getStatusCredits },
    inputSchema: ManageHdWalletToolSchema,
    handler: (client: CryptoApisHttpClient) => async (input: ManageHdWalletToolInput) => {
        const dangerousAction = await requiresConfirmation(input.action, DANGEROUS_ACTIONS, input.confirmationToken);
        if (dangerousAction) {
            return await buildConfirmationPreview(input.action, dangerousAction, ACTION_CREDITS[input.action]);
        }

        let result: RequestResult<unknown>;
        switch (input.action) {
            case "sync-wallet":
                result = await api.syncWallet(client, {
                    blockchain: input.blockchain!,
                    network: input.network!,
                    extendedPublicKey: input.extendedPublicKey!,
                    context: input.context,
                });
                break;
            case "list-wallets":
                result = await api.listWallets(client, {
                    blockchain: input.blockchain!,
                    network: input.network!,
                    context: input.context,
                    limit: input.limit,
                    offset: input.offset,
                });
                break;
            case "activate-wallet":
                result = await api.activateWallet(client, {
                    blockchain: input.blockchain!,
                    network: input.network!,
                    extendedPublicKey: input.extendedPublicKey!,
                    context: input.context,
                });
                break;
            case "delete-wallet":
                result = await api.deleteWallet(client, {
                    blockchain: input.blockchain!,
                    network: input.network!,
                    extendedPublicKey: input.extendedPublicKey!,
                    context: input.context,
                });
                break;
            case "get-status":
                result = await api.getStatus(client, {
                    blockchain: input.blockchain!,
                    network: input.network!,
                    extendedPublicKey: input.extendedPublicKey!,
                    context: input.context,
                });
                break;
        }
        return { content: [{ type: "text", text: JSON.stringify({ ...(result.data as object), creditsConsumed: result.creditsConsumed, creditsAvailable: result.creditsAvailable, responseTime: result.responseTime, throughputUsage: result.throughputUsage }) }] };
    },
};
