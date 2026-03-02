import type { CryptoApisHttpClient, RequestMetadata } from "@cryptoapis-io/mcp-shared";

export type DeriveReceivingAddressInput = {
    network: string;
    extendedPublicKey: string;
} & RequestMetadata;

export async function deriveReceivingAddress(client: CryptoApisHttpClient, input: DeriveReceivingAddressInput) {
    return client.request<unknown>(
        "POST",
        `/hd-wallets/xrp/${input.network}/${encodeURIComponent(input.extendedPublicKey)}/addresses/derive-and-sync`,
        { query: { context: input.context }, body: { data: { item: {} } } }
    );
}
