import type { CryptoApisHttpClient, RequestMetadata } from "@cryptoapis-io/mcp-shared";

export type ListAddressesInput = {
    blockchain: string;
    network: string;
    extendedPublicKey: string;
    limit?: number;
    offset?: number;
    /** p2pkh | p2sh | p2wpkh | p2pkh-cash | p2sh-cash (per OpenAPI) */
    addressFormat?: string;
} & RequestMetadata;

export async function listAddresses(client: CryptoApisHttpClient, input: ListAddressesInput) {
    return client.request<unknown>(
        "GET",
        `/hd-wallets/utxo/${input.blockchain}/${input.network}/${encodeURIComponent(input.extendedPublicKey)}/addresses`,
        {
            query: {
                context: input.context,
                limit: input.limit,
                offset: input.offset,
                addressFormat: input.addressFormat,
            },
        }
    );
}
