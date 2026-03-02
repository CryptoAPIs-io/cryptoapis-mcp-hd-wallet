import type { CryptoApisHttpClient, RequestMetadata } from "@cryptoapis-io/mcp-shared";

export type ListAssetsInput = {
    blockchain: string;
    network: string;
    extendedPublicKey: string;
} & RequestMetadata;

export async function listAssets(client: CryptoApisHttpClient, input: ListAssetsInput) {
    return client.request<unknown>(
        "GET",
        `/hd-wallets/evm/${input.blockchain}/${input.network}/${encodeURIComponent(input.extendedPublicKey)}/assets`,
        { query: { context: input.context } }
    );
}
