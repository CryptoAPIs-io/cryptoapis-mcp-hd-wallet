import type { CryptoApisHttpClient, RequestMetadata } from "@cryptoapis-io/mcp-shared";

export type GetStatusInput = {
    blockchain: string;
    network: string;
    extendedPublicKey: string;
} & RequestMetadata;

export async function getStatus(client: CryptoApisHttpClient, input: GetStatusInput) {
    return client.request<unknown>(
        "GET",
        `/hd-wallets/manage/${input.blockchain}/${input.network}/${encodeURIComponent(input.extendedPublicKey)}/status`,
        { query: { context: input.context } }
    );
}
