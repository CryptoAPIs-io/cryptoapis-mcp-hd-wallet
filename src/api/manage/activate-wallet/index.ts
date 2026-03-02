import type { CryptoApisHttpClient, RequestMetadata } from "@cryptoapis-io/mcp-shared";

export type ActivateWalletInput = {
    blockchain: string;
    network: string;
    extendedPublicKey: string;
} & RequestMetadata;

export async function activateWallet(client: CryptoApisHttpClient, input: ActivateWalletInput) {
    return client.request<unknown>(
        "POST",
        `/hd-wallets/manage/${input.blockchain}/${input.network}/${encodeURIComponent(input.extendedPublicKey)}/activate`,
        { query: { context: input.context }, body: { data: { item: {} } } }
    );
}
