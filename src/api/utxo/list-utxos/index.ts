import type { CryptoApisHttpClient, RequestMetadata } from "@cryptoapis-io/mcp-shared";

export type ListUtxosInput = {
    blockchain: string;
    network: string;
    extendedPublicKey: string;
    limit?: number;
    offset?: number;
    /** account | bip32 (per OpenAPI) */
    derivation?: string;
} & RequestMetadata;

export async function listUtxos(client: CryptoApisHttpClient, input: ListUtxosInput) {
    return client.request<unknown>(
        "GET",
        `/hd-wallets/utxo/${input.blockchain}/${input.network}/${encodeURIComponent(input.extendedPublicKey)}/unspent-outputs`,
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
