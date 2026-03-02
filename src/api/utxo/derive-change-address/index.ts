import type { CryptoApisHttpClient, RequestMetadata } from "@cryptoapis-io/mcp-shared";

export type DeriveChangeAddressInput = {
    blockchain: string;
    network: string;
    extendedPublicKey: string;
} & RequestMetadata;

export async function deriveChangeAddress(client: CryptoApisHttpClient, input: DeriveChangeAddressInput) {
    return client.request<unknown>(
        "POST",
        `/hd-wallets/utxo/${input.blockchain}/${input.network}/${encodeURIComponent(input.extendedPublicKey)}/addresses/derive-and-sync-change`,
        { query: { context: input.context }, body: { data: { item: {} } } }
    );
}
