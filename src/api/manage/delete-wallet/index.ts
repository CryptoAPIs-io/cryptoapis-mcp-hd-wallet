import type { CryptoApisHttpClient, RequestMetadata } from "@cryptoapis-io/mcp-shared";

export type DeleteWalletInput = {
    blockchain: string;
    network: string;
    extendedPublicKey: string;
} & RequestMetadata;

export async function deleteWallet(client: CryptoApisHttpClient, input: DeleteWalletInput) {
    return client.request<unknown>(
        "DELETE",
        `/hd-wallets/manage/${input.blockchain}/${input.network}/${encodeURIComponent(input.extendedPublicKey)}`,
        { query: { context: input.context } }
    );
}
