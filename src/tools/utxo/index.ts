import type { CryptoApisHttpClient, RequestResult } from "@cryptoapis-io/mcp-shared";
import type { McpToolDef } from "../types.js";
import { HdWalletDataUtxoToolSchema, type HdWalletDataUtxoToolInput } from "./schema.js";
import * as api from "../../api/utxo/index.js";
import * as credits from "./credits.js";

export const hdWalletDataUtxoTool: McpToolDef<typeof HdWalletDataUtxoToolSchema> = {
    name: "hd_wallet_data_utxo",
    description: `Query HD wallet data for UTXO blockchains (bitcoin, litecoin, bitcoin-cash, dogecoin, dash, zcash) by extended public key (xPub/yPub/zPub). The wallet must first be synced via manage_hd_wallet. Offset pagination: use 'limit' and 'offset' for paged results.

Actions:
• derive-receiving-address: Derive the next unused receiving address
• derive-change-address: Derive the next unused change address
• list-addresses: List all derived addresses for the wallet
• list-transactions: List transactions across all wallet addresses
• list-utxos: List unspent transaction outputs (UTXOs) for the wallet
• prepare-transaction: Build an unsigned UTXO transaction with automatic input selection
• list-assets: List token/asset balances held by the wallet
• get-details: Get wallet summary (total balance, address count, sync status)`,
    credits: {
        "derive-receiving-address": credits.deriveReceivingCredits,
        "derive-change-address": credits.deriveChangeCredits,
        "list-addresses": credits.listAddressesCredits,
        "list-transactions": credits.listTransactionsCredits,
        "list-utxos": credits.listUtxosCredits,
        "prepare-transaction": credits.prepareTransactionCredits,
        "list-assets": credits.listAssetsCredits,
        "get-details": credits.getDetailsCredits,
    },
    inputSchema: HdWalletDataUtxoToolSchema,
    handler: (client: CryptoApisHttpClient) => async (input: HdWalletDataUtxoToolInput) => {
        const base = { blockchain: input.blockchain!, network: input.network!, extendedPublicKey: input.extendedPublicKey!, context: input.context };
        let result: RequestResult<unknown>;
        switch (input.action) {
            case "derive-receiving-address":
                result = await api.deriveReceivingAddress(client, base);
                break;
            case "derive-change-address":
                result = await api.deriveChangeAddress(client, base);
                break;
            case "list-addresses":
                result = await api.listAddresses(client, { ...base, limit: input.limit, offset: input.offset, addressFormat: input.addressFormat });
                break;
            case "list-transactions":
                result = await api.listTransactions(client, { ...base, limit: input.limit, offset: input.offset, derivation: input.derivation });
                break;
            case "list-utxos":
                result = await api.listUtxos(client, { ...base, limit: input.limit, offset: input.offset, derivation: input.derivation });
                break;
            case "prepare-transaction":
                result = await api.prepareTransaction(client, { ...base, recipients: input.recipients!, feePriority: input.feePriority });
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
