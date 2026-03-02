import type { CryptoApisHttpClient, RequestMetadata } from "@cryptoapis-io/mcp-shared";

export type ListTransactionsInput = {
    blockchain: string;
    network: string;
    extendedPublicKey: string;
    limit?: number;
    offset?: number;
} & RequestMetadata;

export async function listTransactions(client: CryptoApisHttpClient, input: ListTransactionsInput) {
    return client.request<unknown>(
        "GET",
        `/hd-wallets/evm/${input.blockchain}/${input.network}/${encodeURIComponent(input.extendedPublicKey)}/transactions`,
        { query: { context: input.context, limit: input.limit, offset: input.offset } }
    );
}
