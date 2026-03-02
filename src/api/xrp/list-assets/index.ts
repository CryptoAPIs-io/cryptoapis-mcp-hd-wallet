import type { CryptoApisHttpClient, RequestMetadata } from "@cryptoapis-io/mcp-shared";

export type ListAssetsInput = {
    network: string;
    extendedPublicKey: string;
} & RequestMetadata;

export async function listAssets(client: CryptoApisHttpClient, input: ListAssetsInput) {
    return client.request<unknown>(
        "GET",
        `/hd-wallets/xrp/${input.network}/${encodeURIComponent(input.extendedPublicKey)}/assets`,
        { query: { context: input.context } }
    );
}
