import type { CryptoApisHttpClient, RequestMetadata } from "@cryptoapis-io/mcp-shared";

export type GetDetailsInput = {
    network: string;
    extendedPublicKey: string;
} & RequestMetadata;

export async function getDetails(client: CryptoApisHttpClient, input: GetDetailsInput) {
    return client.request<unknown>(
        "GET",
        `/hd-wallets/xrp/${input.network}/${encodeURIComponent(input.extendedPublicKey)}/details`,
        { query: { context: input.context } }
    );
}
