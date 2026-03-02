import type { CryptoApisHttpClient, RequestMetadata } from "@cryptoapis-io/mcp-shared";

export type ListAddressesInput = {
    blockchain: string;
    network: string;
    extendedPublicKey: string;
    limit?: number;
    offset?: number;
} & RequestMetadata;

export async function listAddresses(client: CryptoApisHttpClient, input: ListAddressesInput) {
    return client.request<unknown>(
        "GET",
        `/hd-wallets/evm/${input.blockchain}/${input.network}/${encodeURIComponent(input.extendedPublicKey)}/addresses`,
        { query: { context: input.context, limit: input.limit, offset: input.offset } }
    );
}
