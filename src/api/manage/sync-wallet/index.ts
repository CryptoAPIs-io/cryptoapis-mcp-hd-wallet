import type { CryptoApisHttpClient, RequestMetadata } from "@cryptoapis-io/mcp-shared";

export type SyncWalletInput = {
    blockchain: string;
    network: string;
    extendedPublicKey: string;
} & RequestMetadata;

export async function syncWallet(client: CryptoApisHttpClient, input: SyncWalletInput) {
    return client.request<unknown>(
        "POST",
        `/hd-wallets/manage/${input.blockchain}/${input.network}/${encodeURIComponent(input.extendedPublicKey)}/sync`,
        {
            query: { context: input.context },
            body: { data: { item: {} } },
        }
    );
}
