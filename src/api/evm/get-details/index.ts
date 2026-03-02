import type { CryptoApisHttpClient, RequestMetadata } from "@cryptoapis-io/mcp-shared";

export type GetDetailsInput = {
    blockchain: string;
    network: string;
    extendedPublicKey: string;
} & RequestMetadata;

export async function getDetails(client: CryptoApisHttpClient, input: GetDetailsInput) {
    return client.request<unknown>(
        "GET",
        `/hd-wallets/evm/${input.blockchain}/${input.network}/${encodeURIComponent(input.extendedPublicKey)}/details`,
        { query: { context: input.context } }
    );
}
