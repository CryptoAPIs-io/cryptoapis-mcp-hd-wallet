import type { CryptoApisHttpClient, RequestMetadata } from "@cryptoapis-io/mcp-shared";

export type ListAddressesInput = {
    network: string;
    extendedPublicKey: string;
    limit?: number;
    offset?: number;
    /** classic (per OpenAPI) */
    addressFormat?: string;
    isChangeAddress?: boolean;
} & RequestMetadata;

export async function listAddresses(client: CryptoApisHttpClient, input: ListAddressesInput) {
    return client.request<unknown>(
        "GET",
        `/hd-wallets/xrp/${input.network}/${encodeURIComponent(input.extendedPublicKey)}/addresses`,
        {
            query: {
                context: input.context,
                limit: input.limit,
                offset: input.offset,
                addressFormat: input.addressFormat,
                isChangeAddress: input.isChangeAddress,
            },
        }
    );
}
