import type { CryptoApisHttpClient, RequestMetadata } from "@cryptoapis-io/mcp-shared";

export type ListTransactionsInput = {
    blockchain: string;
    network: string;
    extendedPublicKey: string;
    limit?: number;
    offset?: number;
    /** account | bip32 (per OpenAPI) */
    derivation?: string;
} & RequestMetadata;

export async function listTransactions(client: CryptoApisHttpClient, input: ListTransactionsInput) {
    return client.request<unknown>(
        "GET",
        `/hd-wallets/utxo/${input.blockchain}/${input.network}/${encodeURIComponent(input.extendedPublicKey)}/transactions`,
        {
            query: {
                context: input.context,
                limit: input.limit,
                offset: input.offset,
                derivation: input.derivation,
            },
        }
    );
}
