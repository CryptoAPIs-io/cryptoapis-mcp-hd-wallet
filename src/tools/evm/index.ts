import type { CryptoApisHttpClient, RequestResult } from "@cryptoapis-io/mcp-shared";
import type { McpToolDef } from "../types.js";
import { HdWalletDataEvmToolSchema, type HdWalletDataEvmToolInput } from "./schema.js";
import * as api from "../../api/evm/index.js";
import * as credits from "./credits.js";

export const hdWalletDataEvmTool: McpToolDef<typeof HdWalletDataEvmToolSchema> = {
    name: "hd_wallet_data_evm",
    description: `Query HD wallet data for EVM blockchains by extended public key (xPub). The wallet must first be synced via manage_hd_wallet. Offset pagination: use 'limit' and 'offset' for paged results.

Actions:
• derive-receiving-address: Derive the next unused receiving address
• list-addresses: List all derived addresses for the wallet
• list-transactions: List transactions across all wallet addresses
• prepare-transaction: Build an unsigned EVM transaction from a wallet address
• list-assets: List token balances (ERC-20, ERC-721, etc.) held by the wallet
• get-details: Get wallet summary (total balance, address count, sync status)`,
    credits: {
        "derive-receiving-address": credits.deriveReceivingCredits,
        "list-addresses": credits.listAddressesCredits,
        "list-transactions": credits.listTransactionsCredits,
        "prepare-transaction": credits.prepareTransactionCredits,
        "list-assets": credits.listAssetsCredits,
        "get-details": credits.getDetailsCredits,
    },
    inputSchema: HdWalletDataEvmToolSchema,
    handler: (client: CryptoApisHttpClient) => async (input: HdWalletDataEvmToolInput) => {
        const base = { blockchain: input.blockchain!, network: input.network!, extendedPublicKey: input.extendedPublicKey!, context: input.context };
        let result: RequestResult<unknown>;
        switch (input.action) {
            case "derive-receiving-address":
                result = await api.deriveReceivingAddress(client, base);
                break;
            case "list-addresses":
                result = await api.listAddresses(client, { ...base, limit: input.limit, offset: input.offset });
                break;
            case "list-transactions":
                result = await api.listTransactions(client, { ...base, limit: input.limit, offset: input.offset });
                break;
            case "prepare-transaction":
                result = await api.prepareTransaction(client, {
                    ...base,
                    fromAddress: input.fromAddress!,
                    toAddress: input.toAddress!,
                    value: input.value!,
                    feePriority: input.feePriority,
                    data: input.data,
                });
                break;
            case "list-assets":
                result = await api.listAssets(client, base);
                break;
            case "get-details":
                result = await api.getDetails(client, base);
                break;
        }
        return { content: [{ type: "text", text: JSON.stringify({ ...(result.data as object), creditsConsumed: result.creditsConsumed, creditsAvailable: result.creditsAvailable, responseTime: result.responseTime, throughputUsage: result.throughputUsage }) }] };
    },
};
